
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
    
    const [modal, setModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isDone, setDone] = useState(false);
    const [isPriority, setPriority] = useState(1);
    const [authorSt, setAuthor] = useState(item.author);
    const [completeSt, setComplete] = useState("");
    const [completeStShow, setCompleteShow] = useState("");
    const [descriptionSt, setDescription] = useState(item.description);
    const [timeSt, setTime] = useState('');
    const [titleSt, setTitle] = useState(item.title);
    const [topicSt, setTopic] = useState('');
    const [urgencySt, setUrgency] = useState('');

    
    var date = new Date(item.time_created);
    var hours = date.getHours();
    var mins = "" + date.getMinutes();

    var checkAuth;
    var checkTitle;
    var checkDesc;
    var urgencyCheck;
    var topicCheck;
    var btn;
    var tickBtn;
    var priorityBtn;
    let disabled;
    
    if(props.mode === "Trainer mode"){
      disabled = false;
    } else{
      disabled = true;
    }


    const isEnabled = item.complete;


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
        console.log(response);
        console.log(response.data);

        props.switchLoaded()
      });  
    }

    const deleteT = () => {

      axios.delete("http://localhost:8904/delete/"+item.ticketID)
      .then(response => {
        console.log(response.data);
      });

      props.switchLoaded()
      console.log(props.isLoaded)
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
  
      console.log("TESTTESTTEST" + item.ticketID)
      axios.put("http://localhost:8903/update/"+item.ticketID,  ticket)
        .then(res => {
          console.log(res);
          console.log(res.data);
        })

      props.switchLoaded()
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
      } else if(decidedUrgency === 2){
        UrgencyCheck2 = true;
      }else if(decidedUrgency === 3){
        UrgencyCheck3 = true;
      }else if(decidedUrgency === 4){
        UrgencyCheck4 = true;
      }else if(decidedUrgency === 5){
        UrgencyCheck5 = true;
      }

      if(decidedTopic === "Topic1"){
        TopicCheck1 = true;
      } else if(decidedTopic === "Topic2"){
        TopicCheck2 = true;
      }else if(decidedTopic === "Topic3"){
        TopicCheck3 = true;
      }else if(decidedTopic === "Topic4"){
        TopicCheck4 = true;
      }else if(decidedTopic === "Topic5"){
        TopicCheck5 = true;
      }


    return (
        <div className="ticket_div" key={item.id}>
              <p className="ticket_comp title_comp">{item.title} </p>
              <p className="ticket_comp">{item.topic} </p>
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
                    <p><strong>Urgency:</strong> {item.urgency}</p>
                    <br />
                    <p><strong>Date created:</strong> {hours} : {mins}</p>

                    <Button disabled={isEnabled} color="success" className="queueBtnBlock" onClick={() => mark()}>Mark as done</Button>
                    <Button color="warning" className="queueBtnBlock" onClick={toggle}>Update ticket</Button>
                    <Button color="danger" className="queueBtnBlock" onClick={() => deleteT()}>Delete ticket</Button>


                    {/* UPDATE MODAL */}
                    <div>
                      <Modal isOpen={modal} toggle={toggle} className={className}>
                        <ModalHeader toggle={toggle}>Update ticket</ModalHeader>
                        <ModalBody>
                          <Form onSubmit={handleSubmit}>
                          <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>Author</InputGroupText>
                              </InputGroupAddon>
                              <Input type="text" name="author" id="author" value={authorSt} onChange={(e) => setAuthor(e.target.value)} placeholder="Enter author name"/>
                            </InputGroup>
                            <br />
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>Title</InputGroupText>
                              </InputGroupAddon>
                              <Input type="text" name="title" id="title" value={titleSt} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title"/>
                            </InputGroup>
                            <br />
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>Description</InputGroupText>
                              </InputGroupAddon>
                              <Input type="textarea" name="description" id="description" value={descriptionSt} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" />
                            </InputGroup>
                            <br />
                            <FormGroup>
                              <Label for="radioLabel">Topic</Label>
                              <div>
                                <CustomInput type="radio" id="topic1" name="topic" onChange={(e) => setTopic(e.target.value)} value="Topic1" label="Topic 1" defaultChecked={TopicCheck1}/>
                                <CustomInput type="radio" id="topic2" name="topic" onChange={(e) => setTopic(e.target.value)} value="Topic2" label="Topic 2" defaultChecked={TopicCheck2}/>
                                <CustomInput type="radio" id="topic3" name="topic" onChange={(e) => setTopic(e.target.value)} value="Topic3" label="Topic 3" defaultChecked={TopicCheck3}/>
                                <CustomInput type="radio" id="topic4" name="topic" onChange={(e) => setTopic(e.target.value)} value="Topic4" label="Topic 4" defaultChecked={TopicCheck4}/>
                                <CustomInput type="radio" id="topic5" name="topic" onChange={(e) => setTopic(e.target.value)} value="Topic5" label="Topic 5" defaultChecked={TopicCheck5}/>
                              </div>
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
                            </FormGroup>
                            <br />
                            <Input type="hidden" name="completed" id="completed" value="false"/>

                            <br />
                            <Button type="submit" color="primary" onClick={toggle}>Update ticket</Button>
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                          </Form>
                          </ModalBody>
                      </Modal>
                    </div>


                  </CardBody>
                </Card>
              </Collapse>
          </div>
    )

}
export default Ticket;