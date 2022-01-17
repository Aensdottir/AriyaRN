// @ts-nocheck
import React, { Component, useState } from "react";
import MainScreen from "./app/screens/MainScreen";
import { Provider } from "react-redux";
import logger from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./app/utils/redux/reducers/rootReducer";
const store = createStore(rootReducer /*applyMiddleware(logger)*/);

const App = () => {
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
};

export default App;
