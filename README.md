# BEIS NSI Notification Portal

The National Security and Investment Act (NSI) came into force on 4 January 2022.

The Act gives the government powers to scrutinise and intervene in business transactions, such as takeovers, to protect national security, while providing businesses and investors with the certainty and transparency they need to do business in the UK.

This application allows a notification to be created by the following parties:

- notifying parties (such as acquirers)
- representatives of notifying parties (such as law firms)

## Setup

Run the NPM install command to download dependencies:

```
npm install
```

In order to run the application you will need to modify the "LOCAL_ENV" section of the config.js file.

You will need to configre the Azure B2C access seperately see the nsi-azure-b2c repository.

This portal also requires a Postgres database, the creation scripts for the the container for this can be found and the AppNotes.txt file within the project.  Here is a sample script for creating the basic Postgres Docker container:

```
docker run -d --name beisnpdb-postgres -e POSTGRES_PASSWORD=Pass2020! -v C:/Dev/beisnpdb-data/:/var/lib/postgresql/data -p 5490:5432 postgres
```

## Running the application

To run the portal, from the root directory, run:

```
npm start
```

This runs the notification portal on `localhost:3000`.

## Access

### Staging

The staging environment is hosted on Azure: https://nsi-stg.beis.gov.uk

### Production

The production environment is hosted on Azure: https://nsi.beis.gov.uk