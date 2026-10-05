#!/usr/bin/env bash
set -e

echo "Logging into cPanel..."
LOGIN_RESP=$(curl -k -s -c /tmp/cpcookies.txt -d "user=yessban1&pass=24QZdDkg4!9S@v" "https://yessbd.com:2083/login/?login_only=1")
SESS=$(echo "$LOGIN_RESP" | grep -o -E '"security_token":"[^"]+"' | cut -d'"' -f4)
echo "Got session: $SESS"

echo "Extracting deploy-cpanel.zip..."
EXTRACT_RESP=$(curl -k -s -b /tmp/cpcookies.txt \
  -d "cpanel_jsonapi_module=Fileman" \
  -d "cpanel_jsonapi_func=fileop" \
  -d "cpanel_jsonapi_apiversion=2" \
  -d "filelist=1" \
  -d "multiform=1" \
  -d "doubledecode=0" \
  -d "op=extract" \
  -d "metadata=" \
  -d "sourcefiles=%2Fhome%2Fyessban1%2Fyessbd.com%2Fdeploy-cpanel.zip" \
  -d "destfiles=%2Fhome%2Fyessban1%2Fyessbd.com" \
  "https://yessbd.com:2083${SESS}/json-api/cpanel")

echo "Extraction result:"
echo "$EXTRACT_RESP" | head -n 30

echo "Restarting Passenger via tmp/restart.txt..."
date > /tmp/restart.txt
curl -s --ftp-pasv -u "yessban1:24QZdDkg4!9S@v" -T /tmp/restart.txt "ftp://ftp.yessbd.com/yessbd.com/tmp/restart.txt"
rm -f /tmp/cpcookies.txt /tmp/restart.txt
echo "Deployment complete and Passenger reload triggered!"
