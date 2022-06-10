import React, { useEffect, useState } from 'react';
import { getSchoolList } from '../services/course';
import { useDocumentTitle, addKeys } from '../utils/helper';
import Table from '../components/Table';

function SchoolList() {
  useDocumentTitle('School List - Nott Course');
  const [schools, setSchools] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    (async () => {
      const fetchedSchools = await getSchoolList();
      setSchools(addKeys(fetchedSchools.map((s) => ({ school: s }))));
      setSearched(true);
    })();
  }, []);

  return (
    <div className="page-ctn">
      <h1>Schools</h1>
      {!searched
        ? <div>Loading schools...</div>
        : <Table data={schools} links={{ school: 'school' }} />}
    </div>
  );
}

export default SchoolList;
