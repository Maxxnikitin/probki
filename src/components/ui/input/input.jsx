import React from "react";
import { nanoid } from "nanoid";
import InputMask from "react-input-mask";
import { textInput } from "../../../texts/ru";
import styles from "./input.module.css";
import eyeIcon from "../../../images/icons/eye.svg";
import eyeOffIcon from "../../../images/icons/eye-off.svg";

export const Input = ({
  label,
  error = "",
  extraClass = "",
  kind = "form",
  type,
  ...rest
}) => {
  const [passwordOpen, setPasswordOpen] = React.useState(false);
  const id = nanoid();
  const customType =
    type === "password" ? (passwordOpen ? "text" : "password") : type;
  const passwordIcon = customType === "password" ? eyeOffIcon : eyeIcon;
  const inputTextColor =
    kind === "form" ? "text_color_input" : "text_color_select";

  const handleTogglePassword = () => {
    setPasswordOpen(!passwordOpen);
  };

  return (
    <div className={`${styles.content} ${extraClass}`}>
      {label && (
        <label
          className={`${styles.label} text text_type_medium text_color_black pb-3`}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      {type === "tel" ? (
        <InputMask
          id={id}
          type={customType}
          className={`${styles.input} ${styles[kind]} text text_type_medium ${inputTextColor}`}
          mask="+7-999-999-99-99"
          maskChar=" "
          {...rest}
        />
      ) : (
        <input
          id={id}
          type={customType}
          className={`${styles.input} ${styles[kind]} text text_type_medium ${inputTextColor}`}
          {...rest}
        />
      )}
      {type === "password" && (
        <button
          type="button"
          className={styles.eye_btn}
          onClick={handleTogglePassword}
        >
          <img
            className={styles.eye_img}
            src={passwordIcon}
            alt={textInput.passwordAlt}
          />
        </button>
      )}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
