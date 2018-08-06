// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
        console.log(snapshot);
        // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
        return res.redirect(303, snapshot.ref.toString());
    });
});
  
  // Listens for new messages added to /messages/:pushId/original and creates an
  // uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
.onCreate((snapshot, context) => {
    // Grab the current value of what was written to the Realtime Database.
    const original = snapshot.val();
    console.log('Uppercasing', context.params.pushId, original);
    const uppercase = original.toUpperCase();
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    return snapshot.ref.parent.child('uppercase').set(uppercase);
});

// Save update user.

// **URL FORMAT**
//saveUpdateUser?userId=myuserid6
// **JSON FORMAT**
// {
// 	"data":
// 	{
// 		"username":"onetwothreefour",
// 		"email":"xyz@mail.com",
// 		"phone":"239472974927"
// 	},
// 	"action":"UPDATE_USER"
// }
exports.saveUpdateUser = functions.https.onRequest((req, res) => {
    const userId = req.query.userId;
    const data = req.body.data;
    const action = req.body.action;
    console.log("userId: "+userId);
    console.log(req.query);
    console.log(req.body);
    console.log("Action: "+action);

    switch(action)
    {
        case "CREATE_USER":
        return admin.database().ref('/users/'+userId).set(data, (error)  => {
            //console.log(snapshot);
            if(error)
            {
                console.log("Error occurred while saving user: "+error);
                return res.json("Error occurred while saving user: "+error);
            }
            else
            {
                console.log("User saved successfully");
                return res.json("User saved successfully");
            }
        });
        case "UPDATE_USER":
        return admin.database().ref('/users/'+userId).update(data, (error)  => {
            //console.log(snapshot);
            if(error)
            {
                console.log("Error occurred while updating user: "+error);
                return res.json("Error occurred while updating user: "+error);
            }
            else
            {
                console.log("User updated successfully");
                return res.json("User updated successfully");
            }
        });
    }
    
});

exports.getUser = functions.https.onRequest((req,res) => {
    const userId = req.query.userId;
    console.log("userId: "+userId);

    return admin.database().ref('/users/'+userId).once('value', (snapshot) => {
        var data = snapshot.val();
        console.log(data);
        res.json(data);
     });
});