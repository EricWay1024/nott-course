import React, { useRef, useState } from 'react';
import Select from 'react-select';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { queryCourses } from '../services/course';
import { useDocumentTitle, getLocalStorage } from '../utils/helper';

import Table from '../components/Table';
import SearchBar from '../components/SearchBar';
import values from '../assets/all_values.json';

function CourseList() {
  useDocumentTitle('Course List');
  const campus = getLocalStorage('campus', 'U');
  const allSchools = values[campus].allSchools.map((school) => ({ value: school, label: school.replace('&amp;', '&') }));
  const allCredits = values[campus].allCredits.map((credit) => ({ value: credit, label: credit }));
  const allLevels = values[campus].allLevels.map((level) => ({ value: level, label: level }));
  const allSemesters = values[campus].allSemesters.map(
    (semester) => ({ value: semester, label: semester }),
  );

  // Filter selections are only read at search time, so refs keep them scoped
  // to this component instance without re-rendering on every change. (These
  // were previously module-level variables shared across the whole app.)
  const schoolFilters = useRef([]);
  const creditFilters = useRef([]);
  const levelFilters = useRef([]);
  const semesterFilters = useRef([]);

  const [searching, setSearching] = useState(false);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [targetCode, setTargetCode] = useState('');
  const [targetName, setTargetName] = useState('');

  const [layoutMode, setLayoutMode] = useState('init');

  const updateCourses = (mode) => (
    async () => {
      setSearching(true);
      setError(null);
      let fetchedCourses;
      if (mode === 'code') {
        fetchedCourses = await queryCourses({
          code: targetCode,
        });
      } else if (mode === 'title') {
        fetchedCourses = await queryCourses({
          title: targetName,
        });
      } else {
        fetchedCourses = await queryCourses({
          offering: schoolFilters.current,
          credits: creditFilters.current,
          level: levelFilters.current,
          semester: semesterFilters.current,
        });
      }
      if (Array.isArray(fetchedCourses)) {
        setCourses(fetchedCourses);
      } else {
        setCourses([]);
        setError('Something went wrong while searching. Please try again later.');
      }
      setSearching(false);
      setLayoutMode(mode);
    });

  const schoolSelection = (selectedSchools) => {
    schoolFilters.current = selectedSchools.map((e) => e.value);
  };

  const creditSelection = (selectedCredits) => {
    creditFilters.current = selectedCredits.map((e) => e.value);
  };

  const levelSelection = (selectedLevels) => {
    levelFilters.current = selectedLevels.map((e) => e.value);
  };

  const semesterSelection = (selectedSemesters) => {
    semesterFilters.current = selectedSemesters.map((e) => e.value);
  };

  const handleCodeChange = (event) => {
    setTargetCode(event.target.value);
  };

  const handleNameChange = (event) => {
    setTargetName(event.target.value);
  };

  const selectionStyles = {
    control: (styles) => ({
      ...styles, color: 'white', minHeight: '56px', backgroundColor: 'rgba(255,255,255,1.0)',
    }),
  };

  return (
    <div className="page-ctn">
      <h1 className="page-title">Modules</h1>
      <div className="input-field">
        <div className="search-field">
          <Grid container spacing={4}>
            {
              (layoutMode === 'init' || layoutMode === 'code') && (
                <SearchBar
                  value={targetCode}
                  handleChange={handleCodeChange}
                  placeholder="Input module code..."
                  handleSearch={updateCourses('code')}
                  title="Module Code"
                  isHalf={layoutMode === 'init'}
                />
              )
            }
            {
              (layoutMode === 'init' || layoutMode === 'title') && (
                <SearchBar
                  value={targetName}
                  handleChange={handleNameChange}
                  placeholder="Input module name..."
                  handleSearch={updateCourses('title')}
                  title="Module Name"
                  isHalf={layoutMode === 'init'}
                />
              )
            }
          </Grid>
        </div>

        <br />
        {
          (layoutMode === 'init' || layoutMode === 'filters') && (
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
                                  allSchools.filter((e) => (schoolFilters.current.includes(e.value)))
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
                                  allLevels.filter((e) => (levelFilters.current.includes(e.value)))
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
                                  allCredits.filter((e) => (creditFilters.current.includes(e.value)))
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
                                  allSemesters.filter(
                                    (e) => (semesterFilters.current.includes(e.value)),
                                  )
                                }
                      styles={selectionStyles}
                    />
                  </div>
                </Grid>
              </Grid>

              <div className="btn-ctn">
                <Button variant="contained" className="submit-btn select-button" onClick={updateCourses('filters')} type="submit">Search</Button>
              </div>
            </div>
          )
        }

      </div>
      {layoutMode !== 'init'
      && (
      <div>
        <Button variant="contained" className="submit-btn select-button" onClick={() => setLayoutMode('init')}>Back</Button>
        <br />
        <br />
        <br />
        { searching && <CircularProgress /> }
        { error && <p className="search-error">{error}</p> }
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
