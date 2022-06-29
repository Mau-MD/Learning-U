# Learning-U

Meta U Web Track Capstone Project.
User Stories

[Project Plan](https://docs.google.com/document/d/15nU1ppWMZnbKwyfSjMI_07Ed7dZSl1sCKwV56W5l01Y/edit?usp=sharing)

| Table of contents               |
| ------------------------------- |
| [User Roles](#user-roles)       |
| [User Personas](#user-personas) |
| [User Stories](#user-stories)   |
| [Endpoints](#endpoints)         |
| [Models](#models)               |

---

_I want to learn an specific technology_

Problems someone may face:

- Don't know where to start
- A lot of content
- After watching basic tutorials, you don't know what to do next (tutorial hell)

---

## User Roles

**Software Engineer:** Someone that wants to learn new technologies in an organized way and without getting stuck on `tutorial hell`

## User Personas

**Software Engineer Student:** Someone that is starting in tech and wants to learn a lot of new technologies. He doesn't know where to start, as there is a lot of content everywhere, some of them good, and some of them bad. Also this user feels that after watching a few videos, he forgets everything he learned. The main motivation of using this app is that he would be able to have an organized way of learning, and he will not be stucked on `tutorial hell`

**Visual Learner**: Someone that likes to watch videos to learn about something new, he doesn't like to read that much. This person thinks that is better to follow what other people do. Also, it still believes that documentation is a good way to learn about new stuff.

**Reading Learner**: Someone that loves to read. This person always tries to dig into the documentation first before watching any type of video.

## User Stories

- 1. As a Software Engineer Student, I want to be able to register, so that I can save my progress and access it accross multiple devices.
- 2. As a Software Engineer Student, I want to have a dashboard where I can see the progress of my multiple courses.
- 3. As a Software Engineer Student, I want to add new learning courses with ease, so that I can focus more in the content.
- 4. As a Software Engineer Student, I want to have `topic recommendations` so I can decide which new technology and want to learn.
- 5. As a Software Engineer Student, I want to track my progress of my courses, so I see how far away I'm from finish the course.
- 6. As a Software Engineer Student, I want to be able to divide the courses into 3 different sections: Begineer, Intermideate and Advanced, so that I have an organized way of learning.
- 7. As a visual learner, I want to have more video tutorials than written content, so that I can learn faster.
- 8. As a visual learner, I want to get good video recommendations that are relevant to this age, so that I don't waste time learning legacy technologies.
- 9. As a reading learner, I want to have more written content than video tutorials, so that I can learn faster.

## Endpoints

| HHTP Verb | Name                               | Description                                                          | User Stories |
| --------- | ---------------------------------- | -------------------------------------------------------------------- | ------------ |
| POST      | users                              | Creates new user account                                             | 1            |
| GET       | users/me                           | Gets current user information                                        | 1            |
| PUT       | users/me                           | Updates current user information (like visual/reading preference)    | 3, 7, 9      |
| POST      | courses                            | Creates a new course                                                 | 3            |
| GET       | courses/me                         | Gets the courses the user is enrolled                                | 2, 4         |
| DELETE    | courses/:courseId                  | Deletes a course based on the ID                                     | 3            |
| GET       | resources/:resourceId              | Gets a resource based on the id                                      | 5, 6         |
| PUT       | resources/updateStatus/:resourceId | Changes the status of a resource                                     | 5            |
| GET       | resources/byCourse/:courseId       | Gets all resources from an specific course based on the courseId     | 5, 8         |
| POST      | resources/feedback/:resourceId     | Adds feedback to an specific resources (wheter it was useful or not) | 5, 8         |

## Models

### Users

| Column Name | Type    | Description                  |
| ----------- | ------- | ---------------------------- |
| id          | integer | primary key                  |
| name        | text    | user name                    |
| email       | text    | user email                   |
| passowrd    | text    | hashed password              |
| token       | text    | password reset token         |
| createdAt   | date    | date the account was created |

### Courses

| Column Name | Type    | Description |
| ----------- | ------- | ----------- |
| id          | integer | primary key |
| name        | text    | course name |

### Resource

| Column Name | Type                                      | Description                                                                        |
| ----------- | ----------------------------------------- | ---------------------------------------------------------------------------------- |
| id          | integer                                   | primary key                                                                        |
| type        | 'video', 'website'                        | resource type that will display in the frontend                                    |
| status      | 'not started', 'in progress', 'completed' | resource status                                                                    |
| url         | text                                      | url that will redirect the user when clicking on it                                |
| level       | 1, 2, 3                                   | what difficulty that resource corresponds in (1: beginner, 2: medium, 3: advanced) |
| feedback    | integer                                   | wheter the users think this resource is useful or not (ranking system)             |

### User_Course

| Column Name | Type    | Description |
| ----------- | ------- | ----------- |
| id_user     | integer | user id     |
| id_course   | integer | course id   |

### Course_Resource

| Column Name | Type    | Description |
| ----------- | ------- | ----------- |
| id_course   | integer | course id   |
| id_resource | integer | resource id |

### Following

| Column Name  | Type    | Description                       |
| ------------ | ------- | --------------------------------- |
| id_user      | integer | user id                           |
| id_following | integer | user id that the user is follwing |
