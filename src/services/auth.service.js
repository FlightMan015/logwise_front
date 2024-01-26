import supabase from ".";

export async function login(user) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password,
  });
  return { data, error };
}

export async function signInGoogle(token) {
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: token,
  });
  return { data, error };
}

export async function signSSO(domain) {
  // eslint-disable-next-line
  const { data, error } = await supabase.auth.signInWithSSO({
    domain: domain,
  });

  if (data?.url) {
    // redirect the user to the identity provider's authentication flow
    window.location.href = data.url;
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function resetPassword(new_password) {
  const { data, error } = await supabase.auth.updateUser({
    password: new_password,
  });
  return { data, error };
}

export async function register(user) {
  // return axios.post("/register", user);
  const { data, error } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
    options: {
      data: {
        name: user.name,
      },
    },
  });

  return { data, error };
}
