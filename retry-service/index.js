const axios = require('axios');

const httpClient = axios.create();
httpClient.defaults.timeout = 2000;


// Execution
// GET
httpClient
    .get('http://localhost:5000/success')
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.error(err);
    });

    

// POST
httpClient
    .get('http://localhost:5000/delay')
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        //console.log(err);
        console.log("ERROR:" + err.code);

    })