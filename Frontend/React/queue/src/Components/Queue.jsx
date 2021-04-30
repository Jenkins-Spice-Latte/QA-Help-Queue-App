import { useState } from 'react';
import axios from 'axios';
import Ticket from './Ticket'

const Queue = (props) => {
  const {buttonLabel, className} = props;
  const [data, setData] = useState([]);

  if(props.isLoaded === false){
      axios.get("http://localhost:8902/readAll")
      .then(response => {
          setData(response.data);
      });
      props.switchLoaded(); 
  }

    return (
      <> 
      <div className= "queue_div">
        <p>Pending Tickets</p>   
        <p>{props.mode}</p>       
        {data.map((item) => {
            if(item.complete === false)
              return <Ticket item={item} className={className} switchLoaded={props.switchLoaded} isLoaded={props.isLoaded}/>  
          })}
      </div>
        
      <div className= "queue_div">
        <p>Completed Tickets</p>
        {data.map((item) => {
          if(item.complete === true)
            return <Ticket item={item} className={className} switchLoaded={props.switchLoaded} isLoaded={props.isLoaded}/>  
         })}
      </div>
        
      </>
    );
  };
  
  export default Queue;