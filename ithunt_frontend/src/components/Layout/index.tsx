import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";
import type { MenuProps } from "antd";
import {
  Layout as Antdlayout,
  Menu,
  Dropdown,
  Space,
  message,
  Modal,
  List,
  Button,
  Skeleton,
} from "antd";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import {
  CaretDownOutlined,
  PieChartOutlined,
  DesktopOutlined,
  TeamOutlined,
  ToolOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import Head from "next/head";
import { userLogout } from "@/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store/modules";
import { USER_ROLE } from "@/constants";
import { useAppDispatch } from "@/store";
import { fetchMessages } from "@/store/modules/messages";
import {fetchLogin, loginUser, logoutUser} from "@/store/modules/user";

const { Header, Content, Sider } = Antdlayout;

const ITEMS = [
  {
    key: "/dashboard",
    label: "Dashboard",
    icon: <PieChartOutlined />,
    role: USER_ROLE.STU,
  },
  {
    key: "glossary",
    label: "Glossary",
    icon: <ReadOutlined />,
    role: USER_ROLE.STU,

    children: [
      {
        key: "/glossary",
        label: "Glossary",
        role: USER_ROLE.STU,
      },
      { key: "/glossary/list", label: "Glossary List", role: USER_ROLE.ADMIN },
    ],
  },
  {
    key: "course",
    label: "Learning in MSC IT+",
    icon: <DesktopOutlined />,
    role: USER_ROLE.STU,

    children: [
      {
        key: "/course",
        label: "Course",
        role: USER_ROLE.STU,
      },
      { key: "/course/list", label: "Course List", role: USER_ROLE.ADMIN },
      {
        key: "/course/feedback",
        label: "Course Feedback",
        role: USER_ROLE.ADMIN,
      },
    ],
  },
  {
    key: "selflearning",
    label: "Self-learning Hub",
    icon: <DesktopOutlined />,
    role: USER_ROLE.STU,

    children: [
      {
        key: "/selflearning",
        label: "Course",
        role: USER_ROLE.STU,
      },
      {
        key: "/selflearning/courselist",
        label: "Course List",
        role: USER_ROLE.ADMIN,
      },
      {
        key: "/selflearning/questionlist",
        label: "Questions List",
        role: USER_ROLE.ADMIN,
      },
    ],
  },
  {
    key: "academic",
    label: "Academic Support",
    icon: <ToolOutlined />,
    role: USER_ROLE.STU,
    children: [
      {
        key: "/academic",
        label: "English Support",
        role: USER_ROLE.STU,
      },
      {
        key: "/academic/postgraduatesupport",
        label: "Postgraduate-level Support",
        role: USER_ROLE.STU,
      },
    ],
  },

  {
    key: "users",
    label: "Users",
    icon: <TeamOutlined />,
    role: USER_ROLE.ADMIN,
  },
];

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const userRole = useSelector((state: RootState) => state.user.role);
  const userName = useSelector((state: RootState) => state.user.username);
  const router = useRouter();

  const activeMenu = router.pathname;
  const defaultOpenKeys = [activeMenu.split("/")[1]];
  const [modalVisible, setModalVisible] = useState(false);

  const USER_ITEMS = useMemo(
    () => [
      {
        label: <span onClick={() => setModalVisible(true)}>Notification</span>,
        key: "/dashboard/notification",
      },
      {
        label: (
          <span
            onClick={async () => {
              //await userLogout();
              message.success("Log out successfully");
              dispatch(logoutUser());
              router.push("/login");
            }}
          >
            Log out
          </span>
        ),
        key: "login",
      },
    ],
    [setModalVisible, router]
  );
  const filteredItems = useMemo(() => {
    if (userRole === USER_ROLE.STU) {
      // 先根据用户角色过滤顶级菜单项
      const topLevelItems = ITEMS.filter((item) => item.role === userRole);

      // 遍历顶级菜单项，进一步过滤子菜单项
      topLevelItems.forEach((item) => {
        if (item.children) {
          item.children = item.children.filter(
            (child) => child.role === userRole
          );
        }
      });
      return topLevelItems;
    } else {
      return ITEMS.filter((item) => item.key !== "/dashboard");
    }
  }, [userRole]);


  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    router.push(`http://localhost:3000/${key}`);
  };


  //notifications
  const dispatch = useAppDispatch();
  const messages = useSelector((state: RootState) => state.messages.messages);
  console.log("messages:", messages);
  const [initLoading, setInitLoading] = useState(true);
  //messages details
  const [showModal, setShowModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string>("");

  useEffect(() => {
    setInitLoading(false);
    if (modalVisible) {
      dispatch(fetchMessages());
    }
  }, [modalVisible, dispatch]);

  return (
    <>
      <Head>
        <title>ITHunt</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Antdlayout>
          <Header className={styles.header}>
            ITHunt
            <span className={styles.user}>
              <Dropdown menu={{ items: USER_ITEMS }}>
                <span onClick={(e) => e.preventDefault()}>
                  <Space>
                    Welcome back
                    <span className={styles.userName}>{userName}</span>
                    <CaretDownOutlined />
                  </Space>
                </span>
              </Dropdown>
            </span>
          </Header>
          <Antdlayout className={styles.sectionInner}>
            <Sider width={250}>
              <Menu
                mode="inline"
                defaultOpenKeys={defaultOpenKeys}
                selectedKeys={[activeMenu]}
                style={{ height: "100%", borderRight: 0 }}
                items={filteredItems}
                onClick={handleMenuClick}
                className={styles.menu}
              />
            </Sider>
            <Antdlayout className={styles.sectionContent}>
              {router.pathname !== "/dashboard" ? (
                <Content className={styles.content}>{children}</Content>
              ) : (
                <Content>{children}</Content>
              )}
            </Antdlayout>
          </Antdlayout>
        </Antdlayout>
        <Modal
          title="Notification List"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
          className={styles.messagesWin}
        >
          <List
            className="messages"
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={(item) => {
              const interestsString = item.interests.join(", ");
              const description = `Interest: ${interestsString};  Language: ${item.language}`;
              const context = `Hello ${userName}, I am ${item.sender_name}. 
              It's great to meet you! I've noticed we have similar interests or speak the same language. If you'd like to connect, here's my contact information: ${item.contact}.
              Looking forward to hearing from you!
              ----${item.sender_name}`;

              return (
                <List.Item
                  actions={[
                    <Button
                      key="more"
                      type="primary"
                      onClick={() => {
                        setSelectedMessage(context);
                        setShowModal(true);
                      }}
                    >
                      More
                    </Button>,
                  ]}
                >
                  <Skeleton avatar title={false} loading={initLoading} active>
                    <List.Item.Meta
                      title={item.sender_name}
                      description={description}
                    />
                  </Skeleton>
                </List.Item>
              );
            }}
          />
        </Modal>
        <Modal
          title="Messages"
          visible={showModal}
          confirmLoading={confirmLoading}
          onCancel={() => setShowModal(false)}
          footer={[
            <Button
              key="customButton"
              type="primary"
              onClick={() => {
                setConfirmLoading(true);
                message.success(`You have sent message successfully!`);
                setShowModal(false);
                setConfirmLoading(false);
              }}
            >
              Exchange Contact Method
            </Button>,
            <Button key="cancelButton" onClick={() => setShowModal(false)}>
              Cancel
            </Button>,
          ]}
        >
          <p>{selectedMessage}</p>
        </Modal>
      </main>
    </>
  );
};
export default Layout;
