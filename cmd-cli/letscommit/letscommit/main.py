#!/usr/bin/env python3

import os
import sys
import requests
import subprocess
# from getpass import getpass

global TOKEN_FILE
API_URL = "http://aicommit.ing.puc.cl"
# API_URL = "http://localhost:8080"
TOKEN_FILE = os.path.expanduser("~/letscommit/access_token.txt")


def save_bearer_token(access_token):
    # Save the access token to a file
    os.makedirs(os.path.dirname(TOKEN_FILE), exist_ok=True)
    with open(TOKEN_FILE, "w") as file:
        file.write(access_token)

def get_access_token():
    with open(TOKEN_FILE, "r") as file:
        bearer_token = file.read().strip()
    return bearer_token

def request_user(user_request, email, password):
    # Send a request to the API to authenticate the user
    headers = {"Content-Type": "application/json"}
    data = {"email": email, "password": password}
    response = requests.request("POST", f"{API_URL}/api/users/{user_request}", headers=headers, json=data)
    status_code = response.status_code
    response_data = response.json()

    if status_code == 200 and user_request == "login":
        print(">  Login successful.")
        access_token = response_data["token"]
        save_bearer_token(access_token)
    elif status_code == 201 and user_request == "signup":
        print(">  Signup successful.")
        access_token = response_data["token"]
        save_bearer_token(access_token)
    else:
        message = response_data["message"]
        print(f">  Error {status_code}. {message}")
        sys.exit(1)

def login():
    email = input(">  Email: ")
    password = input(">  Password: ")

    request_user("login", email, password)


def signup():
    email = input(">  Email: ")
    password = input(">  Password: ")
    password2 = input(">  Confirm password: ")

    if password != password2:
        print(">  Passwords do not match.")
        sys.exit(1)

    request_user("signup", email, password)


def check_token():
    try:
        with open(TOKEN_FILE, "r") as file:
            bearer_token = file.read().strip()
    except FileNotFoundError:
        print(">  Token file not found.")
        sys.exit(1)

    headers = {"Authorization": f"Bearer {bearer_token}"}
    response = requests.get(f"{API_URL}/api/users/validate", headers=headers)
    status_code = response.status_code

    if status_code != 200:
        response_data = response.json()
        message = response_data["message"]
        print(f">  Token is invalid. {message}")
        sys.exit(1)


def auto_commit():

    with open(TOKEN_FILE, "r") as token_file:
        bearer_token = token_file.read().strip()

    # Third we need to get the project diff
    diff = subprocess.check_output(["git", "diff", "--cached"]).decode("utf-8")
    json_payload = {"diff": diff}

    # send the request with the JSON data
    response = requests.get(f"{API_URL}/api/bots", headers={"Authorization": f"Bearer {bearer_token}", "Content-Type": "application/json"}, json=json_payload)

    if response.status_code != 200:
        message = "Falla al obtener los bots"
        print(f">  Error {response.status_code}. {message}")
        exit(1)

    data = response.json()
    generated = data.get("generated") # list of generated commit messages

    # We will ask the user to choose a commit message or make one
    print(">  Choose a commit message:")
    print(f">  {0}. Custom commit message")
    for i, message in enumerate(generated):
        print(f">  {i+1}. {message.get('bot')} says: {message.get('message')}")

    choice = input(">  Enter your choice: ")

    if choice == str(0):
        commit_message = input(">  Enter your custom commit message: ")
        selection = "author"
        author_message = commit_message
        giver = "author"
    elif choice in [str(i+1) for i in range(len(generated))]:
        commit_message = generated[int(choice)-1].get("message")
        selection = generated[int(choice)-1].get("giver")
        author_message = f"None given, {generated[int(choice)-1].get('bot')} selected"
        giver = "author"
    else:
        print(">  Invalid choice.")
        exit(1)

    generated.append({"message": author_message, "giver": giver})

    # subprocess.call(["git", "add", "."])
    subprocess.call(["git", "commit", "-m", commit_message])

    # Seventh we need to get the commit hash
    commit_hash = subprocess.check_output(["git", "rev-parse", "HEAD"]).decode("utf-8").strip()
    try:
        repo = subprocess.check_output(["git", "remote", "-v"]).decode("utf-8").splitlines()[1].split()[1].rstrip(".git")
    except IndexError:
        repo = ""

    # Eighth we need to send the commit hash to the API
    commit_hash = requests.utils.quote(commit_hash, safe='')

    response = requests.post(f"{API_URL}/api/commit/owned", headers={"Authorization": f"Bearer {bearer_token}", "Content-Type": "application/json"}, json={
        "sha": commit_hash,
        "repo": repo,
        "diff": diff,
    })

    response = requests.post(f"{API_URL}/api/message/list", headers={"Authorization": f"Bearer {bearer_token}", "Content-Type": "application/json"}, json={
        "sha": commit_hash,
        "messages": generated,
    })

    response = requests.post(f"{API_URL}/api/selection", headers={"Authorization": f"Bearer {bearer_token}", "Content-Type": "application/json"}, json={
        "sha": commit_hash,
        "choice": selection,
    })

    print(f">  Commit {commit_hash}: {commit_message}")


def usage():
    print(f">  Usage: {sys.argv[0]} --login")
    print(f">         {sys.argv[0]} --signup")
    print(f">         {sys.argv[0]} --check")
    print(f">         {sys.argv[0]} --start")


def main():
    # Parse command-line arguments
    if len(sys.argv) < 2: usage()

    else:
        arg = sys.argv[1]
        if arg == "--help":
            usage()
        elif arg == "--login":
            login()
        elif arg == "--signup":
            signup()
        elif arg == "--check":
            check_token()
            print("> Token is valid.")
        elif arg == "--start":
            check_token()
            auto_commit()
        else:
            usage()
