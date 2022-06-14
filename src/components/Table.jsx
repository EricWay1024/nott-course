import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addKeys, processStr, camelCaseToWords } from '../utils/helper';
import './Table.css';

function Table(props) {
  const {
    noHead, noBold, data, links, keyDisplay, orderedKeys,
  } = props;
  if (!data) return <div />;
  if (!data.length) return <div>None</div>;
  const dataWithId = addKeys(data);
  const existingKeys = Object.keys(dataWithId[0]);
  const keys = orderedKeys.filter((key) => existingKeys.includes(key));
  return (
    <div className="table-ctn">
      <table className="greyGridTable">
        {!noHead && (
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key}>{keyDisplay[key] || camelCaseToWords(key)}</th>
            ))}
          </tr>
        </thead>
        )}

        <tbody>
          {dataWithId.map((item) => (
            <tr key={item.id}>
              {keys.map((key, index) => (
                <td
                  key={key}
                  className={index === 0 && noHead && !noBold ? 'bold' : ''}
                >
                  {links[key] ? (
                    <Link to={`/${links[key]}/${item[key]}`}>
                      {processStr(item[key])}
                    </Link>
                  ) : (
                    processStr(item[key])
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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
