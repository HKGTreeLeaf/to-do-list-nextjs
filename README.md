![](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)

This is a simple single user to-do list application based on nextjs, reactjs, prisma

## Getting Started

run the server:
```bash
docker-compose up
```
You can access the page via [HERE](http://localhost:3000/)

You can access the pgadmin via [HERE](http://localhost:3001/login?next=%2F), with login `admin@admin.com` and password `pass`

run the e2e test:
```bash
yarn && yarn test:playwright
```

run the e2e test via UI:
```bash
yarn && yarn test:playwright-ui
```
As this is single user application, one triggered e2e test, all data will be deleted.