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
  const [targetCode, setTargetCode] = useState('');
  const [targetName, setTargetName] = useState('');

  const [hide, setHide] = useState(false);

  const updateCourses = (mode) => (
    async () => {
      setSearching(true);
      let fetchedCourses;
      if (mode === 'code') {
        fetchedCourses = await queryCourses({
          code: targetCourseCode,
        });
      } else if (mode === 'title') {
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
      setHide(true);
    });

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
  if (searching) {
    loading = <div>Loading course list...</div>;
  } else {
    loading = null;
  }

  return (
    <div className="page-ctn">
      {' '}
      <h1>Courses</h1>
      {!hide
        ? (
          <div>
            <h3>Course Code</h3>
            <input className="inputBox" placeholder="Input course code..." type="text" value={targetCode} onChange={(event) => handleChange(event)} />
            <div className="btn-ctn">
              <button className="submit-btn" onClick={updateCourses('code')} type="submit">Search</button>
            </div>
            <hr />
            <h3>Course Name</h3>
            <input className="inputBox" placeholder="Input course name..." type="text" value={targetName} onChange={(event) => courseNameInput(event)} />
            <div className="btn-ctn">
              <button className="submit-btn" onClick={updateCourses('title')} type="submit">Search</button>
            </div>
            <hr />
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
              <button className="submit-btn" onClick={updateCourses('fitlers')} type="submit">Search</button>
            </div>
          </div>
        )
        : (
          <div>
            <button type="button" className="submit-btn" onClick={() => setHide(false)}>Back</button>
            <div>{loading}</div>
            <br />
            <Table
              data={courses}
              links={{ code: 'module' }}
              orderedKeys={['code', 'title', 'offering', 'level', 'credits', 'semester']}
              keyDisplay={{ offering: 'Offering School' }}
            />
          </div>
        )}

    </div>
  );
}

export default CourseList;
