/**
 *
 * Suggestions Algorithm
 * This algorithm suggests courses based on how frequent they are. This is based on the user's following list
 *
 * First, it gets all the courses the people you follow are enrolled in, including yourself (this would be neccesary later on)
 * Then, it groups all these courses using a dictionary, to get its frequency. This is not as straightfoward as it sounds, since the users are
 * able to create courses without any restrictions. For example, a user can create a React Course by naming it: React, React JS, React.js, React Javascript, etc. All these examples should be considered the same. For that we use a stringSimilarity() function that returns a score, if that score is above certain threshold, then it's considered the same.
 * Now, to avoid suggesting courses that the user already have. When we are grouping the courses, we check if any of those courses are created by the user, and if so, we delete the entire dictionary key and it's elements, so that way, all elements get deleted, and if we try to add a new one, we would check if that key exists before trying to add it, and if it doesn't exist, we just don't add it. That way we can get rid of duplicated content.
 *
 * **/

import Parse from "parse/node";
import { getUserCourses } from "../course/course";
import { getFollowersAsUserObjects } from "../following/following";
import { getResourcesFromCourseAndDifficulty } from "../resources/resources";
import { ParseJson } from "../types/global";
import { parseObjectsToJson, parseObjectToJson } from "../utils/parseToJason";
import { getStringSimilarity } from "../utils/similarity";

export interface GroupedFrequency {
  courseName: string;
  frequency: number;
}

export const getSuggestions = async (user: Parse.User<Parse.Attributes>) => {
  try {
    const followingCourses = await getCoursesFromFollowers(user);
    const followingCoursesJson = parseObjectsToJson(followingCourses);
    const groupedSimilarCourses = groupSimilarCourses(
      followingCoursesJson,
      user
    );
    const groupedCoursesWithFrequency = mapCoursesToFrequency(
      groupedSimilarCourses
    );
    return groupedCoursesWithFrequency;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getCoursesFromFollowers = async (
  user: Parse.User<Parse.Attributes>
) => {
  try {
    const followers = await getFollowersAsUserObjects(user);

    const Course = Parse.Object.extend("Course");
    const query = new Parse.Query(Course);

    // We also need to look for user courses, since that would be used later when discarding repeated suggested courses
    query.containedIn("user", [user, ...followers]);
    query.select("name");
    query.select("user");

    const followingCourses = await query.find();
    return followingCourses;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const groupSimilarCourses = (
  courses: ParseJson[],
  user: Parse.User<Parse.Attributes>
) => {
  const SIMILARITY_TRESHOLD = 0.4;

  // sort courses by name
  courses.sort((a, b) => b.name - a.name);

  const groupedCourses: { [key: string]: ParseJson[] } = {};
  const visited: boolean[] = new Array(courses.length).fill(false);

  for (let i = 0; i < courses.length; i++) {
    if (visited[i]) continue;
    visited[i] = true;

    // Ensuring the user doesn't have the course that is going to be suggested
    if (courses[i].user.objectId === user.id) {
      continue;
    }

    const currDictKey = courses[i].name;
    groupedCourses[currDictKey] = [courses[i]]; // init array

    for (let j = i + 1; j < courses.length; j++) {
      if (visited[j]) continue;

      if (
        getStringSimilarity(currDictKey, courses[j].name) >= SIMILARITY_TRESHOLD
      ) {
        visited[j] = true;

        // In case we find a course the user already have, we delete the key so no new elements get added
        if (courses[j].user.objectId === user.id) {
          delete groupedCourses[currDictKey];
          continue;
        }
        // if this goes true, that means that that key shouldn't exist, since the user already have that course
        if (!groupedCourses[currDictKey]) continue;

        groupedCourses[currDictKey].push(courses[j]);
      }
    }
  }

  return groupedCourses;
};

export const mapCoursesToFrequency = (groupedCourses: {
  [key: string]: ParseJson[];
}): GroupedFrequency[] => {
  const coursesWithLength = Object.keys(groupedCourses).map((courseName) => {
    return { courseName, frequency: groupedCourses[courseName].length };
  });
  return coursesWithLength.sort((a, b) => b.frequency - a.frequency);
};
