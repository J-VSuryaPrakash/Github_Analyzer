import "dotenv/config";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import languageStatsHelper from "../utils/languageStats.helper.js";
import profileStatsModel from "../models/profilestats.model.js";

const getProfileStats = async (req, res, next) => {
  try {
    const { username } = req.params;
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      },
    );

    const repos = await response.json();
    let languageMap = {};
    let repoStats = [];

    for (const repo of repos) {
      const languagesResponse = await fetch(repo.languages_url, {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      });

      const languagesData = await languagesResponse.json();
      languageMap = { ...languageMap, ...languagesData };
      const watchersCount = repo.watchers_count;
      const topics = repo.topics;
      const stargazersCount = repo.stargazers_count;

      repoStats.push({
        repoName: repo.name,
        topics: topics,
        stargazersCount: stargazersCount,
        languages: Object.keys(languagesData),
      });
    }

    const languageStats = languageStatsHelper(languageMap);
    const totalRepos = repos.length;
    const publicRepos = repos.filter((repo) => !repo.private).length;
    const privateRepos = repos.filter((repo) => repo.private).length;

    repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    const topRepos = repos.slice(0, 5).map((repo) => ({
      name: repo.name,
      stargazers_count: repo.stargazers_count,
    }));

    const createStats = await profileStatsModel.create({
        totalRepos,
        publicRepos,
        privateRepos,
        topLanguages: languageStats,
        topRepos
    })

    return res.status(200).json(
      new ApiResponse(200, {
        repos: repoStats,
        languageStats,
        totalRepos,
        publicRepos,
        privateRepos,
        topRepos
      }),
    );
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return res
      .status(500)
      .json(new ApiError(500, "Failed to fetch GitHub repos"));
  }
};

export { getProfileStats };
