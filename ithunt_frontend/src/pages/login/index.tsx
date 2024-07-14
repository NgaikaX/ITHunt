import { Button, Form, Input, message } from "antd";
import styles from "./index.module.css";
import Link from "next/link";
import { userLogin } from "@/api";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/modules/user";
import { RootState } from "@/store/modules";
import { UserLoginType } from "@/type";
import request from "@/utils/request";

export default function Home() {
  const router = useRouter();

  const handleFinish = async (values: UserLoginType) => {
    try {
      const res = await request.post("/api/login", values);
      console.log(
        "%c [ res ]-17",
        "font-size:13px; background:pink; color:#bf2c9f;",
        res
      );
      localStorage.setItem("user", JSON.stringify(res.data));
      message.success("Log in successfully");

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
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
          <Form
            initialValues={{ email: "", password: "" }}
            onFinish={handleFinish}
            autoComplete="off"
            size="large"
            layout="vertical"
          >
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
