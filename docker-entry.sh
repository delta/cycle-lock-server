#!/bin/sh

# migration
prisma generate
npx prisma migrate dev

# npm run migrate:db

# build & run app
npm run dev