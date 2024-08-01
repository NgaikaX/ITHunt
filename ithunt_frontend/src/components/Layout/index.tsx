import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";
import type { MenuProps } from "antd";
import {
  Layout as AntdLayout,
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
import { getUserInfo, messagesUpdate, sendMessage, userLogout, getMessagesList } from "@/api";
import { USER_ROLE } from "@/constants";
import { MessageType, UserInfoType } from "@/type";

const { Header, Content, Sider } = AntdLayout;

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

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [userName, setUserName] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [user_id, setUserId] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [initLoading, setInitLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const [receiverId, setReceiverID] = useState<number | null>(null);
  const [readStatus, setReadStatus] = useState(false);

  const router = useRouter();
  const activeMenu = router.pathname;
  const defaultOpenKeys = [activeMenu.split("/")[1]];

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
                    await userLogout();
                    message.success("Log out successfully");
                    router.push("/login");
                  }}
              >
            Log out
          </span>
          ),
          key: "login",
        },
      ],
      [router]
  );

  const filteredItems = useMemo(() => {
    if (userRole === USER_ROLE.STU) {
      const topLevelItems = ITEMS.filter((item) => item.role === userRole);
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

  const fetchData = async () => {
    if (typeof window !== "undefined") {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      setUserName(userData.username || "");
      setUserRole(userData.role || "");
      setUserId(userData.id);
    }

    try {
      const infoRes = await getUserInfo(user_id!);
      setUserInfo(infoRes.data);
      setInitLoading(false);

      if (modalVisible) {
        const messagesRes = await getMessagesList(user_id!);
        setMessages(messagesRes.data);
      }
    } catch (error) {
      console.error("Failed to fetch user info list:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [modalVisible, user_id]);

  const handleExchangeClick = async () => {
    setConfirmLoading(true);
    try {
      const messageData: MessageType = {
        senderId: user_id!,
        senderName: userName,
        recieverId: receiverId!,
        contact: userInfo!.contact,
        interest: userInfo!.interest,
        language: userInfo!.language,
      };
      await sendMessage(messageData);
      message.success("You have sent message successfully!");
      setShowModal(false);
    } catch (error) {
      message.error("Failed to send message.");
    } finally {
      setConfirmLoading(false);
    }
  };

  const markMessageAsRead = async (id: number) => {
    try {
      await messagesUpdate(id);
      console.log("id",id);
    } catch (error) {
      console.error("Failed to update message read status:", error);
    }
  };

  return (
      <>
        <Head>
          <title>ITHunt</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <AntdLayout>
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
            <AntdLayout className={styles.sectionInner}>
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
              <AntdLayout className={styles.sectionContent}>
                {router.pathname !== "/dashboard" ? (
                    <Content className={styles.content}>{children}</Content>
                ) : (
                    <Content>{children}</Content>
                )}
              </AntdLayout>
            </AntdLayout>
          </AntdLayout>
          <Modal
              title="Notification List"
              open={modalVisible}
              onCancel={() => setModalVisible(false)}
              footer={null}
              className={styles.messagesWin}
          >
            <List
                className="messages"
                itemLayout="horizontal"
                dataSource={messages}
                renderItem={(item) => {
                  const description = `Interest: ${item.interest};  Language: ${item.language}`;
                  const context = `Hello ${userName}, I am ${item.senderName}. 
              It's great to meet you! I've noticed we have similar interests or speak the same language. If you'd like to connect, here's my contact information: ${item.contact}.
              Looking forward to hearing from you!
              ----${item.senderName}`;
                  return (
                      <List.Item
                          actions={[
                            <Button
                                key="more"
                                type="primary"
                                onClick={() => {
                                  setSelectedMessage(context);
                                  setShowModal(true);
                                  setReceiverID(item.senderId);
                                  setReadStatus(item.read);
                                  markMessageAsRead(item.id);
                                }}
                            >
                              More
                            </Button>,
                          ]}
                      >
                        <Skeleton avatar title={false} loading={initLoading} active>
                          <List.Item.Meta
                              title={item.senderName}
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
              open={showModal}
              confirmLoading={confirmLoading}
              onCancel={() => setShowModal(false)}
              footer={[
                <Button
                    key="customButton"
                    type="primary"
                    onClick={handleExchangeClick}
                >
                  Exchange Contact Information
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
