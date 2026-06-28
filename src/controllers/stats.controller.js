import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
// import profileStatsModel from "../models/profileStats.model.js";
import profileModel from "../models/profile.model.js";
import { db } from "../config/db/index.js";
import languageStatsHelper from "../utils/languageStats.helper.js";

const allProfileList = async (req, res, next) => {
  try {
    const profileStats = await profileModel.findAll({
      include: {
        model: profileStatsModel,
        as: "stats",
      },
    });

    if (!profileStats || profileStats.length === 0) {
      return res.status(404).json(new ApiError(404, "No profile stats found"));
    }

    return res.status(200).json(new ApiResponse(200, { profileStats }));
  } catch (error) {
    console.error("Failed to fetch profile stats:", error);
    return res
      .status(500)
      .json(new ApiError(500, "Failed to fetch profile stats"));
  }
};

const getProfileByUsername = async (req, res, next) => {
  const transaction = await db.transaction();

  try {
    const { username } = req.body;

    const existingProfile = await profileModel.findOne({
      where: { username },
      include: {
        model: profileStatsModel,
        as: "stats",
      },
    });

    if (existingProfile) {
      await transaction.rollback();

      return res
        .status(200)
        .json(
          new ApiResponse(200, existingProfile, "Profile fetched successfully"),
        );
    }

    const profileResponse = await fetch(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      },
    );

    const profileData = await profileResponse.json();

    const socialResponse = await fetch(
      `https://api.github.com/users/${username}/social_accounts`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      },
    );

    const socialLinks = await socialResponse.json();

    const createdProfile = await profileModel.create(
      {
        username: profileData.login,
        name: profileData.name,
        bio: profileData.bio,
        avatar_url: profileData.avatar_url,
        company: profileData.company,
        type: profileData.type,
        location: profileData.location,
        email: profileData.email,
        socials: socialLinks,
        followers: profileData.followers,
        following: profileData.following,
      },
      { transaction },
    );

    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      },
    );

    const repos = await reposResponse.json();

    let languageMap = {};

    const languageResponses = await Promise.all(
      repos.map(async (repo) => {
        const response = await fetch(repo.languages_url, {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Accept: "application/vnd.github+json",
          },
        });

        return response.json();
      }),
    );

    for (const languages of languageResponses) {
      for (const [language, bytes] of Object.entries(languages)) {
        languageMap[language] = (languageMap[language] || 0) + bytes;
      }
    }

    const languageStats = languageStatsHelper(languageMap);

    const totalRepos = repos.length;
    const publicRepos = repos.filter((repo) => !repo.private).length;
    const privateRepos = repos.filter((repo) => repo.private).length;

    const topRepos = [...repos]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 5)
      .map((repo) => ({
        name: repo.name,
        stars: repo.stargazers_count,
      }));
      
    const createdStats = await profileStatsModel.create(
      {
        profileId: createdProfile.id,
        totalRepos,
        publicRepos,
        privateRepos,
        topLanguages: languageStats,
        topRepos,
      },
      { transaction },
    );

    await transaction.commit();

    return res.status(201).json(
      new ApiResponse(
        201,
        {
          profile: createdProfile,
          stats: createdStats,
        },
        "Profile created successfully",
      ),
    );
  } catch (error) {
    await transaction.rollback();

    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", error.message));
  }
};

export { allProfileList, getProfileByUsername };
