import React, { useState } from "react";
import axios from 'axios';
import { CustomInput, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, InputGroup, Input } from 'reactstrap';

const Create = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [authorSt, setAuthor] = useState('');
  const [completeSt, setComplete] = useState("false");
  const [descriptionSt, setDescription] = useState('');
  const [timeSt, setTime] = useState('');
  const [titleSt, setTitle] = useState('');
  const [topicSt, setTopic] = useState('');
  const [urgencySt, setUrgency] = useState('');
  const date = +new Date;
  let disabled;
  let checkAuth;
  let checkTitle;
  let checkDesc;
  let urgencyCheck;
  let topicCheck;

  if(props.mode === "Trainer mode"){
    disabled = false;
  } else{
    disabled = true;
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

  const isEnabled = authorSt.length > 0 && titleSt.length > 0 && descriptionSt.length > 0;
      


  const handleSubmit = event => {
    event.preventDefault();

    let ticket = {
      author: authorSt,
      complete: completeSt,
      description: descriptionSt,
      time_created: Date.now(),
      title: titleSt,
      topic: topicSt,
      urgency: urgencySt
    };

    axios.post(`api/createTicket/create`,  ticket)
      .then(res => {
        console.log(res);
        props.switchLoaded();
      })
  }

    return (
      <>
        <Button color="success" size="lg" disabled={disabled} onClick={toggle}>Create a ticket</Button>
      <div>
        <Modal isOpen={modal} toggle={toggle}>
        <Form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggle}>Create a ticket</ModalHeader>
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
              <CustomInput type="radio" id="topic1" name="topic" onChange={(e) => setTopic(e.target.value)} value="Topic1" label="Topic 1" />
              <CustomInput type="radio" id="topic2" name="topic" onChange={(e) => setTopic(e.target.value)} value="Topic2" label="Topic 2" />
              <CustomInput type="radio" id="topic3" name="topic" onChange={(e) => setTopic(e.target.value)} value="Topic3" label="Topic 3" />
              <CustomInput type="radio" id="topic4" name="topic" onChange={(e) => setTopic(e.target.value)} value="Topic4" label="Topic 4" />
              <CustomInput type="radio" id="topic5" name="topic" onChange={(e) => setTopic(e.target.value)} value="Topic5" label="Topic 5" />
            </div>
            {topicCheck}
          </FormGroup>
          <br />
          <FormGroup>
            <Label for="radioLabel">Urgency</Label>
            <div>
              <CustomInput type="radio" id="urgency1" onChange={(e) => setUrgency(e.target.value)} name="urgency" value="1" label="Most urgent" />
              <CustomInput type="radio" id="urgency2" onChange={(e) => setUrgency(e.target.value)} name="urgency" value="2" label="Very urgent" />
              <CustomInput type="radio" id="urgency3" onChange={(e) => setUrgency(e.target.value)} name="urgency" value="3" label="Slightly urgent" />
              <CustomInput type="radio" id="urgency4" onChange={(e) => setUrgency(e.target.value)} name="urgency" value="4" label="Less urgent" />
              <CustomInput type="radio" id="urgency5" onChange={(e) => setUrgency(e.target.value)} name="urgency" value="5" label="Least urgent" />
            </div>
            {urgencyCheck}
          </FormGroup>
            <br />
            <Input type="hidden" name="time" id="time" value={date} onSubmit={(e) => setTime(e.target.value)}/>
          
          </ModalBody>
          <ModalFooter>
            <Button type="submit" disabled={!isEnabled} color="primary" onClick={toggle}>Create</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
          </Form>
        </Modal>
      </div>
      </>
    );
  };
  
  export default Create;