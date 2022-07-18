import {
  getDateScore,
  getDateXLikes,
  getDaysSincePublished,
  getExternalRanking,
  getRawExternalRanking,
  getUseOfChapters,
  WEIGHTS,
} from "./ranking";

test("weights should throw an error if weights are incorrect", () => {
  expect(WEIGHTS.weight1 + WEIGHTS.weight2).toBe(100);
  expect(WEIGHTS.weight3 + WEIGHTS.weight4).toBe(100);
  expect(WEIGHTS.weight5 + WEIGHTS.weight6).toBe(100);
});

test("should return the days that have passed since then, given an ISO Date", () => {
  const publishedAt = "2018-07-16T16:51:44Z";
  expect(getDaysSincePublished(publishedAt)).toBe(1456);
  expect(getDaysSincePublished(new Date().toISOString())).toBe(0);
});

test("should return if a video has chapters or not", () => {
  const descriptionWithChapters =
    "eact JS Tutorial - Get up & running with React JS: the most popular JavaScript library in the world! \n- Want to master React? Get my React mastery course: http://bit.ly/2KVl2A3\n- Subscribe for more videos like this: https://goo.gl/6PYaGF\n\nWant to learn more from me? Check out my blog and courses: \n\nCourses: https://codewithmosh.com\nBlog: https://programmingwithmosh.com \nFacebook: https://www.facebook.com/programmingwithmosh/\nTwitter: https://twitter.com/moshhamedani\n\nTABLE OF CONTENT\n\n00:00 Introduction\n01:14 What is React\n05:48 Setting Up the Development Environment \n09:27 Your First React App\n16:03 Hello World\n22:26 Components\n24:06 Setting Up the Project\n26:15 Your First React Component\n31:38 Specifying Children\n35:56 Embedding Expressions\n40:49 Setting Attributes\n46:36 Rendering Classes Dynamically\n50:57 Rendering Lists\n54:58 Conditional Rendering\n1:01:04 Handling Events\n1:03:56 Binding Event Handlers\n1:08:34 Updating the State\n1:10:51 What Happens When State Changes \n1:12:58 Passing Event Arguments\n1:17:31 Composing Components\n1:21:18 Passing Data to Components\n1:24:31 Passing Children\n1:27:44 Debugging React Apps\n1:31:55 Props vs State\n1:34:22 Raising and Handling Events\n1:39:16 Updating the State\n1:43:57 Single Source of Truth\n1:47:55 Removing the Local State\n1:54:44 Multiple Components in Sync \n2:00:39 Lifting the State Up\n2:06:18 Stateless Functional Components\n2:08:49 Destructuring Arguments\n2:10:52 Lifecycle Hooks\n2:12:32 Mounting Phase \n2:18:09 Updating Phase \n2:22:31 Unmounting Phase\n\n#react #webdevelopment #programming";

  const descriptionWithoutChapters =
    "🚨 IMPORTANT:\n\nFull React Course: https://courses.webdevsimplified.com/learn-react-today\n\nIn this video I will be covering all of the basics of React in only 30 minutes. We will cover create-react-app, components, state, props, rendering, event handling, and so much more. By the end of this video you will have a full understanding of the basics of React, but if you want to take your React knowledge to the next level checkout my full React course linked above for the best React learning experience on the web.\n\n\n📚 Materials/References:\n\nHow To Install Node.js: https://youtu.be/VShtPwEkDD0\nDestructoring Video: https://youtu.be/NIq3qLaHCIs\nGitHub Code: https://github.com/WebDevSimplified/Learn-React-In-30-Minutes\n\n\n🧠 Concepts Covered:\n\n- React function components\n- React hooks\n- State management in React\n- Prop drilling\n- How to use create-react-app\n\n\n🌎 Find Me Here:\n\nMy Courses: https://courses.webdevsimplified.com\nPatreon: https://www.patreon.com/WebDevSimplified\nTwitter: https://twitter.com/DevSimplified\nDiscord: https://discord.gg/7StTjnR\nGitHub: https://github.com/WebDevSimplified\nCodePen: https://codepen.io/WebDevSimplified\n\n\n#Reactjs #WDS #JavaScript";

  expect(getUseOfChapters(descriptionWithChapters)).toBe(1);
  expect(getUseOfChapters(descriptionWithoutChapters)).toBe(0);
});

test("should get the relation between date and likes", () => {
  const likes1 = 50;
  const daysSincePublished1 = 10;

  expect(getDateXLikes(likes1, daysSincePublished1)).toBe(5);

  const likes2 = 433442;
  const daysSincePublished2 = 433.442;
  expect(getDateXLikes(likes2, daysSincePublished2)).toBe(1000);
});

test("should get the relation between date and views", () => {
  const views1 = 5040;
  const daysSincePublished1 = 10;

  expect(getDateXLikes(views1, daysSincePublished1)).toBe(504);

  const views2 = 433442;
  const daysSincePublished2 = 433.442;
  expect(getDateXLikes(views2, daysSincePublished2)).toBe(1000);
});

test("should get a score based on how old a video is", () => {
  expect(getDateScore(0)).toBe(10);
  expect(getDateScore(1)).toBe(9.4);
  expect(getDateScore(4.5)).toBe(2.7102788505282014);
});
