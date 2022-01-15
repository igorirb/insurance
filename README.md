# Insurance App

## Setup

This project requires [Node.js](https://nodejs.org/) to run.

### Clone

First, clone the repository:

```sh
git clone git@github.com:CareLuLu/v3-server.git
```

### Installation

Second, go the project's root and install project's dependencies and devDependencies:

```sh
cd v3-server
yarn
```

### Environment Variables

Before running the app, please set the environment variables using the sample file `.env.sample`.

```sh
PORT=XXXX
```

### Running Application

Now you're ready to launch the app.

```sh
yarn start
```

The app will be available on the port you chose on your `.env` file. To read the documentation and the available endpoints, please access the url below:

```sh
http://localhost:{PORT}/docs
```

### Tests

To run the tests, simply execute the command below:

```sh
yarn test
```

### Lint

To run eslint, simply execute the command below:

```sh
yarn lint
```