import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getCourseList } from '../services/course';
import { useDocumentTitle, addKeys } from '../utils/helper';
import Table from '../components/Table';

let allCourses = [];
let allSchools = [];
let allCredits = [];
let allLevels = [];
let allSemesters = [];
let schoolFilters = [];
let creditFilters = [];
let levelFilters = [];
let semesterFilters = [];

function generateList(courseData) {
  allSchools = courseData
    .map((course) => (course.offering))
    .filter((x, i, a) => a.indexOf(x) === i)
    .sort()
    .map((school) => ({ value: school, label: school.replace('&amp;', '&') }));

  allCredits = [...new Set(courseData.map((course) => (course.credits)))]
    .sort((a, b) => a - b)
    .map((credit) => ({ value: credit, label: credit }));

  allLevels = [...new Set(courseData.map((course) => (course.level)))]
    .sort((a, b) => a - b)
    .map((level) => ({ value: level, label: level }));

  allSemesters = [...new Set(courseData.map((course) => (course.semester)))]
    .sort()
    .map((semester) => ({ value: semester, label: semester }));
}

function CourseList() {
  useDocumentTitle('Course List');

  const [searched, setSearched] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      const fetchedCourses = addKeys(await getCourseList());
      allCourses = fetchedCourses;
      generateList(fetchedCourses);
      setCourses(fetchedCourses);
      setSearched(true);
    })();
  }, []);

  const updateCourses = () => {
    setCourses(allCourses
      .filter((course) => {
        if (schoolFilters.length === 0) return true;
        return schoolFilters.includes(course.offering);
      })
      .filter((course) => {
        if (creditFilters.length === 0) return true;
        return creditFilters.includes(course.credits);
      })
      .filter((course) => {
        if (levelFilters.length === 0) return true;
        return levelFilters.includes(course.level);
      })
      .filter((course) => {
        if (semesterFilters.length === 0) return true;
        return semesterFilters.includes(course.semester);
      }));
  };

  const schoolSelection = (selectedSchools) => {
    schoolFilters = selectedSchools.map((e) => e.value);
    updateCourses();
  };

  const creditSelection = (selectedCredits) => {
    creditFilters = selectedCredits.map((e) => e.value);
    updateCourses();
  };

  const levelSelection = (selectedLevels) => {
    levelFilters = selectedLevels.map((e) => e.value);
    updateCourses();
  };

  const semesterSelection = (selectedSemesters) => {
    semesterFilters = selectedSemesters.map((e) => e.value);
    updateCourses();
  };

  if (!searched) return (<div>Loading course list...</div>);

  return (
    <div className="page-ctn">
      <h1>Courses</h1>
      <h3>Schools</h3>
      <Select
        closeMenuOnSelect={false}
        isMulti
        onChange={(selectedSchools) => schoolSelection(selectedSchools)}
        options={allSchools}
      />
      <h3>Credit</h3>
      <Select
        closeMenuOnSelect={false}
        isMulti
        onChange={(selectedCredits) => creditSelection(selectedCredits)}
        options={allCredits}
      />
      <h3>Level</h3>
      <Select
        closeMenuOnSelect={false}
        isMulti
        onChange={(selectedLevels) => levelSelection(selectedLevels)}
        options={allLevels}
      />
      <h3>Semester</h3>
      <Select
        closeMenuOnSelect={false}
        isMulti
        onChange={(selectedSemesters) => semesterSelection(selectedSemesters)}
        options={allSemesters}
      />

      <br />

      <Table data={courses} links={{ code: 'module' }} />
    </div>
  );
}

// function CourseList(props) {
//   const { offering } = { ...useParams(), ...props };
//   useDocumentTitle(`${processStr(offering)} - Course List - Nott Course`);

//   const [courses, setCourses] = useState([]);
//   const [searched, setSearched] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const fetchedCourses = await getCourseList(offering);
//       setCourses(addKeys(fetchedCourses));
//       setSearched(true);
//     })();
//   }, [offering]);

//   return (
//     <div className="page-ctn">
//       <h1>{processStr(offering)}</h1>
//       {!searched
//         ? <div>Loading courses...</div>
//         : <Table data={courses} links={{ code: 'module' }} />}
//     </div>
//   );
// }

export default CourseList;
