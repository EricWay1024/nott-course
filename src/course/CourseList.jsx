import React, { useState } from 'react';
import Select from 'react-select';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { queryCourses } from '../services/course';
import { useDocumentTitle } from '../utils/helper';

import Table from '../components/Table';
import SearchBar from '../components/SearchBar';
import values from '../assets/values.json';

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

  const handleCodeChange = (event) => {
    setTargetCode(event.target.value);
    targetCourseCode = event.target.value;
  };

  const handleNameChange = (event) => {
    setTargetName(event.target.value);
    targetCourseName = event.target.value;
  };

  const selectionStyles = {
    control: (styles) => ({
      ...styles, color: 'white', minHeight: '56px', backgroundColor: 'rgba(255,255,255,1.0)',
    }),
  };

  return (
    <div className="page-ctn">
      <h1 className="page-title">Modules</h1>
      {!hide
        ? (
          <div className="input-field">
            <div className="search-field">
              <Grid container spacing={4}>
                <SearchBar
                  value={targetCode}
                  handleChange={handleCodeChange}
                  placeholder="Input module code..."
                  handleSearch={updateCourses('code')}
                  title="Module Code"
                />

                <SearchBar
                  value={targetName}
                  handleChange={handleNameChange}
                  placeholder="Input module name..."
                  handleSearch={updateCourses('title')}
                  title="Module Name"
                />
              </Grid>
            </div>

            <br />

            <div className="select-card">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <div className="select-block-left">
                    <h3 className="card-caption">Schools</h3>
                    <Select
                      closeMenuOnSelect={false}
                      isMulti
                      onChange={(selectedSchools) => schoolSelection(selectedSchools)}
                      options={allSchools}
                      defaultValue={
                              allSchools.filter((e) => (schoolFilters.includes(e.value)))
                            }
                      styles={selectionStyles}
                    />
                  </div>

                  <div className="select-block-left">
                    <h3 className="card-caption">Level</h3>
                    <Select
                      closeMenuOnSelect={false}
                      isMulti
                      onChange={(selectedLevels) => levelSelection(selectedLevels)}
                      options={allLevels}
                      defaultValue={
                              allLevels.filter((e) => (levelFilters.includes(e.value)))
                            }
                      styles={selectionStyles}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="select-block-right">
                    <h3 className="card-caption">Credit</h3>
                    <Select
                      closeMenuOnSelect={false}
                      isMulti
                      onChange={(selectedCredits) => creditSelection(selectedCredits)}
                      options={allCredits}
                      defaultValue={
                              allCredits.filter((e) => (creditFilters.includes(e.value)))
                            }
                      styles={selectionStyles}
                    />
                  </div>
                  <div className="select-block-right">
                    <h3 className="card-caption">Semester</h3>
                    <Select
                      closeMenuOnSelect={false}
                      isMulti
                      onChange={(selectedSemesters) => semesterSelection(selectedSemesters)}
                      options={allSemesters}
                      defaultValue={
                              allSemesters.filter((e) => (semesterFilters.includes(e.value)))
                            }
                      styles={selectionStyles}
                    />
                  </div>
                </Grid>
              </Grid>

              <div className="btn-ctn">
                <Button variant="contained" className="submit-btn select-button" onClick={updateCourses('fitlers')} type="submit">Search</Button>
              </div>
            </div>

          </div>
        )
        : (
          <div>
            <Button variant="contained" className="submit-btn select-button" onClick={() => setHide(false)}>Back</Button>
            <br />
            <br />
            <br />
            { searching && <CircularProgress /> }
            <br />
            <Table
              data={courses}
              links={{ code: 'module' }}
              orderedKeys={['code', 'title', 'offering', 'level', 'credits', 'semester']}
              keyDisplay={{ offering: 'Offering School' }}
              enableSelection
              keyType={{ credits: 'number' }}
            />
          </div>
        )}
    </div>
  );
}
export default CourseList;
