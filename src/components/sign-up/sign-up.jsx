import React from "react";
import { NavLink } from "react-router-dom";
import { FormContainer } from "../ui/form-container/form-container";
import { textSignUp, textErrorsForms } from "../../texts/ru";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { registerUser, confirmPhone, reactivatePhone } from "../../utils/api";
import styles from "./sign-up.module.css";
import Recaptcha from "react-recaptcha";

export const SignUp = ({
  isCloseBtn = false,
  isLogInBtn = false,
  handleLogOpen,
  onClose,
  extraClass = "",
}) => {
  const [userData, setUserData] = React.useState({
    fio: "",
    phone: "",
    password: "",
    agreement: false,
    code: "",
  });
  const [step, setStep] = React.useState(1);
  const [errorName, setErrorName] = React.useState("");
  const [errorPhone, setErrorPhone] = React.useState("");
  const [errorPassword, setErrorPassword] = React.useState("");
  const [errorAgreement, setErrorAgreement] = React.useState("");
  const [errorCode, setErrorCode] = React.useState("");
  const [errorServer, setErrorServer] = React.useState("");
  const [mobileCodeInput, setMobileCodeInput] = React.useState(false);
  const [isReactivate, setIsReactivate] = React.useState(false);
  const [isVerify, setIsVerify] = React.useState(false);

  const onChangeInput = (e) => {
    setUserData({
      ...userData,
      [e.target.name]:
        e.target.name === "agreement" ? e.target.checked : e.target.value,
    });
  };

  const handleVerify = (res) => {
    if (res) {
      setIsVerify(true);
    }
  };

  const handleLoadVerify = () => {
    setIsVerify(false)
  }

  const handleReactivateClick = () => {
    const userPhone = userData.phone
      .replace("+", "")
      .replaceAll("-", "")
      .replaceAll(" ", "");
    reactivatePhone(userPhone).then((res) => {
      setUserData({
        ...userData,
        code: "",
      });
      setIsReactivate(false);
      setErrorCode("");
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmitClick();
    }
  };

  const handleSubmitClick = React.useCallback(() => {
    if (isVerify) {
      const userPhone = userData.phone
        .replace("+", "")
        .replaceAll("-", "")
        .replaceAll(" ", "");
      if (step === 1) {
        errorServer && setErrorServer("");
        if (userData.fio.length < 2) {
          setErrorName(textErrorsForms.invalidName);
          return;
        } else {
          errorName && setErrorName("");
        }
        if (userPhone.length !== 11) {
          setErrorPhone(textErrorsForms.invalidPhone);
          return;
        } else {
          errorPhone && setErrorPhone("");
        }
        if (userData.password.length < 7) {
          setErrorPassword(textErrorsForms.invalidPassword);
          return;
        } else {
          errorPassword && setErrorPassword("");
        }
        if (!userData.agreement) {
          setErrorAgreement(textErrorsForms.invalidAgreement);
          return;
        } else {
          errorAgreement && setErrorAgreement("");
        }
        registerUser(userData.fio, userPhone, userData.password)
          .then((res) => {
            if (res.phone) {
              setMobileCodeInput(true);
              setStep(2);
            }
          })
          .catch((err) => {
            if (err.detail === "user exist") {
              setErrorPhone(textErrorsForms.doublePhone);
            } else {
              setErrorServer(textErrorsForms.invalidServer);
            }
          });
      } else if (step === 2) {
        errorCode && setErrorCode("");
        confirmPhone(userPhone, userData.code)
          .then((res) => {
            if (res.status === "confirmed") {
              onClose();
            }
          })
          .catch((err) => {
            if (err.detail === "something wrong, try again") {
              setIsReactivate(true);
              setErrorCode(err.detail);
            } else if (err.status === "error confirmation code") {
              setErrorCode(textErrorsForms.invalidCode);
            } else {
              setErrorCode(textErrorsForms.invalidServer);
            }
          });
      }
    } else {
      setErrorServer(textErrorsForms.invalidVerify);
    }
  }, [
    errorAgreement,
    errorCode,
    errorName,
    errorPassword,
    errorPhone,
    errorServer,
    isVerify,
    onClose,
    step,
    userData.agreement,
    userData.code,
    userData.fio,
    userData.password,
    userData.phone,
  ]);

  return (
    <FormContainer
      isCloseBtn={isCloseBtn}
      onClose={onClose}
      extraClass={extraClass}
    >
      <form className={styles.form}>
        <h3
          className={`${styles.title} text text_type_h3 text_color_black mb-12`}
        >
          {textSignUp.title}
        </h3>
        <Input
          name="fio"
          kind="form"
          type="text"
          label={textSignUp.name}
          extraClass="mb-4"
          onChange={onChangeInput}
          value={userData.fio}
          error={errorName}
          minLength={2}
        />
        <Input
          name="phone"
          kind="form"
          type="tel"
          label={textSignUp.phone}
          extraClass="mb-4"
          onChange={onChangeInput}
          value={userData.phone}
          error={errorPhone}
        />
        <Input
          name="password"
          kind="form"
          type="password"
          label={textSignUp.password}
          extraClass="mb-4"
          onChange={onChangeInput}
          value={userData.password}
          error={errorPassword}
          minLength={7}
          onKeyPress={handleKeyPress}
        />
        <div className={styles.policy_box}>
          <div className={styles.policy_row}>
            <input
              id="checkbox"
              type="checkbox"
              name="agreement"
              onChange={onChangeInput}
              className={styles.checkbox}
            />
            <label
              htmlFor="checkbox"
              className={`${styles.policy} text text_type_medium text_color_black ml-4`}
            >
              {`${textSignUp.agreement} `}
              <NavLink
                to="/privacy"
                className={`${styles.link} text_color_checkbox`}
                target="_blank"
                rel="noreferrer"
              >
                {textSignUp.privacyPolicy}
              </NavLink>
            </label>
          </div>
          {errorAgreement && (
            <span className={styles.error}>{errorAgreement}</span>
          )}
        </div>
        {mobileCodeInput && (
          <Input
            name="code"
            kind="form"
            type="text"
            label={textSignUp.code}
            extraClass="mb-8"
            onChange={onChangeInput}
            value={userData.code}
            error={errorCode}
          />
        )}
        {isReactivate && (
          <Button
            extraClass={styles.reactivate_btn}
            kind="cart"
            type="button"
            text={textSignUp.reactivete}
            onClick={handleReactivateClick}
          />
        )}
        {errorServer && <span className={styles.error}>{errorServer}</span>}
        <Recaptcha
          sitekey="6LenQsgdAAAAAIeGs8tqYQD5KOIzdcDKHQFsPPpy"
          verifyCallback={handleVerify}
          className={styles.recaptcha}
          onloadCallback={handleLoadVerify}
          size={window.screen.width > 400 ? "normal" : "compact"}
          hl="ru"
        />
        <Button
          extraClass={styles.btn}
          kind="form"
          type="button"
          text={textSignUp.btn}
          onClick={handleSubmitClick}
        />
        {isLogInBtn && (
          <div className={styles.login_box}>
            <p className="text text_type_medium text_color_black">
              {`${textSignUp.login} `}
              <button
                className={`${styles.login_btn} text text_type_medium text_color_checkbox`}
                type="button"
                onClick={handleLogOpen}
              >
                {textSignUp.loginBtn}
              </button>
            </p>
          </div>
        )}
      </form>
    </FormContainer>
  );
};
