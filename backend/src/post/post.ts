import Parse from "parse/node";
import { getFollowersAsUserObjects } from "../following/following";

export const createPost = (
  content: string,
  user: Parse.User<Parse.Attributes>,
  courseId?: string | undefined
) => {
  const Post = new Parse.Object("Post");

  Post.set("content", content);
  Post.set("user", user);

  if (courseId) {
    const Course = new Parse.Object("Course");
    Course.set("objectId", courseId);
    Post.set("course", Course);
  }

  return Post;
};

export const getPostsByUser = async (
  userId: string,
  limit: number,
  skip: number
) => {
  const Post = Parse.Object.extend("Post");
  const User = Parse.Object.extend("User");

  const query = new Parse.Query(Post);

  const user = new User();
  user.id = userId;

  query.equalTo("user", user);
  query.descending("createdAt");
  query.skip(skip);
  query.limit(limit);
  query.includeAll();
  return await query.find();
};

export const getPostsByUsername = async (
  username: string,
  limit: number,
  skip: number
) => {
  const Post = Parse.Object.extend("Post");

  const query = new Parse.Query(Post);
  const user = await getUserByUsername(username);

  query.equalTo("user", user);
  query.descending("createdAt");
  query.skip(skip);
  query.limit(limit);
  query.includeAll();
  return await query.find();
};

export const getFollowingPosts = async (
  user: Parse.User<Parse.Attributes>,
  limit: number,
  skip: number
) => {
  const Post = Parse.Object.extend("Post");

  const query = new Parse.Query(Post);
  const followers = await getFollowersAsUserObjects(user);
  const allPosts = [user, ...followers];

  query.containedIn("user", allPosts);
  query.descending("createdAt");
  query.skip(skip);
  query.limit(limit);
  query.includeAll();
  return await query.find();
};

export const getUserByUsername = async (username: string) => {
  const User = Parse.Object.extend("User");
  const query = new Parse.Query(User);

  query.equalTo("username", username);
  return await query.first();
};
