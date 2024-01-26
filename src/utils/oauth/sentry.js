export function getSentryOAuthUrl() {
  //   const rootURl = "https://sentry.io/oauth/authorize";
  const rootURl = "https://sentry.io/sentry-apps/logwise-test-dev-app/external-install/";

  const options = {
    // client_id: "464a0008bad9b2342612762bf40f71addbd1aec0aa12f521fdbfb66ac29122b3",
    // client_secret: "53c58efdb14aefb52a4968868d33737be00a272c29c68ee733d88e1ea406013b",
    // redirect_uri: "https://logwise-front.vercel.app/setting/integrations/sentry",
    // scope: "user:email",
    // response_type: "code",
  };

  const qs = new URLSearchParams(options);

  return `${rootURl}?${qs.toString()}`;
}
