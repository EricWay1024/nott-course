import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {
  addKeys, processStr, camelCaseToWords, getSelectedCourses, setSelectedCourses,
} from '../utils/helper';
import './Table.css';

function Table(props) {
  const {
    noHead, noBold, data, links, keyDisplay, orderedKeys, enableSelection, keyType, datagridProps,
    onSelectionMapChange,
  } = props;
  if (!data || !data.length) return <div />;
  const existingKeys = Object.keys(data[0]);
  const keys = orderedKeys.filter((key) => existingKeys.includes(key));

  // handle column length
  const lengths = {};
  for (let i = 0; i < Math.min(10, data.length); i += 1) {
    const row = data[i];
    keys.forEach((key) => {
      const l = row[key].toString().length + 3;
      if (lengths[key]) lengths[key] += l;
      else lengths[key] = l;
    });
  }

  // set column configs
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
        type: keyType[key] || 'string',
      };
      if (links[key]) {
        colConfigs.renderCell = (cellValues) => (
          <Link target="_blank" to={`/${links[key]}/${cellValues.value}`}>
            {cellValues.value}
          </Link>
        );
      }
      return colConfigs;
    },
  );

  // generate rows
  const rows = addKeys(data.map(
    (row) => {
      const newRow = {};
      keys.forEach((key) => {
        newRow[key] = processStr(row[key]);
      });
      return newRow;
    },
  ));

  // optional props
  const optionalProps = {};
  if (noHead) {
    optionalProps.headerHeight = 0;
    optionalProps.hideFooter = true;
  }

  if (data.length <= 100) {
    optionalProps.hideFooter = true;
  }

  // handle course selection
  // eslint-disable-next-line react/prop-types
  const rowsId = rows.map((row) => row.id);

  const selectionMap = enableSelection ? getSelectedCourses() : {};

  const [selectionModel, setSelectionModel] = React.useState(
    enableSelection ? rowsId.filter((id) => selectionMap[id]) : [],
  );

  const onSelectionModelChange = (newSelectionModel) => {
    const addedCourses = newSelectionModel
      .filter((course) => !selectionModel.includes(course));
    const removedCourses = selectionModel
      .filter((course) => !newSelectionModel.includes(course));
    removedCourses.forEach((id) => { selectionMap[id] = 0; });
    addedCourses.forEach((id) => { selectionMap[id] = 1; });
    setSelectionModel(newSelectionModel);
    setSelectedCourses(selectionMap);
    onSelectionMapChange(selectionMap);
  };

  return (
    <div className="table-ctn">
      <Box>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          getRowHeight={() => 'auto'}
          checkboxSelection={enableSelection}
          disableSelectionOnClick
          onSelectionModelChange={onSelectionModelChange}
          selectionModel={selectionModel}
          sx={{
            '& .MuiDataGrid-cell': {
              py: 1.5,
            },
            '& .MuiDataGrid-row': {
              '&:hover': {
                backgroundColor: 'transparent',
              },
            },
          }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...optionalProps}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...datagridProps}
        />
      </Box>
    </div>
  );
}

Table.defaultProps = {
  noHead: false,
  noBold: false,
  links: {},
  keyDisplay: {},
  enableSelection: false,
  keyType: {},
  datagridProps: {},
  onSelectionMapChange: () => {},
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  noHead: PropTypes.bool,
  noBold: PropTypes.bool,
  links: PropTypes.shape({}),
  keyDisplay: PropTypes.shape({}),
  orderedKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  enableSelection: PropTypes.bool,
  keyType: PropTypes.shape({}),
  datagridProps: PropTypes.shape({}),
  onSelectionMapChange: PropTypes.func,
};

export default Table;
