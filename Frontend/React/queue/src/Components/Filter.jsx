import React from 'react';
import { CustomInput, Form, FormGroup, Label, Input } from 'reactstrap';

const Filter = (props) => {
    return (
      <> 
        <p>Filter</p>
        <Form>
          <FormGroup>
            <Label for="exampleCheckbox">Author</Label>
            <div>
              <Input type="text" name="author" id="author" placeholder="Filter by author" onChange={(e) => props.setAuthorFilter(e.target.value)}/>
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="exampleCheckbox">Urgency</Label>
            <div>
              <CustomInput type="checkbox" id="CustomCheckbox8" onClick={() => props.urgencyCheck(1)} checked={props.urgent.includes(1)} value="1" label="Most urgent" />
              <CustomInput type="checkbox" id="CustomCheckbox9" onClick={() => props.urgencyCheck(2)} checked={props.urgent.includes(2)} value="2" label="Very urgent" />
              <CustomInput type="checkbox" id="CustomCheckbox10"onClick={() => props.urgencyCheck(3)} checked={props.urgent.includes(3)} value="3" label="Slightly urgent" />
              <CustomInput type="checkbox" id="CustomCheckbox11"onClick={() => props.urgencyCheck(4)} checked={props.urgent.includes(4)} value="4" label="Less urgent" />
              <CustomInput type="checkbox" id="CustomCheckbox12"onClick={() => props.urgencyCheck(5)} checked={props.urgent.includes(5)} value="5" label="Least urgent" />
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="exampleCheckbox">Topic</Label>
            <div>
              <CustomInput type="checkbox" id="CustomCheckbox13" onClick={() => props.topicCheck("Dev Ops")} checked={props.topic.includes("Dev Ops")} value="Dev Ops" label="Dev Ops" />
              <CustomInput type="checkbox" id="CustomCheckbox14" onClick={() => props.topicCheck("General")} checked={props.topic.includes("General")} value="General" label="General" />
              <CustomInput type="checkbox" id="CustomCheckbox15" onClick={() => props.topicCheck("Back-end")} checked={props.topic.includes("Back-end")} value="Back-end" label="Back-end" />
              <CustomInput type="checkbox" id="CustomCheckbox16" onClick={() => props.topicCheck("Front-end")} checked={props.topic.includes("Front-end")} value="Front-end" label="Front-end" />
              <CustomInput type="checkbox" id="CustomCheckbox17" onClick={() => props.topicCheck("Software")} checked={props.topic.includes("Software")} value="Software" label="Software" />
            </div>
          </FormGroup>
        </Form>
      </>
    );
  };
  
  export default Filter;