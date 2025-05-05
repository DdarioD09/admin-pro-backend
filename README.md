# AdminPro - Backend

This is the backend project for the Admin-pro frontend repository, it uses MongoDB as database and JWT for token generation.

## Considerations

Keep in mind that this project is using some enviroment variables int the `.env` file which is not published in this repository.
The env variables that you need to set for getting this project working are:

* `PORT` It is the port where the backend will be deployed.
* `DB_CNN` MongoDB url database conection, you can create your own one by [creating a cluster](https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster/ "MongoDB deploy-free-tier-cluster") in MongoAtlas.
* `JWT_SECRET` JWT Secret [JWT page](https://jwt.io/).

## Installation
```
npm install
```

## Run the project

```
npm run start:dev
```