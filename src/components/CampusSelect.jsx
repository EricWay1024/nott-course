import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import { setLocalStorage, getLocalStorage } from '../utils/helper';

function CampusSelect(props) {
  const [campus, setCampus] = useState(getLocalStorage('campus', 'U'));
  const { fontSx } = props;
  const campuses = [
    {
      name: 'UK',
      code: 'U',
    },
    {
      name: 'China',
      code: 'C',
    },
    {
      name: 'Malaysia',
      code: 'M',
    },
  ];

  return (
    <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
      <InputLabel
        id="campus-select-label"
        sx={fontSx}
      >
        Campus
      </InputLabel>
      <Select
        labelId="campus-select-label"
        id="campus-select"
        value={campus}
        label="Campus"
        onChange={(event) => {
          const v = event.target.value;
          setLocalStorage('campus', v); setCampus(v);
          window.location.reload(false);
        }}
        sx={fontSx}
      >
        {
          campuses.map(({ name, code }) => (
            <MenuItem
              sx={fontSx}
              key={code}
              value={code}
            >
              {name}
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}

CampusSelect.defaultProps = {
  fontSx: {},
};

CampusSelect.propTypes = {
  fontSx: PropTypes.shape({}),
};

export default CampusSelect;
