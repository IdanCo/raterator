// import * as functions from 'firebase-functions';

// const admin = require('firebase-admin');
// admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// export const updateVotes = functions.firestore
//   .document('candidates/{candidateId}')
//   .onUpdate((change, context) => {
//     const candidate = change.after!.data();
//
//     // no need to updates votes if there are no votes
//     if (!candidate || !candidate.votes) return;
//
//     let totalVotes = 0;
//
//     Object.keys(candidate.votes).forEach(voter => {
//       totalVotes += candidate.votes[voter];
//     });
//
//     change.after.ref.update({ totalVotes });
//
//   });
