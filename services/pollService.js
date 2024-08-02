import { supabase } from "../lib/supabase";

export const createPoll = async ({body, choices, userId, visibility, category}) => {
  try {
    const { data, error } = await supabase
      .from("polls")
      .insert([{ body, choices, userId, visibility, category}])
      .select();

    if (error) {
      console.log("createPoll error: ", error);
      return { success: false, msg: "Could not create your poll" };
    }
    return { success: true, data: data };
  } catch (error) {
    console.log("createPoll error: ", error);
    return { success: false, msg: "Could not create your poll" };
  }
};

export const fetchPolls = async (limit = 10) => {
  try {
    const { data, error } = await supabase
      .from("polls")
      .select(
        `
                *,
                user: users ( id, pseudonyme, image ),
                pollAnswers (*),
                pollComments (count)
            `
      )
      .neq("visibility", "hidden")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) {
      console.log("fetchPolls error: ", error);
      return { success: false, msg: "Could not fetch the polls" };
    }
    return { success: true, data: data };
  } catch (error) {
    console.log("fetchPolls error: ", error);
    return { success: false, msg: "Could not fetch the polls" };
  }
};

export const fetchPollDetails = async (pollId) => {
  try {
    const { data, error } = await supabase
      .from("polls")
      .select(
        `
            *,
            user: users ( id, pseudonyme, image ),
            pollAnswers (*),
            commepollCommentsnts (*, user: users(id, pseudonyme, image))
        `
      )
      .eq("id", pollId)
      .order("created_at", { ascending: false, foreignTable: "pollComments" })
      .single();

    if (error) {
      console.log("pollDetails error: ", error);
      return { success: false, msg: "Could not fetch the poll" };
    }
    return { success: true, data: data };
  } catch (error) {
    console.log("pollDetails error: ", error);
    return { success: false, msg: "Could not fetch the poll" };
  }
};

export const createComment = async (comment) => {
  try {
    const { data, error } = await supabase
      .from("pollComments")
      .insert(comment)
      .select()
      .single();

    if (error) {
      console.log("comment error: ", error);
      return { success: false, msg: "Could not create your comment" };
    }
    return { success: true, data: data };
  } catch (error) {
    console.log("comment error: ", error);
    return { success: false, msg: "Could not create your comment" };
  }
};

export const removeComment = async (commentId) => {
  try {
    const { error } = await supabase
      .from("pollComments")
      .delete()
      .eq("id", commentId);

    if (error) {
      console.log("removeComment error: ", error);
      return { success: false, msg: "Could not remove the comment" };
    }
    return { success: true, data: { commentId } };
  } catch (error) {
    console.log("removeComment error: ", error);
    return { success: false, msg: "Could not remove the comment" };
  }
};

export const removePoll = async (pollId) => {
  try {
    const { error } = await supabase.from("polls").delete().eq("id", pollId);

    if (error) {
      console.log("removePoll error: ", error);
      return { success: false, msg: "Could not remove the poll" };
    }
    return { success: true, data: { pollId } };
  } catch (error) {
    console.log("removePoll error: ", error);
    return { success: false, msg: "Could not remove the poll" };
  }
};

export const createPollAnswer = async (answer) => {
  try {
    const { data, error } = await supabase
      .from("pollAnswers")
      .insert(answer)
      .select()
      .single();

    if (error) {
      console.log("Poll answer error: ", error);
      return { success: false, msg: "Could not record your answer" };
    }
    return { success: true, data: data };
  } catch (error) {
    console.log("Poll answer error: ", error);
    return { success: false, msg: "Could not record your answer" };
  }
};

export const fetchPollsByUser = async (userId, limit = 10) => {
  try {
    const { data, error } = await supabase
      .from("polls")
      .select(`
          *,
          user: users ( id, pseudonyme, image ),
          pollAnswers (*),
          pollComments (count)
        `)
      .eq("userId", userId)

    if (error) {
      console.log("fetchPollsByUser error: ", error);
      return { success: false, msg: "Could not fetch the user's polls" };
    }
    return { success: true, data: data };
  } catch (error) {
    console.log("fetchPollsByUser error: ", error);
    return { success: false, msg: "Could not fetch the user's polls" };
  }
};

export const createPollLike= async (like) => {
  try {
    const { data, error } = await supabase
      .from("pollLikes")
      .insert(like)
      .select()
      .single();

    if (error) {
      console.log("Poll answer error: ", error);
      return { success: false, msg: "Could not record your answer" };
    }
    return { success: true, data: data };
  } catch (error) {
    console.log("Poll answer error: ", error);
    return { success: false, msg: "Could not record your answer" };
  }
};
