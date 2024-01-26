export const config = {
  runtime: "edge",
};

export default async function handler(request) {
  const json = await request.json();
  const data = await getGitAccessToken(json.code);
  const res = new Response(JSON.stringify(data));
  return res;
}

const getGitAccessToken = async (code) => {
  try {
    const client_id = process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID;
    const client_secret = process.env.REACT_APP_GITHUB_OAUTH_CLIENT_SECRET;
    const res = await fetch(
      `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`,
      {
        Method: "POST",
        headers: {
          Accept: "application/json",
        },
      }
    );
    const json = await res.clone().json();
    return json;
  } catch (error) {
    console.error("getGitAccessToken: " + error);
    return error;
  }
};

const getInstallationId = async () => {
  try {
    const client_id = process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID;
    const client_secret = process.env.REACT_APP_GITHUB_OAUTH_CLIENT_SECRET;
    // Step 1: Authenticate as an app
    const authResponse = await axios.post(`https://github.com/login/oauth/access_token`, {
      client_id: client_id,
      client_secret: client_secret,
      grant_type: "client_credentials",
    });

    const accessToken = authResponse.data.access_token;

    // Step 2: Retrieve the installation ID
    const installationsResponse = await axios.get("https://api.github.com/app/installations", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    const installationId = installationsResponse.data[0].id; // Assuming you want the first installation ID

    // Use the installation ID as needed
    console.log(installationId);
  } catch (error) {
    // Handle any errors here
    console.error(error);
  }
};
