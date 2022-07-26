import Parse from "parse/node";

export const followUser = (
  currUser: Parse.User<Parse.Attributes>,
  targetUserId: string
) => {
  const Follower = new Parse.Object("Following");

  const targetUser = new Parse.User();
  targetUser.set("objectId", targetUserId);

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
