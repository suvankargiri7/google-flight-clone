import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import LocationProvider from "./contexts/LocationProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DomRouter from "./DomRouter";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <LocationProvider>
          <DomRouter />
        </LocationProvider>
      </QueryClientProvider>
    </ReduxProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
