import Parse from "parse/node";

export const setStatus = async (
  user: Parse.User<Parse.Attributes>,
  status: string
) => {
  const userStatus = await findStatusByUser(user);

  if (userStatus.length === 0) {
    return await createStatus(user, status);
  }

  userStatus[0].set("status", status);
  return await userStatus[0].save();
};

export const findStatusByUser = async (user: Parse.User<Parse.Attributes>) => {
  const Status = Parse.Object.extend("Status");
  const query = new Parse.Query(Status);
  query.equalTo("user", user);
  return await query.find();
};

export const createStatus = async (
  user: Parse.User<Parse.Attributes>,
  status: string
) => {
  const Status = new Parse.Object("Status");
  Status.set("status", status);
  Status.set("user", user);
  return await Status.save();
};

export const findStatusByMultipleUsers = async (
  users: Parse.User<Parse.Attributes>[]
) => {
  const Status = Parse.Object.extend("Status");
  const query = new Parse.Query(Status);
  query.containsAll("user", users);
  return await query.findAll();
};
