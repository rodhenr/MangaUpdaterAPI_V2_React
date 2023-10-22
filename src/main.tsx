import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./lib/query-client.ts";
import ContextProvider from "./shared/context/ContextProvider.tsx";
import Root from "./layouts/Root.tsx";
import Home from "./pages/home/Home.tsx";
import Library from "./pages/library/Library.tsx";
import MyList from "./pages/MyList.tsx";
import Manga from "./pages/manga/Manga.tsx";

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
      { path: "manga/:mangaId", Component: Manga },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </QueryClientProvider>
);
