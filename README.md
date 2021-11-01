# NITT Cycle App server
The backend of NITT Cycle App.

## Prerequisites
 - node
 - express
 - mysql
 - typescript
 - prisma

## Setup
- install dependencies
  
    ```
    npm ci
    ```
- database and migrations
  
    ```
    npx prisma migrate dev
    ```
- Run  `cp .env.example .env`
- fill in the database credentials in the .env file
- Run  `npm run dev`



  