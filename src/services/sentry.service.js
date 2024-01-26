import supabase from ".";

const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
const user_id = user?.id;

export const fetchSentryInfo = async () => {
  const { data, error } = await supabase.from("sentries").select().eq("user_id", user_id);
  return { data, error };
};

export const findSentryInfo = async () => {
  const { data, error } = await supabase.from("sentries").select().eq("user_id", user_id);
  return { data, error };
};

export const insertSentryInfo = async (info) => {
  const { data, error } = await supabase
    .from("sentries")
    .insert({ ...info, user_id: user_id }, { returning: "minimal" })
    .select();
  return { data, error };
};

export const updateSentryInfo = async (info) => {
  const { data, error } = await supabase
    .from("sentries")
    .update({ ...info })
    .eq("user_id", user_id);

  return { data, error };
};

export const findSentryProjectInfo = async () => {
  const { data, error } = await supabase.from("sentry_projects").select().eq("user_id", user_id);
  return { data, error };
};

export const findSentryProjectById = async (project_id) => {
  const { data, error } = await supabase
    .from("sentry_projects")
    .select()
    .eq("project_id", project_id);
  return { data, error };
};

export const insertSentryProjectInfo = async (info) => {
  const { data, error } = await supabase
    .from("sentry_projects")
    .insert({ ...info, user_id: user_id }, { returning: "minimal" })
    .select();
  return { data, error };
};

export const updateSentryProjectById = async (info) => {
  const { data, error } = await supabase
    .from("sentry_projects")
    .update({ ...info })
    .eq("project_id", info.project_id);

  return { data, error };
};
