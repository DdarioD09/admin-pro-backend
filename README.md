# AdminPro - Backend

This is a hands-on project that gives you a CRUD for doctors, hospitals and users. This services are used for in the Frontend repository [Admin-pro](https://github.com/DdarioD09/angular-adv-adminpro "Admin-pro").

## Database
It uses MongoDB as database, following this structure:
![Mongo Structure](https://github.com/user-attachments/assets/b7da0657-a9c7-46e4-8394-f09e021ae45f)

## Authentication 
It uses JWT for token generation for auth sessions, and implements the [Google Sign in](https://developers.google.com/identity/gsi/web/guides/overview "Google Sing in") service to provide authentication in the app througth Google accounts.

## Considerations

Keep in mind that if you want this project up and runing in your local, you will need to setup some enviroment variables int the `.env` file, which is not published in this repository. :shipit:\
The env variables that you need to set for getting this project working are: 👇🏽

* `PORT` It is the port where the backend will be deployed.
* `DB_CNN` MongoDB url database conection. You can create your own [MongoDB cluster](https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster/ "MongoDB deploy-free-tier-cluster") in MongoAtlas page.
* `JWT_SECRET` JWT Secret [JWT page](https://jwt.io/).
* `GOOGLE_CLIENT_ID` ID Client. It is the public id that identifies your app and allows you to use the Google sign in service.
* `GOOGLE_CLIENT_SECRET` Secret Client. It is the secret key that is related to your public id.

For create your own `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` follow along this [Setup](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid) to get your own.

## Installation
```
npm install
```

## Run the project

```
npm run start:dev
```
