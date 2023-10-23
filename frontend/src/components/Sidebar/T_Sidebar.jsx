import React from "react";
import styles from "./Sidebar.module.css";
import global from "../../assets/global.module.css";
import Logo from "@assets/Logo.png";
import T_SidebarSegment from "../SidebarSegment/T_SidebarSegment";
import S_SidebarSegment from "../SidebarSegment/S_SidebarSegment";
import CustomSidebarSegement from "../SidebarSegment/CustomSidebarSegement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faGear,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

const T_Sidebar = ({
  setSelected,
  choose,
  setSelectedProj,
  toggleCreateAction,
}) => {
  const navigate = useNavigate();
  const { getUser, logout } = useAuth();

  const goHome = async () => {
    const user = await getUser();
    const userId = user.id;
    navigate(`/teacher/${userId}`);
  };

  const goLogout = async () => {
    await logout();
    navigate(`/login`);
  };

  return (
    <div className={styles.sidebar}>
      <img src={Logo} alt="Logo" className={styles.img} onClick={goHome} />

      <T_SidebarSegment setSelected={setSelected} />

      {/* adding the groups project list 
                2 - because that's the conditional statement in MDashboard where it renders the group board
                this is only meant for teachers            
            */}
      {choose === 2 && <CustomSidebarSegement setSelected={setSelectedProj} />}

      <ol className={styles.list}>
        <li className={`${global.center} ${styles.customLi}`}>
          <FontAwesomeIcon
            icon={faCircleInfo}
            size="lg"
            className={styles.icon}
          />{" "}
          &nbsp; Support
        </li>
        <li className={`${global.center} ${styles.customLi}`}>
          <FontAwesomeIcon icon={faGear} size="lg" className={styles.icon} />{" "}
          &nbsp; Settings
        </li>
        <li
          className={`${global.center} ${styles.customLi}`}
          onClick={goLogout}
        >
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            size="lg"
            className={styles.icon}
          />{" "}
          &nbsp; Log out
        </li>
      </ol>
    </div>
  );
};

export default T_Sidebar;
