import React, { useState } from 'react';
import axios from 'axios';
import Ticket from './Ticket'

const Queue = (props) => {
  const {buttonLabel, className} = props;



  const [ticketdata, setTicketData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  if(isLoaded === false){
      axios.get("http://localhost:8903/readAll")
      .then(response => {
          console.log(response.data);
          setTicketData(response.data);
      });
      setIsLoaded(true); 
  }

  const data = [
    {id: 1, title: "Title 1", complete: false, description:"Desc 1", author:"Author 1", topic: "Topic 1", urgency: 1},
    {id: 2, title: "Title 2", complete: "false", description:"Desc 2", author:"Author 2", topic: "Topic 1", urgency: 2},
    {id: 3, title: "Title 3", complete: true, description:"Desc 3", author:"Author 1", topic: "Topic 3", urgency: 1},
  ];



    return (
      <> 
        <p>Queue</p>
        {data.map((item) => (
          <Ticket item={item} className={className}/>
        ))}
      </>
    );
  };
  
  export default Queue;