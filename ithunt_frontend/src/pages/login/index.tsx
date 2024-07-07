import { Button, Form, Input } from "antd";
import styles from "./index.module.css";

export default function Home() {
  const handleFinish = (values: { name: string; password: string }) => {};
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ITHunt</h1>
      <p className={styles.description}>
        ITHunt is a website ITHunt is a website ITHunt is a website ITHunt is a
        website
      </p>
      <Form onFinish={handleFinish}>
        <Form.Item name="name">
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="password">
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
        Do not have an account? sign up here!
      </p>
    </div>
  );
}
