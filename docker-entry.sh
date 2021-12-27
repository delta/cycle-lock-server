#!/bin/sh

# migration
prisma generate
npx prisma migrate dev
# build & run app
npm run dev