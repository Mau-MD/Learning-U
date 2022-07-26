import { IResource } from "../types/resource";

export const calculateCourseCompletition = (resources: IResource[]) => {
  let totalCompleted = 0;
  let totalInProgress = 0;

  for (const resource of resources) {
    if (resource.status === "completed") totalCompleted++;
    if (resource.status === "in progress") totalInProgress++;
  }

  return ((totalCompleted + 0.5 * totalInProgress) / resources.length) * 100;
};
