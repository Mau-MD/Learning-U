import { useEffect, useState } from "react";
import { IUser } from "../types/user";

export const persistUser = (user: IUser) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getCachedUser = (): IUser | null => {
  const userString = localStorage.get("user");
  if (!userString) return null;
  return JSON.parse(userString) as IUser;
};

export const deleteCachedUser = () => {
  localStorage.removeItem("user");
};

export const useSession = () => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    const cachedUser = getCachedUser();
    if (!cachedUser) return;
    setUser(cachedUser);
  };

  return { user, fetchUser };
};
