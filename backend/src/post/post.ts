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

export const getPostsByUser = async (userId: string) => {
  const Post = Parse.Object.extend("Post");
  const User = Parse.Object.extend("User");

  const query = new Parse.Query(Post);

  const user = new User();
  user.id = userId;

  query.equalTo("user", user);
  query.includeAll();
  query.select(["user.username", "createdAt", "content"]);
  return await query.findAll();
};
