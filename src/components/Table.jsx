import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addKeys, processStr, camelCaseToWords } from '../utils/helper';

function Table(props) {
  const {
    noHead, noBold, data, links,
  } = props;
  if (!data) return <div />;
  if (!data.length) return <div>None</div>;
  const dataWithId = addKeys(data);
  const keys = Object.keys(dataWithId[0]).filter(
    (key) => key !== 'id' && key !== '_id',
  );
  return (
    <table className="greyGridTable">
      {!noHead && (
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key}>{camelCaseToWords(key)}</th>
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
  );
}

Table.defaultProps = {
  noHead: false,
  noBold: false,
  links: {},
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  noHead: PropTypes.bool,
  noBold: PropTypes.bool,
  links: PropTypes.shape({}),
};

export default Table;
