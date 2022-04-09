# EnvSwitcher

EnvSwitcher is a Node Js script that will help you to get environment vars belonging to the settled environment, without the needing of change the var name to get a specific environment var.

## How it works

EnvSwitcher gets environment variables based on the settled environment by the NODE_ENV variable. In order to do so, it stores a list of environments with the prefix that belongs to that environment. This prefix established when defining an environment variable, will allow us to identify that variable as belonging to an environment. To define an environment you must define the environment variable NODE_ENV which can be defined inside the file .env or by command line before or when running a script, in case the variable NODE_ENV was not defined, the default attribute will act as if it were the defined environment, so when looking for a variable, the variable belonging to said environment will be the one obtained. On the other hand, if the default attribute is not defined, the variable obtained will be exactly the same as the one searched for.

## Usage

1. Copy EnvSwitcher.js file to your project

2. Create .env file

   If you don't have dotenv installed yet

   ```sh
   npm install dotenv
   ```

3. Set environment variables (in .env file)

   ```
   # without environment defined <var>=<value>
   EXAMPLE_VAR=value

   # with environment defined <environment>_<var>=<value>
   TEST_EXAMPLE_VAR=value
   ```

4. Set EnvSwitcher environments

   ```js
   // this environment will take vars without prefixes <var>=<value>
   const production = {
     name: "production",
   };

   // this environment will take vars with environment prefix TEST_<var>=<value>
   const test = { name: "test", prefix: "TEST" };

   EnvSwitcher.environments = [production, test];
   ```

5. Set EnvSwitcher default

   ```js
   // test environment will be used whenever NODE_ENV environment var were not defined
   EnvSwitcher.default = "test";
   ```

6. Get environment var

   ```js
   // will return EXAMPLE_VAR belonging to the current environment (NODE_ENV)
   EnvSwitcher.get("EXAMPLE_VAR");
   ```

7. Get var from environment

   ```js
   // "will return EXAMPLE_VAR belonging to the test environment
   EnvSwitcher.getFrom("EXAMPLE_VAR", "test");
   ```

8. Set NODE_ENV

   If you don't have cross-env installed yet

   ```sh
   npm install cross-env
   ```

   ```sh
   cross-env NODE_ENV=<environment>
   ```

## Recommended way of usage

- envswitcher.config.js

  ```js
  const EnvSwitcher = require("*/EnvSwitcher");

  const options = {
    environments: [
      {
        name: "production",
      },
      {
        name: "development",
        prefix: "DEV",
      },
      {
        name: "test",
        prefix: "TEST",
      },
    ],
    default: "development",
  };

  module.exports = EnvSwitcher.config(options);
  ```

- index.js

  ```js
  require("*/envswitcher.config.js");
  ```

## Tech stack

- [dotenv](https://www.npmjs.com/package/dotenv)

- [cross-env](https://www.npmjs.com/package/cross-env)

- [Jest](https://jestjs.io/)

## Run locally

- Clone repository

  ```sh
  git clone https://github.com/carlos-canedo/node-env-switcher.git
  ```

- Install packages

  ```sh
  npm install
  ```

- Run test

  Test environment

  ```sh
  npm test
  ```

  No environment

  ```sh
  npm run test:no-env
  ```

  Development environment

  ```sh
  npm run test:dev
  ```

  Production environment

  ```sh
  npm run test:prod
  ```
