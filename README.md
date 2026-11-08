# Small Web

A browser you read small websites in — built with Next.js, NestJS, and MongoDB.

## Run

**Backend** (port 3000)
```bash
cd backend
npm install
npm run seed
npm run start:dev
```

**Frontend** (port 3001)
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3001`

## Seed

```bash
cd backend
npm run seed
```

Safe to run multiple times — will not duplicate data.
