import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,

//   document.getElementById("root")
// );

ReactDOM.unstable_createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ReactDOM.unstable_createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
