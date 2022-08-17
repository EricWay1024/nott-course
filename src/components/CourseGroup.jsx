import PropTypes from 'prop-types';
import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from './Table';
import RenderHtml from './RenderHtml';
import { processStr } from '../utils/helper';

function CourseGroup(props) {
  const {
    group, groupIndex, yearIndex, enableSelection, onSelectionMapChange,
  } = props;
  return (
    <Accordion
      key={group.title}
      TransitionProps={{ unmountOnExit: true }}
      defaultExpanded={group.type !== 'Alternative'}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`plan-${yearIndex}-${groupIndex}`}
      >
        {processStr(`${group.title}`)}
      </AccordionSummary>

      <AccordionDetails id={`plan-${yearIndex}-${groupIndex}`}>
        <RenderHtml html={group.message} />
        <div className="group-table-ctn">
          <Table
            data={group.modules}
            links={{ code: 'module' }}
            orderedKeys={['code', 'title', 'credits', 'compensatable', 'taught']}
            enableSelection={enableSelection}
            onSelectionMapChange={onSelectionMapChange}
            keyType={{ credits: 'number' }}
          />
        </div>
      </AccordionDetails>

    </Accordion>
  );
}

CourseGroup.defaultProps = {
  enableSelection: false,
  groupIndex: -1,
  yearIndex: -1,
  onSelectionMapChange: () => {},
};

CourseGroup.propTypes = {
  group: PropTypes.shape({
    message: PropTypes.string,
    modules: PropTypes.arrayOf(PropTypes.shape({})),
    title: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  groupIndex: PropTypes.number,
  yearIndex: PropTypes.number,
  enableSelection: PropTypes.bool,
  onSelectionMapChange: PropTypes.func,
};

export default CourseGroup;
