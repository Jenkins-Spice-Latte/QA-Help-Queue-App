import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

const Queue = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
    return (
      <> 
        <p>Queue</p>
        <div className="ticket_div">
          <p className="ticket_comp">Title</p>
          <p className="ticket_comp">Urgency</p>
          <p className="ticket_comp">Completed</p>
          <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Expand</Button>
          <Collapse isOpen={isOpen}>
            <Card>
              <CardBody>
              Anim pariatur cliche
              </CardBody>
            </Card>
          </Collapse>
        </div>
      </>
    );
  };
  
  export default Queue;