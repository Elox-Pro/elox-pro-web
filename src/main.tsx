import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.min.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { appStore } from "./app/stores/app.store.ts"
import { RouterProvider } from "react-router-dom"
import { AppRoutes } from "./app/components/routes/app-routes.component.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={AppRoutes} />
    </Provider>
  </React.StrictMode>
)
