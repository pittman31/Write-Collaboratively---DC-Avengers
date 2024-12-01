"""
Author: Zach Pittman
Document.py:
    Class for a Document. Functions for creating, editing, and updating a Document
"""
import io

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaIoBaseDownload

class Document:
	
	
	""" Description: 
	Class for Document functionality
	"""

	docID = None  #Google Doc Document ID
	documentContent = None #Document content from the Google Docs API response
	creds = None    #User Credentials
	docsService = None      #Docs Service
	driveService = None		#Drive Service


	def __init__(self, docID, driveService, docsService, creds):
		""" Description:
		Document class Constructor

		:type self:
		:param self:

		:type docID:
		:param docID:

		:type driveService:
		:param driveService:

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
		self.driveService = driveService

		#Get Document content to store in a member variable
		self.getDocumentUpdates()





	def insertTextAtEnd(self, text):
		""" Description:
		Insert specified text at the end of the document

		:type self:
		:param self:

		:type text:
		:param text:

		:raises:
		HttpError

		:rtype:
		boolean
		:returns:
		isSuccessful
		"""
		isSuccessful = False

		try:

			#Get the latest Document updates
			self.getDocumentUpdates()
			
			#Get the end index for the document
			try:
				endIndex = self.documentContent.get('body', {}).get('content')[1].get('endIndex')

			except TypeError as err:
				print(err)

			print(endIndex)

			#Request body for the API call
			requests=[
				{
					"insertText":{
					"location": {
						"index": endIndex - 1
					},
					"text": text
					}
				}
			]

			#Update Document body text
			result = self.docsService.documents().batchUpdate(documentId=self.docID, body={'requests': requests}).execute()
		
			#Print the title and contents of the documnet
			#print(f"The title of the document is: {document.get('title')}")
			#print(f"The body of the document is: {document.get('body')}")

			isSuccessful = True
		
		except HttpError as err:
			print(err)
			isSuccessful = False

		return isSuccessful
	
	def getDocumentTitle(self):
		""" Description: 
		Get the document title

		:type self:
		:param self:
	
		:raises:
		HttpError

		:rtype:
		:returns:
		Document Title
		"""
		return self.documentContent.get('title')
	
	def exportDocumentAsTxt(self):
		
		#Download the document in byte format
		try:
			fileFormat = "text/plain"
			request = self.driveService.files().export_media(fileId=self.docID, mimeType=fileFormat)

			fileInBytes = io.BytesIO()
			downloader = MediaIoBaseDownload(fileInBytes, request)
			done = False
			while done is False:
				status, done = downloader.next_chunk()
				print(f"Download {int(status.progress() * 100)}.")

		except HttpError as err:
			print(err)
			fileInBytes = None

		#Convert the Byte information into a txt file
		with open("documentText.txt", "wb") as file:
			file.write(fileInBytes.getbuffer())
		
		#Read Contents of a text file as a String
		with open("documentText.txt", "r", encoding='utf-8-sig') as file:
			fileText = file.read()
		print(fileText)

		return fileText

		



	
	def getDocumentUpdates(self):
			""" Description
			Get Document content from the google docs server

			:type self:
			:param self:

			:raises:
			HttpError

			:rtype:
			Boolean
			:returns:
			isSuccessful
			"""
			try:
				#API call to get document updates
				self.documentContent = self.docsService.documents().get(documentId=self.docID, ).execute()
				isSuccessful = True

			except HttpError as err:
				print(err)
				isSuccessful = False

			return isSuccessful