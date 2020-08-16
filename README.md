# task-managment-client

Task management web app provides the UI access for task management system.

## Prequises

Task management system REST api: https://github.com/blertak/task-management-api

## Setup

In order to setup the project first copy default configs through the following command:
```console
bash setup-config.sh
```

This command will generate a default config file inside `src/config/config.json`. Update the api urls inside this config according to your REST api config.

Once you've setup the config file you can run the project by simply running the command below:
```console
npm start
```
