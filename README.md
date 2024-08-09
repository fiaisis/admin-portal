# Background

### Admin portal

This project is used to interact with JSON specifications via the FIA API, which if running locally needs to be backed by a local FIA_API its postgress database. Requires docker if building docker containers locally.

### Tech used

- **Next JS** - The web development framework, the backbone of the project which provides various features and functionality (SSG, SSR, etc.)
- **MUI** - For consistent UI aesthetics
- **Monaco Code Editor** - For the JSON specification editing feature
- **Cypress** - For running tests
- **Docker** - For manually building and pushing containers to registry

## Getting Started (local install)

Clone the repository, and navigate to the root directory of the newly cloned repo

`git clone https://github.com/fiaisis/admin-portal.git`

`yarn install` or `yarn --frozen-lockfile`- Installs the required packages

`yarn build`- To build the project

Then you can run the NextJS server using two methods. As a development server (this comes with hot reloading of the server after code changes). Or as a local environment that mimics a production server.

`yarn dev`- To run as dev

`yarn start`- To run as local production

### FIA_API (prerequisite)

Setting up FIA_API is a pre-requisite for using the full range of features of the admin-portal.
Follow the instructions on that repo https://github.com/fiaisis/FIA-API, it is advised to install it in a conda environment see below

The postgres database can be generated within the FIA_API repo https://github.com/fiaisis/FIA-API?tab=readme-ov-file#database-generation-script-for-development-environment.

### optional: CONDA install (for running fia api)

- `curl -L -O "https://github.com/conda-forge/miniforge/releases/latest/download/Mambaforge-$(uname)-$(uname -m).sh"`
- `bash Mambaforge-$(uname)-$(uname -m).sh`
- `source activate`
- `conda create -n <conda_fia_api_env_name>`
- `mamba install "python>=3.12"`

Within the FIA_API directory

- `conda activate <conda_fia_api_env_name>`
- `pip install .` or `pip install .[all]`
- note an issue about psycopg2 (https://github.com/fiaisis/FIA-API/issues/340)

## Docker

### Local Docker

To build the image (locally) (add a `--progress=plain` flag to see debug output). It's advised to use the image name `ghcr.io/fiaisis/admin-portal` as that is what is required to push onto the registry.

`docker build --no-cache -t ghcr.io/fiaisis/admin-portal .`

To run the container (in detached mode -d)

`docker run -p 3000:3000 -d --name <container name> ghcr.io/fiaisis/admin-portal`

To view files in the container (bash is not available)

`docker exec -it <container name> /bin/sh`

Open [http://localhost:3000/admin-portal](http://localhost:3000/admin-portal) with your browser to see the result.

### Preparing docker image for the registry - ghcr.io/fiaisis/

`docker build . --no-cache -t ghcr.io/fiaisis/admin-portal`

(optional) `docker run -p 3000:3000 ghcr.io/fiaisis/admin-portal`

To push to the registry (for testing an image on gitops):
Use GitHub credentials to login (same as for committing and pushing to this project)

`docker login ghcr.io/fiaisis/`

`docker push ghcr.io/fiaisis/admin-portal -a`

## Environment variables

[what env variables being used, why needed]
The following Environment variables are made available and are overridden in deployment:

- `API_BASE_URL` - This is used as the common prefix for the fetch request URL (for most of the fetch requests)
- `BASE_URL` - This is overridden on deployment to set the correct route for access behind the reverse proxy
- `CI_TEST` - This Boolean is assigned within and used to set the correct BASE_URL on gitub CI test workflow
- `FIA_API_API_KEY` - This is used in the authorisation headers when making fetch requests, but is ignored when running locally (system or container)

## Cypress for running tests

Running cypress tests locally needs the admin-portal running locally as a dev server (see below) and for that to run correctly, you need FIA-API running too. You can run cypress two ways.

To run cypress via a terminal (additionally you can pass in specific specs to run `--spec cypress/e2e/spec.cy.ts`)

- `yarn cypress run`

To run cypress via a web browser (click through to E2E tests)

- `yarn cypress open`

### Running cypress tests against a local dev server (not local production)

Running Cypress tests for the admin-portal locally will only pass if the NextJS server is started as a dev server `yarn dev` (or `yarn run dev`)

This is because cypress starts a client in non-production mode. So, it is expecting to run against a development server.

Attempting to run the cypress tests against a local production server (`yarn build` followed by `yarn start`) will result in failure as the production server expects a BASE_URL of "/admin-portal" but cypress will self-configure the test to set BASE_URL to "" (via the CI_TEST env var).

Comments have been included to allow override the logic and temporarily test against a local production server

## Misc local commands

### Formatting code via prettier

`yarn run prettier --config prettierrc.json --check **/*.{js,tsx,ts}` - dry run prettier

`yarn run prettier --config prettierrc.json --write **/*.{js,tsx,ts}` - to format code
