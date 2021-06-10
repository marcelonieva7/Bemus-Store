import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { FirebaseAppProvider } from 'reactfire';
import reportWebVitals from './reportWebVitals';


const firebaseConfig = {
  apiKey: "AIzaSyBOkdRo1pwzEaRbz1KpjMFeylG5mCdFNM8",
  authDomain: "antimo-store.firebaseapp.com",
  projectId: "antimo-store",
  storageBucket: "antimo-store.appspot.com",
  messagingSenderId: "891521205635",
  appId: "1:891521205635:web:fd7ef0bb083eb8188a62b6"
}

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
