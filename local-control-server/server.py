#!/usr/bin/env python3
"""
Very simple HTTP server in python for logging requests
Usage::
    ./server.py [<port>]
"""
from http.server import HTTPServer, BaseHTTPRequestHandler
import logging
import subprocess
import json


###################################################################
##############          Local Server Routes          ##############
###################################################################
class LocalServer(BaseHTTPRequestHandler):
    # Value holding the streaming subprocess
    def __init__(self):
        self.streamingCommand = None
        self.streamFPS = 30
        self.streamBitRate= 6000000

    # Response info & status
    def _set_response(self, status_code):
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

    # Response message
    def _write_json_response(self, success, message):
        print(json.dumps({'success': success, 'message': message}))
        self.wfile.write(bytes(json.dumps({'success': success, 'message': message}), 'utf-8'))


    ##### GET Routes ######
    def do_GET(self):
        try:
            logging.info("GET request,\nPath: %s\nHeaders:\n%s\n", str(self.path), str(self.headers))
            # Check server status
            if (str(self.path) == '/status'):
                self._set_response(200)
                self._write_json_response(True, "OK")

            # Unknown route
            else:
                self._set_response(404)
                self._write_json_response(False, "Page not found")

        except:
            logging.exception('')
            self._set_response(500)
            self._write_json_response(False, "Internal server error")


    ##### POST Routes ######
    def do_POST(self):
        try:
            # Check that incomming data is a JSON
            content_type = str(self.headers['Content-Type'])
            if (str(content_type).casefold() != 'application/json'.casefold()):
                self._set_response(415)
                self._write_json_response(False, "Invalid content type: %s, expecting 'application/json'"
                    .format(content_type))
            
            # read the message and convert it into a python dictionary
            content_length = int(self.headers['Content-Length']) # Gets the size of data
            posted_data = json.loads(self.rfile.read(content_length)) # Gets the data
            logging.info(posted_data)
            logging.info("POST request,\nPath: %s\nHeaders:\n%s\n\nBody:\n%s\n",
                str(self.path), str(self.headers), posted_data)
            
            # Change volume level
            if (str(self.path) == '/volume'):
                # subprocess.run(["amixer", "sset", "Master", "%s%".format(posted_data['volume'])], check=True)
                process = subprocess.run(["osascript", "-e", f'set Volume {posted_data["volume"]}'], check=True)
                logging.info(process.returncode)
                self._set_response(200)
                self._write_json_response(True, "OK")
            
            # Start a RTMP Stream
            if (str(self.path) == '/startStream'):
                # Check if a RTMP stream has already been launched and is not finished
                # .poll() returns None if popen is still running
                if (self.streamingCommand is not None and self.streamingCommand.poll() is None):
                    self._set_response(409)
                    self._write_json_response(False, "Another stream already exists, please close it before starting a new one")
                # Launch RTMP stream
                else:
                    self.streamingCommand = subprocess.Popen(["raspivid", "-o", "-", "-t", "0", "-vf",  "-hf",\
                        "-fps",  self.streamFPS, "-b",  self.streamBitRate,\
                        "|",  "avconv",  "-re",  "-ar",  "44100",  "-ac",  "2",\
                        "-acodec",  "pcm_s16le",  "-f",  "s16le",  "-ac", "2",\
                        "-i", "/dev/zero", "-f", "h264", "-i", "-", "-vcodec", "copy",\
                        "-acodec", "aac", "-ab", "128k", "-g", "50", "-strict",\
                        "experimental", "-f", "flv", posted_data["rtmpLink"]])
                    self._set_response(202)
                    self._write_json_response(True, "OK")

            # Unknown route
            else:
                self._set_response(404)
                self._write_json_response(False, "Page not found")

        except:
            logging.exception('')
            self._set_response(500)
            self._write_json_response(False, "Internal server error")


    ##### DELETE Routes ######
    def do_DELETE(self):
        try:
            logging.info("DELETE request,\nPath: %s\nHeaders:\n%s\n", str(self.path), str(self.headers))
            
            # Stop the current stream
            if (str(self.path) == '/stopStream'):
                # Check if a RTMP stream is running
                if (self.streamingCommand is None or self.streamingCommand.poll() is not None):
                    self._set_response(200)
                    self._write_json_response(True, "No RTMP stream was running")
                else:
                    self.streamingCommand.terminate()
                    self._set_response(200)
                    self._write_json_response(True, "RTMP Stream successfully stopped")

            # Unknown route
            else:
                self._set_response(404)
                self._write_json_response(False, "Page not found")

        except:
            logging.exception('')
            self._set_response(500)
            self._write_json_response(False, "Internal server error")


###################################################################
##############         Local Server Starting         ##############
###################################################################
def run(server_class=HTTPServer, handler_class=LocalServer, port=8080):
    logging.basicConfig(level=logging.INFO)
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    logging.info('Starting httpd...\n')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
    logging.info('Stopping httpd...\n')


###################################################################
##############               Launching               ##############
###################################################################
if __name__ == '__main__':
    from sys import argv

    if len(argv) == 2:
        run(port=int(argv[1]))
    else:
        run()
