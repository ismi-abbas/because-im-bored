// app/routes/__root.tsx
import {
  Link,
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from "@tanstack/react-router";
import { Meta, Scripts } from "@tanstack/start";
import type { ReactNode } from "react";
import "./index.css";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TanStack Start Starter" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body>
        <nav>
          <Link to="/" style={{ textDecoration: "none" }}>
            Home
          </Link>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            Visitor List
          </Link>
        </nav>
        <div
          style={{
            padding: "1rem",
            flex: 1,
            display: "flex",
          }}
        >
          {children}
        </div>
        <footer
          style={{
            padding: "1rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {new Date().getFullYear()} by {""}
          <span>
            <a href="https://github.com/ismi-abbas">ismi-abbas ✌️</a>
          </span>
        </footer>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
