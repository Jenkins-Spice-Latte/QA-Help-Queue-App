import React from 'react';
import { Button } from 'reactstrap';
import { BsToggleOff,  BsToggleOn} from "react-icons/bs";

const Toggle = (props) => {
  let modeBtn;



  if(props.mode === "Trainee mode"){
    modeBtn = <Button color="primary" onClick={() => props.onCheckboxBtnClick("Trainer mode")}><BsToggleOff className="trainerBtn"/> Use trainer mode</Button>
  } else{
    modeBtn = <Button color="primary" onClick={() => props.onCheckboxBtnClick("Trainee mode")}><BsToggleOn className="traineeBtn"/> Use trainee mode</Button>    
  } 


    return (
      <> 
        {modeBtn}
      </>
    );
  };
  
  export default Toggle;