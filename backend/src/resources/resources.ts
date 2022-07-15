import { IResource } from "../types/resource";
import Parse from "parse/node";

export const createResource = (resource: IResource) => {
  const Resource: Parse.Object = new Parse.Object("Resource");

  Object.keys(resource).forEach((resourceAttribute) => {
    Resource.set(resourceAttribute, resource[resourceAttribute]);
  });

  return Resource;
};

export const getResourcesFromCourse = async (courseId: string) => {
  const Resource = Parse.Object.extend("Resource");
  const Course = Parse.Object.extend("Course");

  const query = new Parse.Query(Resource);

  const course = new Course();
  course.id = courseId;

  query.equalTo("course", course);

  const resources = await query.findAll();
  return resources;
};

export const getResourcesFromCourseAndDifficulty = async (
  courseId: string,
  level: number
) => {
  const Resource = Parse.Object.extend("Resource");
  const Course = Parse.Object.extend("Course");

  const query = new Parse.Query(Resource);

  const course = new Course();
  course.id = courseId;

  query.equalTo("course", course);
  query.equalTo("level", level);

  const resources = await query.findAll();
  return resources;
};