import React, { useState, useEffect } from 'react';
import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { getCourseList } from '../services/course';
import { getSelectedCourses } from '../utils/helper';
import Table from '../components/Table';
import SupportButtons from '../components/SupportButtons';

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
        courseSemester: course.semester,
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
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      const initialSelectionMap = getSelectedCourses();
      const selectedCourses = Object.keys(initialSelectionMap)
        .filter((code) => initialSelectionMap[code]);
      const courseDetails = await getCourseList(selectedCourses);
      const assess = getAssessmentList(courseDetails);
      setAssessment(assess);
      setCourses(courseDetails);
    })();
  }, []);

  return (

    <div className="detail-page-ctn">
      <SupportButtons />
      <h1>Selected Modules</h1>
      <p>Here is a table of all your selected modules.</p>
      <br />
      <Table
        data={courses}
        orderedKeys={[
          'code',
          'title',
          'credits',
          'semester',
          'offering',
        ]}
        keyType={{
          credits: 'number',
        }}
        datagridProps={{
          components: { Toolbar: CustomToolbar },
        }}
        keyDisplay={{
          offering: 'Offering School',
        }}
        links={{ code: 'module' }}
      />
      <h1>My Assessments</h1>
      <p>
        All your assessments this academic year, generated from your selected modules.
        The last column stands for
        the percentage contribution of each assessment to your final mark
        of the academic year. Be sure to prepare for them all!
      </p>
      <br />
      <Table
        data={assessment}
        orderedKeys={[
          'courseCode',
          'courseTitle',
          'courseCredits',
          'courseSemester',
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
        keyDisplay={{
          courseCode: 'Module Code',
          courseTitle: 'Module Title',
          courseCredits: 'Module Credits',
          courseSemester: 'Module Semester',
        }}
      />
    </div>

  );
}

export default MyAssessments;
