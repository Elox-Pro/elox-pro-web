import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.min.css"
import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { appStore } from "./app/stores/app.store.ts"
import { RouterProvider } from "react-router-dom"
import { AppRoutes } from "./app/routes/app.routes.tsx"
import AuthProvider from "./auth/providers/auth.provider.tsx"
import i18n from "./app/i18n/i18n.ts"

i18n.init()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={appStore}>
        <AuthProvider>
          <RouterProvider router={AppRoutes} />
        </AuthProvider>
      </Provider>
    </Suspense>
  </React.StrictMode>
)
