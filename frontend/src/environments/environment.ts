// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:8000/api',
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  firebaseConfig: {
    apiKey: "AIzaSyADjGHtFp8CImok32l2bKnGlRYFCQsubZc",
    authDomain: "upload-image-256f2.firebaseapp.com",
    databaseURL: "https://upload-image-256f2-default-rtdb.firebaseio.com",
    projectId: "upload-image-256f2",
    storageBucket: "upload-image-256f2.appspot.com",
    messagingSenderId: "489727620289",
    appId: "1:489727620289:web:faf203074f775f8f439040",
    measurementId: "G-XXB7QEJBE4"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
