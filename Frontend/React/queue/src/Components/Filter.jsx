import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

const Filter = (props) => {
    return (
      <> 
        <p>Filter</p>
        <p>Author</p>
        <Form>
          <FormGroup check>
          <Input type="checkbox" name="auth1" id="auth1"/>
          <Label for="auth1" check>Author 1</Label>
          </FormGroup>
        <br />
        <p>Completed</p>
          <FormGroup check>
            <Input type="checkbox" name="comp" id="comp"/>
            <Label for="comp" check>Completed</Label>
          </FormGroup>
          <FormGroup check>
            <Input type="checkbox" name="comp" id="comp"/>
            <Label for="comp" check>Uncompleted</Label>
          </FormGroup>
        <br />
        <p>Urgency</p>
          <FormGroup check>
            <Input type="checkbox" name="urg" id="urg" value="1"/>
            <Label for="urg" check>Most urgent</Label>
          </FormGroup>
          <FormGroup check>
            <Input type="checkbox" name="urg" id="urg" value="2"/>
            <Label for="urg" check>Very urgent</Label>
          </FormGroup>
          <FormGroup check>
            <Input type="checkbox" name="urg" id="urg" value="3"/>
            <Label for="urg" check>Least urgent</Label>
          </FormGroup>
          <FormGroup check>
            <Input type="checkbox" name="urg" id="urg" value="4"/>
            <Label for="urg" check>Slightly urgent</Label>
          </FormGroup>
          <FormGroup check>
            <Input type="checkbox" name="urg" id="urg" value="5"/>
            <Label for="urg" check>Least urgent</Label>
          </FormGroup>
        <br />
        <p>Topic</p>
          <FormGroup check>
            <Input type="checkbox" name="topic1" id="topic1"/>
            <Label for="topic1" check>Topic 1</Label>
          </FormGroup>
        </Form>
      </>
    );
  };
  
  export default Filter;