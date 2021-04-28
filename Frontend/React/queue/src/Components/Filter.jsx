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
              <CustomInput type="checkbox" id="CustomCheckbox1" value="Author1" label="Author 1" checked/>
              <CustomInput type="checkbox" id="CustomCheckbox2" value="Author2" label="Author 2" checked/>
              <CustomInput type="checkbox" id="CustomCheckbox3" value="Author3" label="Author 3" checked/>
              <CustomInput type="checkbox" id="CustomCheckbox4" value="Author4" label="Author 4" checked/>
              <CustomInput type="checkbox" id="CustomCheckbox5" value="Author5" label="Author 5" checked/>
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="exampleCheckbox">Completed</Label>
            <div>
              <CustomInput type="checkbox" id="CustomCheckbox6" value="completed" label="Completed" checked/>
              <CustomInput type="checkbox" id="CustomCheckbox7" value="uncompleted" label="Uncompleted" checked/>
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="exampleCheckbox">Urgency</Label>
            <div>
              <CustomInput type="checkbox" id="CustomCheckbox8" value="1" label="Most urgent" checked/>
              <CustomInput type="checkbox" id="CustomCheckbox9" value="2" label="Very urgent" checked/>
              <CustomInput type="checkbox" id="CustomCheckbox10" value="3" label="Slightly urgent" checked/>
              <CustomInput type="checkbox" id="CustomCheckbox11" value="4" label="Less urgent" checked/>
              <CustomInput type="checkbox" id="CustomCheckbox12" value="5" label="Least urgent" checked/>
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="exampleCheckbox">Topic</Label>
            <div>
              <CustomInput type="checkbox" id="CustomCheckbox13" value="Topic1" label="Topic 1" checked/>
              <CustomInput type="checkbox" id="CustomCheckbox14" value="Topic2" label="Topic 2" checked/>
              <CustomInput type="checkbox" id="CustomCheckbox15" value="Topic3" label="Topic 3" checked/>
              <CustomInput type="checkbox" id="CustomCheckbox16" value="Topic4" label="Topic 4" checked/>
              <CustomInput type="checkbox" id="CustomCheckbox17" value="Topic5" label="Topic 5" checked/>
            </div>
          </FormGroup>
        </Form>
      </>
    );
  };
  
  export default Filter;