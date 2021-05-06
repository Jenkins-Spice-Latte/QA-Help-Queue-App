import axios from 'axios';
import Queue from './Components/Queue';

jest.mock("axios");

test("should fetch tickets", () => {
  const tickets = [{  }];
  const resp = { data: tickets };
  axios.get.mockResolvedValue(resp);

  return Queue.axios.get("http://localhost:8902/readAll").then((data) => expect(data).toEqual(tickets));
});