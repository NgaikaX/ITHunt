import { Button, Form, Input } from "antd";
import styles from "./index.module.css";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const handleFinish = (values: { name: string; password: string }) => {};
  return (
    <>
      <main className={styles.bg}>
        <div className={styles.container}>
          <h1 className={styles.title}>ITHunt</h1>
          <p className={styles.description}>
            ITHunt is a website ITHunt is a website ITHunt is a website ITHunt
            is a website
          </p>
          <Form onFinish={handleFinish}>
            <Form.Item name="name" rules={[{ required: true }]}>
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true }]}>
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className={styles.btn}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
          <p className={styles.description}>
            Do not have an account? <Link href="/signup">sign up</Link> here!
          </p>
        </div>
      </main>
    </>
  );
}
