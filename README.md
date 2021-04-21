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

## Authentication
```
{ 
  4: Me
  3: Me + Artists
  2: Me + Artists + Patrons
  1: Me + Artists + Patrons + Public (not sure how we will use this one yet but its there)
}
```
