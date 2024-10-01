import FunctionsIcon from '@mui/icons-material/Functions';
import React from 'react';
import SupportButtons from '../components/SupportButtons';
import BMCButton from '../components/BMCButton';
import ScreenshotCourseFilter from '../assets/Screenshot-CourseFilter.png';

function About() {
  return (
    <div className="about-page-wrapper">
      <SupportButtons />
      <BMCButton />
      <h1>About</h1>
      <h2>{'What\'s Nott Course?'}</h2>
      <p>
        Nott Course is an
        {' '}
        <b>UNOFFICIAL</b>
        {' '}
        enhancement of
        {' '}
        <a href="https://campus.nottingham.ac.uk/psp/csprd_pub/EMPLOYEE/HRMS/c/UN_PROG_AND_MOD_EXTRACT.UN_PAM_CRSE_EXTRCT.GBL">
          the University of Nottingham course catalogue
        </a>
        , developed for better experience in browsing details of modules and academic plans
        and easy drafting of module choices.
      </p>
      <p>
        Nott Course is free and open-sourced on GitHub.
        {' '}
        <a href="https://github.com/EricWay1024/nott-course">Give the repo a star</a>
        ,
        {' '}
        <a href="https://github.com/sponsors/EricWay1024">sponsor us</a>
        , or
        {' '}
        <a href="https://www.buymeacoffee.com/ericway1024">buy me a coffee</a>
        ,
        if this project helps you.
        {' '}
        <b>
          Help is wanted from anyone that would like to maintain this project
          and keep the data updated.
        </b>
      </p>
      <p>
        Remember to share the link
        {' '}
        <a href="https://nott-course.uk/">nott-course.uk</a>
        {' '}
        with your classmates.
      </p>
      <h2>How to view the details of a module?</h2>
      <p>
        Go to
        {' '}
        <a href="/course-index">MODULE</a>
        {' '}
        and search for the module using its code or title.
      </p>
      <h2>How to view the details of a plan?</h2>
      <p>
        Go to
        {' '}
        <a href="/plan-index">PLAN</a>
        {' '}
        and search for the plan using its title, academic plan code, or UCAS code.
      </p>
      <h2>How do I draft my module choices?</h2>
      <p>
        <ol>
          <li>
            Go to
            {' '}
            <a href="/plan-index">PLAN</a>
            {' '}
            and find your current academic plan. Follow the
            link to its detail page.
          </li>
          <li>
            Tick the checkbox of your current year.
            You may expand the tabs to see all the modules in a year.
          </li>
          <li>
            Go to
            {' '}
            <a href="/my">
              MY
            </a>
            {' '}
            , where now you can see your selected year. You can now freely choose any
            modules by ticking their checkbox.
            Click the
            {' '}
            <FunctionsIcon
              sx={{ fontSize: '18px' }}
            />
            {' '}
            icon floating on the page to see if the modules currently selected satisfy
            the credit restrictions of your plan. (You may also edit the restrictions
            if they are incorrect.)
          </li>
          <li>
            If you need any additional modules that are not included in your plan,
            simply go to
            {' '}
            <a href="/course-index">MODULE</a>
            {' '}
            and search for what you need. You may find the module filters
            useful (see below). Choose any modules you are interested in by ticking the checkbox,
            and they will appear in
            {' '}
            <a href="/my">
              MY
            </a>
            {' '}
            (near the bottom of the page) after reloading.
          </li>
        </ol>
      </p>
      <h2>You mentioned the module filters. How do they work?</h2>
      <p>
        This is best illustrated using an example. Suppose you want to find some module
        <ul>
          <li>run by either the school of Computer Science or Mathematical Sciences,</li>
          <li>in any level,</li>
          <li>worth 10 credits, and</li>
          <li>taught in the spring semester,</li>
        </ul>
        Then this is what your search looks like:
        <img src={ScreenshotCourseFilter} alt="a sample search using course filter" className="plan-img" />
      </p>
      <h2>How to generate a list of all my selected modules and their assessements?</h2>
      <p>
        Go to
        {' '}
        <a href="/my-assess">Summary Lists</a>
        . You can also find an entry on
        {' '}
        <a href="/my">
          MY
        </a>
        {' '}
        .
      </p>
      <h2>Wait, but is the data on Nott Course accurate?</h2>
      <p>
        We obtain all the data from University of Nottingham. We restructure the data
        and present them in a more user-friendly way without tampering with their content.
        Please note that while we try to keep the data on this website accurate and up
        to date, there is no guarantee of that. Beware and use with care.
      </p>
      <p>
        The data on this website was last updated on
        {' '}
        <b>01 October, 2024.</b>
      </p>
      <p>
        If you ever spot any
        {' '}
        <b>informational discrepancies</b>
        {' '}
        between this website and
        {' '}
        <a href="https://campus.nottingham.ac.uk/psp/csprd_pub/EMPLOYEE/HRMS/c/UN_PROG_AND_MOD_EXTRACT.UN_PAM_CRSE_EXTRCT.GBL">
          the original course catalogue
        </a>
        , please create an issue on
        {' '}
        <a href="https://github.com/EricWay1024/nott-course">GitHub</a>
        {' '}
        or simply
        {' '}
        <a href="mailto:ericway1024@gmail.com">email us</a>
        . If the
        {' '}
        <b>original catalogue</b>
        {' '}
        itself
        contains any inaccuracies, please directly report to the university.
      </p>
      <h2>I hate to ask, but do you collect user data?</h2>
      <p>
        No. Only essential data (e.g. the module code you typed in the search bar)
        is transmitted to our server for database query
        and is not recorded in any format.
        Your course/plan selections are processed locally on your browser and are
        not transmitted to the server.
      </p>
      <h2>Who contributed to Nott Course?</h2>
      <p>
        Nott Course is developed by
        {' '}
        <a href="https://github.com/EricWay1024">Yuhang &quot;Eric&quot; Wei</a>
        {' '}
        (full-stack development, product management, data processing, and server maintenance)
        {' '}
        and
        {' '}
        <a href="https://github.com/AugustineFu">Ao &quot;Augustine&quot; Fu</a>
        {' '}
        (front-end development and visual design).
        All contributors are former students of University of Nottingham.
      </p>
      <h2>Why did you develop this website?</h2>
      <p>
        When
        my friends and I were selecting our modules for the final year at UoN,
        we had a difficult time navigating
        through the official catalog.
        We wanted to explore additional modules from other departments,
        but we could not conveniently browse all the possible options
        (e.g., in a certain semester, with certain credits, or within a certain level range).
        This project started as a Python script to filter modules in a JSON file obtained by
        {' '}
        <a href="https://github.com/uFair-Tech/uCourse-crawler">a web crawler</a>
        {' '}
        developed by
        {' '}
        <a href="https://github.com/Songkeys">Songkeys</a>
        , and eventually evolved into a full-stack web development project that
        occupied a big part of my 2022 summer.
        {' '}
        <b>
          Choosing your modules is one of the most important decisions you will make at university,
          and you deserve to be well-informed.
        </b>
      </p>
      <h2>DISCLAIMER</h2>
      <p>
        All the data on this website can be accessed publicly on the original website.
        University of Nottingham has the copyright of all the data.
      </p>
      <p>
        The information contained in this website is for general information purposes
        only. The information is provided by University of Nottingham and while we
        endeavour to keep the information up to date and correct, we make no representations
        or warranties of any kind, express or implied, about the completeness, accuracy,
        reliability, suitability or availability with respect to the website or the
        information, products, services, or related graphics contained on the website
        for any purpose. Any reliance you place on such information is therefore
        strictly at your own risk.
      </p>
      <p>
        In no event will we be liable for any loss or damage including without limitation,
        indirect or consequential loss or damage, or any loss or damage whatsoever arising
        from loss of data or profits arising out of, or in connection with, the use of this
        website.
      </p>

    </div>
  );
}

export default About;
