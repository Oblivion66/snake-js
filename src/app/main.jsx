import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider, createDispatchHook, createSelectorHook } from "react-redux";
//import store from "../store/toolkitRedux";
import store from "../store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Provider store={store}>
      <App />
      </Provider>
    </React.StrictMode>
  
);
