from flask import Flask
from flask import request, jsonify
import time

app = Flask(__name__)

## Delay for requests on delay endpoint (in seconds)
SERVICE_DELAY = 5


@app.route('/success')
def hello():
    return "{'value': 2}", 201


@app.route('/service-error')
def server_error():
    return "Something wrong happened!", 500


@app.route('/delay')
def delay():
    time.sleep(SERVICE_DELAY)
    return "OK!", 200


## To configure delay value
@app.route('/set-delay' , methods = ['POST', 'PUT'])
def set_delay():
    json = request.get_json()
    new_delay = json['time']
    print("Configured time: ", new_delay)
    if new_delay < 0 or new_delay > 40:
        return "Amount of time must be between 0 and 40 seconds!", 400
    else:
        SERVICE_DELAY = new_delay
        return "Ok!", 201


## Main execution
if __name__ == '__main__':
    app.run(host='0.0.0.0')
    print("Hello! I am a server!")
