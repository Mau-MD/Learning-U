import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import DashboardIndex from "./components/Dashboard/DashboardIndex";
import DifficultyIndex from "./components/Difficulty/DifficultyIndex";
import Home from "./components/Home";
import HubIndex from "./components/Hub/HubIndex";
import CourseLayout from "./components/Layouts/CourseLayout";
import Navbar from "./components/Navbar";
import LoginIndex from "./components/Registration/LoginIndex";
import RegisterIndex from "./components/Registration/RegisterIndex";
import RequireAuth from "./components/Registration/RequireAuth";
import NewCourseIndex from "./components/NewCourse/NewCourseIndex";
import FeedIndex from "./components/Feed/FeedIndex";
import FollowingLayout from "./components/Following/FollowingLayout";
import ProfileIndex from "./components/Profile/ProfileIndex";
import FeaturedIndex from "./components/Featured/FeaturedIndex";
import CourseFromScratchIndex from "./components/CourseFromScratch/CourseFromScratchIndex";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="*" element={<div>Not found</div>} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterIndex />} />
        <Route path="/login" element={<LoginIndex />} />
        <Route
          path="dashboard"
          element={
            <RequireAuth>
              <Outlet />
            </RequireAuth>
          }
        >
          <Route index element={<DashboardIndex />} />
          <Route path="new" element={<NewCourseIndex />} />
        </Route>
        <Route
          path="featured"
          element={
            <RequireAuth>
              <Outlet />
            </RequireAuth>
          }
        >
          <Route index element={<FeaturedIndex />} />
          <Route path="new" element={<CourseFromScratchIndex />} />
        </Route>
        <Route
          path="courses/:id"
          element={
            <RequireAuth>
              <CourseLayout />
            </RequireAuth>
          }
        >
          <Route path="difficulty" element={<DifficultyIndex />} />
          <Route path="hub" element={<HubIndex />} />
        </Route>
        <Route
          path="feed"
          element={
            <RequireAuth>
              <FollowingLayout />
            </RequireAuth>
          }
        >
          <Route index element={<FeedIndex />} />
        </Route>
        <Route
          path="profile/:id"
          element={
            <RequireAuth>
              <Outlet />
            </RequireAuth>
          }
        >
          <Route index element={<ProfileIndex />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
