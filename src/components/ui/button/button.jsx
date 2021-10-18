import React from 'react';
import styles from './button.module.css';

export const Button = ({ kind = 'form', type = 'button', text, onClick, extraClass = '' }) => {
  return (
    <button
      className={`text text_type_medium-white ${styles.button} ${styles[kind]} ${extraClass}`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
