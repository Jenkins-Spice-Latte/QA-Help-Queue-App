import axios from 'axios';
import Create from '../Components/Create';

jest.mock("axios");

test("should create tickets", () => {
  const tickets = [{  }];
  const resp = { data: tickets };
  axios.get.mockResolvedValue(resp);

  return Create.axios.get("http://localhost:8902/readAll").then((data) => expect(data).toEqual(tickets));
});