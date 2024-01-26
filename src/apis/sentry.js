import axios from "./index";
const access_token = "f8ce98452872dc259749e59ff3a216112c0b706570f6366a1b2d043a4679c39e";

// const access_token = localStorage.getItem("sentry_access_token");

const headers = {
  Authorization: `Bearer ${access_token}`,
};

export const fetchSentryAuthTokenApi = async (code, install_id) => {
  try {
    const response = await axios.post(
      `https://sentry.io/api/0/sentry-app-installations/${install_id}/authorizations/`,
      {
        grant_type: "authorization_code",
        code: code,
        client_id: "87ae3c5fdb47be4f8446d0e8042d897e5aa3cf3e196072d3cbb4970dd0c4d3b1",
        client_secret: "53c58efdb14aefb52a4968868d33737be00a272c29c68ee733d88e1ea406013b",
      }
    );
    return response;
  } catch (err) {
    throw Error(err);
  }
};

export const fetchSentryRefreshTokenApi = async (refresh_token, install_id) => {
  try {
    const response = await axios.post(
      `https://sentry.io/api/0/sentry-app-installations/${install_id}/authorizations/`,
      {
        grant_type: "authorization_code",
        refresh_token: refresh_token,
        client_id: "87ae3c5fdb47be4f8446d0e8042d897e5aa3cf3e196072d3cbb4970dd0c4d3b1",
        client_secret: "53c58efdb14aefb52a4968868d33737be00a272c29c68ee733d88e1ea406013b",
      }
    );
    return response;
  } catch (err) {
    throw Error(err);
  }
};

export const fetchSentryDataWithTokenApi = async (token) => {
  try {
    const response = await axios.get("https://sentry.io/api/0/account/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err) {
    throw Error(err);
  }
};

export const fetchSentryProjectsApi = async (token) => {
  try {
    const response = await axios.get("https://sentry.io/api/0/projects/", {
      headers,
    });
    return response;
  } catch (err) {
    throw Error(err);
  }
};

export const fetchSentryProjectsWithTokenApi = async (token) => {
  try {
    const response = await axios.get("https://sentry.io/api/0/projects/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err) {
    throw Error(err);
  }
};

export const connectNewSentryWithGitHubRepo = async (organizationSlug, repositoryId) => {
  try {
    const baseUrl = "https://sentry.io/api/0";
    const integrationsEndpoint = `${baseUrl}/organizations/${organizationSlug}/integrations/`;

    const response = await axios.post(
      integrationsEndpoint,
      {
        provider: "github",
        name: "GitHub Integration",
        external_id: repositoryId,
      },
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error connecting Sentry with GitHub:", error);
    throw error;
  }
};

export const connectExistedSentryProjectWithGitHubRepo = async (
  organizationSlug,
  projectSlug,
  repositoryId
) => {
  try {
    const baseUrl = "https://sentry.io/api/0";
    const integrationsEndpoint = `${baseUrl}/projects/${organizationSlug}/${projectSlug}/integrations/`;

    const response = await axios.post(
      integrationsEndpoint,
      {
        provider: "github",
        name: "GitHub Integration",
        external_id: repositoryId,
      },
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error connecting Sentry with GitHub:", error);
    throw error;
  }
};
