const http = require("http");
const url = require("url");
const {parse,subDays,addDays,addWeeks} = require('date-fns');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { query } = parsedUrl;

  let response;

  if (query.action === "addDays") {
    const today = new Date();
    const resultDate = addDays(today, parseInt(query.days));
    response = `Adding ${query.days} days to today results in: ${resultDate.toDateString()}`;
  } else if (query.action === "addWeeks") {
    const today = new Date();
    const resultDate = addWeeks(today, parseInt(query.weeks));
    response = `Adding ${query.weeks} weeks to today results in: ${resultDate.toDateString()}`;
  } else if (query.action === "subDays") {
    const startDate = parse('12-jan-2019', 'dd-MMM-yyyy', new Date());
    const resultDate = subDays(startDate, parseInt(query.days));
    response = `Subtracting ${query.days} days from 12-jan-2019 results in: ${resultDate.toDateString()}`;
  } else {
    response = 'Invalid action. Please provide a valid action parameter.';
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(response);
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
