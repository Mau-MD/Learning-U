import Parse from "parse/node";

export const getLikesUser = async (
  user: Parse.Object<Parse.Attributes>,
  course: Parse.Object<Parse.Attributes>
) => {
  const LikesUser = Parse.Object.extend("LikeUser");
  const query = new Parse.Query(LikesUser);
  query.equalTo("user", user);
  query.equalTo("course", course);
  return await query.first();
};

export const incrementCourseLikes = async (
  course: Parse.Object<Parse.Attributes>,
  amount: number
) => {
  course.increment("likes", amount);
  return await course.save();
};
