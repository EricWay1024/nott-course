import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import FunctionsIcon from '@mui/icons-material/Functions';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import { getCourseList } from '../services/course';
import { getSelectedCourses, getLocalStorage } from '../utils/helper';
import Table from '../components/Table';
import CourseGroup from '../components/CourseGroup';
import './course.css';
import PlanScreenshot from '../assets/Screenshot-SelectPlan.png';

const getCourseGroup = (course, planSettings) => {
  let courseGroup = planSettings.groups.length - 1;
  for (let j = 0; j < planSettings.groups.length; j += 1) {
    const group = planSettings.groups[j];
    if (
      group.type === 'Additional'
      || group.modules.map((c) => c.code).includes(course.code)
    ) {
      courseGroup = j;
      break;
    }
  }
  return {
    index: courseGroup,
    type: planSettings.groups[courseGroup].type,
  };
};

const getCreditSums = (courseDetails, selectionMap, groupNum) => {
  let creditSum = 0;
  let creditSpring = 0;
  let creditAutumn = 0;
  const creditGroup = Array.from({ length: groupNum }, () => 0);
  const selectedCourses = Object
    .keys(selectionMap)
    .filter((k) => selectionMap[k]).map((code) => courseDetails[code]);
  selectedCourses.forEach((course) => {
    if (!course) {
      return;
    }
    const credits = 1 * course.credits;
    creditSum += credits;
    if (course.semester.match(/Autumn/)) {
      creditAutumn += credits;
    } else if (course.semester.match(/Spring/)) {
      creditSpring += credits;
    } else if (course.semester.match(/Full Year/)) {
      creditAutumn += credits / 2;
      creditSpring += credits / 2;
    }
    creditGroup[course.group.index] += credits;
  });
  return {
    creditSum,
    creditSpring,
    creditAutumn,
    creditGroup,
  };
};

function MyCourses() {
  const planSettings = getLocalStorage('planSettings', null);
  const selectedYear = getLocalStorage('selectedYear', null);
  const initialSelectionMap = getSelectedCourses();
  const groupNum = planSettings ? planSettings.groups.length : 0;
  const [additionalCourses, setAdditionalCourses] = useState([]);
  const [courseDetails, setCourseDetails] = useState({});
  const [creditSums, setCreditSums] = useState(null);
  const [selectionMap, setSelectionMap] = useState(initialSelectionMap);

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    (async () => {
      if (!planSettings) return;
      const selectionMapCourses = Object.keys(initialSelectionMap);
      const groupCourses = planSettings
        .groups.map((group) => group.modules.map((module) => module.code)).flat();
      const allCourses = new Set(selectionMapCourses.concat(groupCourses));
      const details = await getCourseList([...allCourses]);
      const temp = Object.fromEntries(
        details.map((course) => [course.code, {
          ...course,
          group: getCourseGroup(course, planSettings),
        }]),
      );
      setCourseDetails(temp);
      setAdditionalCourses(Object.values(temp).filter((course) => course.group.type === 'Additional'));
    })();
  }, []);

  useEffect(() => {
    setCreditSums(getCreditSums(courseDetails, selectionMap, groupNum));
  }, [courseDetails, selectionMap]);

  const getCreditSummary = () => [{
    key: 'Total',
    type: 'Total',
    current: creditSums.creditSum,
    minimum: planSettings.creditSum,
    maximum: planSettings.creditSum,
  }, {
    key: 'Autumn',
    type: 'Semester',
    current: creditSums.creditAutumn,
    minimum: planSettings.semesterLow,
    maximum: planSettings.semesterHigh,
  }, {
    key: 'Spring',
    type: 'Semester',
    current: creditSums.creditSpring,
    minimum: planSettings.semesterLow,
    maximum: planSettings.semesterHigh,
  }]
    .concat(creditSums.creditGroup.map((credit, groupIndex) => ({
      key: planSettings.groups[groupIndex].title,
      type: 'Group',
      current: credit,
      minimum: planSettings.groupLow[groupIndex],
      maximum: planSettings.groupHigh[groupIndex],
    })))
    .map((row) => ({
      ...row,
      // eslint-disable-next-line no-nested-ternary
      status: `${row.current} ${row.current < row.minimum ? '🔻' : row.current > row.maximum ? '🔺' : '✅'}`,
      range: row.minimum < row.maximum ? `${row.minimum} ~ ${row.maximum}` : `${row.minimum}`,
    }));

  if (!planSettings || !selectedYear) {
    return (
      <div className="detail-page-ctn">
        <p>
          You have not selected your current year!
        </p>
        <br />
        STEP 1:
        {' '}
        Find your academic plan by
        {' '}
        <Link to="/plan-index" target="_blank">
          searching here
        </Link>
        .
        {' '}
        <br />
        STEP 2:
        {' '}
        Choose your current year by ticking the corresponding checkbox, as shown below:
        <img
          src={PlanScreenshot}
          alt="screen shot"
          className="plan-img"
        />
        <br />
        STEP 3:
        {' '}
        Come back to this page and reload.
      </div>
    );
  }

  if (!creditSums) {
    return (<CircularProgress />);
  }

  return (

    <div className="detail-page-ctn">
      <Button
        onClick={() => {
          window.location.reload(false);
        }}
      >
        Reload Page
      </Button>
      <h1>My Modules</h1>
      <div>
        {'You have selected: '}
        <Link to={`/plan/${selectedYear.planCode}`}>{`${selectedYear.planTitle}, ${selectedYear.yearTitle}`}</Link>
        .
        <br />
        <br />
        Want to change your plan or year?
        {' '}
        <Link to="/plan-index" target="_blank">
          Find your academic plan
        </Link>
        {' '}
        and choose your current year.
        <br />
      </div>
      {planSettings.groups.map((group, groupIndex) => (
        <CourseGroup
          group={group}
          enableSelection
          groupIndex={groupIndex}
          key={group.title}
          onSelectionMapChange={(sm) => { setSelectionMap(sm); }}
        />
      ))}
      <Table
        data={additionalCourses}
        links={{ code: 'module' }}
        orderedKeys={[
          'code',
          'title',
          'offering',
          'level',
          'credits',
          'semester',
        ]}
        keyDisplay={{ offering: 'Offering School' }}
        enableSelection
        onSelectionMapChange={(sm) => { setSelectionMap(sm); }}
      />
      <div>
        <br />
        Need additional modules?
        {' '}
        <Link to="/course-index" target="_blank">
          Search for courses
        </Link>
        {' '}
        and check the ones you would like to choose.
      </div>

      <h1>Summary Lists of Selected Modules and Assessments</h1>
      <Button variant="contained" href="/my-assess">Go to summary lists</Button>

      <Fab
        color="primary"
        aria-label="expand"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          right: '4vw',
          bottom: '8vh',
        }}
      >
        <FunctionsIcon />
      </Fab>

      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => { setDrawerOpen(false); }}
      >

        <Grid>

          <Button
            href="/credit-settings"
          >
            Edit Range
          </Button>
          <Table
            data={getCreditSummary()}
            orderedKeys={['key', 'range', 'status']}
            keyDisplay={{ status: 'Current' }}
          />
        </Grid>

      </Drawer>

    </div>

  );
}

export default MyCourses;
