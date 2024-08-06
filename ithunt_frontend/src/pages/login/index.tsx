import { Button, Col, Form, Input, message, Row } from "antd";
import styles from "./index.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserLoginType } from "@/type";
import { useEffect, useState } from "react";
import { userLogin } from "@/api";
import {USER_ROLE} from "@/constants"; // Import your API function

export default function Home() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string>('');

  const handleFinish = async (values: UserLoginType) => {
    try {
      const res = await userLogin(values);
      if (Number(res.code) === 200) {
        const userData = res.data;
        // Save user data to localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        // Update userRole state
        setUserRole(userData.role || '');
        message.success("Log in successfully");
      } else {
        message.error(res.msg || "Login failed");
      }
    } catch (error) {
      message.error("Login failed");
      console.error(error);
    }
  };

  useEffect(() => {
    if (userRole) {
      userRole === USER_ROLE.STU ? router.push("/dashboard") : router.push("/users");
    }
  }, [userRole]);

  return (
      <div className={styles.classContainer}>
        <Row gutter={24}>
          <Col span={10}>
            <main className={styles.bg}>
              <h1 className={styles.title}>ITHunt</h1>
              <div className={styles.container}>
                <p className={styles.description}>
                  Empowering Your Transition to
                </p>
                <p className={styles.highlight}>Information Technology</p>
                <br />
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
                <p className={styles.extradescription}>
                  Do not have an account? <Link href="/signup">sign up</Link> here!
                </p>
              </div>
            </main>
          </Col>
          <Col span={14}>
            <div>
              <img alt=" " src="/assets/login02.png" className={styles.picture} />
              <p className={styles.attribute}>Illustration designed by Freepik</p>
            </div>
          </Col>
        </Row>
      </div>
  );
}
