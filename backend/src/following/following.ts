import Parse from "parse/node";
import { updateFeedback } from "../feedback/feedback";

export const followUser = async (
  currUser: Parse.User<Parse.Attributes>,
  username: string
) => {
  const Follower = new Parse.Object("Following");

  const targetUser = await findUserByUsername(username);

  if (!targetUser) {
    throw new Error("User does not exist");
  }

  Follower.set("user", currUser);
  Follower.set("target", targetUser);

  return Follower;
};

export const getFollowers = async (user: Parse.User<Parse.Attributes>) => {
  const Following = Parse.Object.extend("Following");
  const query = new Parse.Query(Following);

  query.equalTo("user", user);
  return await query.find();
};

export const getFollowersIds = async (user: Parse.User<Parse.Attributes>) => {
  const followersObject = await getFollowers(user);
  return followersObject.map((follow) => {
    const followJson = follow.toJSON();
    return followJson.target.objectId;
  });
};

export const findUserByUsername = async (username: string) => {
  const User = Parse.Object.extend("User");
  const query = new Parse.Query(User);
  query.equalTo("username", username);
  return await query.first();
};
