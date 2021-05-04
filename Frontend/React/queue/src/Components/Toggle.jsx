import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { BsToggleOff,  BsToggleOn} from "react-icons/bs";
import Queue from "./Queue";
import Create from "./Create";

const Toggle = (props) => {
  var modeBtn;



  if(props.mode === "Trainee mode"){
    modeBtn = <Button color="primary" onClick={() => props.onCheckboxBtnClick("Trainer mode")}><BsToggleOff className="trainerBtn"/> Use trainer mode</Button>
  } else{
    modeBtn = <Button color="primary" onClick={() => props.onCheckboxBtnClick("Trainee mode")}><BsToggleOn className="traineeBtn"/> Use trainee mode</Button>    
  } 


    return (
      <> 
        {mode}
        {modeBtn}
        <Queue mode={(modeSelect)} isLoaded={props.isLoaded} switchLoaded={props.switchLoaded}/>
        <Create mode={(modeSelect)} switchLoaded={props.switchLoaded} isLoaded={props.isLoaded} />
      </>
    );
  };
  
  export default Toggle;