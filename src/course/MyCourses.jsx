import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { getCourse } from '../services/course';
import { getSelectedCourses } from '../utils/helper';
import Table from '../components/Table';

const getCourseList = async (codes) => Promise.all(codes.map(async (code) => {
  const res = await getCourse(code);
  return {
    id: res.code,
    code: res.code,
    title: res.title,
    offering: res.offering,
    level: res.level,
    credits: res.credits,
    semester: res.semester,
    assessment: res.assessment,
  };
}));

const getCreditSum = (courses) => {
  let creditSum = 0;
  courses.forEach((course) => {
    creditSum += 1 * course.credits;
  });
  return creditSum;
};

const getAssessmentList = (courses) => {
  const allAssessment = [];
  const creditSum = getCreditSum(courses);
  courses.forEach((course) => {
    course.assessment.forEach((assess) => {
      allAssessment.push({
        courseCode: course.code,
        courseTitle: course.title,
        courseCredits: course.credits,
        assessmentType: assess.type,
        assessmentRequirements: assess.requirements,
        assessmentWeight: assess.weight,
        assessmentContribution:
          (((1 * assess.weight) * (1 * course.credits)) / creditSum).toFixed(2),
      });
    });
  });

  return allAssessment;
};

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [assessment, setAssessment] = useState([]);
  const orderedKeys = ['courseCode', 'courseTitle', 'courseCredits', 'assessmentType', 'assessmentRequirements', 'assessmentWeight', 'assessmentContribution'];

  const reloadPage = async () => {
    const selectedCourses = getSelectedCourses();
    const courseDetails = await getCourseList(
      Object.keys(selectedCourses).filter((code) => selectedCourses[code]),
    );
    setCourses(courseDetails);
    const data = getAssessmentList(courseDetails);
    setAssessment(data);
  };

  useEffect(() => {
    reloadPage();
  }, []);

  return (
    <div className="detail-page-wrapper">
      <Grid container spacing={1}>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <div className="detail-page-ctn">
            <Button onClick={() => { window.location.reload(false); }}>Reload Page</Button>
            <h1>My Courses</h1>
            <Table
              data={courses}
              links={{ code: 'module' }}
              orderedKeys={['code', 'title', 'offering', 'level', 'credits', 'semester']}
              keyDisplay={{ offering: 'Offering School' }}
              enableSelection
            />
            <br />
            <p>
              Sum of credits:
              {' '}
              {getCreditSum(courses)}
              .
            </p>
            <p>
              You can select your courses by either
              {' '}
              <Link to="/course-index" target="_blank">searching for courses</Link>
              {' '}
              or
              {' '}
              <Link to="/plan-index" target="_blank">finding your academic plan</Link>
              {' '}
              .
            </p>

            <br />
            <h1>My Assessments</h1>
            <p>
              Generated from your selected courses. The last column stands for the percentage
              contribution of an assessment to your final score of the academic year.
            </p>
            <br />

            <Table
              data={assessment}
              orderedKeys={orderedKeys}
              keyType={{
                courseCredits: 'number',
                assessmentWeight: 'number',
                assessmentContribution: 'number',
              }}
              datagridProps={{
                components: { Toolbar: CustomToolbar },
              }}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default MyCourses;
