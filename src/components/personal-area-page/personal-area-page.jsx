import React from "react";
import { textPAPage } from "../../texts/ru";
import { FormContainer } from "../ui/form-container/form-container";
import { Order } from "../ui/order/order";
import editIcon from "../../images/icons/edit.svg";
import doneIcon from "../../images/icons/done-icon.svg";
import { Button } from "../ui/button/button";
import logo from "../../images/logo.svg";
import { BreadCrumbs } from "../ui/bread-crumbs/bread-crumbs";
import { Input } from "../ui/input/input";
import { Modal } from "../ui/modal/modal";
import { SignIn } from "../sign-in/sign-in";
import { SignUp } from "../sign-up/sign-up";
import styles from "./personal-area-page.module.css";
import { HistoryModal } from "../history-modal/history-modal";
import {
  getOrdersHistory,
  changeName,
  changePhone,
  changePhoneConfirm,
  refreshToken,
} from "../../utils/api";
import { UserContext, CartContext } from "../../utils/context";
import { OrderHistory } from "../ui/order-history/order-history";

export const PersonalAreaPage = ({ extraClass = "" }) => {
  const [user, setUser] = React.useContext(UserContext);
  const [cart, setCart] = React.useContext(CartContext);
  const [tables, setTables] = React.useState(user.tables ?? []);
  const [updateUserData, setUpdateUserData] = React.useState({
    fio: user.fio,
    phone: user.phone,
    code: "",
  });
  const [ordersHistory, setOrdersHistory] = React.useState([]);

  const isLogin = user.phone;

  const [isNameEdit, setIsNameEdit] = React.useState(false);
  const [isPhoneEdit, setIsPhoneEdit] = React.useState(false);
  const [mobileCodeInput, setMobileCodeInput] = React.useState(false);
  const [errorCode, setErrorCode] = React.useState("");

  const [isLogOpen, setIsLogOpen] = React.useState(false);
  const [isRegOpen, setIsRegOpen] = React.useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = React.useState(false);

  const handleLogOpen = () => {
    setIsLogOpen(true);
    isRegOpen && setIsRegOpen(false);
  };

  const handleRegOpen = () => {
    setIsRegOpen(true);
    isLogOpen && setIsLogOpen(false);
  };

  const handleHistoryOpen = () => {
    setIsHistoryOpen(true);
  };

  const handleCloseModal = () => {
    isLogOpen && setIsLogOpen(false);
    isRegOpen && setIsRegOpen(false);
    isHistoryOpen && setIsHistoryOpen(false);
  };

  const handleKeyPressName = (e) => {
    if (e.key === "Enter") {
      handleNameEdit();
    }
  };

  const handleKeyPressPhone = (e) => {
    if (e.key === "Enter") {
      handlePhoneEdit();
    }
  };

  const handleNameEdit = () => {
    if (isNameEdit) {
      changeName(updateUserData.fio).then((res) => {
        if (res === 200) {
          setUser({ ...user, fio: updateUserData.fio });
          setIsNameEdit(false);
        } else {
          refreshToken().then((res) => {
            localStorage.setItem("token", res.access);
            changeName(updateUserData.fio, res.access).then((res) => {
              if (res === 200) {
                setUser({ ...user, fio: updateUserData.fio });
                setIsNameEdit(false);
              }
            });
          });
        }
      });
    } else {
      setIsNameEdit(true);
    }
  };

  const handlePhoneEdit = () => {
    const updateUserPhone = updateUserData.phone
      .replace("+", "")
      .replaceAll("-", "")
      .replaceAll(" ", "");
    if (isPhoneEdit) {
      errorCode && setErrorCode("");
      if (user.phone === updateUserPhone || updateUserPhone.length !== 11) {
        setIsPhoneEdit(false);
        return;
      }
      changePhone(updateUserPhone).then((res) => {
        if (res === 200) {
          setIsPhoneEdit(false);
          setMobileCodeInput(true);
        } else if (res === 409) {
          setErrorCode(textPAPage.phoneConflict);
        } else {
          refreshToken().then((res) => {
            localStorage.setItem("token", res.access);
            changePhone(updateUserPhone, res.access).then((res) => {
              if (res === 200) {
                setIsPhoneEdit(false);
                setMobileCodeInput(true);
              } else if (res === 409) {
                setErrorCode(textPAPage.phoneConflict);
              }
            });
          });
        }
      });
    } else if (mobileCodeInput) {
      errorCode && setErrorCode("");
      changePhoneConfirm(updateUserPhone, updateUserData.code)
        .then((res) => {
          if (res === 200) {
            setUser({ ...user, phone: updateUserPhone });
            setMobileCodeInput(false);
          } else if (res === 403) {
            setErrorCode(textPAPage.invalidCode);
          } else {
            refreshToken().then((res) => {
              localStorage.setItem("token", res.access);
              changePhoneConfirm(updateUserPhone, updateUserData.code, res.access).then((res) => {
                if (res === 200) {
                  setUser({ ...user, phone: updateUserPhone });
                  setMobileCodeInput(false);
                } else if (res === 403) {
                  setErrorCode(textPAPage.invalidCode);
                }
              });
            });
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.status === "error confirmation code") {
            setErrorCode(textPAPage.invalidCode);
          } else {
            setErrorCode(err.detail);
          }
        });
    } else {
      setIsPhoneEdit(true);
    }
  };

  const onChangeInput = (e) => {
    setUpdateUserData({ ...updateUserData, [e.target.name]: e.target.value });
  };

  React.useEffect(() => {
    setUpdateUserData({ fio: user.fio, phone: user.phone });
    setTables(user.tables);
  }, [user]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    setUser({});
    setCart([]);
    setOrdersHistory([]);
  };

  React.useEffect(() => {
    if (user.phone) {
      getOrdersHistory().then((res) => {
        if (res !== undefined) {
          setOrdersHistory(res);
        } else {
          refreshToken().then((res) => {
            localStorage.setItem("token", res.access);
            getOrdersHistory(res.access).then((res) => {
              if (res !== undefined) {
                setOrdersHistory(res);
              }
            });
          });
        }
      });
    }
  }, [user.phone]);

  return (
    <main className={`${styles.content} ${extraClass}`}>
      <BreadCrumbs />
      <h2
        className={`${styles.title} text text_type_h2 text_color_primary mt-8 mb-12`}
      >
        {textPAPage.title}
      </h2>
      <FormContainer extraClass={styles.greeting}>
        {isLogin ? (
          <div className={styles.header_box}>
            <p className="text text_type_medium text_color_black">
              {`${textPAPage.greeting1}, `}
              <b>{user.fio}</b>
              {`, ${textPAPage.greeting2}`}
            </p>
            <button
              className={`${styles.logout} text text_type_medium text_color_black`}
              type="button"
              onClick={handleLogOut}
            >
              {textPAPage.logout}
            </button>
          </div>
        ) : (
          <p className="text text_type_medium text_color_black">
            {`${textPAPage.log1}, `}
            <button
              className={`${styles.log_btn} text text_type_medium text_color_black`}
              type="button"
              onClick={handleLogOpen}
            >
              {textPAPage.log2}
            </button>
            {` ${textPAPage.log3} `}
            <button
              className={`${styles.log_btn} text text_type_medium text_color_black`}
              type="button"
              onClick={handleRegOpen}
            >
              {textPAPage.log4}
            </button>
          </p>
        )}
      </FormContainer>
      <section className={`${styles.main_content} mb-20`}>
        <FormContainer extraClass={styles.history}>
          <div className={`${styles.history_title_box} mb-20`}>
            <h3 className="text text_type_h3 text_color_black">
              {textPAPage.historyTitle}
            </h3>
            {ordersHistory.length > 4 && (
              <Button
                type="button"
                kind="form"
                text={textPAPage.btnText}
                extraClass={styles.history_btn}
                onClick={handleHistoryOpen}
              />
            )}
          </div>
          {ordersHistory.map((item, index) => {
            if (index > 3) {
              return "";
            }
            return (
              <OrderHistory
                key={index}
                orderData={item}
                extraClass={`${styles.ho_order} mb-8`}
              />
            );
          })}
          {ordersHistory.length > 4 && (
            <Button
              type="button"
              kind="form"
              text={textPAPage.btnText}
              extraClass={styles.mob_history_btn}
              onClick={handleHistoryOpen}
            />
          )}
        </FormContainer>
        <div className={styles.right_column}>
          <FormContainer extraClass={styles.active_order}>
            <div className={`${styles.data_title_box} mb-12`}>
              <h3 className="text text_type_h3 text_color_black">
                {textPAPage.activeOrderTitle}
              </h3>
              <p className="text text_type_medium text_color_black">
                {textPAPage.activeOrderDeadline}
              </p>
            </div>
            {tables &&
              tables.map((item, index) => {
                return (
                  <Order
                    key={index}
                    orderData={item}
                    extraClass={`${styles.ao_order} mb-10`}
                  />
                );
              })}
          </FormContainer>
          <FormContainer extraClass={styles.user_data}>
            <h3 className="text text_type_h3 text_color_black mb-4">
              {textPAPage.dataTitle}
            </h3>
            {user.phone && (
              <div className={styles.data_connection_box}>
                <div className={`${styles.data_box} mb-4`}>
                  {isNameEdit ? (
                    <Input
                      kind="form"
                      value={updateUserData.fio}
                      name="fio"
                      onChange={onChangeInput}
                      onKeyPress={handleKeyPressName}
                    />
                  ) : (
                    <p className="text text_type_medium-bold text_color_black">
                      {user.fio}
                    </p>
                  )}
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={handleNameEdit}
                  >
                    <img
                      className={styles.edit_img}
                      src={isNameEdit ? doneIcon : editIcon}
                      alt={textPAPage.editAlt}
                    />
                  </button>
                </div>
                <div className={`${styles.data_box} mb-4`}>
                  {isPhoneEdit && (
                    <Input
                      kind="form"
                      value={updateUserData.phone}
                      name="phone"
                      type="tel"
                      onChange={onChangeInput}
                      error={errorCode}
                      onKeyPress={handleKeyPressPhone}
                    />
                  )}
                  {mobileCodeInput && (
                    <Input
                      name="code"
                      kind="form"
                      type="text"
                      label={textPAPage.code}
                      extraClass="mb-8"
                      onChange={onChangeInput}
                      value={updateUserData.code}
                      error={errorCode}
                      onKeyPress={handleKeyPressPhone}
                    />
                  )}

                  {!isPhoneEdit && !mobileCodeInput && (
                    <p className="text text_type_medium-bold text_color_black">
                      {user.phone}
                    </p>
                  )}

                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={handlePhoneEdit}
                  >
                    <img
                      className={styles.edit_img}
                      src={isPhoneEdit || mobileCodeInput ? doneIcon : editIcon}
                      alt={textPAPage.editAlt}
                    />
                  </button>
                </div>
              </div>
            )}
          </FormContainer>
        </div>
      </section>
      <section className={styles.loyalty_card_box}>
        <div className={styles.lcb_left_column}>
          <h3 className="text text_type_h3 text_color_white mb-8">
            {textPAPage.loyaltyCardTitle1}
          </h3>
          <div className={styles.lcb_card}>
            <img
              className={styles.lcb_logo}
              src={logo}
              alt={textPAPage.logoAlt}
            />
          </div>
        </div>
        <div className={styles.lcb_right_column}>
          <h3 className="text text_type_h3 text_color_white mb-8">
            {textPAPage.loyaltyCardTitle2}
          </h3>
          <p className="text text_type_points_number text_color_primary">
            {user.bonuses ? Math.floor(user.bonuses) : 0}
          </p>
          <p className="text text_type_medium text_color_white">
            {textPAPage.pointsText}
          </p>
        </div>
      </section>
      {isLogOpen && (
        <Modal extraClass={styles.modal} onClose={handleCloseModal}>
          <SignIn
            extraClass={styles.reg_form}
            isCloseBtn={true}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
      {isRegOpen && (
        <Modal extraClass={styles.modal} onClose={handleCloseModal}>
          <SignUp
            extraClass={styles.reg_form}
            isCloseBtn={true}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
      {isHistoryOpen && (
        <Modal extraClass={styles.modal} onClose={handleCloseModal}>
          <HistoryModal
            extraClass={styles.reg_form}
            isCloseBtn={true}
            onClose={handleCloseModal}
            data={ordersHistory}
          />
        </Modal>
      )}
    </main>
  );
};
