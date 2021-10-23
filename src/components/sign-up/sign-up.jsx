import React from "react";
import styles from "./form-container.module.css";
import { FormContainer } from '../ui/form-container/form-container';

export const SignUp = ({
  children,
  extraClass = "",
}) => {
  return (
    <FormContainer>
      <form className={styles.form}>
        <h3 className='text text_type_h3 text_color_black'>Регистрация</h3>
      </form>
    </FormContainer>
  );
};
