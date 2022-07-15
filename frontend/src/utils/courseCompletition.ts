import { IResource } from "../types/resource";

export const calculateCourseCompletition = (resources: IResource[]) => {
  let totalCompleted = 0;
  for (const resource of resources) {
    if (resource.status === "completed") totalCompleted++;
  }
  return totalCompleted / resources.length;
};
