import axios from "./index";

const headers = {
  Authorization: `Bearer ${localStorage.getItem("git_access_token")}`,
};

export const fetchGithubDataApi = async (token) => {
  try {
    console.log("call fetch api of git");
    const response = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err) {
    throw Error(err);
  }
};

export const fetchGithubUserInfoApi = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`, { headers });
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const fetchGithubReposApi = async () => {
  try {
    const response = await axios.get(`https://api.github.com/user/repos`, { headers });
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const fetchGithubReposWithTokenApi = async (token) => {
  try {
    const response = await axios.get(`https://api.github.com/user/repos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getGitAccessTokenApi = async (code) => {
  try {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",

      {
        client_id: process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID,
        client_secret: process.env.REACT_APP_GITHUB_OAUTH_CLIENT_SECRET,
        code: code,
      }
    );
    const accessToken = response.data.access_token;
    localStorage.setItem("git_access_token", JSON.stringify(accessToken));
    console.log("github_access_token", accessToken);

    return accessToken;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getInstallationIdApi = async (accessToken) => {
  try {
    // const client_id = process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID;
    // const client_secret = process.env.REACT_APP_GITHUB_OAUTH_CLIENT_SECRET;
    // // Step 1: Authenticate as an app
    // const authResponse = await axios.post(`https://github.com/login/oauth/access_token`, {
    //   client_id: client_id,
    //   client_secret: client_secret,
    //   grant_type: "client_credentials",
    // });

    // const accessToken = authResponse.data.access_token;

    // Step 2: Retrieve the installation ID
    const installationsResponse = await axios.get("https://api.github.com/app/installations", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    const installationId = installationsResponse.data[0].id; // Assuming you want the first installation ID
    return installationId;
    // Use the installation ID as needed
  } catch (error) {
    // Handle any errors here
    console.error(error);
    return null;
  }
};
