import supabase from ".";

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  return { data, error };
}

export function editUser(user) {}
