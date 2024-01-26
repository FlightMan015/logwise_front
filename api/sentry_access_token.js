export const config = {
  runtime: "edge",
};

export default async function handler(request) {
  const json = await request.json();
  const data = await getSentryAccessToken(json.code);
  const res = new Response(JSON.stringify(data));
  return res;
}

const getSentryAccessToken = async (code) => {
  try {
    const client_id = "87ae3c5fdb47be4f8446d0e8042d897e5aa3cf3e196072d3cbb4970dd0c4d3b1";
    const client_secret = "53c58efdb14aefb52a4968868d33737be00a272c29c68ee733d88e1ea406013b";
    const redirect_uri = "https://logwise-front.vercel.app/setting/integrations/sentry";
    const grant_type = "authorization_code";
    const res = await fetch(
      `https://sentry.io/oauth/token/?client_id=${client_id}&client_secret=${client_secret}&code=${code}&redirect_uri=${redirect_uri}&grant_type=${grant_type}`,
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
    console.error("getSentryAccessToken: " + error);
    return error;
  }
};
