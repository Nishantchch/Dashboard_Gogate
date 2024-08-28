import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import "assets/css/argon-dashboard-react.min.css";
import "assets/css/argon-dashboard-react-custom.css";
import "select2/dist/css/select2.min.css";

import App from "App";
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter basename="/">
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
