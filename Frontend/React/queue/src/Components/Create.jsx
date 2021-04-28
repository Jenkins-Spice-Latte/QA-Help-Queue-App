import React, { useState } from "react";
import { BsClockFill } from "react-icons/bs";
import { CustomInput, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
const Create = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
    return (
      <>
        <Button color="success" size="lg" onClick={toggle}>Create a ticket</Button>
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
          <FormGroup>
            <Label for="radioLabel">Urgency</Label>
            <div>
              <CustomInput type="radio" id="exampleCustomRadio" name="urgency" value="1" label="Most urgent" />
              <CustomInput type="radio" id="exampleCustomRadio2" name="urgency" value="2" label="Very urgent" />
              <CustomInput type="radio" id="exampleCustomRadio3" name="urgency" value="3" label="Slightly urgent" />
              <CustomInput type="radio" id="exampleCustomRadio4" name="urgency" value="4" label="Less urgent" />
              <CustomInput type="radio" id="exampleCustomRadio5" name="urgency" value="1" label="Least urgent" />
            </div>
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