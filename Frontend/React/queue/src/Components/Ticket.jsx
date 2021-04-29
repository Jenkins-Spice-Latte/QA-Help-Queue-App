
import { CustomInput, Collapse, Button, CardBody, Card, Modal, ModalHeader, ModalBody, ModalFooter,  Form, FormGroup, Label, InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
import { useState } from 'react';
import { BsChevronDown, BsChevronUp, BsClockFill } from "react-icons/bs";
import { FaRegCheckCircle, FaCheckCircle } from "react-icons/fa";

const Ticket = (props) => {

    const {item, className} = props;
    
    const [modal, setModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isDone, setDone] = useState(false);
    const [isPriority, setPriority] = useState(1);

    var btn;
    var tickBtn;
    var priorityBtn;


    const expand = () => setIsOpen(!isOpen);

    function deleteT(id) {
      axios.delete("http://localhost:8901/delete/"+id)
      .then(response => {
        console.log(response.data);
      });
    }

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
                    <p><strong>Completed:</strong> {item.completed}</p>
                    <br />
                    <p><strong>Urgency:</strong> {item.urgency}</p>
                    <br />
                    <p><strong>Date created:</strong> Anim pariatur cliche</p>
                    <Button color="success" className="queueBtnBlock">Mark as done</Button>
                    <Button color="warning" className="queueBtnBlock" onClick={toggle}>Update ticket</Button>
                    <Button color="danger" className="queueBtnBlock" onClick={() => deleteT(item.id)}>Delete ticket</Button>
                    <div>
                      <Modal isOpen={modal} toggle={toggle} className={className}>
                        <ModalHeader toggle={toggle}>Update ticket</ModalHeader>
                        <ModalBody>
                          <Form>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>Author</InputGroupText>
                              </InputGroupAddon>
                              <Input type="text" name="author" id="author" value={item.author} placeholder="Enter author name"/>
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
                                <CustomInput type="radio" id="exampleCustomRadio5" name="urgency" value="5" label="Least urgent" />
                              </div>
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
    )

}
export default Ticket;