import React, { useState } from "react";
import { BsClockFill } from "react-icons/bs";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
const Create = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
    return (
      <>
        <Button color="secondary" onClick={toggle}>Create a ticket</Button>
      <div>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>Create a ticket</ModalHeader>
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
            <Button color="primary" onClick={toggle}>Create</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
      </>
    );
  };
  
  export default Create;