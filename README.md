# Raterator
## Make Office Contests Fun!

**DEMO:**  https://raterator-f33d5.firebaseapp.com

This app allows users to upload their own photo and vote for others.

It was originally developed for the costume context of UVEye's legendary Purim party, but we though you might enjoy it as well, so we made it open source!

## Features

1. Display a list of all candidates with their name, photo, title and description
2. Authentication using Google
3. Authenticated users can vote multiple times for their favourite candidates
4. Authenticated users can upload their own photo and become candidates
5. Final results can be viewed by navigating to the */results* page
6. Fully customizable, "white label" app
7. Mobile friendly

## Install

Create your local copy with `git clone` and install dependencies with `npm install`.

This app uses [Google Firebase](https://firebase.google.com/) as a backend. To setup your own project follow these steps:
1. Login to firebase using your google account
2. Go to [the Firebase Console](https://console.firebase.google.com) and create a new project.
3. Inside **Authentication** section enable **Google* as your sign-in provider.
4. Inside **Database** section click **Create Database** 
5. Inside **Storage** section click **Get Started** 
6. Inside **Hosting** section click **Get Started** 
7. Inside **Functions** section click **Get Started** 
8. From the project overview page, click **Add Firebase to your web app**, copy the project's configuration and paste it in `/src/environments/environment.ts` and `/src/environments/environment.prod.ts`
9. install firebase cli `npm install -g firebase-tools`
10. log in `firebase login`
11. From the project's configuration copy your **projectId** and inside your project's folder type `firebase use $PROJECT_ID` 
12. Build the your project using `ng build --prod`
13. Deploy your new project with `firebase deploy` 

Enjoy!

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Contribute / TODO

Please help me make this app better -

1. Cloud functions to shrink uploaded images
2. Refactor voting mechanism to improve security
3. Improve security
4. Limit **/results** page to *Admin* users
