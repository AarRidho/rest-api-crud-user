# Overview

REST API yang berisikan operasi auth dasar seperti `login`, `generateAccessToken`, `revokeToken` dan operasi CRUD pada user.

# Status Codes

1. 200: `Success`
2. 400: `Bad Request`
3. 401: `Unauthorized`
4. 404: `Not Found`, `User Not Found`
5. 500: `Internal Server Error`

# How-to

1. deploy yaml file
   ```terminal
   kubectl apply -f ./mongo-secret.yaml -f ./mongo-configmap.yaml -f ./mongo.yaml -f ./express-secret.yaml -f ./express-deploy.yaml
   ```
2. The Node Express Service will run on port :80
3. Enjoy :)
