import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import * as fs from "node:fs";
import styles from "./index.module.css";

const filePath = "count.txt";

async function readCount() {
  return parseInt(
    await fs.promises.readFile(filePath, "utf-8").catch(() => "0")
  );
}

const getCount = createServerFn({
  method: "GET",
}).handler(() => {
  return readCount();
});

const updateCount = createServerFn({ method: "POST" })
  .validator((d: number) => d)
  .handler(async ({ data }) => {
    const count = await readCount();
    await fs.promises.writeFile(filePath, `${count + data}`);
  });

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => await getCount(),
});

function Home() {
  const router = useRouter();
  const state = Route.useLoaderData();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        This is just a{" "}
        <a
          href="https://tanstack.com/router/latest/docs/framework/react/start/overview"
          target="_blank"
          className={styles.highlight}
        >
          Tanstack Start{" "}
          <img src="tanstack.png" alt="TanStack Logo" width="32" height="32" />
        </a>{" "}
        testing app
      </h1>

      <a
        href="https://github.com/ismi-abbas/because-im-bored"
        target="_blank"
        className={styles.githubLink}
      >
        &gt; See the code here
      </a>
    </div>
  );
}
