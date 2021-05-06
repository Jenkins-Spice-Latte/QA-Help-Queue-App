
import { CustomInput, Collapse, Button, CardBody, Card, Modal, ModalHeader, ModalBody, ModalFooter,  Form, FormGroup, Label, InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
import { useState } from 'react';
import axios from 'axios';
import { BsChevronDown, BsChevronUp, BsClockFill } from "react-icons/bs";
import { FaRegCheckCircle, FaCheckCircle } from "react-icons/fa";

const Ticket = (props) => {

    const item = props.item;
    const className = props.className;


    let TopicCheck1 = false;
    let TopicCheck2 = false;
    let TopicCheck3 = false;
    let TopicCheck4 = false;
    let TopicCheck5 = false;
    let UrgencyCheck1 = false;
    let UrgencyCheck2 = false;
    let UrgencyCheck3 = false;
    let UrgencyCheck4 = false;
    let UrgencyCheck5 = false;
    const decidedComp = item.complete;
    const  decidedTopic = item.topic;
    const  decidedUrgency = item.urgency;
    let Urgencylevel;
    let checkAuth;
    let checkTitle;
    let checkDesc;
    let urgencyCheck;
    let topicCheck;
    
    const [modal, setModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [authorSt, setAuthor] = useState(item.author);
    const [completeSt, setComplete] = useState("");
    const [descriptionSt, setDescription] = useState(item.description);
    const [timeSt, setTime] = useState('');
    const [titleSt, setTitle] = useState(item.title);
    const [topicSt, setTopic] = useState(item.topic);
    const [urgencySt, setUrgency] = useState(item.urgency);

    
    let date = new Date(item.time_created);
    let hours = date.getHours();
    let mins = "" + date.getMinutes();

    let btn;
    let tickBtn;
    let priorityBtn;
    let disabled;
    let markasdoneDisabled;
    
    if(props.mode === "Trainer mode"){
      disabled = false;
    } else{
      disabled = true;
    }

    const isUpdateEnabled = authorSt.length > 0 && titleSt.length > 0 && descriptionSt.length > 0 && topicSt.length > 0 && urgencySt.length > 0;


    const isEnabled = item.complete;

    if(isEnabled){
      markasdoneDisabled = true;
    } else if(props.mode === "Trainee mode") {
      markasdoneDisabled = true;
    } else{
      markasdoneDisabled = false;
    }


    const expand = () => setIsOpen(!isOpen);

    

    const mark = () => {

      let ticket = {
        author: authorSt,
        complete: true,
        description: descriptionSt,
        time_created: timeSt,
        title: titleSt,
        topic: topicSt,
        urgency: urgencySt
      };


      axios.put("http://localhost:8903/update/"+item.ticketID, ticket)
      .then(response => {
        console.log(response.data);
        props.switchLoaded()
      });  
    }

    const deleteT = () => {
      axios.delete("http://localhost:8904/delete/"+item.ticketID)
      .then(response => {
        console.log(response.data);
        props.switchLoaded()
      });
    }

    const handleSubmit = event => {
      event.preventDefault();
  
      let ticket = {
        author: authorSt,
        complete: completeSt,
        description: descriptionSt,
        time_created: timeSt,
        title: titleSt,
        topic: topicSt,
        urgency: urgencySt
      };
      
      axios.put("http://localhost:8903/update/"+item.ticketID,  ticket)
        .then(res => {
          console.log(res);
          console.log(res.data);
          props.switchLoaded()
        })
    }

    const toggle = () => setModal(!modal);


      if (isOpen) {
        btn = <BsChevronUp className="contractQueueIc" onClick={expand}/>;
      } else {
        btn = <BsChevronDown className="expandQueueIc" onClick={expand}/>;
      }
  
      if (decidedComp) {
        tickBtn = <FaCheckCircle className="completedIc"/>;
      } else {
        tickBtn = <FaRegCheckCircle className="uncompletedIc"/>;
      }
  
      if(decidedUrgency === 1){
        priorityBtn = <BsClockFill className="mostUrgIcQ"/>
      } else if(decidedUrgency === 2){
        priorityBtn = <BsClockFill className="secMostUrgIcQ"/>
      }else if(decidedUrgency === 3){
        priorityBtn = <BsClockFill className="middleUrgIcQ"/>
      }else if(decidedUrgency === 4){
        priorityBtn = <BsClockFill className="secLeastUrgIcQ"/>
      }else if(decidedUrgency === 5){
        priorityBtn = <BsClockFill className="leastUrgIcQ"/>
      }

      if(decidedUrgency === 1){
        UrgencyCheck1 = true;
        Urgencylevel = "Most urgent";
      } else if(decidedUrgency === 2){
        UrgencyCheck2 = true;
        Urgencylevel = "Very urgent";
      }else if(decidedUrgency === 3){
        UrgencyCheck3 = true;
        Urgencylevel = "Slightly urgent";
      }else if(decidedUrgency === 4){
        UrgencyCheck4 = true;
        Urgencylevel = "Less urgent";
      }else if(decidedUrgency === 5){
        UrgencyCheck5 = true;
        Urgencylevel = "Least urgent";
      }

      if(decidedTopic === "Dev Ops"){
        TopicCheck1 = true;
      } else if(decidedTopic === "General"){
        TopicCheck2 = true;
      }else if(decidedTopic === "Back-end"){
        TopicCheck3 = true;
      }else if(decidedTopic === "Front-end"){
        TopicCheck4 = true;
      }else if(decidedTopic === "Software"){
        TopicCheck5 = true;
      }

      if(urgencySt !== ""){
        urgencyCheck = <p id="createUrgencyCheck">Urgency selected</p> 
      }
    
      if(topicSt !== ""){
        topicCheck = <p id="createTopicCheck">Topic selected</p> 
      }
      
      if(authorSt === ""){
        checkAuth = <Input type="text" name="author" id="author" value={authorSt} onChange={(e) => setAuthor(e.target.value)} placeholder="Author name"/>
        
      } else{
        checkAuth = <Input valid type="text" name="author" id="author" value={authorSt} onChange={(e) => setAuthor(e.target.value)} placeholder="Author name"/>
      }
    
      if(titleSt === ""){
        checkTitle = <Input type="text" name="title" id="title" value={titleSt} onChange={(e) => setTitle(e.target.value)} placeholder="Ticket title"/>
        
      } else{
        checkTitle = <Input valid type="text" name="title" id="title" value={titleSt} onChange={(e) => setTitle(e.target.value)} placeholder="Ticket title"/>
      }
    
      if(descriptionSt === ""){
        checkDesc = <Input type="textarea" name="description" value={descriptionSt} onChange={(e) => setDescription(e.target.value)} id="description" placeholder="Description" />
        
      } else{
        checkDesc = <Input valid type="textarea" name="description" value={descriptionSt} onChange={(e) => setDescription(e.target.value)} id="description" placeholder="Description" />
      }


    return (
        <div className="ticket_div" key={item.id}>
              <p className="ticket_comp title_comp">{item.title} ({item.topic}) </p>    
              {btn}
              {tickBtn}
              {priorityBtn}
              
              <Collapse isOpen={isOpen}>
                <Card id="cueCard">
                  <CardBody>
                    <p><strong>Author:</strong> {item.author}</p>
                    <br />
                    <p><strong>Topic:</strong> {item.topic}</p>
                    <br />
                    <p><strong>Description:</strong></p>
                    <p>{item.description}</p>
                    <br />
                    <p><strong>Urgency:</strong> {Urgencylevel}</p>
                    <br />
                    <p><strong>Date created:</strong> {hours} : {mins}</p>

                    <Button disabled={markasdoneDisabled} color="success" className="queueBtnBlock" onClick={() => mark()}>Mark as done</Button>
                    <Button color="warning" disabled={disabled} className="queueBtnBlock" onClick={toggle}>Update ticket</Button>
                    <Button color="danger" disabled={disabled} className="queueBtnBlock" onClick={() => deleteT()}>Delete ticket</Button>


                    {/* UPDATE MODAL */}
                    <div>
                      <Modal isOpen={modal} toggle={toggle} className={className}>
                        <ModalHeader toggle={toggle}>Update ticket</ModalHeader>
                        <Form onSubmit={handleSubmit}>
                          <ModalBody>  
                            <InputGroup>
                              {checkAuth}                
                            </InputGroup>
                            <br />
                            <InputGroup>
                              {checkTitle}
                            </InputGroup>
                            <br />
                            <InputGroup>
                              {checkDesc}
                            </InputGroup>
                            <br />
                            <FormGroup>
                              <Label for="radioLabel">Topic</Label>
                              <div>
                                <CustomInput type="radio" id="Dev Ops" name="topic" onChange={(e) => setTopic(e.target.value)} value="Dev Ops" label="Dev Ops" defaultChecked={TopicCheck1}/>
                                <CustomInput type="radio" id="General" name="topic" onChange={(e) => setTopic(e.target.value)} value="General" label="General" defaultChecked={TopicCheck2}/>
                                <CustomInput type="radio" id="Back-end" name="topic" onChange={(e) => setTopic(e.target.value)} value="Back-end" label="Back-end" defaultChecked={TopicCheck3}/>
                                <CustomInput type="radio" id="Front-end" name="topic" onChange={(e) => setTopic(e.target.value)} value="Front-end" label="Front-end" defaultChecked={TopicCheck4}/>
                                <CustomInput type="radio" id="Software" name="topic" onChange={(e) => setTopic(e.target.value)} value="Software" label="Software" defaultChecked={TopicCheck5}/>
                              </div>
                              {topicCheck}
                            </FormGroup>
                            <FormGroup>
                              <Label for="radioLabel">Urgency</Label>
                              <div>
                                <CustomInput type="radio" id="exampleCustomRadio" onChange={(e) => setUrgency(e.target.value)} name="urgency" value="1" label="Most urgent" defaultChecked={UrgencyCheck1}/>
                                <CustomInput type="radio" id="exampleCustomRadio2" onChange={(e) => setUrgency(e.target.value)} name="urgency" value="2" label="Very urgent" defaultChecked={UrgencyCheck2}/>
                                <CustomInput type="radio" id="exampleCustomRadio3" onChange={(e) => setUrgency(e.target.value)} name="urgency" value="3" label="Slightly urgent" defaultChecked={UrgencyCheck3}/>
                                <CustomInput type="radio" id="exampleCustomRadio4" onChange={(e) => setUrgency(e.target.value)} name="urgency" value="4" label="Less urgent" defaultChecked={UrgencyCheck4}/>
                                <CustomInput type="radio" id="exampleCustomRadio5" onChange={(e) => setUrgency(e.target.value)} name="urgency" value="5" label="Least urgent" defaultChecked={UrgencyCheck5}/>
                              </div>
                              {urgencyCheck}
                            </FormGroup>
                            <Input type="hidden" name="completed" id="completed" value="false"/>
                            </ModalBody>
                            <ModalFooter>
                            <Button type="submit" disabled={!isUpdateEnabled} color="primary" onClick={toggle}>Update ticket</Button>
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                            </ModalFooter>
                        </Form>
                          
                      </Modal>
                    </div>


                  </CardBody>
                </Card>
              </Collapse>
          </div>
    )

}
export default Ticket;