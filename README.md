# Body of Workers

## Architecture

### Backend
- Node + Express application server
- PostgresQL database
- Digital Ocean API

### Frontend

- React + Redux

### Infastructure

- Digital Ocean Droplets
- Ubuntu LTS 20.04

## Roadmap

- [Scale infra up using Terraform and possibly Ansible](https://docs.digitalocean.com/reference/terraform/terraform-deploy/)
- Set up Jest testing with Travis

### Authentication Levels
```
{ 
  4: Me
  3: Artists
  2: Patrons
  1: Public
}
```

Each increasing index is greater restriction of privacy (ex: privacy level is only artist-to-artist view; patrons cannot view artwork with privacy 3 OR 4)

---

## Setup

### Database (macOS)
1. Make sure that the [Homebrew](https://brew.sh/) package manager is installed
2. Run `brew install postgres`
3. To launch Postgres as a dœmon (background process) run `brew services start postgres`. You can check the status of the process by running `brew services`.
4. To access `postgres` from the command line run `psql postgres` (the default database)
  - you **must** initialize the role and database before trying to seed any data
  - If you prefer GUI [here's a list of options](https://pgdash.io/blog/postgres-gui-tools.html)
5. To prepare your database for seeding run the following commands:
```
CREATE DATABASE bow;
\c bow
CREATE ROLE bow_admin WITH SUPERUSER LOGIN;
```

After that you should be good to start seeding your database. In the future to access the database from the CLI run `psql bow`.

#### Troubleshooting
If you are getting an `error` status with `postgres` upon running `brew services`.
You can also try looking in `/usr/local/var/postgres`, there are a couple options you can try:
1. look for a `postmaster.pid` and remove it; sometimes if your machine shuts down unexpectedly the postmaster managing process will not be able to remove that process id file before everything shuts down. This can cause errors in connecting to the correct port (5432) on relaunch.
2. remove any old instances of Postgres you may have installed before from source. If you have conflicting build processes they will also be fighting for the same resources. Older Postgres versions can also cause issues with your data imports; make sure you are running version `13.2`.
3. Check `server.log` by running `tail server.log`; this will give you the last few log messages to help you debug any errors that Postgres itself may have raised.


### Application
1. clone the repo onto your local machine
2. run `npm install`
3. run `npm run seed`
4. set Express to debug mode: `DEBUG=express:*`
5. run `npm run server` to start the node server
6. run`npm start` to run the react dev server (we use CRA)

Our backend is proxied to port 3001 so our frontend dev server can connect to it appropriately.

happy coding \o/
