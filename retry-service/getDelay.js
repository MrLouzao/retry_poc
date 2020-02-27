const axios = require('axios');


class GetDelay {
    

    constructor(url) {
        this.url = url;
        this.currentRetries = 0;
        this.TIMEOUT = 2000;
        this.MAX_RETRIES = 3;
    }

 
   async call() {
        // Retry while waiting for requests
        while(this.currentRetries < this.MAX_RETRIES) {
            console.log(`Call attempt ${this.currentRetries+1} to service`);
            try {
                const nextTimeout = this.nextTimeout(); // Timeout must be a fixed amount of time. Only here for testing purposes.
                await this.makeRequest(nextTimeout);
                console.log("Regreso de la make request");
                break;
            } catch(e) {
                console.log("Fallo al procesar el make request");
                this.currentRetries++;
                const nextSleep = this.nextSleep();
                console.log("Next sleep: " + nextSleep);
                await this.sleep(nextSleep);
            }
        }

        // Print error message if max retries reached
        if (this.currentRetries === this.MAX_RETRIES) {
            console.log(`Max attempt of retries (${this.MAX_RETRIES}) reached`);
        }
    }


    async makeRequest(timeout){
        const result = await axios
        .get(
            this.url,
            {timeout}
        ).then(res => {
            console.log(res.data);
            return "Done!";
        }).catch(err => {
            console.log("ERROR:" + err.code);
            throw new Error("Error while processing request");
        });

        return result;
    }


    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    nextTimeout() {
        return this.toMiliseconds(
            Math.pow(
                this.toSeconds(this.TIMEOUT),this.currentRetries+1
            )
        );
    }


    nextSleep() {
        return this.toMiliseconds(
            Math.pow(
                this.toSeconds(this.TIMEOUT),this.currentRetries
            )
        );
    }


    toSeconds(value) {
        return value / 1000;
    }

    toMiliseconds(value) {
        return value * 1000;
    }

}


module.exports = GetDelay;