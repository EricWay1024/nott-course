import React from 'react';
import PropTypes from 'prop-types';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import Button from '@mui/material/Button';
import { useDocumentTitle } from '../utils/helper';
import './IndexPage.css';

function IndexCard(props) {
  const { buttonHref, label, buttonCaption } = props;
  return (
    <div className="index-card">
      <RadioButtonCheckedIcon className="content-bullet" sx={{ fontSize: { xs: '20px', sm: '30px' }, color: 'white' }} />
      <div className="index-content">
        {label}
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
        href={buttonHref}
      >
        {buttonCaption}
      </Button>
    </div>
  );
}

IndexCard.defaultProps = {
  buttonCaption: '',
  buttonHref: '',
  label: '',
};

IndexCard.propTypes = {
  buttonHref: PropTypes.string,
  buttonCaption: PropTypes.string,
  label: PropTypes.string,
};

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
            Welcome to Nott Course.
            View details of modules and academic plans from University of Nottingham
            here, and easily draft your module choices.
            The data for the
            {' '}
            <b>2024-25 academic year</b>
            {' '}
            was last updated on 01 October, 2024.
            Developed by alumni.
          </div>
        </div>
        <div className="cards-wrapper">
          <IndexCard
            buttonHref="/course-index"
            buttonCaption="MODULE"
            label="Find and view modules"
          />
          <IndexCard
            buttonHref="/plan-index"
            buttonCaption="PLAN"
            label="Find and view degree plans"
          />
          <IndexCard
            buttonHref="/my"
            buttonCaption="MY"
            label="Draft your module selection"
          />
          <IndexCard
            buttonHref="/about"
            buttonCaption="ABOUT"
            label="See instructions on how to use"
          />
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
