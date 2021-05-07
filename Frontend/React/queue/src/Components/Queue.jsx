import { useState } from 'react';
import axios from 'axios';
import Ticket from './Ticket';

const Queue = (props) => {
  const {className} = props;



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
    axios.get("http://ace4a56e3f29f499ca5cf4a89a911b2a-1611084005.eu-west-2.elb.amazonaws.com:9999/api/readTicket")
    .then(response => {
        console.log(response.data)
        setData(response.data);
        props.switchLoaded(); 
    });
  }

  if(props.topicfilter.includes("Dev Ops")) {
    topic1data = data.filter(item => item.topic === "Dev Ops");
  }

  if(props.topicfilter.includes("General")) {
    topic2data = data.filter(item => item.topic === "General");
  }

  if(props.topicfilter.includes("Back-end")) {
    topic3data = data.filter(item => item.topic === "Back-end");
  }

  if(props.topicfilter.includes("Front-end")) {
    topic4data = data.filter(item => item.topic === "Front-end");
  }

  if(props.topicfilter.includes("Software")) {
    topic5data = data.filter(item => item.topic === "Software");
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

  const result2 = urgencydata.filter(item => 
    item.author.toLowerCase().includes(props.authorfilter.toLowerCase())
  );

  const result3 = result2.filter(item => 
    item.title.toLowerCase().includes(props.titleFilter.toLowerCase())
  );

  const result4 = result2.filter(item => 
    item.description.toLowerCase().includes(props.titleFilter.toLowerCase())
  );

  let result = result4.concat(result3);

  let uniqueresult = result.filter((x, i, a) => a.indexOf(x) == i);


    return (
      <> 
      <div className= "queue_div">
        <p class="ticket_title" id="pending_title">Pending Tickets</p>
        
        {uniqueresult.map((item) => {
            if(item.complete === false)
              return <Ticket item={item} className={className} sort={(props.sort)} mode={(props.mode)} switchLoaded={props.switchLoaded} isLoaded={props.isLoaded}/>  
          })}
      </div>
        
      <div className= "queue_div">
        <p class="ticket_title" id="completed_title">Completed Tickets</p>
        {uniqueresult.map((item) => {
          if(item.complete === true)
            return <Ticket item={item} className={className} mode={(props.mode)} switchLoaded={props.switchLoaded} isLoaded={props.isLoaded}/>  
         })}
      </div>
        
      </>
    );
  };
  
  export default Queue;