import React from "react";
import styles from "./sign-up.module.css";
import { FormContainer } from "../ui/form-container/form-container";
import { textSignUp } from "../../texts/ru";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";

export const SignUp = ({ extraClass = "" }) => {
  return (
    <FormContainer>
      <form className={`${styles.form} ${extraClass}`}>
        <h3 className={`${styles.title} text text_type_h3 text_color_black mb-12`}>
          {textSignUp.title}
        </h3>
        <Input
          kind="form"
          type="text"
          label={textSignUp.name}
          extraClass="mb-4"
        />
        <Input
          kind="form"
          type="email"
          label={textSignUp.email}
          extraClass="mb-4"
        />
        <Input
          kind="form"
          type="tel"
          label={textSignUp.tel}
          extraClass="mb-4"
        />
        <Input
          kind="form"
          type="password"
          label={textSignUp.password}
          extraClass="mb-4"
        />
        <div className={styles.policy_box}>
          <input id="checkbox" type="checkbox" className={styles.checkbox} />
          <label
            htmlFor="checkbox"
            className={`${styles.policy} text text_type_medium text_color_black ml-4`}
          >
            {`${textSignUp.agreement} `}
            <a
              className={`${styles.link} text_color_checkbox`}
              href="www.yandex.ru"
            >
              {textSignUp.privacyPolicy}
            </a>
          </label>
        </div>
        <Button extraClass={styles.btn} kind="form" type="button" text={textSignUp.btn} />
      </form>
    </FormContainer>
  );
};
