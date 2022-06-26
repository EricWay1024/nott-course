import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { getCourseList } from '../services/course';
import { getSelectedCourses } from '../utils/helper';
import Table from '../components/Table';

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
        assessmentContribution: (
          (1 * assess.weight * (1 * course.credits))
          / creditSum
        ).toFixed(2),
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

function MyAssessments() {
  const [assessment, setAssessment] = useState([]);
  useEffect(() => {
    (async () => {
      const initialSelectionMap = getSelectedCourses();
      const selectedCourses = Object.keys(initialSelectionMap)
        .filter((code) => initialSelectionMap[code]);
      const courseDetails = await getCourseList(selectedCourses);
      const assess = getAssessmentList(courseDetails);
      setAssessment(assess);
    })();
  }, []);

  return (
    <div className="detail-page-wrapper">
      <Grid container spacing={1}>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <div className="detail-page-ctn">
            <h1>My Assessments</h1>
            <p>
              Generated from your selected courses. The last column stands for
              the percentage contribution of an assessment to your final score
              of the academic year.
            </p>
            <br />
            <Table
              data={assessment}
              orderedKeys={[
                'courseCode',
                'courseTitle',
                'courseCredits',
                'assessmentType',
                'assessmentRequirements',
                'assessmentWeight',
                'assessmentContribution',
              ]}
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

export default MyAssessments;
