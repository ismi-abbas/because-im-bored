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
  return data as { name: string; id: number }[];
});

const addTask = createServerFn({ method: "POST" })
  .validator((d: { name: string; id: number }) => d)
  .handler(async ({ data }) => {
    const visitors = await getTaskList();
    await fs.promises.writeFile(filePath, JSON.stringify([...visitors, data]));
  });

const deleteTask = createServerFn({ method: "POST" })
  .validator((d: number) => d)
  .handler(async ({ data }) => {
    const tasks = await getTaskList();
    await fs.promises.writeFile(
      filePath,
      JSON.stringify(tasks.filter((task) => task.id !== data))
    );
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
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    if (!name.trim()) return;
    await addTask({
      data: {
        id: Date.now(),
        name: name,
      },
    }).then(() => {
      router.invalidate();
      setName("");
    });
  };

  const handleDelete = async (id: number) => {
    await deleteTask({
      data: id,
    }).then(() => {
      router.invalidate();
    });
  };

  const handleDownloadFile = async () => {
    const data = await getTaskList();
    const names = data.map((item) => item.name);
    const blob = new Blob([names.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "visitors.txt";
    link.click();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Visitor List</h1>
      <div>
        Hi anon. You can add your name here. Your name will be saved to a file
        on the server using the server function!
      </div>

      <div className={styles.grid}>
        <div>
          <ul className={styles.list}>
            {data?.map((item) => (
              <li key={item.id} className={styles.listItem}>
                {item.name}
                <span>
                  <button
                    className={styles["button-delete"]}
                    onClick={() => {
                      confirm("Are you sure???") && handleDelete(item.id);
                    }}
                  >
                    Delete
                  </button>
                </span>
              </li>
            ))}
            {(!data || data.length === 0) && (
              <p className={styles.emptyMessage}>
                No visitor yet. Be the first!
              </p>
            )}
          </ul>
        </div>

        <form method="post" className={styles.form}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={styles.input}
          />
          <button
            type="button"
            onClick={handleSubmit}
            className={styles.button}
          >
            Add Name
          </button>
          <button
            type="button"
            onClick={handleDownloadFile}
            className={styles.button}
          >
            You can download the file here
          </button>
        </form>
      </div>
    </div>
  );
}
