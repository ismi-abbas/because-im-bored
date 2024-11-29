import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import * as fs from "node:fs";
import { useState } from "react";
import styles from "./dashboard.module.css";

const filePath = "test.json";

const getTaskList = createServerFn({
  method: "GET",
}).handler(async () => {
  const data = JSON.parse(
    await fs.promises.readFile(filePath, "utf-8").catch(() => "[]")
  );
  return data as { title: string; id: number }[];
});

const addTask = createServerFn({ method: "POST" })
  .validator((d: { title: string; id: number }) => d)
  .handler(async ({ data }) => {
    const tasks = await getTaskList();
    await fs.promises.writeFile(filePath, JSON.stringify([...tasks, data]));
  });

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  loader: () => {
    return getTaskList();
  },
});

function RouteComponent() {
  const router = useRouter();
  const data = Route.useLoaderData();
  const [title, setTitle] = useState("");

  const handleSubmit = async () => {
    if (!title.trim()) return;
    await addTask({
      data: {
        id: Date.now(),
        title,
      },
    }).then(() => {
      router.invalidate();
      setTitle("");
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Task List</h1>

      <div className={styles.grid}>
        <div>
          <ul className={styles.list}>
            {data?.map((item) => (
              <li key={item.id} className={styles.listItem}>
                {item.title}
              </li>
            ))}
            {(!data || data.length === 0) && (
              <p className={styles.emptyMessage}>
                No tasks yet. Add one to get started!
              </p>
            )}
          </ul>
        </div>

        <form method="post" className={styles.form}>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a new task"
            className={styles.input}
          />
          <button
            type="button"
            onClick={handleSubmit}
            className={styles.button}
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
