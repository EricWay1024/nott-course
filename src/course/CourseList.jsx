import React, { useState } from 'react';
import Select from 'react-select';
import { queryCourses } from '../services/course';
import { useDocumentTitle } from '../utils/helper';
import Table from '../components/Table';
import values from '../asserts/values.json';

let schoolFilters = [];
let creditFilters = [];
let levelFilters = [];
let semesterFilters = [];
let targetCourseCode = null;
let targetCourseName = null;

function CourseList() {
  useDocumentTitle('Course List');
  const allSchools = values.allSchools.map((school) => ({ value: school, label: school.replace('&amp;', '&') }));
  const allCredits = values.allCredits.map((credit) => ({ value: credit, label: credit }));
  const allLevels = values.allLevels.map((level) => ({ value: level, label: level }));
  const allSemesters = values.allSemesters.map(
    (semester) => ({ value: semester, label: semester }),
  );

  const [searching, setSearching] = useState(false);
  const [courses, setCourses] = useState([]);
  // const [allSchools, setAllSchools] = useState([]);
  // const [allCredits, setAllCredits] = useState([]);
  // const [allLevels, setAllLevels] = useState([]);
  // const [allSemesters, setAllSemesters] = useState([]);
  const [targetCode, setTargetCode] = useState(null);
  const [targetName, setTargetName] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     const fetchedAllValues = await getAllValues();
  //     setAllSchools(
  // eslint-disable-next-line max-len
  //       fetchedAllValues.allSchools.map((school) => ({ value: school, label: school.replace('&amp;', '&') })),
  //     );
  //     setAllCredits(
  //       fetchedAllValues.allCredits.map((credit) => ({ value: credit, label: credit })),
  //     );
  //     setAllLevels(
  //       fetchedAllValues.allLevels.map((level) => ({ value: level, label: level })),
  //     );
  //     setAllSemesters(
  //       fetchedAllValues.allSemesters.map((semester) => ({ value: semester, label: semester })),
  //     );
  //     setSearched(true);
  //   })();
  // }, []);

  const updateCourses = async () => {
    setSearching(true);
    let fetchedCourses;
    if (targetCode != null) {
      fetchedCourses = await queryCourses({
        code: targetCourseCode,
      });
    } else if (targetName != null) {
      fetchedCourses = await queryCourses({
        title: targetCourseName,
      });
    } else {
      fetchedCourses = await queryCourses({
        offering: schoolFilters,
        credits: creditFilters,
        level: levelFilters,
        semester: semesterFilters,
      });
    }
    setCourses(fetchedCourses);
    setSearching(false);
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

  const handleChange = (event) => {
    setTargetCode(event.target.value);
    targetCourseCode = event.target.value;
  };

  const courseNameInput = (event) => {
    setTargetName(event.target.value);
    targetCourseName = event.target.value;
  };

  let loading;
  // if (!searched) return (<div>Loading course list...</div>);
  if (searching) {
    loading = <div>Loading course list...</div>;
  } else {
    loading = null;
  }

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
      <h3>Course Code</h3>
      <input className="inputBox" placeholder="input course code..." type="text" value={targetCode} onChange={(event) => handleChange(event)} />

      <h3>Course Name</h3>
      <input className="inputBox" placeholder="input course name..." type="text" value={targetName} onChange={(event) => courseNameInput(event)} />

      <div className="btn-ctn">
        <button className="submit-btn" onClick={updateCourses} type="submit">Search</button>
      </div>

      <div>{loading}</div>

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
