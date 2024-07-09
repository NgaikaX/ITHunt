import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Space,
  Table,
  TablePaginationConfig,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { getFeedbackList } from "@/api/course";
import { FeedbackQueryType } from "@/type";
import router from "next/router";

const COLUMNS = [
  {
    title: "Course Name",
    dataIndex: "coursename",
    key: "coursename",
    width: 250,
  },
  {
    title: "User ID",
    dataIndex: "userid",
    key: "userid",
    width: 150,
  },
  {
    title: "Feedback",
    dataIndex: "feedback",
    key: "feedback",
    ellipsis: true,
    width: 400,
    render: (text: string) => {
      return (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
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
  const [form] = Form.useForm();
  const handleSearchFinish = async (values: FeedbackQueryType) => {
    /*console.log(
      "%c[values]-21",
      "font-size:13px; background:pink; color:#000",
      values
    );*/
    const res = await getFeedbackList({
      ...values,
      current: 1,
      pageSize: pagination.pageSize,
    });
    setData(res.data);
    setPagination({ ...pagination, current: 1, total: res.total });
  };
  const handleSearchReset = () => {
    console.log(form);
    form.resetFields();
  };
  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
    const query = form.getFieldsValue();
    getFeedbackList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...query,
    });
  };

  const columns = [
    ...COLUMNS,
    {
      title: "Operation",
      key: "operation",
      render: (_: any, row: any) => {
        return (
          <Space>
            <Button type="link" danger>
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 20,
    showSizeChanger: true,
    total: 0,
  });

  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await getFeedbackList({
        current: 1,
        pageSize: pagination.pageSize,
      });
      const { data } = res;
      setData(data);
    }
    fetchData();
  }, []);

  return (
    <>
      <Form
        name="search"
        form={form}
        onFinish={handleSearchFinish}
        initialValues={{
          coursename: "",
        }}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="coursename" label="Course">
              <Input placeholder="Enter a course name" allowClear />
            </Form.Item>
          </Col>
          <Col span={8}>
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
