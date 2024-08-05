import { Button, Col, Form, Input, message, Row } from "antd";
import styles from "./index.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import {UserType} from "@/type";
import { useEffect, useState } from "react";
import { userSignUp} from "@/api";
import {USER_ROLE} from "@/constants"; // Import your API function

export default function SignUp() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string>('');

  const handleFinish = async (values: UserType) => {
    try {
      values.role = USER_ROLE.STU;
      await userSignUp(values as UserType);
      message.success("Registration successful. Check your email for verification link.");
    } catch (error) {
      message.error("Registration failed");
      console.error(error);
    }
  };

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
                  <Form.Item name="email" rules={[
                    { required: true, message: "Please input your email!" },
                    {
                      validator: (_, value) =>
                          value && value.endsWith("@student.gla.ac.uk")
                              ? Promise.resolve()
                              : Promise.reject("Email must end with @student.gla.ac.uk"),
                    },
                  ]}>
                    <Input placeholder="Email" />
                  </Form.Item>
                  <Form.Item name="username" rules={[{ required: true }]}>
                    <Input placeholder="Your Name" />
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
                      Sign up
                    </Button>
                  </Form.Item>
                </Form>
                <p className={styles.extradescription}>
                  Already have an account? <Link href="/login">log in</Link> here!
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
