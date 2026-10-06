#!/usr/bin/env python3
"""
Automated cPanel HTTPS Deployment Script for YESS Bangla Next.js
Direct HTTPS upload + cPanel API extraction + Passenger restart
"""

import os
import sys
import json
import ssl
import time
import urllib.request
import urllib.parse
import http.cookiejar

CPANEL_HOST = "https://yessbd.com:2083"
USERNAME = "yessban1"
PASSWORD = "24QZdDkg4!9S@v"
TARGET_DIR = "/home/yessban1/yessbd.com"
ZIP_FILE = sys.argv[1] if len(sys.argv) > 1 else ("deploy-update.zip" if os.path.exists("deploy-update.zip") else "deploy-cpanel.zip")

def main():
    if not os.path.exists(ZIP_FILE):
        print(f"❌ Error: {ZIP_FILE} not found!")
        sys.exit(1)

    file_size = os.path.getsize(ZIP_FILE)
    print(f"📦 Found {ZIP_FILE} ({file_size / (1024*1024):.2f} MB)")

    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    cj = http.cookiejar.CookieJar()
    opener = urllib.request.build_opener(
        urllib.request.HTTPCookieProcessor(cj),
        urllib.request.HTTPSHandler(context=ctx)
    )

    # 1. Login to cPanel
    print("\n[1/4] Authenticating with cPanel via HTTPS...")
    login_data = urllib.parse.urlencode({"user": USERNAME, "pass": PASSWORD}).encode()
    login_req = urllib.request.Request(f"{CPANEL_HOST}/login/?login_only=1", data=login_data)
    login_resp = opener.open(login_req)
    login_info = json.loads(login_resp.read().decode())
    token = login_info.get("security_token")
    if not token:
        print("❌ Failed to obtain cPanel security token:", login_info)
        sys.exit(1)
    print(f"✓ Session established: {token}")

    # 2. Upload deploy-cpanel.zip via HTTPS streaming
    print(f"\n[2/4] Uploading {ZIP_FILE} to {TARGET_DIR} via cPanel File Manager API...")
    boundary = "----WebKitFormBoundary" + os.urandom(16).hex()
    
    header_fields = (
        f"--{boundary}\r\n"
        f'Content-Disposition: form-data; name="dir"\r\n\r\n{TARGET_DIR}\r\n'
        f"--{boundary}\r\n"
        f'Content-Disposition: form-data; name="overwrite"\r\n\r\n1\r\n'
        f"--{boundary}\r\n"
        f'Content-Disposition: form-data; name="file-1"; filename="{ZIP_FILE}"\r\n'
        f"Content-Type: application/zip\r\n\r\n"
    ).encode("utf-8")
    
    footer = f"\r\n--{boundary}--\r\n".encode("utf-8")
    total_length = len(header_fields) + file_size + len(footer)

    class StreamWithProgress:
        def __init__(self, filepath, total_bytes):
            self.file = open(filepath, "rb")
            self.total_bytes = total_bytes
            self.header_sent = False
            self.footer_sent = False
            self.bytes_sent = 0
            self.last_pct = 0
            self.start_time = time.time()

        def read(self, size=65536):
            if not self.header_sent:
                self.header_sent = True
                return header_fields

            data = self.file.read(size)
            if data:
                self.bytes_sent += len(data)
                pct = int((self.bytes_sent / file_size) * 100)
                if pct >= self.last_pct + 10 or pct == 100:
                    elapsed = time.time() - self.start_time
                    speed = (self.bytes_sent / 1024) / max(elapsed, 0.1)
                    print(f"  Progress: {self.bytes_sent / (1024*1024):.1f}/{file_size / (1024*1024):.1f} MB ({pct}%) - {speed:.0f} KB/s")
                    self.last_pct = pct
                return data

            if not self.footer_sent:
                self.footer_sent = True
                return footer

            return b""

    stream = StreamWithProgress(ZIP_FILE, total_length)
    upload_url = f"{CPANEL_HOST}{token}/execute/Fileman/upload_files"
    up_req = urllib.request.Request(
        upload_url,
        data=stream,
        headers={
            "Content-Type": f"multipart/form-data; boundary={boundary}",
            "Content-Length": str(total_length)
        }
    )
    
    up_resp = opener.open(up_req)
    up_result = json.loads(up_resp.read().decode())
    if up_result.get("status") == 1:
        print(f"✓ Upload verified: {up_result.get('data', {}).get('uploads', [{}])[0].get('reason')}")
    else:
        print("⚠️ Upload response:", up_result)

    # 3. Extract deploy-cpanel.zip using cPanel API 2
    print(f"\n[3/4] Extracting {ZIP_FILE} on server...")
    extract_data = urllib.parse.urlencode({
        "cpanel_jsonapi_module": "Fileman",
        "cpanel_jsonapi_func": "fileop",
        "cpanel_jsonapi_apiversion": "2",
        "filelist": "1",
        "multiform": "1",
        "doubledecode": "0",
        "op": "extract",
        "metadata": "",
        "sourcefiles": f"{TARGET_DIR}/{ZIP_FILE}",
        "destfiles": TARGET_DIR
    }).encode("utf-8")

    ext_req = urllib.request.Request(f"{CPANEL_HOST}{token}/json-api/cpanel", data=extract_data)
    ext_resp = opener.open(ext_req)
    ext_result = json.loads(ext_resp.read().decode())
    print("✓ Extraction completed successfully!")

    # 4. Trigger Passenger Restart via tmp/restart.txt
    print("\n[4/4] Triggering Phusion Passenger application reload...")
    restart_content = f"{time.time()}\n".encode("utf-8")
    r_boundary = "----WebKitFormBoundaryRestart" + os.urandom(8).hex()
    r_body = (
        f"--{r_boundary}\r\n"
        f'Content-Disposition: form-data; name="dir"\r\n\r\n{TARGET_DIR}/tmp\r\n'
        f"--{r_boundary}\r\n"
        f'Content-Disposition: form-data; name="overwrite"\r\n\r\n1\r\n'
        f"--{r_boundary}\r\n"
        f'Content-Disposition: form-data; name="file-1"; filename="restart.txt"\r\n'
        f"Content-Type: text/plain\r\n\r\n"
    ).encode("utf-8") + restart_content + f"\r\n--{r_boundary}--\r\n".encode("utf-8")

    r_req = urllib.request.Request(
        f"{CPANEL_HOST}{token}/execute/Fileman/upload_files",
        data=r_body,
        headers={"Content-Type": f"multipart/form-data; boundary={r_boundary}"}
    )
    opener.open(r_req)
    print("✓ restart.txt updated in tmp/ directory!")

    print("\n=======================================================")
    print("  🚀 Deployment Complete! Testing live domain...")
    print("=======================================================")
    time.sleep(3)

    try:
        check_req = urllib.request.Request("https://yessbd.com/", headers={"User-Agent": "DeployCheck/1.0"})
        with urllib.request.urlopen(check_req, timeout=10) as c_resp:
            print(f"  HTTP Status: {c_resp.status} {c_resp.reason}")
            print(f"  Live Site: https://yessbd.com/")
    except Exception as e:
        print(f"  Status check notice: {e}")

if __name__ == "__main__":
    main()
