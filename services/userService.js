import { supabase } from "../lib/supabase";
export const getUserData = async (userId) => {
  console.log('Fetching user data');
  try {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("id", userId)
      .single();

    if (error) {
      return { success: false, msg: error?.message };
    }
    return { success: true, data };
  } catch (error) {
    console.log("got error: ", error);
    return { success: false, msg: error.message };
  }
};

export const updateUser = async (userId, data) => {
  try {
    const { error } = await supabase
      .from("users")
      .update(data)
      .eq("id", userId);

    if (error) {
      return { success: false, msg: error?.message };
    }
    return { success: true };
  } catch (error) {
    console.log("got error: ", error);
    return { success: false, msg: error.message };
  }
};

export const isPseudonymeTaken = async (pseudonyme) => {
  try {
    const { data, error } = await supabase.from("users").select().eq("pseudonyme", pseudonyme);

    if (error) {
      return { success: false, msg: error?.message };
    }

    console.log(data);

    const isTaken = data.length > 0;
    return { success: true, isTaken };
  } catch (error) {
    console.log("got error: ", error);
    return { success: false, msg: error.message };
  }
};
