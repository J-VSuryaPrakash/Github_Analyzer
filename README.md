GitHub Analyzer is a backend service that fetches and analyzes public GitHub user profiles. It retrieves user information, repository details, and calculates statistics such as language usage and top repositories. The data is then stored in a MySQL database and exposed through a REST API.

## Features

-   Fetch detailed user profile information from the GitHub API.
-   Analyze all public repositories for a given user.
-   Calculate and store statistics on programming language usage.
-   Identify a user's top 5 repositories based on star count.
-   Cache fetched profiles and stats in a database to avoid redundant API calls.
-   RESTful API to access the analyzed data.

## Tech Stack

-   **Backend:** Node.js, Express.js
-   **Database:** MySQL
-   **ORM:** Sequelize
-   **Dependencies:** Axios, Dotenv

## Prerequisites

-   Node.js (v18 or higher recommended)
-   A running MySQL database instance
-   A GitHub Personal Access Token with `public_repo` and `user` scopes.

## Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/J-VSuryaPrakash/Github_Analyzer.git
    cd Github_Analyzer
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project by copying the `.env.example` file.
    ```bash
    cp .env.example .env
    ```

4.  **Configure your `.env` file with the following:**
    ```ini
    # The port the server will run on
    PORT=8000

    # Your MySQL database connection string
    # Format: mysql://user:password@host:port/database_name
    DB_URL=mysql://root:password@localhost:3306/github_analyzer

    # Your GitHub Personal Access Token
    GITHUB_TOKEN=<your_github_token>
    ```

## Running the Application

To start the development server, run the following command. The server will automatically restart on file changes.

```bash
npm run dev
```

The server will start on the port specified in your `.env` file (default is 8000). Upon starting, it will connect to the database and sync the models.

## API Endpoints

All endpoints are prefixed with `/api/v1/stats`.

### Get or Create Profile by Username

Fetches a user's GitHub profile and repository stats. If the user's data already exists in the database, it returns the stored data. Otherwise, it fetches the data from the GitHub API, saves it to the database, and then returns it.

-   **URL:** `/getProfileByUsername`
-   **Method:** `POST`
-   **Body:**
    ```json
    {
      "username": "torvalds"
    }
    ```
-   **Success Response (201 Created):**
    ```json
    {
        "statusCode": 201,
        "data": {
            "profile": {
                "id": "c6a2b8e0-1c7a-4b0e-8d5a-9a8b7c6d5e4f",
                "username": "torvalds",
                "name": "Linus Torvalds",
                "bio": null,
                "avatar_url": "https://avatars.githubusercontent.com/u/1024025?v=4",
                "company": "Linux Foundation",
                "type": "User",
                "location": "Portland, OR",
                "email": null,
                "socials": [],
                "followers": 204300,
                "following": 0,
                "updatedAt": "2024-05-21T10:00:00.000Z",
                "createdAt": "2024-05-21T10:00:00.000Z"
            },
            "stats": {
                "id": "d7b3c9f1-2d8b-4c1f-9e6b-0a9b8c7d6e5g",
                "profileId": "c6a2b8e0-1c7a-4b0e-8d5a-9a8b7c6d5e4f",
                "totalRepos": 8,
                "publicRepos": 8,
                "privateRepos": 0,
                "topLanguages": [
                    { "language": "C", "percentage": 99.8 },
                    { "language": "Assembly", "percentage": 0.2 }
                ],
                "topRepos": [
                    { "name": "linux", "stars": 165000 },
                    { "name": "subsurface", "stars": 2500 }
                ],
                "updatedAt": "2024-05-21T10:00:00.000Z",
                "createdAt": "2024-05-21T10:00:00.000Z"
            }
        },
        "message": "Profile created successfully",
        "success": true
    }
    ```

### Get All Analyzed Profiles

Retrieves a list of all user profiles and their corresponding statistics that have been stored in the database.

-   **URL:** `/`
-   **Method:** `GET`
-   **Success Response (200 OK):**
    ```json
    {
        "statusCode": 200,
        "data": {
            "profileStats": [
                {
                    "id": "c6a2b8e0-1c7a-4b0e-8d5a-9a8b7c6d5e4f",
                    "username": "torvalds",
                    "name": "Linus Torvalds",
                    // ... other profile fields
                    "stats": {
                        "id": "d7b3c9f1-2d8b-4c1f-9e6b-0a9b8c7d6e5g",
                        "profileId": "c6a2b8e0-1c7a-4b0e-8d5a-9a8b7c6d5e4f",
                        "totalRepos": 8,
                        // ... other stats fields
                    }
                }
            ]
        },
        "success": true
    }
    ```
