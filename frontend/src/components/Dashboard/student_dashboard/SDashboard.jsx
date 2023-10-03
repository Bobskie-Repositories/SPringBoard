import React from 'react'
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from '../../Sidebar/Sidebar';
import Search from '../../Search/Search';
import Boards from '../../Boards/Board';
import Profile from '../../ProfileSegment/Profile';
import BoardCreation from '../../BoardCreation/BoardCreation';
import Button from '../../UI/Button/Button';
import styles from './SDashboard.module.css';

const SDashboard = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState();
  const [createAction, setCreateAction] = useState(false);

  const handleCreateBoardClick = () => {
    setCreateAction(true); 
  };

  return (
    <div className={ styles.container } style={{padding: '20px 150px 20px 30px'}}>
      <Sidebar setSelectedProject={setSelectedProject}/>

      <div>
        <div className={ styles.container } style={{gap: "150px", marginTop: '30px'}}>
          <Search />
          <Profile identification={1} />
        </div>

        <div className={ styles.container }>

          {/* {createAction ? import BoardCreation from '../../BoardCreation/BoardCreation'; : <Boards selectedProject={selectedProject}/>} */}
          {createAction ? <BoardCreation /> : <Boards selectedProject={selectedProject} />}
          {/* <Boards selectedProject={selectedProject}/> */}
        
          <Button 
          className={styles.butName}
          onClick={handleCreateBoardClick}
          > 
              Create Board
          </Button>
        </div>
        
      </div>  

    </div>
  )
}

export default SDashboard;