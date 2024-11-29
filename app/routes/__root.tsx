// app/routes/__root.tsx
import {
  Link,
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from "@tanstack/react-router";
import { Meta, Scripts } from "@tanstack/start";
import type { ReactNode } from "react";

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
      <body
        style={{
          margin: "0",
          padding: "0",
          fontFamily: "JetBrains Mono",
        }}
      >
        <nav
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            border: "1px solid black",
            padding: ".5rem",
            fontFamily: "JetBrains Mono",
          }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            Home
          </Link>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            Dashboard
          </Link>
          <Link to="/user" style={{ textDecoration: "none" }}>
            User
          </Link>
        </nav>
        <div style={{ padding: "1rem", flex: 1 }}>{children}</div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
