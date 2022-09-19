import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { getCourse } from '../services/course';
import { useDocumentTitle, processStr } from '../utils/helper';
import RenderHtml from '../components/RenderHtml';
import Table from '../components/Table';

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
        data={([{
          key: 'Code',
          value: course.code,
        },
        {
          key: 'Title',
          value: course.title,
        },
        {
          key: 'Credits',
          value: course.credits,
        },
        {
          key: 'Level',
          value: course.level,
        },
        {
          key: 'Offering School',
          value: course.offering,
        },
        {
          key: 'Semester',
          value: course.semester,
        },
        ])}
        orderedKeys={['key', 'value']}
        noHead
      />
      <h2>Target Students</h2>
      <RenderHtml html={course.targetStudents} />
      <h2>Summary of Content</h2>
      <RenderHtml html={course.summary} />
      <h2>Course Web Links</h2>
      <Table data={course.courseWebLinks} orderedKeys={['type', 'link']} />
      <h2>Education Aims</h2>
      <RenderHtml html={course.aims} />
      <h2>Convenor</h2>
      <Table data={course.convenor} orderedKeys={['name']} />
      <h2>Requisites</h2>
      <Table
        data={course.requisites}
        orderedKeys={['subject', 'courseTitle']}
        links={{ subject: 'module' }}
        keyDisplay={{ subject: 'Course Code' }}
      />
      <h2>Additional Requirements</h2>
      <Table
        data={course.additionalRequirements}
        orderedKeys={['operator', 'condition']}
      />
      <h2>Method and Frequency of Class</h2>
      <Table
        data={course.class}
        orderedKeys={['activity', 'numOfWeeks', 'numOfSessions', 'sessionDuration']}
      />
      <h2>Method of Assessment</h2>
      <Table
        data={course.assessment}
        orderedKeys={['type', 'weight', 'requirements']}
      />
      <h2>Assessment Period</h2>
      <RenderHtml html={course.assessmentPeriod} />
      <h2>Learning Outcome</h2>
      <RenderHtml html={course.outcome} />
    </div>
  );
}

export default CoursePage;
