import { useEffect, useState } from "react";
import { IUser } from "../types/user";

export const persistUser = (user: IUser) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getCachedUser = (): { user: IUser } | null => {
  const userString = localStorage.getItem("user");
  if (!userString) return null;
  return JSON.parse(userString);
};

export const deleteCachedUser = () => {
  localStorage.removeItem("user");
};

export const useSession = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    setIsFetching(true);
    const cachedUser = getCachedUser();
    if (!cachedUser) {
      setIsFetching(false);
      return;
    }
    setUser(cachedUser.user);
    setIsFetching(false);
  };

  return { user, fetchUser, isFetching };
};

export const getConfig = (token: string) => {
  return {
    headers: { Authorization: token },
  };
};
