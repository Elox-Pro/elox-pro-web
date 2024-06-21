import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.min.css"
import "./app/styles/app.styles.scss"
import "./app/styles/theme.styles.scss"
import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { appStore } from "./app/stores/app.store.ts"
import { RouterProvider } from "react-router-dom"
import { AppRoutes } from "./app/routes/app.routes.tsx"
import i18n from "./app/i18n/i18n.ts"
import { Overlay } from "./common/components/overlay/overlay.tsx"
import Loading from "./common/components/loading/loading.component.tsx"
import "react-toastify/dist/ReactToastify.min.css";
import DefaultToast from "./common/components/default-toast/default-toast.component.tsx"
i18n.init()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <Provider store={appStore}>
        <Overlay />
        <DefaultToast />
        <RouterProvider router={AppRoutes} />
      </Provider>
    </Suspense>
  </React.StrictMode>
)
