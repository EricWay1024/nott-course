import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { getCourse } from '../services/course';
import { useDocumentTitle } from '../utils/helper';
import RenderHtml from '../components/RenderHtml';
import Table from '../components/Table';

function CoursePage(props) {
  const { code } = { ...useParams(), ...props };
  useDocumentTitle(`${code} - Module Details - Nott Course`);

  const [course, setCourse] = useState(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    (async () => {
      const fetchedCourse = await getCourse(code);
      setSearched(true);
      setCourse(fetchedCourse);
    })();
  }, [code]);

  if (!course && !searched) return <div>Loading course...</div>;
  if (!course && searched) return <div>Course code not found</div>;

  return (
    <div className="page-wrapper">
      <Grid container spacing={1}>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <div className="page-ctn">
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
              noHead
            />
            <h2>Target Students</h2>
            <RenderHtml html={course.targetStudents} />
            <h2>Summary of Content</h2>
            <RenderHtml html={course.summary} />
            <h2>Course Web Links</h2>
            <Table data={course.courseWebLinks} />
            <h2>Education Aims</h2>
            <RenderHtml html={course.aims} />
            <h2>Convenor</h2>
            <Table data={course.convenor} />
            <h2>Requisites</h2>
            <Table data={course.requisites} links={{ subject: 'module' }} />
            <h2>Additional Requirements</h2>
            <Table data={course.additionalRequirements} />
            <h2>Method and Frequency of Class</h2>
            <Table data={course.class} />
            <h2>Method of Assessment</h2>
            <Table data={course.assessment} />
            <h2>Assessment Period</h2>
            <RenderHtml html={course.assessmentPeriod} />
            <h2>Learning Outcome</h2>
            <RenderHtml html={course.outcome} />
            {/* <h2>Belongs to</h2>
            <Table data={[course.belongsTo]} /> */}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default CoursePage;
