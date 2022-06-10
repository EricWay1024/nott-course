import "./App.css";
import courseData from "./assets/courseData.json";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import React, {useState, useEffect} from "react";
import Select from 'react-select';

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}


const addKeys = (data) => {
  if (!data.length) return [];
  if (data[0].id) return data;
  return data.map((item, index) => {
    return { ...item, id: index };
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
  return str.match(/^[a-z]+|[A-Z][a-z]*/g).map(function(x){
      return x[0].toUpperCase() + x.substr(1).toLowerCase();
  }).join(' ');
};


const RenderHtml = (props) => {
  // convert html to a react element
  let { html } = props;
  html = html.replace(/(style|face|color)="[^"]*"/g, "");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

function Table(props) {
  const data = addKeys(props.data);
  if (!data.length) return (<div>None</div>);
  const { noHead } = props;
  const links = props.links || {};
  const keys = Object.keys(data[0]).filter((key) => key !== "id");
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
              <td key={key} className={index === 0 && noHead ? 'bold' : ''}>
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
  const course = courseData.data.find((course) => course.code === code);
  if (!course) return <div>Course code not found</div>;

  return (
    <div className="page-ctn">
      <h1>{`${course.code} - ${course.title}`}</h1>
      <Table data={addKeys([{
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
        key: "Offering",
        value: course.offering
      },
      {
        key: "Semester",
        value: course.semester
      }
      ])} noHead/>
      <h2>Assessment</h2>
      <Table data={course.assessment} />
      <h2>Requisites</h2>
      <Table data={course.requisites} links={{subject: "module"}}/>
      <h2>Additional Requirements</h2>
      <Table data={course.additionalRequirements} />
      <h2>Class</h2>
      <Table data={course.class} />
      <h2>Summary</h2>
      <RenderHtml html={course.summary} />
      <h2>Aims</h2>
      <RenderHtml html={course.aims} />
      <h2>Outcome</h2>
      <RenderHtml html={course.outcome} />
      <h2>Convenor</h2>
      <Table data={course.convenor} />
      <h2>Belongs To</h2>
      <Table data={[course.belongsTo]} />
    </div>
  );
}


let AllSchools = [];
let AllCredits = [];
let AllLevels = [];
let AllSemesters = [];

function generateList(){
  AllSchools = courseData.data
  .map((course) => (course.offering))
  .filter((x, i, a) => a.indexOf(x) === i)
  .sort()
  .map( (school) => {return {value: school, label : school}});

  AllCredits = [...new Set(courseData.data.map((course) => (course.credits)))]
  .sort((a, b)=> a - b)
  .map((credit) => {return {value: credit, label: credit}});

  AllLevels = [...new Set(courseData.data.map((course) => (course.level)))]
  .sort((a, b)=> a - b)
  .map((level) => {return {value: level, label: level}});

  AllSemesters = [...new Set(courseData.data.map((course) => (course.semester)))]
  .sort()
  .map((semester) => {return {value: semester, label: semester}});

}

let schoolFilters = [];
let creditFilters = [];
let levelFilters = [];
let semesterFilters = [];


const AllCourseList = () => {
  const allCourses = courseData.data
  .map((course) => ({
    id: course.code,
    code: course.code,
    title: course.title,
    credits: course.credits,
    offering: course.offering,
    level: course.level,
    semester: course.semester,
  }))
  .sort((a, b) => a.code > b.code);
  useDocumentTitle("Courses");

  // console.log(allCourses)

  const[courses, setCourses] = useState(allCourses);

  generateList();

  const updateCourses = () => {
    setCourses(allCourses
      .filter((course) => {
        if(schoolFilters.length === 0)
          return true
        return schoolFilters.includes(course.offering);})
      .filter((course) => {
        if(creditFilters.length === 0)
        return true
      return creditFilters.includes(course.credits);})
      .filter((course) => {
        if(levelFilters.length === 0)
        return true
      return levelFilters.includes(course.level);})
      .filter((course) => {
        if(semesterFilters.length === 0)
        return true
      return semesterFilters.includes(course.semester);})
    )
  }

  const schoolSelection = (selectedSchools) => {
    schoolFilters = selectedSchools.map(e => e.value)
    updateCourses();

  }

  const creditSelection = (selectedCredits) => {
    creditFilters = selectedCredits.map(e => e.value)
    updateCourses();
  }

  const levelSelection = (selectedLevels) => {
    levelFilters = selectedLevels.map(e => e.value)
    updateCourses();
  }

  const semesterSelection = (selectedSemesters) => {
    semesterFilters = selectedSemesters.map(e => e.value)
    updateCourses();
  }

  return (<div className="page-ctn">
    <h1>Courses</h1>
    <h3>Schools</h3>
    <Select
        closeMenuOnSelect={false}
        isMulti
        onChange={ selectedSchools => schoolSelection(selectedSchools)}
        options={AllSchools}
      />
    <h3>Credit</h3>
    <Select
        closeMenuOnSelect={false}
        isMulti
        onChange={ selectedCredits => creditSelection(selectedCredits)}
        options={AllCredits}
      />
    <h3>Level</h3>
    <Select
        closeMenuOnSelect={false}
        isMulti
        onChange={ selectedLevels => levelSelection(selectedLevels)}
        options={AllLevels}
      />
    <h3>Semester</h3>
    <Select
        closeMenuOnSelect={false}
        isMulti
        onChange={ selectedSemesters => semesterSelection(selectedSemesters)}
        options={AllSemesters}
      />

    <br></br>

    <Table data={courses} links={{code: "module"}}/>
  </div>);
}


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AllCourseList />}/>
          <Route path="/module/:code" element={<CoursePage />}/>
        </Routes>
      </Router>
    </div>
  );
}


export default App;
