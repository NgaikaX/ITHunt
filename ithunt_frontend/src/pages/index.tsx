import Head from "next/head";

import styles from "@/styles/Home.module.css";
import { Button } from "antd";
import { useRouter } from "next/router";
import "../store";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <main className={styles.main}>
        <Button type="primary">Button</Button>
      </main>
    </>
  );
}
