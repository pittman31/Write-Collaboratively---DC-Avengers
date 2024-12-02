from flask_cors import CORS
from flask import Flask,request
from endpoints import text_extraction as text_extraction
from endpoints import upload_to_s3 as s3_upload
from GoogleAPI.src import GoogleHelperFunctions
from GoogleAPI.src import Document

app = Flask(__name__)#Flask application and  enabling cors
CORS(app, origins=["*"])

myDocument = None   #Document Object
creds = None    #Credentials for the Google Servers
docsService = None  #Docs Service object
driveService = None #Drive Service Object

@app.route('/upload_image', methods=['Post'])#upload image notes route
def upload_image():

    title = request.form.get('docTitle') 
    notesfile = request.files['imagefile']

    fileupload_response=s3_upload.upload_to_s3(notesfile,title)#uploading handwritten  notes image to s3

    if (fileupload_response):#checking for s3 rupload status

        textract_response=text_extraction.text_extraction(notesfile.filename)#calling textextract if response is succesful

        print("textract_response",textract_response)#printing textract response
        
        globals()['myDocument'].insertTextAtEnd(textract_response)#Insert the textract response at the end of the document

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

    #get the latest document updates
    globals()['myDocument'].getDocumentUpdates()

    #Export Document as text
    documentText = globals()['myDocument'].exportDocumentAsTxt()

    return {
        'status': 'success',
        'content': documentText
        }


[]
@app.route('/update_document', methods=['Post'])
def update_document():
    pass


@app.route('/google_login', methods=['Get'])#login route
def google_login():

    #Setup Authentication Credentials for Google API access
    creds = GoogleHelperFunctions.setupServiceCredentials()

    #Instantiate the document object
    globals()['myDocument'] = Document.Document(GoogleHelperFunctions.DOCUMENT_ID, creds)

    return {
        'status': 'success',
    }

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)