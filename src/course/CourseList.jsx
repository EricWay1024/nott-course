import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getAllValues, queryCourses } from '../services/course';
import { useDocumentTitle } from '../utils/helper';
import Table from '../components/Table';

let schoolFilters = [];
let creditFilters = [];
let levelFilters = [];
let semesterFilters = [];

function CourseList() {
  useDocumentTitle('Course List');

  const [searched, setSearched] = useState(false);
  const [courses, setCourses] = useState([]);
  const [allSchools, setAllSchools] = useState([]);
  const [allCredits, setAllCredits] = useState([]);
  const [allLevels, setAllLevels] = useState([]);
  const [allSemesters, setAllSemesters] = useState([]);

  useEffect(() => {
    (async () => {
      const fetchedAllValues = await getAllValues();
      setAllSchools(
        fetchedAllValues.allSchools.map((school) => ({ value: school, label: school.replace('&amp;', '&') })),
      );
      setAllCredits(
        fetchedAllValues.allCredits.map((credit) => ({ value: credit, label: credit })),
      );
      setAllLevels(
        fetchedAllValues.allLevels.map((level) => ({ value: level, label: level })),
      );
      setAllSemesters(
        fetchedAllValues.allSemesters.map((semester) => ({ value: semester, label: semester })),
      );
      setSearched(true);
    })();
  }, []);

  const updateCourses = async () => {
    const fetchedCourses = await queryCourses({
      offering: schoolFilters,
      credits: creditFilters,
      level: levelFilters,
      semester: semesterFilters,
    });
    setCourses(fetchedCourses);
  };

  const schoolSelection = (selectedSchools) => {
    schoolFilters = selectedSchools.map((e) => e.value);
  };

  const creditSelection = (selectedCredits) => {
    creditFilters = selectedCredits.map((e) => e.value);
  };

  const levelSelection = (selectedLevels) => {
    levelFilters = selectedLevels.map((e) => e.value);
  };

  const semesterSelection = (selectedSemesters) => {
    semesterFilters = selectedSemesters.map((e) => e.value);
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
      <div className="btn-ctn">
        <button className="submit-btn" onClick={updateCourses} type="submit">Search</button>
      </div>

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
