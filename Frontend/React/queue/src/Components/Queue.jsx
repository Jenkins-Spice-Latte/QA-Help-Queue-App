import { useState } from 'react';
import axios from 'axios';
import Ticket from './Ticket'

const Queue = (props) => {
  const {buttonLabel, className} = props;

  console.log("queue")
  console.log(props.isLoaded)

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

  if(props.isLoaded === false){
      axios.get("http://localhost:8902/readAll")
      .then(response => {
          console.log(response.data)
          setData(response.data);
          props.switchLoaded(); 
      });
  }

    return (
      <> 
      <div className= "queue_div">
        <p>Pending Tickets</p>
        {props.sort}
        {data.map((item) => {
            if(item.complete === false)
              return <Ticket item={item} className={className} mode={(props.mode)} switchLoaded={props.switchLoaded} isLoaded={props.isLoaded}/>  
          })}
      </div>

      <div className= "queue_div">
        <p>Filtered Tickets</p>
        {result.map((item) => {
              return <Ticket item={item} className={className} mode={(props.mode)} switchLoaded={props.switchLoaded} isLoaded={props.isLoaded}/>  

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