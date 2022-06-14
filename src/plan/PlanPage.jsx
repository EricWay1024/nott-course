import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { getPlan } from '../services/plan';
import { useDocumentTitle, processStr } from '../utils/helper';
import RenderHtml from '../components/RenderHtml';
import Table from '../components/Table';

function PlanPage(props) {
  const { code } = { ...useParams(), ...props };
  useDocumentTitle(`${code} - Plan Details - Nott Course`);

  const [plan, setPlan] = useState(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    (async () => {
      const fetchedPlan = await getPlan(code);
      setSearched(true);
      setPlan(fetchedPlan);
    })();
  }, [code]);

  if (!searched) return <div>Loading plan...</div>;
  if (!plan) return <div>Plan code not found</div>;

  return (
    <div className="page-wrapper">
      <Grid container spacing={1}>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <div className="page-ctn">
            <h1>{`${plan.title}`}</h1>

            <h2>Basic Information</h2>
            <Table
              data={[{
                key: 'Title',
                value: plan.title,
              }, {
                key: 'Academic Plan Code',
                value: plan.academicPlanCode,
              }, {
                key: 'UCAS Code',
                value: plan.ucasCode,
              }, {
                key: 'Plan Type',
                value: plan.planType,
              }, {
                key: 'Academic Load',
                value: plan.academicLoad,
              }, {
                key: 'Delivery Mode',
                value: plan.deliveryMode,
              }]}
              noHead
            />

            <h3>School(s) Responsible For Management</h3>
            <Table data={plan.school} />

            <h3>Plan Accreditation</h3>
            <Table data={plan.planAccreditation} noHead noBold />

            <h3>Relevant QAA Subject Benchmark(s)</h3>
            <Table data={plan.subjectBenchmark} noHead noBold />

            <h2>General Information</h2>
            <h3>Educational Aims</h3>
            <RenderHtml html={plan.educationalAimsIntro} />
            <RenderHtml html={plan.educationalAims} />
            <h3>Outline Description</h3>
            <RenderHtml html={plan.outlineDescription} />

            <h3>Distinguishing Features</h3>
            <RenderHtml html={plan.distinguishingFeatures} />

            <h3>Further Information</h3>
            <RenderHtml html={plan.furtherInformation} />

            <h2>Admission Requirements</h2>
            <Table
              data={[{
                key: 'Plan Requirements',
                value: plan.planRequirements,
              }, {
                key: 'Including Subjects',
                value: plan.includingSubjects,
              }, {
                key: 'Excluding Subjects',
                value: plan.excludingSubjects,
              }, {
                key: 'Other Requirements',
                value: plan.otherRequirements,
              }, {
                key: 'IELTS Requirements',
                value: plan.ieltsRequirements,
              }]}
              noHead
            />
            <h3>General Information</h3>
            <RenderHtml html={plan.generalInformation} />

            <h2>Plan Structure</h2>
            <div className="struct-ctn">
              {plan.modules.map((year) => (
                <div className="year-ctn">
                  <h3>{year.title}</h3>
                  {year.groups.map((group) => (
                    <div className="group-ctn">
                      <h4>{processStr(`${group.title}`)}</h4>
                      <RenderHtml html={group.message} />
                      <div className="group-table-ctn">
                        <Table data={group.modules} links={{ code: 'module' }} />
                      </div>
                    </div>
                  ))}
                  {year.additionalCourseChoice && (
                    <div className="group-ctn">
                      <h4>Additional course choice</h4>
                      <RenderHtml html={year.additionalCourseChoice} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <h2>Assessment</h2>
            <RenderHtml html={plan.assessment} />
            <h3>Assessment Marking Criteria</h3>
            <RenderHtml html={plan.assessmentMarking} />
            <h3>Progression Information</h3>
            <RenderHtml html={plan.progressionInformation} />
            <h3>Borderline Criteria</h3>
            <RenderHtml html={plan.borderlineCriteria} />
            <h3>Degree Information</h3>
            <RenderHtml html={plan.degreeInformation} />
            <h3>Course Weightings</h3>
            <Table data={plan.courseWeightings} noHead />
            <h3>Degree Calculation Model</h3>
            <Table data={plan.degreeCalculationModel} noHead noBold />

            <h2>Other Regulations</h2>
            <RenderHtml html={plan.otherRegulations} />
            <h3>Notwithstanding Regulations</h3>
            <RenderHtml html={plan.notwithstandingRegulations} />

            <h2>Learning Outcomes</h2>
            <RenderHtml html={plan.overview} />
            <RenderHtml html={plan.assessmentMethods} />

            <h3>Teaching and Learning</h3>
            <RenderHtml html={plan.teachingAndLearning} />
            <RenderHtml html={plan.learningOutcomes} />

          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default PlanPage;
