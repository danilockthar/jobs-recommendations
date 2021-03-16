# BaseProject Web

This web is built with [CRA](https://create-react-app.dev/). This framework was choosen in order to avoid basic web configurations.

Check the [docs](https://create-react-app.dev/docs/getting-started). 

### Requirements

- Yarn
- Docker & Docker-Compose

### Installation

```bash
$ git checkout develop
$ cp .env.example .env
$ yarn install
```

### Running Locally
```bash
$ yarn start

# Stop the service
$ ctrl + c
```

### Environment Deployment
For deployments, we are building locally and pushing the build result.
```bash
# Locally
$ git checkout {environment-branch}
$ git merge develop
$ yarn build:deploy

# From server (SSH)
$ git checkout {environment-branch}
$ yarn down
$ git pull
$ yarn up
```

### Code Generator
In order to have a better developer experience this projects has it own code generator.
> Check more about the generator lib we are using [here](https://github.com/codeBelt/generate-template-files).
```bash
# Run the generator and follow the instructions
$ yarn g
```

Developed by [Made2](https://made2.co).
