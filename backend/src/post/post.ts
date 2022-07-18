import Parse from "parse/node";

export const createPost = (
  content: string,
  userId: string,
  courseId?: string | undefined
) => {
  const Post = new Parse.Object("Post");

  Post.set("content", content);
  Post.set("user", userId);

  if (courseId) {
    Post.set("course", courseId);
  }

  return Post;
};
