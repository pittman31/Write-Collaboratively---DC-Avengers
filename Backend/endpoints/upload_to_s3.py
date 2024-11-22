import uuid
from boto3 import resource
import boto3
import datetime

#Uploading file to s3 location  
input_bucket='input-notes-image'

def upload_to_s3(files,title):
   
   try:
     s3client = boto3.client('s3')
     filename=files.filename     
     s3client.upload_fileobj(files,input_bucket,filename,ExtraArgs={
            "Metadata":
            {
            "docTitle":title
           
            }
            })
     return True
   except Exception as e:
        print(f" error in s3 file upload: {str(e)}")
        return False

   
    
