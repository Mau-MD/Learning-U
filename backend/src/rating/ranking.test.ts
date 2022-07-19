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
  expect(WEIGHTS.w1 + WEIGHTS.w2).toBe(100);
  expect(WEIGHTS.w3 + WEIGHTS.w4).toBe(100);
  expect(WEIGHTS.w5 + WEIGHTS.w6).toBe(100);
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

test("it should get the final score of a series of videos", () => {
  const videosToRank = [
    {
      kind: "youtube#video",
      etag: "4PNSIKu_HYYjG5LknxySq9j2wQE",
      id: "Ke90Tje7VS0",
      snippet: {
        publishedAt: "2018-07-16T16:51:44Z",
        channelId: "UCWv7vMbMWH4-V0ZXdmDpPBA",
        title: "React JS - React Tutorial for Beginners",
        description:
          "React JS Tutorial - Get up & running with React JS: the most popular JavaScript library in the world! \n- Want to master React? Get my React mastery course: http://bit.ly/2KVl2A3\n- Subscribe for more videos like this: https://goo.gl/6PYaGF\n\nWant to learn more from me? Check out my blog and courses: \n\nCourses: https://codewithmosh.com\nBlog: https://programmingwithmosh.com \nFacebook: https://www.facebook.com/programmingwithmosh/\nTwitter: https://twitter.com/moshhamedani\n\nTABLE OF CONTENT\n\n00:00 Introduction\n01:14 What is React\n05:48 Setting Up the Development Environment \n09:27 Your First React App\n16:03 Hello World\n22:26 Components\n24:06 Setting Up the Project\n26:15 Your First React Component\n31:38 Specifying Children\n35:56 Embedding Expressions\n40:49 Setting Attributes\n46:36 Rendering Classes Dynamically\n50:57 Rendering Lists\n54:58 Conditional Rendering\n1:01:04 Handling Events\n1:03:56 Binding Event Handlers\n1:08:34 Updating the State\n1:10:51 What Happens When State Changes \n1:12:58 Passing Event Arguments\n1:17:31 Composing Components\n1:21:18 Passing Data to Components\n1:24:31 Passing Children\n1:27:44 Debugging React Apps\n1:31:55 Props vs State\n1:34:22 Raising and Handling Events\n1:39:16 Updating the State\n1:43:57 Single Source of Truth\n1:47:55 Removing the Local State\n1:54:44 Multiple Components in Sync \n2:00:39 Lifting the State Up\n2:06:18 Stateless Functional Components\n2:08:49 Destructuring Arguments\n2:10:52 Lifecycle Hooks\n2:12:32 Mounting Phase \n2:18:09 Updating Phase \n2:22:31 Unmounting Phase\n\n#react #webdevelopment #programming",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/Ke90Tje7VS0/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/Ke90Tje7VS0/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/Ke90Tje7VS0/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Programming with Mosh",
        tags: [
          "react js",
          "react tutorial",
          "learn react",
          "react course",
          "reactjs tutorial",
          "react crash course",
          "react js tutorial",
          "reactjs course",
          "react tutorial for beginners",
          "react.js",
          "reactjs tutorial for beginners",
          "reactJS",
          "react",
          "learn reactjs",
          "tutorial",
          "javascript",
          "crash course",
          "programming with mosh",
          "code with mosh",
          "web development",
          "mosh hamedani",
          "learn react js",
        ],
        categoryId: "22",
        liveBroadcastContent: "none",
        localized: {
          title: "React JS - React Tutorial for Beginners",
          description:
            "React JS Tutorial - Get up & running with React JS: the most popular JavaScript library in the world! \n- Want to master React? Get my React mastery course: http://bit.ly/2KVl2A3\n- Subscribe for more videos like this: https://goo.gl/6PYaGF\n\nWant to learn more from me? Check out my blog and courses: \n\nCourses: https://codewithmosh.com\nBlog: https://programmingwithmosh.com \nFacebook: https://www.facebook.com/programmingwithmosh/\nTwitter: https://twitter.com/moshhamedani\n\nTABLE OF CONTENT\n\n00:00 Introduction\n01:14 What is React\n05:48 Setting Up the Development Environment \n09:27 Your First React App\n16:03 Hello World\n22:26 Components\n24:06 Setting Up the Project\n26:15 Your First React Component\n31:38 Specifying Children\n35:56 Embedding Expressions\n40:49 Setting Attributes\n46:36 Rendering Classes Dynamically\n50:57 Rendering Lists\n54:58 Conditional Rendering\n1:01:04 Handling Events\n1:03:56 Binding Event Handlers\n1:08:34 Updating the State\n1:10:51 What Happens When State Changes \n1:12:58 Passing Event Arguments\n1:17:31 Composing Components\n1:21:18 Passing Data to Components\n1:24:31 Passing Children\n1:27:44 Debugging React Apps\n1:31:55 Props vs State\n1:34:22 Raising and Handling Events\n1:39:16 Updating the State\n1:43:57 Single Source of Truth\n1:47:55 Removing the Local State\n1:54:44 Multiple Components in Sync \n2:00:39 Lifting the State Up\n2:06:18 Stateless Functional Components\n2:08:49 Destructuring Arguments\n2:10:52 Lifecycle Hooks\n2:12:32 Mounting Phase \n2:18:09 Updating Phase \n2:22:31 Unmounting Phase\n\n#react #webdevelopment #programming",
        },
        defaultAudioLanguage: "en",
      },
      contentDetails: {
        duration: "PT2H25M27S",
        dimension: "2d",
        definition: "hd",
        caption: "false",
        licensedContent: true,
        contentRating: {},
        projection: "rectangular",
      },
      statistics: {
        viewCount: "5002487",
        likeCount: "79120",
        favoriteCount: "0",
        commentCount: "4793",
      },
    },
    {
      kind: "youtube#video",
      etag: "YQnZv7l0ezWokaM0Vk0v6lRMl1I",
      id: "hQAHSlTtcmY",
      snippet: {
        publishedAt: "2019-10-22T16:00:07Z",
        channelId: "UCFbNIlppjAuEX4znoulh0Cw",
        title: "Learn React In 30 Minutes",
        description:
          "🚨 IMPORTANT:\n\nFull React Course: https://courses.webdevsimplified.com/learn-react-today\n\nIn this video I will be covering all of the basics of React in only 30 minutes. We will cover create-react-app, components, state, props, rendering, event handling, and so much more. By the end of this video you will have a full understanding of the basics of React, but if you want to take your React knowledge to the next level checkout my full React course linked above for the best React learning experience on the web.\n\n\n📚 Materials/References:\n\nHow To Install Node.js: https://youtu.be/VShtPwEkDD0\nDestructoring Video: https://youtu.be/NIq3qLaHCIs\nGitHub Code: https://github.com/WebDevSimplified/Learn-React-In-30-Minutes\n\n\n🧠 Concepts Covered:\n\n- React function components\n- React hooks\n- State management in React\n- Prop drilling\n- How to use create-react-app\n\n\n🌎 Find Me Here:\n\nMy Courses: https://courses.webdevsimplified.com\nPatreon: https://www.patreon.com/WebDevSimplified\nTwitter: https://twitter.com/DevSimplified\nDiscord: https://discord.gg/7StTjnR\nGitHub: https://github.com/WebDevSimplified\nCodePen: https://codepen.io/WebDevSimplified\n\n\n#Reactjs #WDS #JavaScript",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/hQAHSlTtcmY/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/hQAHSlTtcmY/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/hQAHSlTtcmY/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/hQAHSlTtcmY/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/hQAHSlTtcmY/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "Web Dev Simplified",
        tags: [
          "webdevsimplified",
          "learn react in 30 minutes",
          "learn react",
          "react tutorial",
          "react crash course",
          "react js tutorial",
          "react js",
          "reactjs",
          "reactjs tutorial",
          "reactjs crash course",
          "learn reactjs",
          "learn react js",
          "react js project",
          "react js todo app",
          "react js tutorial for beginners",
          "react crash course 2019",
          "react crash course tutorial",
          "react hooks tutorial",
          "react hooks for beginners",
          "react component tutorial",
          "react components",
          "reactjs hooks",
          "reactjs hook tutorial",
          "reactjs hooks project",
        ],
        categoryId: "27",
        liveBroadcastContent: "none",
        localized: {
          title: "Learn React In 30 Minutes",
          description:
            "🚨 IMPORTANT:\n\nFull React Course: https://courses.webdevsimplified.com/learn-react-today\n\nIn this video I will be covering all of the basics of React in only 30 minutes. We will cover create-react-app, components, state, props, rendering, event handling, and so much more. By the end of this video you will have a full understanding of the basics of React, but if you want to take your React knowledge to the next level checkout my full React course linked above for the best React learning experience on the web.\n\n\n📚 Materials/References:\n\nHow To Install Node.js: https://youtu.be/VShtPwEkDD0\nDestructoring Video: https://youtu.be/NIq3qLaHCIs\nGitHub Code: https://github.com/WebDevSimplified/Learn-React-In-30-Minutes\n\n\n🧠 Concepts Covered:\n\n- React function components\n- React hooks\n- State management in React\n- Prop drilling\n- How to use create-react-app\n\n\n🌎 Find Me Here:\n\nMy Courses: https://courses.webdevsimplified.com\nPatreon: https://www.patreon.com/WebDevSimplified\nTwitter: https://twitter.com/DevSimplified\nDiscord: https://discord.gg/7StTjnR\nGitHub: https://github.com/WebDevSimplified\nCodePen: https://codepen.io/WebDevSimplified\n\n\n#Reactjs #WDS #JavaScript",
        },
        defaultAudioLanguage: "en-US",
      },
      contentDetails: {
        duration: "PT27M16S",
        dimension: "2d",
        definition: "hd",
        caption: "false",
        licensedContent: true,
        contentRating: {},
        projection: "rectangular",
      },
      statistics: {
        viewCount: "804244",
        likeCount: "18124",
        favoriteCount: "0",
        commentCount: "1220",
      },
    },
  ];

  const finalScore = getExternalRanking(videosToRank);

  const video1ExpectedResult = {
    ...videosToRank[0],
    raw_score: {
      date: 4.480069005095963,
      dateXViews: 1254057.5240384615,
      dateXLikes: 54.34065934065934,
      useOfChapters: 1,
    },
    normalized_score: {
      date: 0.4480069005095963,
      dateXLikes: 1,
      dateXViews: 1,
      useOfChapters: 1,
    },
    weighted_score: {
      date: 26.88041403057578,
      dateXLikes: 40,
      dateXViews: 100,
      useOfChapters: 100,
    },
    final_score: 83.44020701528788,
  };

  const video2ExpectedResult = {
    ...videosToRank[1],
    raw_score: {
      date: 7.408149936492211,
      dateXViews: 295618.3887210473,
      dateXLikes: 18.25176233635448,
      useOfChapters: 0,
    },
    normalized_score: {
      date: 0.7408149936492211,
      dateXLikes: 0.33587671842431904,
      dateXViews: 0.23572952839440944,
      useOfChapters: 0,
    },
    weighted_score: {
      date: 44.44889961895326,
      dateXLikes: 13.435068736972761,
      dateXViews: 23.572952839440944,
      useOfChapters: 0,
    },
    final_score: 36.01387002979529,
  };

  expect(finalScore[0]).toMatchObject(video1ExpectedResult);
  expect(finalScore[1]).toMatchObject(video2ExpectedResult);
});
