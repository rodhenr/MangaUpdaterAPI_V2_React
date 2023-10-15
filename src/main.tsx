import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./layouts/Root.tsx";
import Home from "./pages/home/Home.tsx";
import Library from "./pages/Library.tsx";
import MyList from "./pages/MyList.tsx";
import "./shared/styles/global.scss";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "library", Component: Library },
      { path: "mylist", Component: MyList },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
