import Parse from "parse/node";
import { updateFeedback } from "../feedback/feedback";

export const followUser = async (
  currUser: Parse.User<Parse.Attributes>,
  username: string
) => {
  const Follower = new Parse.Object("Following");

  try {
    const targetUser = await findUserByUsername(username);

    if (!targetUser) {
      throw new Error("User does not exist");
    }

    const alreadyFollowing = await checkIfAlreadyFollow(currUser, targetUser);
    if (alreadyFollowing) {
      throw new Error("You already follow that user");
    }

    Follower.set("user", currUser);
    Follower.set("target", targetUser);

    return Follower;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const unfollowUser = async (
  currUser: Parse.User<Parse.Attributes>,
  userId: string
) => {
  const Follower = Parse.Object.extend("Following");

  const User = new Parse.User();
  User.id = currUser.id;
  const TargetUser = new Parse.User();
  TargetUser.id = userId;

  const query = new Parse.Query(Follower);

  query.equalTo("user", User);
  query.equalTo("target", TargetUser);

  try {
    const followingObject = await query.first();

    if (!followingObject) throw new Error("You are not following that user");

    return await followingObject.destroy();
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getFollowersAsUserObjects = async (
  user: Parse.User<Parse.Attributes>
) => {
  try {
    const followersObject = await getFollowers(user);
    return followersObject.map((follower) => {
      return follower.get("target");
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getFollowers = async (user: Parse.User<Parse.Attributes>) => {
  const Following = Parse.Object.extend("Following");
  const query = new Parse.Query(Following);

  query.equalTo("user", user);
  try {
    return await query.find();
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getFollowersIds = async (user: Parse.User<Parse.Attributes>) => {
  try {
    const followersObject = await getFollowers(user);
    return followersObject.map((follow) => {
      const followJson = follow.toJSON();
      return followJson.target.objectId;
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const findUserByUsername = async (username: string) => {
  const User = Parse.Object.extend("User");
  const query = new Parse.Query(User);
  query.equalTo("username", username);
  try {
    return await query.first();
  } catch (err) {
    throw new Error(err.message);
  }
};

export const checkIfAlreadyFollow = async (
  user: Parse.User<Parse.Attributes>,
  targetUser: Parse.Object<Parse.Attributes>
) => {
  const Following = Parse.Object.extend("Following");
  const query = new Parse.Query(Following);

  query.equalTo("user", user);
  query.equalTo("target", targetUser);
  try {
    return await query.first();
  } catch (err) {
    throw new Error(err.message);
  }
};
