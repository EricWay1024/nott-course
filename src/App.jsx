import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Grid from '@mui/material/Grid';

// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { NavigationContainer } from '@react-navigation/native';

import {
  BrowserRouter as Router, Routes, Route, Link,
} from 'react-router-dom';
import React from 'react';
import NavBar from './components/NavBar';
import { useDocumentTitle } from './utils/helper';
// import SchoolList from './course/SchoolList';
import CourseList from './course/CourseList';
import CoursePage from './course/CoursePage';
import PlanPage from './plan/PlanPage';
import PlanList from './plan/PlanList';
import MyCourses from './course/MyCourses';
import CourseSolution from './course/CourseSolution';
import MyAssessments from './course/MyAssessments';

function IndexPage() {
  useDocumentTitle('Nott Course');
  // const theme = createTheme({
  //   status: {
  //     danger: '#e53e3e',
  //   },
  //   palette: {
  //     primary: {
  //       main: '#0971f1',
  //       darker: '#053e85',
  //     },
  //     neutral: {
  //       main: 'rgba(27, 42, 107, 0.8)',
  //       contrastText: '#FFF',
  //     },
  //   },
  // });

  return (
    <div className="page-wrapper">
      <Grid container spacing={1}>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <div className="page-ctn">
            <div className="index-ctn">
              <h1>University of Nottingham Curriculum Catalogue</h1>
              <p>
                This catalogue provides details of the curriculum content – both plans and courses
                (modules) delivered to students in current and previous academic sessions. Content
                may change in order to better reflect changes in curriculum and developments in the
                subject area. This catalogue is therefore a record of current and previous years’
                content and should not be relied upon as a definitive guide of what will be
                delivered in future years.
              </p>
              <div className="button">
                <Link to="/course-index">Courses</Link>
              </div>
              <div className="button">
                <Link to="/plan-index">Plans</Link>
              </div>
              <h2>DISCLAIMER</h2>
              <p>
                This is an
                {' '}
                <b>UNOFFICIAL</b>
                {' '}
                replicate of the course catalogue offered by University of Nottingham
                {' '}
                <a href="https://campus.nottingham.ac.uk/psp/csprd_pub/EMPLOYEE/HRMS/c/UN_PROG_AND_MOD_EXTRACT.UN_PAM_CRSE_EXTRCT.GBL">
                  here
                </a>
                . All the data on this website can be accessed publicly on the original website.
                University of Nottingham has the copyright of all the data.
              </p>
              <p>
                The information contained in this website is for general information purposes
                only. The information is provided by University of Nottingham and while we
                endeavour to keep the information up to date and correct, we make no representations
                or warranties of any kind, express or implied, about the completeness, accuracy,
                reliability, suitability or availability with respect to the website or the
                information, products, services, or related graphics contained on the website
                for any purpose. Any reliance you place on such information is therefore
                strictly at your own risk.
              </p>
              <p>
                In no event will we be liable for any loss or damage includingwithout limitation,
                indirect or consequential loss or damage, or any loss or damage whatsoever arising
                from loss of data or profits arising out of, or in connection with, the use of this
                website.
              </p>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

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
          {/* <Route path="/school/:offering" element={<CourseList />} /> */}
          <Route path="/module/:code" element={<CoursePage />} />
          <Route path="/plan/:code" element={<PlanPage />} />
          <Route path="/my" element={<MyCourses />} />
          <Route path="/solution" element={<CourseSolution />} />
          <Route path="/my-assess" element={<MyAssessments />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
