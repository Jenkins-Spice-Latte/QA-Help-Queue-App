import '../App.css';

import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

const Sort = (props) => {
  return (
    <> 
      <Form>
          <FormGroup>
            <Label for="exampleCheckbox">Search here</Label>
            <div>
              <Input type="text" name="keyword" id="keyword" placeholder="Keyword search" onChange={(e) => props.setTitleFilter(e.target.value)}/>
            </div>
          </FormGroup>
      </Form>
    </>
  );
};

export default Sort;