import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
  Checkbox, CircularProgress, Typography,
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '../components/Table';
import RenderHtml from '../components/RenderHtml';
import CourseGroup from '../components/CourseGroup';
import Tips from '../components/Tips';
import {
  useDocumentTitle, getLocalStorage, setLocalStorage,
  generatePlanSettings, processStr,
} from '../utils/helper';
import { getPlan } from '../services/plan';
import './PlanPage.css';

function PlanPage(props) {
  const { code } = { ...useParams(), ...props };

  const [plan, setPlan] = useState(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    (async () => {
      const fetchedPlan = await getPlan(code);
      if (fetchedPlan && fetchedPlan.title) {
        fetchedPlan.title = processStr(fetchedPlan.title);
      }
      setSearched(true);
      setPlan(fetchedPlan);
    })();
  }, [code]);

  const [selectedYear, setSelectedYear] = useState(
    getLocalStorage(
      'selectedYear',
      { planCode: '', year: -1, yearTitle: '' },
    ),
  );

  const handleYearChange = (yearIndex) => (
    (e) => {
      e.stopPropagation();
      const newSelectedYear = {
        planCode: code,
        year: yearIndex,
        yearTitle: plan.modules[yearIndex].title,
        planTitle: plan.title,
      };
      setLocalStorage('selectedYear', newSelectedYear);
      setSelectedYear(newSelectedYear);
      generatePlanSettings(newSelectedYear, plan).then((res) => setLocalStorage('planSettings', res));
    }
  );

  const [expanded, setExpanded] = useState(false);
  const handleExpansionChange = (yearIndex) => (event, isExpanded) => {
    if (event.target.type !== 'checkbox') setExpanded(isExpanded ? yearIndex : false);
  };

  const title = (plan && !plan.error) ? `${plan ? plan.title : ''} - ${code} - Plan Details - Nott Course` : 'Nott Course';
  useDocumentTitle(title);
  if (!searched) return <CircularProgress />;
  if (plan && plan.error) {
    return (
      <div className="detail-page-ctn">
        🤯 Sorry, no plan with code
        {' '}
        {code}
        {' '}
        has been found within the current campus.
      </div>
    );
  }

  return (

    <div className="detail-page-ctn">
      <h1>{`${plan.title}`}</h1>

      <h2>Basic Information</h2>
      <Table
        data={[{
          key: 'Title',
          value: plan.title,
        },
        {
          key: 'Academic Year',
          value: plan.year,
        },
        {
          key: 'Campus',
          value: {
            U: 'United Kingdom',
            C: 'China',
            M: 'Malaysia',
          }[plan.campus],
        },
        {
          key: 'Academic Plan Code',
          value: plan.academicPlanCode,
        }, {
          key: 'UCAS Code',
          value: plan.ucasCode,
        }, {
          key: 'School(s) Responsible For Management',
          value: plan.school,
        },
        {
          key: 'Plan Type',
          value: plan.planType,
        }, {
          key: 'Delivery Mode',
          value: plan.deliveryMode,
        }, {
          key: 'Duration',
          value: plan.duration,
        }, {
          key: 'Relevant QAA Subject Benchmark(s)',
          value: plan.subjectBenchmark,
        }, {
          key: 'Accreditation',
          value: plan.planAccreditation,
        }]}
        noHead
        orderedKeys={['key', 'value']}
      />

      <h2>
        Plan Structure
        <Tips tip="Click on each year to expand its modules. Tick your current year and modules you want to choose, then go to My." />
      </h2>
      <div className="struct-ctn">

        {plan.modules.map((year, yearIndex) => (
          <Accordion
            key={year.title}
            TransitionProps={{ unmountOnExit: true }}
            expanded={expanded === yearIndex}
            onChange={handleExpansionChange(yearIndex)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`plan-year-${yearIndex}`}
            >
              <Checkbox
                checked={selectedYear.planCode === code && selectedYear.year === yearIndex}
                onChange={handleYearChange(yearIndex)}
                inputProps={{ 'aria-label': 'year checkbox' }}
              />
              <Typography>
                {year.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails id={`plan-year-${yearIndex}`}>
              {year.groups.map((group, groupIndex) => (
                <CourseGroup
                  group={group}
                  groupIndex={groupIndex}
                  yearIndex={yearIndex}
                  key={group.title}
                  enableSelection
                />
              ))}
              {year.additionalCourseChoice && (
                <CourseGroup
                  group={{
                    title: 'Additional course choice',
                    message: year.additionalCourseChoice,
                    modules: [],
                    type: 'Additional',
                  }}
                  yearIndex={yearIndex}
                />
              )}
            </AccordionDetails>
          </Accordion>

        ))}
      </div>

      <div>

        <h2>Educational Aims</h2>
        <RenderHtml html={plan.educationalAimsIntro} />
        <RenderHtml html={plan.educationalAims} />

        <h2>Programme Description</h2>
        <RenderHtml html={plan.outlineDescription} />

        <h2>Distinguishing Features</h2>
        <RenderHtml html={plan.distinguishingFeatures} />

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
          }, {
            key: 'General Information',
            value: plan.generalInformation,
          }]}
          noHead
          orderedKeys={['key', 'value']}
        />
        {/* <h3>General Information</h3>
        <RenderHtml html={plan.generalInformation} /> */}

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
        <RenderHtml html={plan.courseWeightings} />
        <h3>Degree Calculation Model</h3>
        <RenderHtml html={plan.degreeCalculationModel} />

        <h2>Other Regulations</h2>
        <RenderHtml html={plan.otherRegulations} />

        <h2>Additional Regulations</h2>
        <RenderHtml html={plan.additionalRegulations} />

        <h2>Learning Outcomes</h2>
        <RenderHtml html={plan.learningOutcomes} />

      </div>
    </div>

  );
}

export default PlanPage;
