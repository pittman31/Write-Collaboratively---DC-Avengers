"""
Author: Zach Pittman
GoogleHelperFunctions.py:
	Helper functions for using the Google API's
"""
import os.path
import sys
import httplib2
from apiclient import discovery
from google.oauth2.service_account import Credentials
from google.auth.transport.requests import Request
#from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError


# The ID of a document.
DOCUMENT_ID = "109zpwgU7kLhW5EeLEGcaunTgS0wwOLdufQINBhSqOSY"
def setupServiceCredentials():
	""" Description: 
	Setup servic account authentication

	:raises:
	
	:rtype:
	:returns:
	Service Account Authentication Credentials
	"""

	#Access scope used for user authentication
	SCOPES = ["https://www.googleapis.com/auth/drive"]

	creds = Credentials.from_service_account_file("service_account_key.json", scopes=SCOPES)   #User Credentials
	
	return creds
'''
def setupCredentials():
	""" Description: 
	Setup user authentication

	:raises:
	
	:rtype:
	:returns:
	User Authentication Credentials
	"""

	#Access scope used for user authentication
	SCOPES = ["https://www.googleapis.com/auth/drive"]

	creds = None   #User Credentials

	#Use existing credentials
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
	
	return creds
'''
def buildServices(creds):
	""" Description: 
	Builds the API Services

	:type creds:
	:param creds:

	:raises:
	HttpError

	:rtype:
	:returns:
	API Service Objects
	"""

	try:
		driveService = build("drive", "v3", credentials=creds)
		docsService =  build("docs", "v1", credentials=creds)
	except HttpError as err:
		print(err)

	return driveService, docsService