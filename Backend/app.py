
import json
from flask_cors import CORS
from flask import Flask,request
from endpoints import text_extraction as text_extraction
from endpoints import upload_to_s3 as s3_upload


app = Flask(__name__)#Flask application and  enabling cors
CORS(app)

@app.route('/upload_image', methods=['Post'])#upload image notes route
def upload_image():

    title = request.form.get('docTitle') 
    notesfile = request.files['imagefile']

    fileupload_response=s3_upload.upload_to_s3(notesfile,title)#uploading handwritten  notes image to s3

    if (fileupload_response):#checking for s3 rupload status

        textract_response=text_extraction.text_extraction(notesfile.filename)#calling textextract if response is succesful

        print( "textract_response",textract_response)#printing textract response
        
        return {
         'status': 'success',
         'Message': 'text extraction successful'
                }
    else:
        return {
        'status': 'failed'

        }
    
@app.route('/get_document', methods=['Post'])
def get_document():
    pass


@app.route('/update_document', methods=['Post'])
def update_document():
    pass

       
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)