
import boto3

#textract client initialization
textract = boto3.client(
    'textract'
)
#calling extract detect_document_text api to extract data from handwritten notes image
def text_extraction(filename):
        extracted_data=[]
        response = textract.detect_document_text(
            Document={'S3Object': {
            'Bucket': 'input-notes-image',
            'Name': filename
            }}
        )

        for data in response.get("Blocks", []):
            if data["BlockType"] == "LINE":
                extracted_data.append(data["Text"])

        sentence = ' '.join(extracted_data)
        return sentence


