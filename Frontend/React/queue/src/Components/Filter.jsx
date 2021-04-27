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
        <br />
        <p>Urgency</p>
          <FormGroup check>
            <Input type="checkbox" name="urg" id="urg"/>
            <Label for="urg" check>Most urgent</Label>
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