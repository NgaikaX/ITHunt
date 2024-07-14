import { Button, Form, Input, message } from "antd";
import styles from "./index.module.css";
import Head from "next/head";
import Link from "next/link";
import { userLogin } from "@/api";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const handleFinish = async (values: { email: string; password: string }) => {
    const res = await userLogin(values);
    console.log("handle finish:", res);
    if (res.success) {
      message.success("Log in successfully");
      router.push("/dashboard");
    }
  };
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
            <Form.Item name="email" rules={[{ required: true }]}>
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
