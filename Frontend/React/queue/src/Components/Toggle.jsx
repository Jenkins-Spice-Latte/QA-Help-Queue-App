import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { BsToggleOff,  BsToggleOn} from "react-icons/bs";
import Queue from "./Queue";
import Create from "./Create";

const Toggle = (props) => {
  const [modeSelect, setmodeSelect] = useState("Trainee mode");
  var mode;



  if(props.mode === "Trainee mode"){
    mode = <Button color="primary" onClick={() => props.onCheckboxBtnClick("Trainer mode")}><BsToggleOff className="trainerBtn"/> Use trainer mode</Button>
  } else{
    mode = <Button color="primary" onClick={() => props.onCheckboxBtnClick("Trainee mode")}><BsToggleOn className="traineeBtn"/> Use trainee mode</Button>    
  } 


    return (
      <> 
        {mode}
      </>
    );
  };
  
  export default Toggle;