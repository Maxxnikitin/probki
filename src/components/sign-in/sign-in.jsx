import React from "react";
import { NavLink } from "react-router-dom";
import Recaptcha from "react-recaptcha";
import styles from "./sign-in.module.css";
import { FormContainer } from "../ui/form-container/form-container";
import { textSignIn, textErrorsForms } from "../../texts/ru";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import {
  loginUser,
  resetPassword,
  confirmResetPassword,
  changePassword,
  getUserData,
  getCart,
} from "../../utils/api";
import { UserContext, CartContext } from "../../utils/context";

export const SignIn = ({ isCloseBtn = false, onClose, extraClass = "" }) => {
  const [userData, setUserData] = React.useState({
    phone: "",
    password: "",
    remember: false,
  });
  const [resetPasswordData, setResetPasswordData] = React.useState({
    phone: "",
    code: "",
    password: "",
  });
  const [invalidData, setInvalidData] = React.useState("");
  const [step, setStep] = React.useState(1);
  const [errorPhone, setErrorPhone] = React.useState("");
  const [isCodeInputOpen, setIsCodeInputOpen] = React.useState(false);
  const [isPasswordInputOpen, setIsPasswordInputOpen] = React.useState(false);
  const [errorCode, setErrorCode] = React.useState("");
  const [resetErrorCode, setResetErrorCode] = React.useState("");
  const [isReactivate, setIsReactivate] = React.useState(false);
  const [errorServer, setErrorServer] = React.useState("");
  const [isVerify, setIsVerify] = React.useState(false);
  const [isAuthVerify, setIsAuthVerify] = React.useState(true);
  const [countErrorsAuth, setCountErrorsAuth] = React.useState(0);

  const [user, setUser] = React.useContext(UserContext);
  const [cart, setCart] = React.useContext(CartContext);

  const handleVerify = (res) => {
    if (res) {
      setIsVerify(true);
    }
  };

  const handleAuthVerify = (res) => {
    if (res) {
      setIsAuthVerify(true);
    }
  };

  const handleLoadVerify = () => {
    setIsVerify(false);
  };

  const onChangeInput = (e) => {
    setUserData({
      ...userData,
      [e.target.name]:
        e.target.name === "agreement" ? e.target.checked : e.target.value,
    });
  };

  const onResetChangeInput = (e) => {
    setResetPasswordData({
      ...resetPasswordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmitClick();
    }
  };

  const handleSubmitClick = React.useCallback(() => {
    invalidData && setInvalidData(false);
    errorServer && setErrorServer("");
    if (isAuthVerify) {
      const userPhone = userData.phone
        .replace("+", "")
        .replaceAll("-", "")
        .replaceAll(" ", "");
      if (userPhone.length !== 11) {
        setErrorPhone(textErrorsForms.invalidPhone);
        return;
      } else {
        errorPhone && setErrorPhone("");
      }
      loginUser(userPhone, userData.password)
        .then((res) => {
          if (res.access) {
            Promise.all([getUserData(), getCart()]).then((res) => {
              setUser(res[0]);
              setCart(res[1]);
              onClose();
            });
          }
        })
        .catch((err) => {
          if (
            err.detail === "No active account found with the given credentials"
          ) {
            if (countErrorsAuth > 1) {
              setIsAuthVerify(false);
              setCountErrorsAuth(0);
            } else {
              setCountErrorsAuth(countErrorsAuth + 1);
              setInvalidData(textErrorsForms.invalidLogin);
            }
          } else {
            setErrorServer(textErrorsForms.invalidServer);
          }
        });
    } else {
      setErrorServer(textErrorsForms.invalidVerify);
    }
  }, [
    countErrorsAuth,
    errorPhone,
    errorServer,
    invalidData,
    isAuthVerify,
    onClose,
    setCart,
    setCountErrorsAuth,
    setUser,
    userData.password,
    userData.phone,
  ]);

  const handleForgotKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleForgotPassword();
    }
  };

  const handleForgotPassword = () => {
    const userPhone = resetPasswordData.phone
      .replace("+", "")
      .replaceAll("-", "")
      .replaceAll(" ", "");
    errorCode && setErrorCode(false);
    if (step === 1) {
      setStep(2);
    } else if (!isCodeInputOpen) {
      if (isVerify) {
        resetPassword(userPhone).then((res) => {
          if (res === 200) {
            errorPhone && setErrorPhone("");
            setIsCodeInputOpen(true);
          } else {
            setErrorPhone(textErrorsForms.invalidPhone);
          }
        });
      } else {
        setErrorPhone(textErrorsForms.invalidVerify);
      }
    } else if (!isPasswordInputOpen) {
      confirmResetPassword(userPhone, resetPasswordData.code).then((res) => {
        if (res === 403) {
          setErrorCode(textErrorsForms.invalidCode);
        } else if (res === 202) {
          setIsPasswordInputOpen(true);
        } else {
          setIsReactivate(true);
        }
      });
    } else {
      changePassword(
        userPhone,
        resetPasswordData.code,
        resetPasswordData.password
      ).then((res) => {
        if (res === 200) {
          setStep(3);
        } else {
          setResetErrorCode(textErrorsForms.invalidReset);
        }
      });
    }
  };

  const handleReactivateClick = () => {
    setIsReactivate(false);
    confirmResetPassword(resetPasswordData.phone, resetPasswordData.code).then(
      (res) => {
        if (res === 202) {
          setIsPasswordInputOpen(true);
        } else {
          setIsReactivate(true);
        }
        setErrorCode("");
      }
    );
  };

  return (
    <FormContainer
      isCloseBtn={isCloseBtn}
      onClose={onClose}
      extraClass={extraClass}
    >
      {step === 1 && (
        <form className={styles.form}>
          <h3
            className={`${styles.title} text text_type_h3 text_color_black mb-12`}
          >
            {textSignIn.title}
          </h3>
          <Input
            name="phone"
            kind="form"
            type="tel"
            label={textSignIn.phone}
            extraClass="mb-8"
            onChange={onChangeInput}
            value={userData.phone}
            error={errorPhone}
          />
          <Input
            name="password"
            kind="form"
            type="password"
            label={textSignIn.password}
            extraClass="mb-12"
            onChange={onChangeInput}
            value={userData.password}
            onKeyPress={handleKeyPress}
          />
          {invalidData && <span className={styles.error}>{invalidData}</span>}
          <div className={styles.remember_box}>
            <input
              id="checkbox"
              type="checkbox"
              name="remember"
              onChange={onChangeInput}
              className={styles.checkbox}
            />
            <label
              htmlFor="checkbox"
              className={`${styles.remember} text text_type_medium text_color_black ml-4`}
            >
              {textSignIn.remember}
            </label>
          </div>
          <p className="text text_type_small text_color_black mt-8 mb-16">
            {`${textSignIn.text} `}
            <NavLink
              to="/privacy"
              className={`${styles.link} text_color_checkbox`}
              target="_blank"
              rel="noreferrer"
            >
              {textSignIn.privacyPolicy}
            </NavLink>
          </p>
          {errorServer && <span className={styles.error}>{errorServer}</span>}
          {!isAuthVerify && (
            <Recaptcha
              sitekey="6LenQsgdAAAAAIeGs8tqYQD5KOIzdcDKHQFsPPpy"
              verifyCallback={handleAuthVerify}
              onloadCallback={handleLoadVerify}
              className={styles.recaptcha}
              size={window.screen.width > 400 ? "normal" : "compact"}
              hl="ru"
            />
          )}
          <Button
            extraClass={styles.btn}
            kind="form"
            type="button"
            text={textSignIn.btn1}
            onClick={handleSubmitClick}
          />
          <button
            className={styles.forgot_btn}
            type="button"
            onClick={handleForgotPassword}
          >
            {textSignIn.btn2}
          </button>
        </form>
      )}
      {step === 2 && (
        <form className={styles.form}>
          <p className="text text_type_medium text_color_black mb-5 pr-25">
            {textSignIn.forgotPhone}
          </p>
          <Input
            name="phone"
            kind="form"
            type="tel"
            extraClass="mb-8"
            onChange={onResetChangeInput}
            onKeyPress={handleForgotKeyPress}
            value={resetPasswordData.phone}
            error={errorPhone}
          />
          {step === 2 && !isCodeInputOpen && (
            <Recaptcha
              sitekey="6LenQsgdAAAAAIeGs8tqYQD5KOIzdcDKHQFsPPpy"
              verifyCallback={handleVerify}
              onloadCallback={handleLoadVerify}
              className={styles.recaptcha}
              size={window.screen.width > 400 ? "normal" : "compact"}
              hl="ru"
            />
          )}
          {isCodeInputOpen && (
            <Input
              name="code"
              kind="form"
              type="text"
              label={textSignIn.code}
              extraClass="mb-8"
              onChange={onResetChangeInput}
              onKeyPress={handleForgotKeyPress}
              value={resetPasswordData.code}
              error={errorCode}
            />
          )}
          {isPasswordInputOpen && (
            <Input
              name="password"
              kind="form"
              type="password"
              label={textSignIn.password}
              extraClass="mb-12"
              onChange={onResetChangeInput}
              onKeyPress={handleForgotKeyPress}
              value={resetPasswordData.password}
              error={resetErrorCode}
            />
          )}
          {isReactivate && (
            <Button
              extraClass={styles.reactivate_btn}
              kind="cart"
              type="button"
              text={textSignIn.reactivete}
              onClick={handleReactivateClick}
            />
          )}
          <Button
            extraClass={styles.btn}
            kind="form"
            type="button"
            text={textSignIn.forgotBtn}
            onClick={handleForgotPassword}
          />
        </form>
      )}
      {step === 3 && (
        <form className={styles.form}>
          <p className="text text_type_medium text_color_black mt-20 mb-20">
            {textSignIn.forgotFinally}
          </p>
        </form>
      )}
    </FormContainer>
  );
};
