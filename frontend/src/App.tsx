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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
