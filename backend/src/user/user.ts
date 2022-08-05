import Parse from "parse/node";

export const getUserById = async (userId: string) => {
  const User = Parse.Object.extend("User");
  const query = new Parse.Query(User);

  query.equalTo("objectId", userId);
  query.select("username", "email");
  try {
    return await query.first();
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getUserByUsername = async (username: string) => {
  const User = Parse.Object.extend("User");
  const query = new Parse.Query(User);

  query.equalTo("username", username);
  try {
    return await query.first();
  } catch (err) {
    throw new Error(err.message);
  }
};
