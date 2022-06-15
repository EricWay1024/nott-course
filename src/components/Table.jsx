/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addKeys, processStr, camelCaseToWords } from '../utils/helper';
import './Table.css';
import { DataGrid } from '@mui/x-data-grid';

function Table(props) {
  const {
    noHead, noBold, data, links, keyDisplay, orderedKeys,
  } = props;
  if (!data) return <div />;
  if (!data.length) return <div>None</div>;
  const existingKeys = Object.keys(data[0]);
  const keys = orderedKeys.filter((key) => existingKeys.includes(key));

  const lengths = {};
  for (let i = 0; i < Math.min(10, data.length); i++) {
    const row = data[i];
    keys.forEach((key) => {
      const l = row[key].toString().length + 3;
      if (lengths[key]) lengths[key] += l;
      else lengths[key] = l;
    })
  }

  const columns = keys.map(
    (key, index) => {
      const colConfigs = {
        field: key,
        headerName: keyDisplay[key] || camelCaseToWords(key),
        flex: lengths[key],
        minWidth: 100,
        cellClassName: index === 0 && noHead && !noBold ? 'bold' : '',
        align: 'center',
        headerAlign: 'center',
      };
      if (links[key]) {
          colConfigs.renderCell = (cellValues) => (
            <Link target="_blank" to={`/${links[key]}/${cellValues.value}`}>
              {cellValues.value}
            </Link>
          );
        }
      return colConfigs;
  });

  const rows = addKeys(data.map(
    (row) => {
      const newRow = {};
      keys.forEach((key) => {
        newRow[key] = processStr(row[key]);
      })
      return newRow;
    }
  ));

  const optionalProps = {};
  if (noHead) {
    optionalProps.headerHeight = 0;
    optionalProps.hideFooter = true;
  }

  if (data.length <= 100) {
    optionalProps.hideFooter = true;
  }

  return (
    <div className="table-ctn">
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        getRowHeight={() => 'auto'}
        {...optionalProps}
      />
    </div>
  );
}

Table.defaultProps = {
  noHead: false,
  noBold: false,
  links: {},
  keyDisplay: {},
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  noHead: PropTypes.bool,
  noBold: PropTypes.bool,
  links: PropTypes.shape({}),
  keyDisplay: PropTypes.shape({}),
  orderedKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Table;
