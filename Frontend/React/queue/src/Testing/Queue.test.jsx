import axios from 'axios';
import Queue from '../Components/Queue';
import renderer from 'react-test-renderer';
import Ticket from '../Components/Ticket';

test('tests to see if Ticket renders properly', () => {
  let ticket = {
    ticket_id: 1,
    author: "auth",
    complete: true,
    description: "description",
    time_created: 101551120,
    title: "title",
    topic: "Topic1",
    urgency: 1
  };
  const TicketComp = renderer.create(<Ticket item={ticket} className={Queue.className} sort="Oldest" mode="Trainee mode" switchLoaded={false} isLoaded={false}/>).toJSON();
  expect(TicketComp).toMatchSnapshot();
});