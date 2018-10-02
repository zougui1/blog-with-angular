// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { FirebaseAppConfig } from 'angularfire2';

export const environment = {
  production: false,
  firebaseConfig: <FirebaseAppConfig> {
  apiKey: "AIzaSyBYinxf0BxW1obUJac0nqYEU__eOkp7d9E",
  authDomain: "fir-blog-c4df6.firebaseapp.com",
  databaseURL: "https://fir-blog-c4df6.firebaseio.com",
  projectId: "fir-blog-c4df6",
  storageBucket: "fir-blog-c4df6.appspot.com",
  messagingSenderId: "871635572930"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
