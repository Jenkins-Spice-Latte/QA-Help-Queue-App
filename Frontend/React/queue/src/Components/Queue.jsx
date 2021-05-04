import React, { useState } from 'react';
import axios from 'axios';
import Ticket from './Ticket'

const Queue = (props) => {
  const {buttonLabel, className} = props;
  const [mode, setmode] = useState(props.mode);


  const [data, setData] = useState([]);
  const result = data.filter(item => 
                  item.author.toLowerCase().includes(props.authorfilter.toLowerCase())
                );

  function isPrime(num) {
    for (let i = 2; num > i; i++) {
      if (num % i == 0) {
        return false;
      }
    }
    return num > 1;
  }

  const [isLoaded, setIsLoaded] = useState(false);

  if(isLoaded === false){
      axios.get("http://localhost:8902/readAll")
      .then(response => {
          console.log(response.data);
          setData(response.data);
      });
      setIsLoaded(true); 
  }

    return (
      <> 
      <div className= "queue_div">
        <p>Pending Tickets</p>
        {props.sort}
        {data.map((item) => {
            if(item.complete === false)
              return <Ticket item={item} className={className} mode={(props.mode)}/>  
          })}
      </div>

      <div className= "queue_div">
        <p>Filtered Tickets</p>
        {result.map((item) => {
              return <Ticket item={item} className={className} mode={(props.mode)}/>  
          })}
      </div>
        
      <div className= "queue_div">
        <p>Completed Tickets</p>
        {data.map((item) => {
          if(item.complete === true)
            return <Ticket item={item} className={className}/>  
         })}
      </div>
        
      </>
    );
  };
  
  export default Queue;