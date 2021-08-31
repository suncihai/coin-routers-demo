import React from "react";
import { Provider } from "react-redux";
import { createEpicMiddleware } from "redux-observable";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { render } from "react-dom";
import { App } from "./App";
import { epics } from "./store/epics";
import { rootReducer } from "./store/reducers";
import { State } from "./types/State";
import { ActionType } from "./helpers/redux-toolkit";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import "semantic-ui-css/semantic.min.css";

const epicMiddleware = createEpicMiddleware<
  ActionType<AnyAction>,
  ActionType<AnyAction>,
  State
>();
const store = configureStore({
  reducer: rootReducer,
  middleware: [epicMiddleware],
});

epicMiddleware.run(epics);

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/:assetParam">
          <App />
        </Route>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
