import Parse from "parse/node";

export const createPost = (
  content: string,
  user: Parse.User<Parse.Attributes>,
  courseId?: string | undefined
) => {
  const Post = new Parse.Object("Post");

  Post.set("content", content);
  Post.set("user", user);

  if (courseId) {
    Post.set("course", courseId);
  }

  return Post;
};
