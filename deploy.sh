#! /bin/bash

SHA1=$1

# Deploy image to Docker Hub
docker push michaelmerrill/snapflix:$SHA1

# Create new Elastic Beanstalk version
EB_BUCKET=elasticbeanstalk-us-west-1-531651932269
DOCKERRUN_FILE=$SHA1-Dockerrun.aws.json
sed "s/<TAG>/$SHA1/" < Dockerrun.aws.json.template > $DOCKERRUN_FILE
aws s3 cp $DOCKERRUN_FILE s3://$EB_BUCKET/$DOCKERRUN_FILE
aws elasticbeanstalk create-application-version --application-name api.snapflix.com \
  --version-label $SHA1 --source-bundle S3Bucket=$EB_BUCKET,S3Key=$DOCKERRUN_FILE \
  --region us-west-1

# Update Elastic Beanstalk environment to new version
aws elasticbeanstalk update-environment --environment-name snapflix-dev \
    --version-label $SHA1 --region us-west-1
