# Firebase cloud functions:

1. npm install -g firebase-tools
2. firebase login
3. firebase init
4. Select (Functions: Configure and deploy cloud functions) | use space to select
5. Select the firebase project you want to use.
6. Select other options
7. npm install firebase-functions@latest firebase-admin@latest --save
8. firebase deploy  // To deploy functions // OR // firebase deploy --only functions


# To add new project for firebase functions
1. firebase use --add
2. firebase use alias-name      // To use particular project
3. firebase use                 // To display all projects with alias

# To logout from firebase
1. firebase logout