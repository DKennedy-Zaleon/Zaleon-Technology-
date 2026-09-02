# Zaleon Platform Starter

GitHub-ready starter repository for the Zaleon support experience layer.

## What is included

- Next.js client portal
- Dark Zaleon-branded UI
- Dashboard
- Ticket queue / My Tickets
- Ticket detail with continuous conversation history
- New ticket form
- Profile
- Settings
- ASP.NET Core API stub
- Jira connector abstraction
- PostgreSQL-ready infrastructure placeholder
- Product specification under `docs/`

## Architecture

```text
Next.js Portal
      |
      v
ASP.NET Core API
      |
      +--> Ticketing Connector (Jira first)
      +--> Identity Connector (Entra later)
      +--> Notification Service
      +--> AI / Knowledge Engine
      +--> PostgreSQL
```

## Run the frontend

```bash
cd apps/portal
npm install
npm run dev
```

Open http://localhost:3000

## Run the API

Requires .NET 8 SDK.

```bash
cd services/api
dotnet restore
dotnet run
```

The API defaults to http://localhost:5080.

## Important

This is an MVP starter scaffold, not a production-ready deployment. Authentication,
real Jira credentials, Entra SSO, database persistence, notifications, and AI services
are intentionally stubbed so they can be implemented safely without committing secrets.

Never commit `.env.local`, production secrets, Jira API tokens, or Microsoft client secrets.
