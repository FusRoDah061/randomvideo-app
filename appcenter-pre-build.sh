#!/usr/bin/env bash

# Create .env file for AppCenter builds
# Requires NODE_ENV variable set to production (or development)
echo "Source dir is $APPCENTER_SOURCE_DIRECTORY"

# $NODE_ENV and all other variables (except APPCENTER_SOURCE_DIRECTORY) need to be set on AppCenter's build environment variables
echo "YOUTUBE_API_KEY=$YOUTUBE_API_KEY" >> $APPCENTER_SOURCE_DIRECTORY/.env.$NODE_ENV
echo "APP_PACKAGE=$APP_PACKAGE" > $APPCENTER_SOURCE_DIRECTORY/.env.$NODE_ENV
echo "APP_CERT_FINGERPRINT=$APP_CERT_FINGERPRINT" > $APPCENTER_SOURCE_DIRECTORY/.env.$NODE_ENV
