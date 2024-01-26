import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const authMiddleware = (req, res, next) => {
  const token = req.cookies["sb:token"];
  const expiresAt = req.cookies["sb:token_expires_at"];

  if (token && expiresAt && new Date().getTime() > expiresAt) {
    // Token has expired, remove cookie and log out
    res.clearCookie("sb:token");
    res.clearCookie("sb:token_expires_at");
    // Add your logout logic here
  } else {
    next();
  }
};

export default supabase;
