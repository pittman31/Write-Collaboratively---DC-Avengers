
import json
from flask_cors import CORS
from flask import Flask,request
from endpoints import text_extraction as text_extraction


#Flas application and  enabling cors
app = Flask(__name__)
CORS(app)

#upload image notes route
@app.route('/upload_image', methods=['GET'])
def upload_image():
   
   #sample request data
   filename='sample.jpeg'
    
   #text extraction
   textract_response=text_extraction.text_extraction(filename)
   print( "textract_response",textract_response)
   
   return {
           'Message': 'success',
           'response': textract_response
       }
       
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)