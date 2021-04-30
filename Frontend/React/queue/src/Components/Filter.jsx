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
              <Input type="text" name="author" id="author" placeholder="Filter by author" />
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
              <CustomInput type="checkbox" id="CustomCheckbox13" onClick={() => props.topicCheck("Topic1")} checked={props.topic.includes("Topic1")} value="Topic1" label="Topic 1" />
              <CustomInput type="checkbox" id="CustomCheckbox14" onClick={() => props.topicCheck("Topic2")} checked={props.topic.includes("Topic2")} value="Topic2" label="Topic 2" />
              <CustomInput type="checkbox" id="CustomCheckbox15" onClick={() => props.topicCheck("Topic3")} checked={props.topic.includes("Topic3")} value="Topic3" label="Topic 3" />
              <CustomInput type="checkbox" id="CustomCheckbox16" onClick={() => props.topicCheck("Topic4")} checked={props.topic.includes("Topic4")} value="Topic4" label="Topic 4" />
              <CustomInput type="checkbox" id="CustomCheckbox17" onClick={() => props.topicCheck("Topic5")} checked={props.topic.includes("Topic5")} value="Topic5" label="Topic 5" />
            </div>
          </FormGroup>
        </Form>
      </>
    );
  };
  
  export default Filter;