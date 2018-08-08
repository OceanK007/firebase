// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// To handle CROSS-ORIGIN exception
const cors = require('cors')({ origin: true });

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
//     "username":"onetwothreefour",
//     "email":"xyz@mail.com",
//     "phone":"239472974927"
// }
exports.saveUpdateUser = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {
        const userId = request.query.userId;
        const userData = request.body;
        console.log("userId: " + userId);
        console.log(request.query);
        console.log(request.body);
        console.log("Request method: "+request.method);

        admin.database().ref('/users/' + userId).once('value', (snapshot) => {
            var data = snapshot.val();
            console.log(data);
            console.log(snapshot.val() === null);

            if (snapshot.val() === null) {
                admin.database().ref('/users/' + userId).set(userData, (error) => {
                    //console.log(snapshot);
                    if (error) {
                        console.log("Error occurred while saving user: " + error);
                        response.send(error);
                    } else {
                        console.log("User saved successfully");
                        response.send("User saved successfully");
                    }
                });
            } else {
                admin.database().ref('/users/' + userId).update(userData, (error) => {
                    //console.log(snapshot);
                    if (error) {
                        console.log("Error occurred while updating user: " + error);
                        response.send(error);
                    } else {
                        console.log("User updated successfully");
                        response.send("User updated successfully");
                    }
                });
            }
        });
    });
});

// Get user Info
// **URL FORMAT**
//saveUpdateUser?userId=myuserid6
exports.getUser = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {
        const userId = request.query.userId;
        console.log("userId: " + userId);

        admin.database().ref('/users/' + userId).once('value', (snapshot) => {
            var data = snapshot.val();
            console.log(data);
            response.send(data);
        });
    });
});

// Create/Update Team
// **URL FORMAT**
//saveUpdateTeam?teamName=team-one
// **JSON FORMAT**
// {
//     "admins":["user1","user2"],
//     "companyName":"Sapient"
// }
exports.saveUpdateTeam = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {
        const teamId = request.query.teamName;
        const teamData = request.body;
        console.log("teamId: " + teamId);
        console.log(request.query);
        console.log(request.body);
        console.log("Request method: "+request.method);

        admin.database().ref('/teams/' + teamId).once('value', (snapshot) => {
            var data = snapshot.val();
            console.log(data);
            console.log(snapshot.val() === null);

            if (snapshot.val() === null) {
                admin.database().ref('/teams/' + teamId).set(teamData, (error) => {
                    //console.log(snapshot);
                    if (error) {
                        console.log("Error occurred while saving team: " + error);
                        response.send(error);
                    } else {
                        console.log("Team saved successfully");
                        response.send("Team saved successfully");
                    }
                });
            } else {
                admin.database().ref('/teams/' + teamId).update(teamData, (error) => {
                    //console.log(snapshot);
                    if (error) {
                        console.log("Error occurred while updating team: " + error);
                        response.send(error);
                    } else {
                        console.log("Team updated successfully");
                        response.send("Team updated successfully");
                    }
                });
            }
        });
    });
});

// Get user Info
// **URL FORMAT**
//saveUpdateTeam?teamName=team-one
exports.getTeam = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {
        const teamId = request.query.teamName;
        console.log("teamId: " + teamId);

        admin.database().ref('/teams/' + teamId).once('value', (snapshot) => {
            var data = snapshot.val();
            console.log(data);
            response.send(data);
        });
    });
});