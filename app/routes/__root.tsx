// app/routes/__root.tsx
import {
  Link,
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from "@tanstack/react-router";
import { Meta, Scripts } from "@tanstack/start";
import type { ReactNode } from "react";
import css from "../index.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TanStack Start Demo" },
    ],
    links: [{ rel: "stylesheet", href: css }],
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
        <script
          defer
          src="https://analytics.ismiabbas.xyz/script.js"
          data-website-id="0a148c97-903c-4c7e-b736-b874149e56c4"
        ></script>
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
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
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
          <div
            style={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2px",
            }}
          >
            by{" "}
            <span>
              <a
                style={{ textDecoration: "none" }}
                href="https://github.com/ismi-abbas"
              >
                ismi-abbas
              </a>
            </span>
            ✌️
          </div>
        </footer>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
