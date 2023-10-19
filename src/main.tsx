import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./layouts/Root.tsx";
import Home from "./pages/home/Home.tsx";
import Library from "./pages/library/Library.tsx";
import MyList from "./pages/MyList.tsx";
import "./shared/styles/global.scss";
import "./index.css";
import ContextProvider from "./shared/context/ContextProvider.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query-client.ts";

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
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
