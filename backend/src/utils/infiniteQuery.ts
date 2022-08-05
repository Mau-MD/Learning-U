import { RequestWUser } from "../types/user";

export const getInfiniteQueryParams = (req: RequestWUser) => {
  const { limit, skip, query } = req.query;

  if (
    !limit ||
    typeof limit !== "string" ||
    !skip ||
    typeof skip !== "string" ||
    typeof query !== "string"
  ) {
    throw new Error("Missing parameters");
  }
  return { limit, skip, query };
};
