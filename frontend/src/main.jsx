import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./store.js";
import "./i18n";
import { Provider } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.jsx";
const role = sessionStorage.getItem("role");
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.replace(`/${role}`)}
      >
        <App />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
);
