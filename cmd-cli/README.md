# Let's Commit - User Guide

The `letscommit` module is designed to simplify the process of generating and committing changes to your Git repository with automatically generated commit messages. This guide will walk you through the installation, configuration, and usage of the module.

## Requirements

Before installing the `letscommit` module, make sure you have the following requirements installed:

- Python 3.6 or higher
- Python `requests` module
- Git

## Installation

To install the `letscommit` module, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/iic2154-uc-cl/letscommit-past-inv.git
    ```

2. Build the distribution package:

    ```bash
    python setup.py sdist
    ```

3. Install the generated package:

    ```bash
    pip install dist/letscommit-0.1.0.tar.gz
    ```

## Getting Started

1. **Log In or Register:**

Before using the `letscommit` module, you need to log in or register for an account:

- To log in, use the command:

  ```
  letscommit --login
  ```

- To register and create a new account, use the command:
- 
  ```
  letscommit --signup
  ```

2. **Verify the Token:**

To check if your token is valid, run the following command:

  ```python
  letscommit --check
  ```

## Generate Commits

Now that you are set up, you can start generating commits using the `letscommit` module.

1. **Add Changes:**

Before generating a commit, make sure to add the changes you want to commit using the `git add` command:

  ```python
  git add archivo1 archivo2
  ```

2. **Initiate Auto Commit:**

To automatically generate and commit changes, use the following command:

  ```python
  letscommit --start
  ```

The module will perform the following steps:
- Retrieve changes from your Git repository.
- Generate a list of commit messages.
- Allow you to select a commit message from the list or provide a custom one.
- Create a commit with the chosen message.
- Send the commit information to the API.

3. **Push Changes:**

After generating the commit, make sure to push your changes to the remote repository using the `git push` command:

  ```python
  git push origin nombre_de_rama
  ```

## Choose a Commit Message

The module will present you with a list of generated commit messages. You can choose one of the following options:
- Enter `0` to provide a custom commit message.
- Enter the number corresponding to one of the generated commit messages.

## Additional Information

- If you encounter any issues or need help, you can use the `--help` option to see available options and usage examples:

  ```python
  letscommit --help
  ```
