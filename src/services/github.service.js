import supabase from ".";

const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
const user_id = user?.id;

export const fetchGithubInfo = async (info) => {
  const { data, error } = await supabase.from("githubs").select().eq("user_id", user_id);
  return { data, error };
};

export const findGithubInfo = async () => {
  const { data, error } = await supabase.from("githubs").select().eq("user_id", user_id);
  return { data, error };
};

export const insertGithubInfo = async (info) => {
  const { data, error } = await supabase
    .from("githubs")
    .insert({ ...info, user_id: user_id }, { returning: "minimal" })
    .select();
  return { data, error };
};

export const updateGithubInfo = async (info) => {
  const { data, error } = await supabase
    .from("githubs")
    .update({ ...info })
    .eq("user_id", user_id);

  return { data, error };
};

export const findGithubRepoInfo = async () => {
  const { data, error } = await supabase.from("github_repos").select().eq("user_id", user_id);
  return { data, error };
};

export const findGithubRepoById = async (repo_id) => {
  const { data, error } = await supabase.from("github_repos").select().eq("repo_id", repo_id);
  return { data, error };
};

export const findGithubRepoWithProject = async () => {
  const { data, error } = await supabase.from("github_repos").select().eq("user_id", user_id);
  return { data, error };
};

export const insertGithubRepoInfo = async (info) => {
  const { data, error } = await supabase
    .from("github_repos")
    .insert({ ...info, user_id: user_id }, { returning: "minimal" })
    .select();
  return { data, error };
};

export const updateGithubRepoInfo = async (info) => {
  const { data, error } = await supabase
    .from("github_repos")
    .update({ ...info })
    .eq("user_id", user_id);

  return { data, error };
};

export const updateGithubRepoById = async (info) => {
  const { data, error } = await supabase
    .from("github_repos")
    .update({ ...info })
    .eq("repo_id", info.repo_id);

  return { data, error };
};
