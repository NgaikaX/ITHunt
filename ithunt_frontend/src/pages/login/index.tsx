import {Button, Col, Form, Input, message, Row} from "antd";
import styles from "./index.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserLoginType, UserType } from "@/type";
import request from "@/utils/request";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "@/api";
import { loginUser } from "@/store/modules/user";
import { RootState } from "@/store";
import { USER_ROLE } from "@/constants";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userRole = useSelector((state: RootState) => state.user.role);

  const handleFinish = async (values: UserLoginType) => {
    try {
      const res = await userLogin(values);
      console.log(
        "%c [ res ]-17",
        "font-size:13px; background:pink; color:#bf2c9f;",
        res.data
      );
      //localStorage.setItem("user", JSON.stringify(res));
      if(res.code==200){
        message.success("Log in successfully");
        dispatch(loginUser(res.data as UserType));
        userRole === USER_ROLE.STU
            ? router.push("dashboard")
            : router.push("users");
      }else{
        message.error(res.msg)
      }

    } catch (error) {
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
              <br/>
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
          <div ><img alt=" " src="/assets/login02.png" className={styles.picture}/></div>
        </Col>
      </Row>

    </div>
  );
}
