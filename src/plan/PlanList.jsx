import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { queryPlans } from '../services/plan';
import { useDocumentTitle } from '../utils/helper';
import Table from '../components/Table';
import SearchBar from '../components/SearchBar';

function PlanList() {
  useDocumentTitle('Plan List - Nott Course');
  const [keyword, setKeyword] = useState('');

  const [plans, setPlans] = useState([]);
  const [searched, setSearched] = useState(true);

  const handleSearch = async () => {
    setSearched(false);
    const fetchedPlans = await queryPlans({ keyword });
    setPlans(fetchedPlans);
    setSearched(true);
  };

  return (

    <div className="page-ctn">
      <h1>Plans</h1>
      <SearchBar
        value={keyword}
        handleChange={(e) => setKeyword(e.target.value)}
        handleSearch={handleSearch}
        placeholder="Input plan title, academic plan code, or UCAS code..."
        title="Plan Title / Academic Plan Code / UCAS Code"
        isHalf={false}
      />
      <br />
      <br />
      {
        searched
          ? (
            <Table
              data={plans}
              links={{ academicPlanCode: 'plan' }}
              orderedKeys={['academicPlanCode', 'title', 'degreeType', 'ucasCode']}
              keyDisplay={{ ucasCode: 'UCAS Code' }}
            />
          )
          : <CircularProgress />
      }
    </div>

  );
}

export default PlanList;
