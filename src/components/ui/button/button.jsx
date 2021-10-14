import React from 'react';
import styles from './button.module.css';

export const Button = ({ kind = 'form', type = 'button', text, onClick, extraClass = '' }) => {
  return (
    <button
      className={`${styles.button} ${styles[kind]} ${extraClass}`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
