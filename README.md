# GitHub Analyzer

GitHub Analyzer is a backend service that fetches and analyzes public GitHub user profiles. It retrieves user information, repository details, and calculates statistics such as language usage and top repositories. The analyzed data is stored in a MySQL database and exposed through a REST API.

## Live API

**Base URL:**

```text
https://github-analyzer-kvmm.onrender.com
```

## Features

* Fetch detailed user profile information from the GitHub API.
* Analyze all public repositories for a given user.
* Calculate and store programming language usage statistics.
* Identify a user's top 5 repositories based on star count.
* Cache fetched profiles and repository statistics in MySQL.
* RESTful API for retrieving analyzed profiles and statistics.

---

## Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MySQL
* **ORM:** Sequelize
* **Validation:** Joi
* **Environment:** dotenv
* **Deployment:** Render

---

## Prerequisites

* Node.js (v18 or higher)
* MySQL
* GitHub Personal Access Token

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/J-VSuryaPrakash/Github_Analyzer.git
cd Github_Analyzer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```env
PORT=8000

DB_URL=mysql://root:password@localhost:3306/github_analyzer

GITHUB_TOKEN=<your_github_personal_access_token>
```

### 4. Start the development server

```bash
npm run dev
```

The application will connect to MySQL, synchronize the models, and start the server.

---

# API Endpoints

## Base URL

### Local

```text
http://localhost:8000/api/v1/stats
```

### Production

```text
https://github-analyzer-kvmm.onrender.com/api/v1/stats
```

---

## 1. Get or Create Profile

Fetches a GitHub user's profile and repository statistics.

If the profile already exists in the database, the cached data is returned.

Otherwise:

* Fetches profile information from GitHub
* Fetches repository statistics
* Calculates language usage
* Determines top repositories
* Stores everything in MySQL
* Returns the stored profile

### Endpoint

```http
POST /getProfileByUsername
```

### Request Body

```json
{
  "username": "torvalds"
}
```

---

## 2. Get All Profiles

Returns every analyzed profile stored in the database.

### Endpoint

```http
GET /
```

---

## Sample Endpoints

### Get Profile

```text
POST https://github-analyzer-kvmm.onrender.com/api/v1/stats/getProfileByUsername
```

Body

```json
{
  "username": "rohitg00"
}
```

---

### Get All Profiles

```text
GET https://github-analyzer-kvmm.onrender.com/api/v1/stats
```

---

## Sample Response

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Profile fetched successfully",
  "data": {
    "profile": {
      "...": "..."
    },
    "stats": {
      "...": "..."
    }
  }
}
```

---

## Environment Variables

| Variable     | Description                  |
| ------------ | ---------------------------- |
| PORT         | Server port                  |
| DB_URL       | MySQL connection string      |
| GITHUB_TOKEN | GitHub Personal Access Token |

---

## Project Structure

```text
src
├── config
├── controllers
├── models
├── routes
├── middleware
├── utils
└── index.js
```

---

## Deployment

The project is deployed on **Render**.

**Live API**

```text
https://github-analyzer-kvmm.onrender.com
```

---

## Repository

```text
https://github.com/J-VSuryaPrakash/Github_Analyzer
```
