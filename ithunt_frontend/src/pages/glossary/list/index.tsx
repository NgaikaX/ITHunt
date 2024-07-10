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
  message,
} from "antd";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import router from "next/router";
import { VocabularyQueryType } from "@/type/glossary";
import { getVocabularyList, vocabularyDeleted } from "@/api/glossary";
import { log } from "console";

const COLUMNS = [
  {
    title: "Vocabulary",
    dataIndex: "vocabulary",
    key: "vocabulary",
    width: 250,
  },
  {
    title: "Explanation",
    dataIndex: "explanation",
    key: "explaination",
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
  async function fetchData(search?: VocabularyQueryType) {
    const res = await getVocabularyList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...search,
    });
    const { data } = res;
    setData(data);
    setPagination({ ...pagination, current: 1, total: res.total });
  }
  const handleSearchFinish = async (values: VocabularyQueryType) => {
    const res = await getVocabularyList({
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
    getVocabularyList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...query,
    });
  };
  const handleVocabularyAdd = () => {
    router.push("/glossary/add");
  };
  const handleVocabularyEdit = (id: string) => {
    router.push(`/glossary/edit/${id}`);
  };
  const handleVocabularyDelete = async (id: string) => {
    console.log(id);
    await vocabularyDeleted(id);
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
                handleVocabularyDelete(row.id);
              }}
            >
              Delete
            </Button>
            <Button
              type="link"
              onClick={() => {
                handleVocabularyEdit(row.id);
              }}
            >
              Edit
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
    fetchData();
  }, []);

  return (
    <>
      <Form
        name="search"
        form={form}
        onFinish={handleSearchFinish}
        initialValues={{
          vocabulary: "",
        }}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="vocabulary" label="Vocabulary">
              <Input placeholder="Enter a vocabulary" allowClear />
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
          <Col span={8}>
            <Form.Item>
              <Button
                type="link"
                className={styles.addbtn}
                onClick={handleVocabularyAdd}
              >
                Add a vocabulary
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
