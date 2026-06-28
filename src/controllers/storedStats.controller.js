import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const allProfileList = async (req, res, next) => {
  try {
    const profileStats = await profileStatsModel.find({});

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
  try {
    const { username } = req.body;
    const existingProfile = await profileModel.findOne({
      where: { username: profile.username },
    });

    if (!existingProfile) {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      const socialLinksResponse = await fetch(
        `https://api.github.com/users/${username}/social_accounts`,
      );
      const socialLinks = await socialLinksResponse.json();

      const profile = {
        username: data.login,
        name: data.name,
        bio: data.bio,
        avatar_url: data.avatar_url,
        company: data.company,
        type: data.type,
        location: data.location,
        email: data.email,
        socials: socialLinks,
        followers: data.followers,
        following: data.following,
      };

      const createdProfile = await profileModel.create(profile);
      return res
        .status(201)
        .json(
          new ApiResponse(201, createdProfile, "Profile created successfully"),
        );
    } else {
      return res
        .status(200)
        .json(
          new ApiResponse(200, existingProfile, "Profile fetched successfully"),
        );
    }
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", error.message));
  }
};

export { allProfileList, getProfileByUsername };