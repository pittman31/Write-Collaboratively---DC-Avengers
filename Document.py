"""
Author: Zach Pittman
Document.py:
    Class for a Document. Functions for creating, editing, and updating a Document
"""


class Document:
        
        """ Description	
        Class for Document functionality
        """

        DocumentID = 0  #Google Doc Document ID

        def __init__(self, DocumentID):
            """ Description
            :type self:
            :param self:
        
            :type DocumentID:
            :param DocumentID:
        
            :raises:
        
            :rtype:
            :returns:
            """            
            #If 0 is passed create a new Document
            if DocumentID == 0 :
                    #create Document
                    self.DocumentID = 0
            else:
                    self.DocumentID = DocumentID

def pushChanges():
        """ Description
        Push Document changes to the Google Doc servers

        :raises:
    
        :rtype:
        :returns:
        """
        #TODO

def getChanges():
        """ Description
        Get document changes from the Google Doc servers

        :raises:
    
        :rtype:
        :returns:
        """
        #TODO     
         