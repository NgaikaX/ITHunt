import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  TablePaginationConfig,
  Tag,
  Tooltip,
  message,
} from "antd";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import router from "next/router";

import {getUserAllList, getUserList, userDelete} from "@/api";
import { UserQueryType, UserType } from "@/type";
import { USER_ROLE, USER_STATUS } from "@/constants";

const COLUMNS = [
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    width: 150,
  },
  {
    title: "User Name",
    dataIndex: "username",
    key: "username",
    width: 250,
  },
  {
    title: "E-mail",
    dataIndex: "email",
    key: "email",
    width: 250,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 100,
    render: (text: string) => {
      //console.log(text);
      return text === USER_STATUS.ON ? (
        <Tag color="green">ON</Tag>
      ) : (
        <Tag color="red">OFF</Tag>
      );
    },
  },
  {
    title: "Update Date",
    dataIndex: "uploaddate",
    key: "uploaddate",
    width: 200,
  },
];

export default function Home() {
  const Option = Select.Option;
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    pageNum: 1,
    pageSize: 20,
    showSizeChanger: true,
    total: 0,
  });

  async function fetchData(value?: UserQueryType) {
    const res = await getUserList(
        {pageNum: 1,
        pageSize: 20});
    /*console.log(
        "%c[res]-2",
        "font-size:13px; background:pink; color:#000",
        res
    );*/

    setData(res.data.records);
    setPagination({ ...pagination, pageNum: 1, total: res.total });
  }

  const handleSearchFinish = async (values: UserQueryType) => {
    const res = await getUserList({
      ...values,
      pageNum: 1,
      pageSize: pagination.pageSize,
    });
    /*console.log(
      "%c[res.data]-21",
      "font-size:13px; background:pink; color:#000",
      res.data
    );*/
    setData(res.data.records);
    setPagination({ ...pagination, pageNum: 1, total: res.data.total });
  };
  const handleSearchReset = () => {
    //console.log(form);
    form.resetFields();
  };
  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
    const query = form.getFieldsValue();
    getUserList({
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize,
      ...query,
    });
  };
  const handleUserAdd = () => {
    router.push("/users/add");
  };
  const handleUserEdit = (id: string) => {
    router.push(`/users/edit/${id}`);
  };
  const handleUserDelete = async (id: string) => {
    console.log(id);
    await userDelete(id);
    message.success("Delete Sucessfully");
    fetchData(form.getFieldsValue());
  };
  const columns = [
    ...COLUMNS,
    {
      title: "Operation",
      key: "operation",
      render: (_: any, row: any) => {
        return (
          <Space>
            <Button
              type="link"
              danger
              onClick={() => {
                handleUserDelete(row.id);
              }}
            >
              Delete
            </Button>
            <Button
              type="link"
              onClick={() => {
                handleUserEdit(row.id);
              }}
            >
              Edit
            </Button>
          </Space>
        );
      },
    },
  ];



  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Form
        name="search"
        form={form}
        onFinish={handleSearchFinish}
        initialValues={{
          email: " ",
          role: " ",
        }}
      >
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item name="username" label="User name">
              <Input placeholder="Enter a user name" allowClear />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="role" label="Role">
              <Select placeholder="Select a user's role" allowClear>
                <Option key={USER_ROLE.STU} value={USER_ROLE.STU}>
                  student
                </Option>
                <Option key={USER_ROLE.ADMIN} value={USER_ROLE.ADMIN}>
                  admin
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
                <Button htmlType="submit" onClick={handleSearchReset}>
                  Clear
                </Button>
              </Space>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item>
              <Button
                type="link"
                className={styles.addbtn}
                onClick={handleUserAdd}
              >
                Add a user
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className={styles.tableWrap}>
        <Table
          dataSource={data}
          columns={columns}
          scroll={{ x: 1000 }}
          onChange={handleTableChange}
          pagination={{
            ...pagination,
            showTotal: () => `${pagination.total} in total`,
          }}
        />
      </div>
    </>
  );
}
