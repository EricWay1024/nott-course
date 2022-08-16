import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import React from 'react';
import NavBar from './components/NavBar';
import CourseList from './course/CourseList';
import CoursePage from './course/CoursePage';
import PlanPage from './plan/PlanPage';
import PlanList from './plan/PlanList';
import MyCourses from './course/MyCourses';
import IndexPage from './index/indexPage';
import About from './About/About';
import CreditSettings from './course/CreditSettings';
import MyAssessments from './course/MyAssessments';

function App() {
  return (
    <div className="App">
      <div className="nav-bar">
        <NavBar />
      </div>

      <Router>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/course-index" element={<CourseList />} />
          <Route path="/plan-index" element={<PlanList />} />
          <Route path="/module/:code" element={<CoursePage />} />
          <Route path="/plan/:code" element={<PlanPage />} />
          <Route path="/my" element={<MyCourses />} />
          <Route path="/about" element={<About />} />
          <Route path="/credit-settings" element={<CreditSettings />} />
          <Route path="/my-assess" element={<MyAssessments />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
