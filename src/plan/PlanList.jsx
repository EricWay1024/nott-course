import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { getPlanList } from '../services/plan';
import { useDocumentTitle } from '../utils/helper';
import Table from '../components/Table';

function PlanList() {
  useDocumentTitle('Plan List - Nott Course');
  const [keyword, setKeyword] = useState('');
  const contains = (str, word) => str.toLowerCase().includes(word.toLowerCase());

  const [plans, setPlans] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    (async () => {
      const fetchedPlans = await getPlanList();
      setSearched(true);
      setPlans(fetchedPlans);
    })();
  }, []);

  const displayedPlans = plans
    .filter((plan) => contains(plan.title, keyword)
      || contains(plan.academicPlanCode, keyword)
      || contains(plan.ucasCode, keyword));
  if (!searched) return <div>Loading plans...</div>;

  return (
    <div className="page-wrapper">
      <Grid container spacing={1}>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <div className="page-ctn">
            <h1>Plan List</h1>
            <div className="input-ctn">
              <TextField
                className="search-input"
                type="text"
                placeholder="Search"
                label="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                sx={{ backgroundColor: 'white' }}
              />
            </div>
            <Table
              data={displayedPlans}
              links={{ academicPlanCode: 'plan' }}
              orderedKeys={['academicPlanCode', 'title', 'degreeType', 'ucasCode']}
              keyDisplay={{ ucasCode: 'UCAS Code' }}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default PlanList;
