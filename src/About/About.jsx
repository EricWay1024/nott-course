import React from 'react';

function About() {
  return (
    <div className="about-page-wrapper">
      <h2>DISCLAIMER</h2>
      <p>
        This is an
        {' '}
        <b>UNOFFICIAL</b>
        {' '}
        replicate of the course catalogue offered by University of Nottingham
        {' '}
        <a href="https://campus.nottingham.ac.uk/psp/csprd_pub/EMPLOYEE/HRMS/c/UN_PROG_AND_MOD_EXTRACT.UN_PAM_CRSE_EXTRCT.GBL">
          here
        </a>
        . All the data on this website can be accessed publicly on the original website.
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
        In no event will we be liable for any loss or damage includingwithout limitation,
        indirect or consequential loss or damage, or any loss or damage whatsoever arising
        from loss of data or profits arising out of, or in connection with, the use of this
        website.
      </p>
    </div>
  );
}

export default About;
