import { useState } from 'react';
import axios from 'axios';
import Ticket from './Ticket'

const Queue = (props) => {
  const {className} = props;

  console.log(props.sort);

  const [data, setData] = useState([]);
  
  let topic1data = [];
  let topic2data = [];
  let topic3data = [];
  let topic4data = [];
  let topic5data = [];

  let urgency1data = [];
  let urgency2data = [];
  let urgency3data = [];
  let urgency4data = [];
  let urgency5data = [];
  
  if(props.isLoaded === false){
    axios.get("http://localhost:8902/readAll")
    .then(response => {
        console.log(response.data)
        setData(response.data);
        props.switchLoaded(); 
    });
  }

  if(props.topicfilter.includes("Topic1")) {
    topic1data = data.filter(item => item.topic === "Topic1");
  }

  if(props.topicfilter.includes("Topic2")) {
    topic2data = data.filter(item => item.topic === "Topic2");
  }

  if(props.topicfilter.includes("Topic3")) {
    topic3data = data.filter(item => item.topic === "Topic3");
  }

  if(props.topicfilter.includes("Topic4")) {
    topic4data = data.filter(item => item.topic === "Topic4");
  }

  if(props.topicfilter.includes("Topic5")) {
    topic5data = data.filter(item => item.topic === "Topic5");
  }
  
  let topicdata = topic1data.concat(topic2data, topic3data, topic4data, topic5data);

  if(props.urgentfilter.includes(1)) {
    urgency1data = topicdata.filter(item => item.urgency === 1);
  }

  if(props.urgentfilter.includes(2)) {
    urgency2data = topicdata.filter(item => item.urgency === 2);
  }

  if(props.urgentfilter.includes(3)) {
    urgency3data = topicdata.filter(item => item.urgency === 3);
  }

  if(props.urgentfilter.includes(4)) {
    urgency4data = topicdata.filter(item => item.urgency === 4);
  }

  if(props.urgentfilter.includes(5)) {
    urgency5data = topicdata.filter(item => item.urgency === 5);
  }

  let urgencydata = urgency1data.concat(urgency2data, urgency3data, urgency4data, urgency5data);

  const result = urgencydata.filter(item => 
    item.author.toLowerCase().includes(props.authorfilter.toLowerCase())
  );

  function compare(sortname) {
    let key = "time_created";
    let order = "asc";
    if(sortname === "oldest"){
      key = "time_created";
      order = "asc";

    } else if(sortname === "newest"){
      key = "time_created";
      order = "desc";

    } else{
      key = "title";
      order = "asc";
    }

    return function sort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comp = 0;
      if (varA > varB) {
        comp = 1;
      } else if (varA < varB) {
        comp = -1;
      }
      return (
        (order === 'desc') ? (comp * -1) : comp
      );
    };
  }


    return (
      <> 
      <div className= "queue_div">
        <p>Pending Tickets</p>
        
        {result.map((item) => {
            if(item.complete === false)
              return <Ticket item={item} className={className} mode={(props.mode)} switchLoaded={props.switchLoaded} isLoaded={props.isLoaded}/>  
          })}
      </div>
        
      <div className= "queue_div">
        <p>Completed Tickets</p>
        {result.map((item) => {
          if(item.complete === true)
            return <Ticket item={item} className={className} mode={(props.mode)} switchLoaded={props.switchLoaded} isLoaded={props.isLoaded}/>  
         })}
      </div>
        
      </>
    );
  };
  
  export default Queue;