import "./App.css";
import courseData from "./assets/Course_United Kingdom_2022.json";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import React from "react";
import { useEffect } from 'react'

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
                  (<Link to={`/${links[key]}/${item[key]}`}>{item[key]}</Link>) : 
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


const CourseList = (props) => {
  const { offering } = {...useParams(), ...props};
  useDocumentTitle(`${offering} - Course List`);
  
  const courses = courseData.data
    .filter((course) => course.offering === offering)
    .map((course) => ({
      id: course.code,
      code: course.code,
      title: course.title,
      credits: course.credits,
      // level: course.level,
      semester: course.semester,
    }))
    .sort((a, b) => a.code > b.code);
  return (<div className="page-ctn">
    <h1>{offering}</h1>
    <Table data={courses} links={{code: "module"}}/>
  </div>);
}


const SchoolList = () => {
  useDocumentTitle("Schools");
  let schools = courseData.data
    .map((course) => (course.offering))
    .filter((x, i, a) => a.indexOf(x) === i)
    .sort();
  schools = addKeys(schools.map(school => ({school})));
  return (<div className="page-ctn">
    <h1>Schools</h1>
    <Table data={schools} links={{school: "school"}}/>
  </div>);
}

// const sampleTable = [
//   {
//     id: 1,
//     name: "John",
//     age: 30,
//     job: "teacher",
//   },
//   {
//     id: 2,
//     name: "Jane",
//     age: 25,
//     job: "designer",
//   },
//   {
//     id: 3,
//     name: "Bob",
//     age: 20,
//     job: "builder",
//   },
// ];
function App() {
  // const courses = courseData.data;
  return (
    <div className="App">
      {/* {courses.map((course) => (
        <div key={course.code}>
          <span>{`${course.code} ${course.title}`}</span>
        </div>
      ))} */}
      {/* <Table data={sampleTable}/> */}
      
      {/* <CoursePage code="ECON2001" /> */}
      {/* <CourseList offering="Mathematical Sciences" /> */}
      <Router>
        <Routes>
          <Route path="/" element={<SchoolList />}/>
          <Route path="/school/:offering" element={<CourseList />}/>
          <Route path="/module/:code" element={<CoursePage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
