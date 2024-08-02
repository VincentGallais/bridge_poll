import { supabase } from "../lib/supabase";

export const createPoll = async ({body, choices, userId, visibility, category}) => {
  try {
    const { data, error } = await supabase
      .from("polls")
      .insert([{ body, choices, userId, visibility, category}])
      .select();

    if (error) {
      console.log("createPost error: ", error);
      return { success: false, msg: "Could not create your poll" };
    }
    return { success: true, data: data };
  } catch (error) {
    console.log("createPost error: ", error);
    return { success: false, msg: "Could not create your poll" };
  }
};

export const fetchPosts = async (limit = 10) => {
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
      console.log("fetchPosts error: ", error);
      return { success: false, msg: "Could not fetch the polls" };
    }
    return { success: true, data: data };
  } catch (error) {
    console.log("fetchPosts error: ", error);
    return { success: false, msg: "Could not fetch the polls" };
  }
};

export const fetchPostDetails = async (postId) => {
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
      .eq("id", postId)
      .order("created_at", { ascending: false, foreignTable: "pollComments" })
      .single();

    if (error) {
      console.log("postDetails error: ", error);
      return { success: false, msg: "Could not fetch the post" };
    }
    return { success: true, data: data };
  } catch (error) {
    console.log("postDetails error: ", error);
    return { success: false, msg: "Could not fetch the post" };
  }
};

export const createPostLike = async (postLike) => {
  try {
    const { data, error } = await supabase
      .from("pollAnswers")
      .insert(postLike)
      .select()
      .single();

    if (error) {
      console.log("postLike error: ", error);
      return { success: false, msg: "Could not like this post" };
    }
    return { success: true, data: data };
  } catch (error) {
    console.log("postLike error: ", error);
    return { success: false, msg: "Could not like this post" };
  }
};

export const removePostLike = async (postId, userId) => {
  try {
    const { error } = await supabase
      .from("pollAnswers")
      .delete()
      .eq("userId", userId)
      .eq("pollId", postId);

    if (error) {
      console.log("postLike error: ", error);
      return { success: false, msg: "Could not remove post like" };
    }
    return { success: true, data: { postId, userId } };
  } catch (error) {
    console.log("postLike error: ", error);
    return { success: false, msg: "Could not remove post like" };
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

export const removePost = async (pollId) => {
  try {
    const { error } = await supabase.from("polls").delete().eq("id", pollId);

    if (error) {
      console.log("removePost error: ", error);
      return { success: false, msg: "Could not remove the post" };
    }
    return { success: true, data: { pollId } };
  } catch (error) {
    console.log("removePost error: ", error);
    return { success: false, msg: "Could not remove the post" };
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

export const fetchPostsByUser = async (userId, limit = 10) => {
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
      console.log("fetchPostsByUser error: ", error);
      return { success: false, msg: "Could not fetch the user's polls" };
    }
    return { success: true, data: data };
  } catch (error) {
    console.log("fetchPostsByUser error: ", error);
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
