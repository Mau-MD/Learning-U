import { ResourceStatus } from "../types/enums";
import { IResource } from "../types/resource";

export const calculateCourseCompletition = (resources: IResource[]) => {
  let totalCompleted = 0;
  let totalInProgress = 0;

  for (const resource of resources) {
    if (resource.status === ResourceStatus.Completed) totalCompleted++;
    if (resource.status === ResourceStatus.InProgress) totalInProgress++;
  }

  return ((totalCompleted + 0.5 * totalInProgress) / resources.length) * 100;
};
