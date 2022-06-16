import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, CircularProgress } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '../components/Table';
import RenderHtml from '../components/RenderHtml';
import { useDocumentTitle, processStr } from '../utils/helper';
import { getPlan } from '../services/plan';

function PlanPage(props) {
  const { code } = { ...useParams(), ...props };
  useDocumentTitle(`${code} - Plan Details - Nott Course`);

  const [plan, setPlan] = useState(null);
  const [searched, setSearched] = useState(false);
  const [hide, setHide] = useState(true);

  useEffect(() => {
    (async () => {
      const fetchedPlan = await getPlan(code);
      setSearched(true);
      setPlan(fetchedPlan);
    })();
  }, [code]);

  if (!searched) return <CircularProgress />;
  if (!plan) return <div>Plan code not found</div>;

  return (
    <div className="detail-page-wrapper">
      <Grid container spacing={1}>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <div className="detail-page-ctn">
            <h1>{`${plan.title}`}</h1>

            <h2>Plan Structure</h2>
            <div className="struct-ctn">
              {plan.modules.map((year, yearIndex) => (
                <Accordion TransitionProps={{ unmountOnExit: true }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`plan-year-${yearIndex}`}
                  >
                    {year.title}
                  </AccordionSummary>
                  <AccordionDetails id={`plan-year-${yearIndex}`}>

                    {year.groups.map((group, groupIndex) => (
                      <Accordion
                        TransitionProps={{ unmountOnExit: true }}
                        defaultExpanded={group.type !== 'Alternative'}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`plan-${yearIndex}-${groupIndex}`}
                        >
                          {processStr(`${group.title}`)}
                        </AccordionSummary>

                        <AccordionDetails id={`plan-${yearIndex}-${groupIndex}`}>
                          <RenderHtml html={group.message} />
                          <div className="group-table-ctn">
                            <Table
                              data={group.modules}
                              links={{ code: 'module' }}
                              orderedKeys={['code', 'title', 'credits', 'compensatable', 'taught']}
                              enableSelection
                              keyType={{ credits: 'number' }}
                            />
                          </div>
                        </AccordionDetails>

                      </Accordion>
                    ))}
                    {year.additionalCourseChoice && (
                      <Accordion
                        TransitionProps={{ unmountOnExit: true }}
                        defaultExpanded
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`plan-${yearIndex}-additional`}
                        >

                          Additional course choice
                        </AccordionSummary>
                        <AccordionDetails id={`plan-${yearIndex}-additional`}>

                          <RenderHtml html={year.additionalCourseChoice} />
                        </AccordionDetails>

                      </Accordion>

                    )}
                  </AccordionDetails>
                  {/* </div> */}
                </Accordion>

              ))}
            </div>

            { hide

              ? (
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  style={{ minHeight: '20vh' }}
                >

                  <Grid item xs={10}>
                    <Button onClick={() => { setHide(false); }} variant="contained" className="expand-btn">
                      Expand Plan Details
                    </Button>
                  </Grid>

                </Grid>
              )
              : (
                <div>

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
                    orderedKeys={['key', 'value']}
                  />

                  <h3>School(s) Responsible For Management</h3>
                  <Table
                    data={plan.school}
                    orderedKeys={['school', 'percentage']}
                  />

                  <h3>Plan Accreditation</h3>
                  <Table
                    data={plan.planAccreditation}
                    orderedKeys={['accreditation']}
                    noHead
                    noBold
                  />

                  <h3>Relevant QAA Subject Benchmark(s)</h3>
                  <Table
                    data={plan.subjectBenchmark}
                    orderedKeys={['subject']}
                    noHead
                    noBold
                  />

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
                    orderedKeys={['key', 'value']}
                  />
                  <h3>General Information</h3>
                  <RenderHtml html={plan.generalInformation} />

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
                  <Table
                    data={plan.courseWeightings}
                    noHead
                    orderedKeys={['part', 'percentage']}
                  />
                  <h3>Degree Calculation Model</h3>
                  <Table
                    data={plan.degreeCalculationModel}
                    noHead
                    noBold
                    orderedKeys={['model']}
                  />

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
              )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default PlanPage;
