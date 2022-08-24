import React from 'react';
import GitHubButton from 'react-github-btn';
import FunctionsIcon from '@mui/icons-material/Functions';
import ScreenshotCourseFilter from '../assets/Screenshot-CourseFilter.png';

function About() {
  return (
    <div className="about-page-wrapper">
      <h1>About</h1>
      <h2>{'What\'s Nott Course?'}</h2>
      <p>
        This website, Nott Course, is an
        {' '}
        <b>UNOFFICIAL</b>
        {' '}
        enhancement of
        {' '}
        <a href="https://campus.nottingham.ac.uk/psp/csprd_pub/EMPLOYEE/HRMS/c/UN_PROG_AND_MOD_EXTRACT.UN_PAM_CRSE_EXTRCT.GBL">
          the course catalogue offered by University of Nottingham
        </a>
        , developed with the purpose of boosting user experience in browsing module and plan
        details, and further allowing users to draft their module selection conveniently.
      </p>
      <p>
        The project is free and open-soucred on
        {' '}
        <a href="https://github.com/EricWay1024/nott-course">GitHub</a>
        . Give it a star if it helps you.
      </p>
      <div>
        <GitHubButton
          href="https://github.com/EricWay1024/nott-course"
          data-size="large"
          data-show-count="true"
          aria-label="Star EricWay1024/nott-course on GitHub"
        >
          Star
        </GitHubButton>
      </div>
      <h2>How to view the details of a module?</h2>
      <p>
        Go to MODULE and search the module using its code or title.
      </p>
      <h2>How to view the details of a plan?</h2>
      <p>
        Go to PLAN and search the plan using its title, academic plan code, or UCAS code.
      </p>
      <h2>How do I draft my module selection?</h2>
      <p>
        <ol>
          <li>
            Go to PLAN and find your current academic plan. Follow the
            link and go to its detail page.
          </li>
          <li>
            Tick the checkbox of your current year.
            You may expand the tabs to see all modules of a year.
          </li>
          <li>
            Go to MY, where now you can see your selected year. You can now
            freely tick the checkboxes of the modules you would like to choose.
            Click the
            {' '}
            <FunctionsIcon
              sx={{ fontSize: '18px' }}
            />
            {' '}
            icon floating on the page to see if currently selected modules satisfy
            the credit restrictions of your plan (you may also edit the ranges
            if they are incorrect).
          </li>
          <li>
            If you need any additional modules that are not included in your plan,
            simply go to MODULE and search for what you need. You may find the module filters
            useful (see below). Tick the checkbox of any module you are interested in,
            and they will appear in MY (near the end of the page) after reloading the page.
          </li>
        </ol>
      </p>
      <h2>You mentioned the module filters. How do they work?</h2>
      <p>
        This is best illustrated using an example. Suppose you want to find some module
        <ul>
          <li>that is run by either the school of Computer Science or Mathematical Sciences;</li>
          <li>that is worth 10 credits; and</li>
          <li>that is in the spring semester,</li>
        </ul>
        and you do not care the level of the module. Then this is what your search looks like:
        <img src={ScreenshotCourseFilter} alt="ss" className="plan-img" />
      </p>
      <h2>How to generate a list of assessments of all my selected modules?</h2>
      <p>
        Go to
        {' '}
        <a href="/my-assess">My Assessments</a>
        . You can also find an entry on MY page.
      </p>
      {/* <h2>{'OK. I\'m a bit impressed.'}</h2>
      <p>
        Please consider giving
        {' '}
        <a href="https://github.com/EricWay1024/nott-course">our repo on GitHub</a>
        {' '}
        (open-sourced under MIT license) a star if you find this website useful.
      </p> */}
      <h2>Wait, but is the data on Nott Course accurate?</h2>
      <p>
        We obtain all the data from University of Nottingham. We restructure the data
        and present them in a more user-friendly way without tampering with their content.
        Please note that while we try to keep the data on this website accurate and up
        to date, there is no guarantee of that. Please beware and use with care. There
        is also a lengthy disclaimer at the end of this
        page saying basically the same thing.
      </p>
      <p>
        The data on this website was last updated in June, 2022.
      </p>
      <p>
        If you ever spot any informational errors
        (by which we mean informational discrepancies between this website and
        {' '}
        <a href="https://campus.nottingham.ac.uk/psp/csprd_pub/EMPLOYEE/HRMS/c/UN_PROG_AND_MOD_EXTRACT.UN_PAM_CRSE_EXTRCT.GBL">
          the original course catalogue
        </a>
        )
        , please create an issue on
        {' '}
        <a href="https://github.com/EricWay1024/nott-course">GitHub</a>
        {' '}
        or simply
        {' '}
        <a href="mailto:ericway1024@gmail.com">email Eric, the main developer</a>
        . Please note that if the original catalogue contains anything different from the actual
        situation, there is nothing we can do.
      </p>
      <h2>I hate to ask, but do you collect user data?</h2>
      <p>
        No. Only essential data (e.g. the module code you typed in the search bar)
        is transmitted to our server for database query
        and is not recorded in any format.
        Your course/plan selections are processed locally on your browser and are
        not transmitted to the server.
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
