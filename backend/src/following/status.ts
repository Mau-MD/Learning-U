import Parse from "parse/node";

export const setStatus = async (
  user: Parse.User<Parse.Attributes>,
  status: string
) => {
  try {
    const userStatus = await findStatusByUser(user);

    if (userStatus.length === 0) {
      return await createStatus(user, status);
    }

    userStatus[0].set("status", status);
    return await userStatus[0].save();
  } catch (err) {
    throw new Error(err.message);
  }
};

export const findStatusByUser = async (user: Parse.User<Parse.Attributes>) => {
  const Status = Parse.Object.extend("Status");
  const query = new Parse.Query(Status);
  query.equalTo("user", user);
  try {
    return await query.find();
  } catch (err) {
    throw new Error(err.message);
  }
};

export const createStatus = async (
  user: Parse.User<Parse.Attributes>,
  status: string
) => {
  const Status = new Parse.Object("Status");
  Status.set("status", status);
  Status.set("user", user);
  try {
    return await Status.save();
  } catch (err) {
    throw new Error(err.message);
  }
};

export const findStatusByMultipleUsers = async (
  users: Parse.Object<Parse.Attributes>[]
) => {
  const Status = Parse.Object.extend("Status");
  const query = new Parse.Query(Status);
  query.containedIn("user", users);
  query.includeAll();
  try {
    return await query.find();
  } catch (err) {
    throw new Error(err.message);
  }
};
