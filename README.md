# letscommit-past-inv

![image](https://github.com/iic2154-uc-cl/letscommit-past-inv/assets/48336498/bf22a336-867b-4724-aafe-cf7d15801469)

## Description

In software engineering, effective commit messages are crucial for maintaining a clear project history, facilitating collaboration, and improving codebase management. However, students in capstone projects often struggle with crafting meaningful commit messages. To address this, we propose leveraging Generative AI to enhance the quality of commit messages. This approach involves analyzing code changes and offering three possible commit message options, along with the flexibility for students to create their own messages based on the suggestions.

# Table of Contents

- [letscommit-past-inv](#letscommit-past-inv)
  - [Description](#description)
- [Table of Contents](#table-of-contents)
- [Problem](#problem)
- [Solution](#solution)
- [Version](#version)
- [Dependencies](#dependencies)
- [Commit API Server - User Guide](#commit-api-server---user-guide)
  - [Installation](#installation)
  - [Install Dependencies](#install-dependencies)
  - [Environment Configuration](#environment-configuration)
  - [Running the Server](#running-the-server)
- [Let's Commit - User Guide](#let's-commit---user-guide)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Getting Started](#getting-started)
  - [Generate Commits](#generate-commits)
  - [Choose a Commit Message](#choose-a-commit-message)
  - [Additional Information](#additional-information)
- [Getting Started with Create React App](#getting-started-with-create-react-app)
  - [Available Scripts](#available-scripts)
    - [`npm start`](#`npm-start`)
    - [`npm test`](#`npm-test`)
    - [`npm run build`](#`npm-run-build`)
    - [`npm run eject`](#`npm-run-eject`)
  - [Learn More](#learn-more)
    - [Code Splitting](#code-splitting)
    - [Analyzing the Bundle Size](#analyzing-the-bundle-size)
    - [Making a Progressive Web App](#making-a-progressive-web-app)
    - [Advanced Configuration](#advanced-configuration)
    - [Deployment](#deployment)
    - [`npm run build` fails to minify](#`npm-run-build`-fails-to-minify)
- [Support](#support)
- [References](#references)
- [License](#license)


# Problem

Students often struggle with writing clear and concise commit messages, which can lead to poorly documented project histories.



# Solution

`letscommit` uses Generative AI to analyze code changes and provide three commit message suggestions. For example, if a student makes changes to improve the performance of a function, the tool might suggest:

1. "Optimize function for better performance."
2. "Refactor code to enhance efficiency."
3. "Improve function execution time."

Students can choose one of these suggestions or use them as a basis to craft their own commit message.



# Version

Current system version: 1.0.0



# Dependencies

Before installing and running, make sure you have the following requirements installed:

- Python 3.6+
- `requests` module
- Node.js (version 12 or higher)
- Git
- Npm
- React
- Postgresql


# Commit API Server - User Guide

This is the backend server, responsible for handling API requests, managing data, and serving responses to the frontend application.


## Installation

Clone the project repository:

```bash
git clone https://iic2154-uc-cl/letscommit-past-inv.git
```

## Install Dependencies

Navigate to the server directory and run the following command to install the dependencies:

```bash
cd letscommit-past-inv/server
npm install

```

## Environment Configuration

Create a `.env` file in the root directory of the server and set up the necessary environment variables. An example of a `.env` file might look like this:

```env
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
PORT=your_port
```



## Running the Server

To run the server in development mode, use the following command:

```bash
npm start
```

To prepare and run the server in production, follow these steps:
1. Ensure all environment variables are set in the `.env` file.
2. Start the server using a process manager like pm2:





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

2. Declare your api url in main.py:

    ```python
    API_URL = 
    ```

3. Build the distribution package:

    ```bash
    cd letscommit-past-inv/cmd-cli
    python setup.py sdist
    ```

4. Install the generated package:

    ```bash
    pip install dist/letscommit-1.0.7.tar.gz
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
- Enter `0` to provide a commit message.
- Enter the number corresponding to one of the generated commit messages.



## Additional Information

- If you encounter any issues or need help, you can use the `--help` option to see available options and usage examples:

  ```python
  letscommit --help
  ```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# Support

For support, please contact us at aneyem@uc.cl



# References

- SEIS-Lab: [http://www.seislab.cl/](http://www.seislab.cl/)


# License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

---

_Code last updated: January 13, 2024_

