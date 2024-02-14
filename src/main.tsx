import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

// Redux
import { store } from "./store/root";
import { Provider } from "react-redux";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Forms from "./pages/forms/Forms.tsx";
import FormEditor from "./pages/forms/FormEditor.tsx";
import FormInstances from "./pages/formInstance/FormInstances.tsx";
import FormResponse from "./pages/formInstance/FormResponse.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/forms",
        element: <Forms />,
      },
      {
        path: "/form-editor/:id",
        element: <FormEditor />,
      },
      {
        path: "/forms/:id/instances",
        element: <FormInstances />,
      },
      {
        path: "/form-response/:formId/:instanceId",
        element: <FormResponse />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
