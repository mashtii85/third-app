#!/bin/sh
echo 'Check if bucket lms-media exists'
if awslocal s3api head-bucket --bucket "lms-media" 2>/dev/null
then
echo It exists
else
echo Creating bucket...
awslocal s3 mb s3://lms-media/
echo Uploading files to S3...
awslocal s3 cp /docker-entrypoint-initaws.d/files s3://lms-media/ --recursive #--exclude "*.*"  --include "*.*"
fi

echo 'Verifying email address on SES...'
# TODO: email & region should be read from .env file
awslocal ses verify-email-identity --email-address lms@drykiss.com --region eu-west-2
echo 'Verified lms@drykiss.com'
