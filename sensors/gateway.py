from flask import Flask, request  # sudo pip3 install flask
import requests # sudo pip3 install requests

app = Flask(__name__)
host_to_fwd = "192.168.43.21:5000"


# Match all possible paths
@app.route('/', defaults={'path': ''}, methods = ['GET', 'POST'])
@app.route('/<path:path>', methods = ['GET', 'POST'])
def forward(path):
	try:
		# TODO test path forwarding (/data) !
		a = requests.post('http://' + host_to_fwd + '/' + path, data=request.form).content # TODO POST, see return value (should be 200 OK !)
		print("forwarding data to " + host_to_fwd + "...")
	except Exception as e:
		print(e)
		return 'forwarding failed :/'

	return 'forwarding done :)' # TODO check HTTP 200 OK

if __name__ == "__main__":
	app.run(host='0.0.0.0', port=5000)