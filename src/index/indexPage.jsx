import React from 'react';
import Grid from '@mui/material/Grid';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import Button from '@mui/material/Button';
import { useDocumentTitle } from '../utils/helper';
import './indexPage.css';

function IndexPage() {
  useDocumentTitle('Nott Course');
  return (
    <div className="index-page-wrapper">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <div className="index-ctn">
            <div className="icon-wrapper">
              <AllInclusiveIcon
                sx={{
                  display: { xs: 'none', sm: 'block' }, fontSize: 800, opacity: 0.8, color: 'white', overflow: 'hidden',
                }}
                className="index-icon"
              />
            </div>

            <div className="index-streamer">
              <div className="streamer-caption">
                NOTT COURSE
              </div>
            </div>
            <div className="index-ctn">
              <div className="caption-wrapper">
                <div className="index-caption">
                  University of Nottingham Curriculum Catalogue
                </div>
              </div>
              <div className="subtitle-wrapper">
                <div className="index-subtitle">
                  This catalogue provides details of the curriculum content – both plans and courses
                  (modules) delivered to students in current and previous academic sessions.
                </div>
              </div>
              <div className="cards-wrapper">
                <div className="index-card course-card">
                  <RadioButtonCheckedIcon className="content-bullet" sx={{ fontSize: { xs: '20px', sm: '30px' }, color: 'white' }} />
                  <div className="index-content">
                    With
                    {' '}
                    <b>COURSE</b>
                    , find and view your courses
                  </div>
                  <Button
                    sx={{
                      color: 'rgba(27, 42, 107, 0.7)',
                      backgroundColor: 'white',
                      height: { sm: '50px' },
                      width: { sm: '96px' },
                      fontSize: '18px',
                      fontWeight: '900',
                      '&:hover': {
                        backgroundColor: 'rgba(27, 42, 107, 0.6)',
                        color: 'white',
                      },
                    }}
                    className="index-button"
                    href="/course-index"
                  >
                    COURSE
                  </Button>
                </div>
                <div className="index-card">
                  <RadioButtonCheckedIcon className="content-bullet" sx={{ fontSize: { xs: '20px', sm: '30px' }, color: 'white' }} />
                  <div className="index-content">
                    With
                    {' '}
                    <b>PLAN</b>
                    , find and view your degree plan
                  </div>
                  <Button
                    sx={{
                      color: 'rgba(27, 42, 107, 0.7)',
                      backgroundColor: 'white',
                      height: { sm: '50px' },
                      width: { sm: '96px' },
                      fontSize: '18px',
                      fontWeight: '900',
                      '&:hover': {
                        backgroundColor: 'rgba(27, 42, 107, 0.6)',
                        color: 'white',
                      },
                    }}
                    className="index-button plan-button"
                    href="/plan-index"
                  >
                    PLAN
                  </Button>
                </div>
                <div className="index-card my-card">
                  <RadioButtonCheckedIcon className="content-bullet my-bullet" sx={{ fontSize: { xs: '20px', sm: '30px' }, color: 'white' }} />
                  <div className="index-content">
                    With
                    {' '}
                    <b>MY</b>
                    , view the courses you have selected in
                    {' '}
                    <b>COURSE</b>
                    {' '}
                    and
                    {' '}
                    <b>PLAN</b>
                    {' '}
                    for personal planning
                  </div>
                  <Button
                    sx={{
                      color: 'rgba(27, 42, 107, 0.7)',
                      backgroundColor: 'white',
                      height: { sm: '50px' },
                      width: { sm: '96px' },
                      fontSize: '18px',
                      fontWeight: '900',
                      '&:hover': {
                        backgroundColor: '#00ab97',
                        color: 'white',
                      },
                    }}
                    className="index-button my-button"
                    href="/my"
                  >
                    MY
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default IndexPage;
