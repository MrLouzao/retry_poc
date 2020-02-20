const axios = require('axios');


class GetDelay {

    TIMEOUT = 10000;


    constructor(url) {
        this.url = url;
        this.currentRetries = 0;
    }

 
    call() {
        // TODO implement here the logic
        this.makeRequest();
    }


    makeRequest(){
        const httpClient = axios.createClient();
        httpClient.get(this.url)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            //console.log(err);
            console.log("ERROR:" + err.code);
        });
    }


}


export default GetDelay;