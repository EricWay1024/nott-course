import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PropTypes from 'prop-types';

function Tips({ tip }) {
  return (
    <Tooltip
      title={<span style={{ fontSize: '16px' }}>{tip}</span>}
      arrow
    >
      <IconButton>
        <HelpOutlineIcon />
      </IconButton>
    </Tooltip>
  );
}

Tips.defaultProps = {
  tip: '',
};

Tips.propTypes = {
  tip: PropTypes.string,
};

export default Tips;
