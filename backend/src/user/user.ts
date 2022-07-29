import Parse from "parse/node";

export const getUserById = async (userId: string) => {
  const User = Parse.Object.extend("User");
  const query = new Parse.Query(User);

  query.equalTo("objectId", userId);
  query.select("username", "email");
  return await query.first();
};

export const getUserByUsername = async (username: string) => {
  const User = Parse.Object.extend("User");
  const query = new Parse.Query(User);

  query.equalTo("username", username);
  return await query.first();
};
