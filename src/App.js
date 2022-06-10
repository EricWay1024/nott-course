import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import React from "react";
import { useEffect, useState } from 'react'
import { getCourse, getCourseList, getSchoolList } from './services/course';
import { getPlan, getPlanList } from './services/plan';

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

const addKeys = (data) => {
  if (!data.length) return [];
  if (data[0].id) return data;
  return data.map((item, index) => {
    return { ...item, id: item._id || index };
  });
};

const decodeEntities = (function() {
  // this prevents any overhead from creating the object each time
  var element = document.createElement('div');

  function decodeHTMLEntities (str) {
    if(str && typeof str === 'string') {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = '';
    }

    return str;
  }

  return decodeHTMLEntities;
})();

const processStr = (str) => {
  // remove HTML entities from str
  if (typeof str !== "string") return str;
  let res = str;
  while (1) {
    const newStr = res.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&#x2F;/g, "/").replace(/&nbsp;/g, " ");
    if (newStr === res) break;
    else res = newStr;
  }
  return decodeEntities(res);
};

const camelCaseToWords = function(str){
  if (str === "ucasCode") return "UCAS Code";
  return str.match(/^[a-z]+|[A-Z][a-z]*/g).map(function(x){
      return x[0].toUpperCase() + x.substr(1).toLowerCase();
  }).join(' ');
};


