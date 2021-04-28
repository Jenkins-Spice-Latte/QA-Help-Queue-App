import React, { useState } from 'react';
import { BsChevronDown, BsChevronUp, BsClockFill } from "react-icons/bs";
import { FaRegCheckCircle, FaCheckCircle } from "react-icons/fa";
import { Collapse, Button, CardBody, Card, Modal, ModalHeader, ModalBody, ModalFooter,  Form, FormGroup, Label, InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';

const Queue = (props) => {
  const {buttonLabel, className} = props;

  const [modal, setModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDone, setDone] = useState(false);
  const [isPriority, setPriority] = useState(1);
  var btn;
  var tickBtn;
  var priorityBtn;

  const expand = () => setIsOpen(!isOpen);

  const toggle = () => setModal(!modal);
    if (isOpen) {
      btn = <BsChevronUp className="contractQueueIc" onClick={expand}/>;
    } else {
      btn = <BsChevronDown className="expandQueueIc" onClick={expand}/>;
    }

    if (isDone) {
      tickBtn = <FaCheckCircle className="completedIc"/>;
    } else {
      tickBtn = <FaRegCheckCircle className="uncompletedIc"/>;
    }

    if(isPriority === 1){
      priorityBtn = <BsClockFill className="mostUrgIcQ"/>
    } else if(isPriority === 2){
      priorityBtn = <BsClockFill className="secMostUrgIcQ"/>
    }else if(isPriority === 3){
      priorityBtn = <BsClockFill className="middleUrgIcQ"/>
    }else if(isPriority === 4){
      priorityBtn = <BsClockFill className="secLeastUrgIcQ"/>
    }else if(isPriority === 5){
      priorityBtn = <BsClockFill className="leastUrgIcQ"/>
    }

    return (
      <> 
        <p>Queue</p>
        <div className="ticket_div">
          <p className="ticket_comp title_comp">Title </p>
          <p className="ticket_comp">Topic </p>
          {btn}
          {tickBtn}
          {priorityBtn}
          
          <Collapse isOpen={isOpen}>
            <Card id="cueCard">
              <CardBody>
                <p><strong>Topic:</strong> Anim pariatur cliche</p>
                <br />
                <p><strong>Description:</strong></p>
                <p>(Description)</p>
                <br />
                <p><strong>Completed:</strong> Anim pariatur cliche</p>
                <br />
                <p><strong>Urgency:</strong> Anim pariatur cliche</p>
                <br />
                <p><strong>Date created:</strong> Anim pariatur cliche</p>
                <Button color="success" className="queueBtnBlock">Mark as done</Button>
                <Button color="warning" className="queueBtnBlock" onClick={toggle}>Update ticket</Button>
                <Button color="danger" className="queueBtnBlock">Delete ticket</Button>
                <div>
                  <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}>Update ticket</ModalHeader>
                    <ModalBody>
                      <Form>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Author</InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" name="author" id="author" placeholder="Enter author name"/>
                        </InputGroup>
                        <br />
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Topic</InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" name="topic" id="topic" placeholder="Enter topic"/>
                        </InputGroup>
                        <br />
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Description</InputGroupText>
                          </InputGroupAddon>
                          <Input type="textarea" name="description" id="description" placeholder="Enter description" />
                        </InputGroup>
                        <br />
                    <FormGroup tag="fieldset">
                      <legend>Urgency</legend>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio" name="radio1" /><BsClockFill className="mostUrgIc"/>{' '}
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio" name="radio1" /><BsClockFill className="secMostUrgIc"/>{' '}
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio" name="radio1" /><BsClockFill className="middleUrgIc"/>{' '}
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio" name="radio1" /><BsClockFill className="secLeastUrgIc"/>{' '}
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio" name="radio1" /><BsClockFill className="leastUrgIc"/>{' '}
                        </Label>
                      </FormGroup>
                    </FormGroup>
                        <br />

                        <Input type="hidden" name="completed" id="completed" value="false"/>
                      </Form>
                      </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={toggle}>Update ticket</Button>{' '}
                      <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
                </div>

              </CardBody>
            </Card>
          </Collapse>
        </div>
      </>
    );
  };
  
  export default Queue;