import React from 'react';
import styles from './filter.module.css';
import PropTypes from 'prop-types';

const Filter = props => {
  const { filter, handleChangeFilterValue } = props;

  return (
    <div>
      <p>Find contacts by name</p>
      <input className={styles.inputFilter} value={filter} onChange={handleChangeFilterValue}></input>
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleChangeFilterValue: PropTypes.func.isRequired,
}

export default Filter;
