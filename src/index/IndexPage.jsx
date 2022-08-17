import React from 'react';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import Button from '@mui/material/Button';
import { useDocumentTitle } from '../utils/helper';
import './IndexPage.css';

function IndexPage() {
  useDocumentTitle('Nott Course');
  return (
    <div className="index-page-wrapper">
      <div className="icon-wrapper">
        <AllInclusiveIcon
          sx={{
            display: { xs: 'none', sm: 'block' },
            fontSize: 800,
            opacity: 0.8,
            color: 'white',
            overflow: 'hidden',
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
            This catalogue provides details of the curriculum content – both plans and
            modules delivered to students in current academic sessions.
          </div>
        </div>
        <div className="cards-wrapper">
          <div className="index-card course-card">
            <RadioButtonCheckedIcon className="content-bullet" sx={{ fontSize: { xs: '20px', sm: '30px' }, color: 'white' }} />
            <div className="index-content">
              Find and view your modules
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
              MODULE
            </Button>
          </div>
          <div className="index-card">
            <RadioButtonCheckedIcon className="content-bullet" sx={{ fontSize: { xs: '20px', sm: '30px' }, color: 'white' }} />
            <div className="index-content">
              Find and view your degree plan
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
          <div className="index-card">
            <RadioButtonCheckedIcon className="content-bullet" sx={{ fontSize: { xs: '20px', sm: '30px' }, color: 'white' }} />
            <div className="index-content">
              Draft your module selection
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
              className="index-button"
              href="/my"
            >
              MY
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