const RenderHtml = (props) => {
  // convert html to a react element
  let { html } = props;
  if (!html) { return <div></div>; }
  html = html.replace(/(style|face|color|width|height|class)="[^"]*"/g, ""); // remove styles
  html = html.replace(/<img[^>]*>/g, ""); // remove images
  html = html.replace(/(<br>)+/g, "<br>"); // remove multiple brs

  const id2class = (idRegex, className) => {
    html = html.replace(new RegExp(`id="${idRegex}"`, "g"), `class="${className}"`);
  }

  // style education aims for plan
  id2class("win0divUN_PAM_AIMS_VW_SEQNBR\\$[0-9]+", "hidden");
  id2class("UN_PAM_AIMS_VW_UN_AIMS\\$[0-9]+", "aims-item");

  // style learning outcomes for plan
  id2class("win0divUN_QA_LRN_OUTCO_UN_LEARN_OUTCOME_T\\$[0-9]+", "lo-title");
  id2class("win0divUN_QAA_LRN_OUTC\\$[0-9]+", "lo-content");
  id2class("win0divUN_QAA_LRN_OUTCGP\\$[0-9]+", "hidden");
  id2class("win0divUN_QA_LRN_OUTCO_UN_TEACH_LRN_ASSMN\\$[0-9]+", "lo-content");

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

function Table(props) {
  if (!props.data) return (<div/>);
  const data = addKeys(props.data);
  if (!data.length) return (<div>None</div>);
  const { noHead, noBold } = props;
  const links = props.links || {};
  const keys = Object.keys(data[0]).filter((key) => key !== "id" && key !=="_id");
  return (
    <table className="greyGridTable">
      {!noHead && (
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key}>{camelCaseToWords(key)}</th>
            ))}
          </tr>
        </thead>
      )}

      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {keys.map((key, index) => (
              <td key={key} className={index === 0 && noHead && !noBold ? 'bold' : ''}>
                {links[key] ? 
                  (<Link to={`/${links[key]}/${item[key]}`}>{processStr(item[key])}</Link>) : 
                  processStr(item[key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CoursePage(props) {
  const { code } = {...useParams(), ...props};
  useDocumentTitle(`${code} - Module Details`);

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
    <div className="page-ctn">
      <h1>{`${course.code} - ${course.title}`}</h1>
      <Table data={([{
        key: "Code",
        value: course.code
      },
      {
        key: "Title",
        value: course.title
      },
      {
        key: "Credits",
        value: course.credits
      },
      {
        key: "Level",
        value: course.level
      },
      {
        key: "Offering School",
        value: course.offering
      },
      {
        key: "Semester",
        value: course.semester
      }
      ])} noHead/>
      <h2>Target Students</h2>
      <RenderHtml html={course.targetStudents} />
      <h2>Summary of Content</h2>
      <RenderHtml html={course.summary} />
      <h2>Course Web Links</h2>
      <Table data={course.courseWebLinks}/>
      <h2>Education Aims</h2>
      <RenderHtml html={course.aims} />
      <h2>Convenor</h2>
      <Table data={course.convenor} />
      <h2>Requisites</h2>
      <Table data={course.requisites} links={{subject: "module"}}/>
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
  );
}


const CourseList = (props) => {
  const { offering } = {...useParams(), ...props};
  useDocumentTitle(`${processStr(offering)} - Course List`);

  const [courses, setCourses] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    (async () => {
      const fetchedCourses = await getCourseList(offering);
      setCourses(addKeys(fetchedCourses));
      setSearched(true);
    })();
  }, [offering]);
  
  return (<div className="page-ctn">
    <h1>{processStr(offering)}</h1>
    {!searched ?
      <div>Loading courses...</div> :
      <Table data={courses} links={{code: "module"}}/>
    } 
  </div>);
}


const SchoolList = () => {
  useDocumentTitle("Schools");
  const [schools, setSchools] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    (async () => {
      const fetchedSchools = await getSchoolList();
      setSchools(addKeys(fetchedSchools.map(s => ({ school: s}))));
      setSearched(true);
    })();
  }, []);

  return (<div className="page-ctn">
    <h1>Schools</h1>
    {!searched ?
      <div>Loading schools...</div> :
      <Table data={schools} links={{school: "school"}}/>
    }
  </div>);
}


const PlanPage = (props) => {
  const { code } = {...useParams(), ...props };
  useDocumentTitle(`${code} - Plan Details`);

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
    <div className="page-ctn">
      <h1>{`${plan.title}`}</h1>

      <h2>Basic Information</h2>
      <Table data={[{
        key: "Title",
        value: plan.title
      }, {
        key: "Academic Plan Code",
        value: plan.academicPlanCode
      }, {
        key: "UCAS Code",
        value: plan.ucasCode
      }, {
        key: "Plan Type",
        value: plan.planType
      }, {
        key: "Academic Load",
        value: plan.academicLoad
      }, {
        key: "Delivery Mode",
        value: plan.deliveryMode
      }]} noHead />

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
      <Table data={[{
        key: "Plan Requirements",
        value: plan.planRequirements
      }, {
        key: "Including Subjects",
        value: plan.includingSubjects
      }, {
        key: "Excluding Subjects",
        value: plan.excludingSubjects
      }, {
        key: "Other Requirements",
        value: plan.otherRequirements
      }, {
        key: "IELTS Requirements",
        value: plan.ieltsRequirements
      }]} noHead/>
      <h3>General Information</h3>
      <RenderHtml html={plan.generalInformation} />

      <h2>Plan Structure</h2>
      <div className="struct-ctn">
        {plan.modules.map(year => (
          <div class='year-ctn'>
            <h3>{year.title}</h3>
            {year.groups.map(group => (
              <div class='group-ctn'>
                <h4>{processStr(`${group.title}`)}</h4>
                <RenderHtml html={group.message} />
                <div className="group-table-ctn">
                  <Table data={group.modules} links={{code: "module"}}/>
                </div>
              </div>
            ))}
            {year.additionalCourseChoice && (
              <div class='group-ctn'>
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
  );
}

const PlanList = () => {
  useDocumentTitle("Plans");
  const [keyword, setKeyword] = useState("");
  const contains = (str, keyword) => {
    return str.toLowerCase().includes(keyword.toLowerCase());
  }

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
    .filter(plan => contains(plan.title, keyword) 
      || contains(plan.academicPlanCode, keyword) 
      || contains(plan.ucasCode, keyword))
    .map((plan) => ({
      title: plan.title,
      academicPlanCode: plan.academicPlanCode,
      ucasCode: plan.ucasCode,
    }))
    .sort((a, b) => a.ucasCode > b.ucasCode);
  
  if (!searched) return <div>Loading plans...</div>;

  return (<div className="page-ctn">
    <h1>Plan List</h1>
    <div className="input-ctn">
      <input className="search-input" type="text" placeholder="Search" value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
    </div>
    <Table data={displayedPlans} links={{academicPlanCode: "plan"}}/>
  </div>);

}

const IndexPage = () => {
  useDocumentTitle("Nott Course Catalog");
  return (
  <div className="page-ctn">
    <h1>Nott Course Catalog</h1>
    <p>
      This is a catalog of courses offered at the <a href="https://www.nottingham.ac.uk/">Nottingham University</a>.
    </p>
    <p>
      This catalogue provides details of the curriculum content – both plans and courses (modules) delivered to students in current and previous academic sessions. Content may change in order to better reflect changes in curriculum and developments in the subject area. This catalogue is therefore a record of current and previous years’ content and should not be relied upon as a definitive guide of what will be delivered in future years.
    </p>
    <div>
      <Link to="/course-index">Courses</Link>
    </div>
    <div>
      <Link to="/plan-index">Plans</Link>
    </div>
  </div>);
}

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/course-index" element={<SchoolList />}/>
          <Route path="/plan-index" element={<PlanList />}/>
          <Route path="/school/:offering" element={<CourseList />}/>
          <Route path="/module/:code" element={<CoursePage />}/>
          <Route path="/plan/:code" element={<PlanPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
