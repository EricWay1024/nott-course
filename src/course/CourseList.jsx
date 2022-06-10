import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getCourseList } from '../services/course';
import { useDocumentTitle, addKeys, processStr } from '../utils/helper';
import Table from '../components/Table';

function CourseList(props) {
  const { offering } = { ...useParams(), ...props };
  useDocumentTitle(`${processStr(offering)} - Course List - Nott Course`);

  const [courses, setCourses] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    (async () => {
      const fetchedCourses = await getCourseList(offering);
      setCourses(addKeys(fetchedCourses));
      setSearched(true);
    })();
  }, [offering]);

  return (
    <div className="page-ctn">
      <h1>{processStr(offering)}</h1>
      {!searched
        ? <div>Loading courses...</div>
        : <Table data={courses} links={{ code: 'module' }} />}
    </div>
  );
}

export default CourseList;
