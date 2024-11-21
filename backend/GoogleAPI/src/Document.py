"""
Author: Zach Pittman
Document.py:
    Class for a Document. Functions for creating, editing, and updating a Document
"""
import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

class Document:
	
	
	""" Description	
	Class for Document functionality
	"""

	docID = None  #Google Doc Document ID
	title = None    #Document Title
	body = None     #Document Body
	creds = None    #User Credentials
	docsService = None      #Docs Service


	def __init__(self, docID, docsService, creds):
		""" Description
		:type self:
		:param self:

		:type docID:
		:param docID:

		:type docsService:
		:param docsService:

		:type creds:
		:param creds:

		:raises:

		:rtype:
		:returns:
		"""

		#Update Member Variables
		self.docID = docID
		self.docsService = docsService
		self.creds = creds

	def insertTextAtBeginning(self, text):

		isSuccessful = False

		try:
			# Retrieve the documents contents from the Docs service.
			document = self.docsService.documents().get(documentId=self.docID).execute()

			#Print the title and contents of the documnet
			print(f"The title of the document is: {document.get('title')}")
			print(f"The body of the document is: {document.get('body')}")
			
			#Text to update the document with
			requests=[
				{
					"insertText":{
					"location": {
						"index": 1
					},
					"text": text
					}
				}
			]

			#Update Document body text
			result = self.docsService.documents().batchUpdate(documentId=self.docID, body={'requests': requests}).execute()

			# Retrieve the documents contents from the Docs service.
			document = self.docsService.documents().get(documentId=self.docID).execute()
			
			#Print the title and contents of the documnet
			print(f"The title of the document is: {document.get('title')}")
			print(f"The body of the document is: {document.get('body')}")

			isSuccessful = True
		
		except HttpError as err:
			print(err)
			isSuccessful = False

		return isSuccessful
	
	def getDocumentTitle(self):
		#TODO
		return self.title
	
	def getDocumentUpdates(self):
		#TODO
		return None