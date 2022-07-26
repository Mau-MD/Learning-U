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
