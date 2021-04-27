import React, { useState } from 'react';
import { BsChevronDown } from "react-icons/bs";
import { BsChevronUp } from "react-icons/bs";
import { BsClockFill } from "react-icons/bs";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { Collapse, Button, CardBody, Card, Modal, ModalHeader, ModalBody, ModalFooter,  Form, FormGroup, Label, InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';

const Queue = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const expand = () => setIsOpen(!isOpen);

  const toggle = () => setModal(!modal);
    return (
      <> 
        <p>Queue</p>
        <div className="ticket_div">
          <p className="ticket_comp">Title </p>
          <p className="ticket_comp">Topic </p>
          <FaCheckCircle className="completedIc"/>
          <FaRegCheckCircle className="uncompletedIc"/>
          <BsClockFill className="mostUrgIc"/>
          <BsChevronDown onClick={expand}/>
          <BsChevronUp onClick={expand}/>
          <Collapse isOpen={isOpen}>
            <Card>
              <CardBody>
                <p>Description: Anim pariatur cliche</p>
                <p>Completed: Anim pariatur cliche</p>
                <p>Topic: Anim pariatur cliche</p>
                <p>Urgency: Anim pariatur cliche</p>
                <Button color="secondary">Mark as done</Button>
                <Button color="secondary" onClick={toggle}>Update ticket</Button>
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
                <Button color="secondary">Delete ticket</Button>
              </CardBody>
            </Card>
          </Collapse>
        </div>
      </>
    );
  };
  
  export default Queue;