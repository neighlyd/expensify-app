# Expensify App

This app allows you to track your expenses over time. It uses [React](https://reactjs.org) to provide a fluid user interface and connects to a [Firebase datastore](https://firebase.google.com) for persistent data management. It is secured using [Firebase's Google Authentication](https://firebase.google.com/docs/auth/).

A live example of this project can be reached at https://neighly-expensify-app.herokuapp.com.

# Installation

## Requirements

This app requires:
* Node.js
* git
* Firebase account

## Installing the App

To install the app, use your terminal/command line and do the following.

```bash
git clone https://github.com/neighlyd/expensify-app
cd expensify-app
node install
mkdir config
touch config/.env.dev
touch config/.env.test
```

You will then need to populate your `.env` files (both `.dev` and `.test`) with your Firebase API credentials.

### Firebase Credentials

This app uses the [`Realtime Database`](https://firebase.google.com/docs/database/) feature of Firebase. Make sure that your Firebase store is set to this.

Create two databases for this app - one for the deployed app and one for the test database.

After you create your `Realtime Databases` in Firebase, copy your API information from the Firebase website and use it to populate the `.env` files we just created. This information can be found under project settings (wheel cog), `'Your apps'`, and then clicking on `</>`.

Fill out your `.env` files like so:

```
  FIREBASE_API_KEY='API_KEY_HERE'
  FIREBASE_AUTH_DOMAIN='AUTH-DOMAIN-HERE'
  FIREBASE_DATABASE_URL='DATABASE-URL-HERE'
  FIREBASE_PROJECT_ID='PROJECT-ID-HERE'
  FIREBASE_STORAGE_BUCKET='STORAGE-BUCKET-HERE'
  FIREBASE_MESSAGING_SENDER_ID='MESSAGE-SENDER-HERE'
```

## Running the App

To run the app locally, simply use the following command from terminal/command line:

```bash
npm run dev
```

To deploy the app to Heroku, you need to first set up the [Heroku Command Line Interface(CLI)](https://devcenter.heroku.com/articles/heroku-cli).

Once you have the Heroku CLI set up, use the following commands to deploy to a heroku instance:

```bash
heroku create <any-title-you-want-here>
git push heroku master
heroku open
```

## Tests

The Expensify App comes with a complete set of unit sets using the [Jest](https://jestjs.io/) library.

To run these tests after installing the app, simply run the following command from within the app directory:

```bash
npm test
```

## Acknowledgements

This project grew out of Andrew Mead's excellent and informative [Udemy React class](https://www.udemy.com/react-2nd-edition/). If you are interested in learning Javascript, Node, or React, I highly recommend checking out [his courses](https://www.udemy.com/user/andrewmead/). You can find him on [twitter @andrew_j_mead](https://twitter.com/andrew_j_mead).