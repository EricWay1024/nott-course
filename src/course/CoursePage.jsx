import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { getCourse } from '../services/course';
import { useDocumentTitle, processStr } from '../utils/helper';
import RenderHtml from '../components/RenderHtml';
import Tips from '../components/Tips';
import Table from '../components/Table';

function SelectTable(props) {
  const { code } = props;
  return (
    <Table
      data={[
        {
          code,
        },
      ]}
      orderedKeys={['code']}
      enableSelection
      noHead
      noBold
    />
  );
}

SelectTable.propTypes = {
  code: PropTypes.bool.isRequired,
};

function CoursePage(props) {
  const { code } = { ...useParams(), ...props };

  const [course, setCourse] = useState(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    (async () => {
      const fetchedCourse = await getCourse(code);
      if (fetchedCourse && fetchedCourse.title) {
        fetchedCourse.title = processStr(fetchedCourse.title);
      }
      setSearched(true);
      setCourse(fetchedCourse);
    })();
  }, [code]);

  const title = (course && !course.error) ? `${course.title} - ${code} - Module Details - Nott Course` : 'Nott Course';
  useDocumentTitle(title);

  if (!course && !searched) return <CircularProgress />;
  if (course && course.error && searched) {
    return (
      <div className="detail-page-ctn">
        🤯 Sorry, no module with code
        {' '}
        {code}
        {' '}
        has been found within the current campus.
      </div>
    );
  }

  return (
    <div className="detail-page-ctn">
      <h1>{`${course.code} - ${course.title}`}</h1>
      <Table
        data={([
          {
            key: 'Academic Year',
            value: course.year,
          },
          {
            key: 'Module Code',
            value: course.code,
          },
          {
            key: 'Title',
            value: course.title,
          },
          {
            key: 'Total Credits',
            value: Math.round(Number(course.credits)),
          },
          {
            key: 'Level',
            value: Math.round(Number(course.level)),
          },
          {
            key: 'Offering School',
            value: course.offering,
          },
          {
            key: 'Module Convenor',
            value: course.convenor,
          },
          {
            key: 'Taught Semester(s)',
            value: course.semester,
          },
          {
            key: 'Target Students',
            value: course.targetStudents,
          },
        ])}
        orderedKeys={['key', 'value']}
        noHead
      />
      <br />
      <SelectTable code={course.code} />
      <h2>Summary of Content</h2>
      <RenderHtml html={course.summary} />
      <h2>Educational Aims</h2>
      <RenderHtml html={course.aims} />
      {course.requisites.length
        ? (
          <h2>
            Pre-Requisites
            <Tips tip="Modules that a student must have already successfully completed before they can enrol on this module." />
          </h2>
        )
        : <div />}
      <Table
        data={course.requisites}
        orderedKeys={['code', 'title']}
        links={{ code: 'module' }}
        keyDisplay={{ code: 'Course Code' }}
      />
      {course.corequisites.length
        ? (
          <h2>
            Co-Requisites
            <Tips tip="Modules that a student must be taking in the same academic year, or have taken in a previous academic year, to enable them to enrol on this module." />
          </h2>
        )
        : <div />}
      <Table
        data={course.corequisites}
        orderedKeys={['code', 'title']}
        links={{ code: 'module' }}
        keyDisplay={{ code: 'Course Code' }}
      />
      {course.additionalRequirements.length ? <h2>Additional Requirements</h2> : <div />}
      <Table
        data={course.additionalRequirements}
        orderedKeys={['operator', 'condition']}
      />
      <h2>Method and Frequency of Class</h2>
      <Table
        data={course.class}
        orderedKeys={['activity', 'numOfWeeks', 'numOfSessions', 'sessionDuration']}
      />
      <RenderHtml html={course.classComment} />
      <h2>Assessment</h2>
      <Table
        data={course.assessment}
        orderedKeys={['assessment', 'type', 'weight', 'duration', 'requirements']}
      />
      <h3>Assessment Period</h3>
      <RenderHtml html={course.assessmentPeriod} />
      <h2>Learning Outcomes</h2>
      <RenderHtml html={course.outcome} />
    </div>
  );
}

export default CoursePage;
