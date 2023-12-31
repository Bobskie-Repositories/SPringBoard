import React from "react";
import styles from "./Header.module.css";
import global from "@assets/global.module.css";
import Web_Logo from "@assets/web_logo.png";
import { useNavigate } from "react-router";
import Button from "../UI/Button/Button";

const Header_landing = () => {
  const navigate = useNavigate();

  const goLogin = async () => {
    navigate(`/login`);
  };
  const goRegister = async () => {
    navigate(`/register`);
  };

  const goHome = async () => {
    navigate(`/`);
  };

  return (
    <div className={`${styles.header_landing}`}>
      <div className={styles.left}>
        <img
          src={Web_Logo}
          alt="Logo"
          className={styles.img_landing}
          onClick={goHome}
        />
      </div>

      <div className={styles.right_landing}>
        <a href="#" className={styles.link}>
          About
        </a>
        <a className={styles.link} onClick={goRegister}>
          Sign Up
        </a>
        <Button
          className={global.brown}
          style={{ fontSize: "13px" }}
          onClick={goLogin}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Header_landing;
