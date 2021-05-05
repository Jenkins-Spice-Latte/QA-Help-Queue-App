// users.test.js
const axios = require("axios");
const users = require("./Components/users");

jest.mock("axios");

test("should fetch tickets", () => {
  const tickets = [{ ticket_id: "1" }];
  const resp = { data: tickets };
  axios.get.mockResolvedValue(resp);

  return Queue.test().then((data) => expect(data).toEqual(tickets));
});