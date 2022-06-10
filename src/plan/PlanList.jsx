import React, { useEffect, useState } from 'react';
import { getPlanList } from '../services/plan';
import { useDocumentTitle } from '../utils/helper';
import Table from '../components/Table';

function PlanList() {
  useDocumentTitle('Plans');
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
      || contains(plan.ucasCode, keyword))
    .map((plan) => ({
      title: plan.title,
      academicPlanCode: plan.academicPlanCode,
      ucasCode: plan.ucasCode,
    }))
    .sort((a, b) => a.ucasCode > b.ucasCode);

  if (!searched) return <div>Loading plans...</div>;

  return (
    <div className="page-ctn">
      <h1>Plan List</h1>
      <div className="input-ctn">
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <Table data={displayedPlans} links={{ academicPlanCode: 'plan' }} />
    </div>
  );
}

export default PlanList;
