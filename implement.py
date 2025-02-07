import boto3
import requests

OBJECT_NAME_TO_UPLOAD = 'MINHA-FOTO.jpg'

s3_client = boto3.client(
    's3',
    aws_access_key_id="AKIAXYKJXPFVO3DXZ5OG",
    aws_secret_access_key="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"
)

#Generate the presigned URL
response = s3_client.generate_presigned_post(
    Bucket = 'imw-treasury',
    Key = "testesds",
    ExpiresIn = 10 
)

print(response)

#Upload file to S3 using presigned URL
files = { 'file': open(OBJECT_NAME_TO_UPLOAD, 'rb')}
r = requests.post(response['url'], data=response['fields'], files=files)

for chave, valor in r.items():
    print(f"{chave}: {valor}")