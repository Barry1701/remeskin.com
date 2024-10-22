// Asset.js
import React from 'react';
import styles from '../styles/Asset.module.css';
import Spinner from 'react-bootstrap/Spinner';
import PropTypes from 'prop-types';

const Asset = ({ spinner, src, message }) => {
  return (
    <div className={`${styles.Asset} p-4`}>
      {spinner && <Spinner animation="border" />}
      {src && <img src={src} alt="Asset" className={styles.Image} />}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

Asset.propTypes = {
  spinner: PropTypes.bool,
  src: PropTypes.string,
  message: PropTypes.string,
};

export default Asset;
