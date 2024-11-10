"""
Author: Zach Pittman
main.py:
    Main Function
"""

#import Document

import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError


# The ID of a document.
DOCUMENT_ID = "109zpwgU7kLhW5EeLEGcaunTgS0wwOLdufQINBhSqOSY"

#Determines the scope of what can be accessed from the OAuth toke
SCOPES = ["https://www.googleapis.com/auth/documents"]

def main():
    """ Description
    :raises:

    :rtype:
    :returns:
    """

    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                "credentials.json", SCOPES
            )
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open("token.json", "w") as token:
            token.write(creds.to_json())
    try:
        service = build("docs", "v1", credentials=creds)

        # Retrieve the documents contents from the Docs service.
        document = service.documents().get(documentId=DOCUMENT_ID).execute()

        #Print the title and contents of the documnet
        print(f"The title of the document is: {document.get('title')}")
        print(f"The body of the document is: {document.get('body')}")
        
        #Text to update the document with
        requests=[
            {
                "insertText":{
                    "location": {
                        "index": 10
                    },
                    "text": "Hello World TEST"
                }
            }
        ]

        #Update Document body text
        result = service.documents().batchUpdate(documentId=DOCUMENT_ID, body={'requests': requests}).execute()

        #Print the title and contents of the documnet
        print(f"The title of the document is: {document.get('title')}")
        print(f"The body of the document is: {document.get('body')}")
    
    except HttpError as err:
        print(err) 

if __name__=="__main__":
    main()  
