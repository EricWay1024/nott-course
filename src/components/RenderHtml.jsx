import React from 'react';
import PropTypes from 'prop-types';

function RenderHtml(props) {
  // convert html to a react element
  let { html } = props;
  if (!html) {
    return <div />;
  }
  html = html.replace(/(style|face|color|width|height|class)="[^"]*"/g, ''); // remove styles
  html = html.replace(/<img[^>]*>/g, ''); // remove images
  html = html.replace(/(<br>)+/g, '<br>'); // remove multiple brs

  const id2class = (idRegex, className) => {
    html = html.replace(
      new RegExp(`id="${idRegex}"`, 'g'),
      `class="${className}"`,
    );
  };

  // style education aims for plan
  id2class('win0divUN_PAM_AIMS_VW_SEQNBR\\$[0-9]+', 'hidden');
  id2class('UN_PAM_AIMS_VW_UN_AIMS\\$[0-9]+', 'aims-item');

  // style learning outcomes for plan
  id2class('win0divUN_QA_LRN_OUTCO_UN_LEARN_OUTCOME_T\\$[0-9]+', 'lo-title');
  id2class('win0divUN_QAA_LRN_OUTC\\$[0-9]+', 'lo-content');
  id2class('win0divUN_QAA_LRN_OUTCGP\\$[0-9]+', 'hidden');
  id2class('win0divUN_QA_LRN_OUTCO_UN_TEACH_LRN_ASSMN\\$[0-9]+', 'lo-content');

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

RenderHtml.propTypes = {
  html: PropTypes.string.isRequired,
};

export default RenderHtml;
