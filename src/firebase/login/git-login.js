import '../firebase-config';
import firebase from 'firebase';
import { homeView, dashView } from '../../js/controller-main';

const provider = new firebase.auth.GithubAuthProvider();

export function gitLogin() {
  // console.log(firebase.auth().currentUser)
  if (!firebase.auth().currentUser) {
    document.getElementById('git-login').disabled = true;

    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const token = result.credential.accessToken;
        const user = result.user.email;

        console.log(result);
        console.table(user);
        console.log(token);
      }).catch((error) => {
        document.getElementById('git-login').disabled = false;
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
      });
  } else {
    console.log('User already exist');
    // hView = homeView();
  }
}

export function gitLogout() {
  firebase.auth().signOut()
    .then(() => {
      // homeView();
      console.log('Signout successful!');
    }, (error) => {
      console.log(error);
      console.log('Signout failed');
    });
}

// This will be called in each sign-in/sign-out (i.e. one each state change)
// It can be defined in a function as well to check user state
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('State changed: User exist');
    console.log(user);
    const dView = dashView();
    dView.querySelector('#git-signout').addEventListener('click', () => { gitLogout(); });
  } else {
    console.log("State changed: User doesn't exist");
    const hView = homeView();
    hView.querySelector('#git-login').addEventListener('click', () => { gitLogin(); });
    hView.querySelector('#git-login').disabled = false;
  }
});

// function toggleSignIn()
// {
//     if (!firebase.auth().currentUser)
//     {
//         // [START createprovider]
//         var provider = new firebase.auth.GithubAuthProvider();
//         // [END createprovider]
//         // [START addscopes]
//         provider.addScope('repo');
//         // [END addscopes]
//         // [START signin]
//         firebase.auth().signInWithPopup(provider).then(function(result)
//         {
//             // This gives you a GitHub Access Token. You can use it to access the GitHub API.
//             var token = result.credential.accessToken;
//             // The signed-in user info.
//             var user = result.user;
//             // [START_EXCLUDE]
//             document.getElementById('quickstart-oauthtoken').textContent = token;
//             // [END_EXCLUDE]
//         }).catch(function(error)
//         {
//             // Handle Errors here.
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             // The email of the user's account used.
//             var email = error.email;
//             // The firebase.auth.AuthCredential type that was used.
//             var credential = error.credential;
//             // [START_EXCLUDE]
//         if (errorCode === 'auth/account-exists-with-different-credential')
//         {
//             alert('You have already signed up with a different auth provider for that email.');
//             // If you are using multiple auth providers on your app you should handle linking
//             // the user's accounts here.
//         }
//         else
//         {
//             console.error(error);
//         }
//             // [END_EXCLUDE]
//         });

//         // [END signin]
//     } else
//     {
//         // [START signout]
//         firebase.auth().signOut();
//         // [END signout]
//     }
//     // [START_EXCLUDE]
//     document.getElementById('quickstart-sign-in').disabled = true;
//     // [END_EXCLUDE]
//   }
//   // [END buttoncallback]


//   /**
//    * initApp handles setting up UI event listeners and registering Firebase auth listeners:
//    *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
//    *    out, and that is where we update the UI.
//    */
//   function initApp()
//   {
//     // Listening for auth state changes.
//     // [START authstatelistener]
//     firebase.auth().onAuthStateChanged(function(user)
//     {
//         if (user)
//         {
//             // User is signed in.
//             var displayName = user.displayName;
//             var email = user.email;
//             var emailVerified = user.emailVerified;
//             var photoURL = user.photoURL;
//             var isAnonymous = user.isAnonymous;
//             var uid = user.uid;
//             var providerData = user.providerData;
//             // [START_EXCLUDE]
//             document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
//             document.getElementById('quickstart-sign-in').textContent = 'Sign out';
// document.getElementById('account-details').textContent = JSON.stringify(user, null, '  ');
//             // [END_EXCLUDE]
//         }
//         else
//         {
//             // User is signed out.
//             // [START_EXCLUDE]
//             document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
//             document.getElementById('git-login').textContent = 'Sign in with GitHub';
//             document.getElementById('quickstart-account-details').textContent = 'null';
//             document.getElementById('quickstart-oauthtoken').textContent = 'null';
//             // [END_EXCLUDE]
//         }
//         // [START_EXCLUDE]
//         document.getElementById('git-login').disabled = false;
//         // [END_EXCLUDE]
//     });
//     // [END authstatelistener]

//     document.getElementById('git-login').addEventListener('click', toggleSignIn, false);
// }
