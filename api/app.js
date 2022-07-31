const createServer = require('http').createServer;
const url = require('url');
const axios = require('axios');
const config = require('./config');

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
};

const server = createServer((request, res) => {
  const requestURL = url.parse(request.url);
  const decodedParams = decodeParams(new URLSearchParams(requestURL.search));
  const { search, location = "usa", country = 'us' }  = decodedParams;

  const targetURL = `${config.BASE_URL}/${country.toLowerCase()}/search/1?app_id=${config.APP_ID}&app_key=${config.API_KEY}&results_per_page=200&what=${search}&content-type=application/json`;
    if (request.method === 'GET') {
      console.log(`Proxy GET request to : ${targetURL}`);
      axios.get(targetURL)
        .then(response => {
          res.writeHead(200, headers);
          res.end(JSON.stringify(response.data));
        })
        .catch(response => {
          console.log(response);
          res.writeHead(500, headers);
          res.end(JSON.stringify(response));
        });
    } 
});


server.listen(3000, () => {
  console.log('Server listening');
} );


const decodeParams = searchParams => Array
  .from(searchParams.keys())
  .reduce((acc, key) => ({ ...acc, [key]: searchParams.get(key) }), {});