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
import { log } from "console";
import {
  getQuestionList,
  getUserList,
  questionDelete,
  userDelete,
} from "@/api";
import { QUESTION_TYPE } from "@/constants";
import { QuestionQueryType } from "@/type/question.d ";

const COLUMNS = [
  {
    title: "No.",
    dataIndex: "num",
    key: "num",
    width: 100,
  },
  {
    title: "Question Type",
    dataIndex: "type",
    key: "type",
    width: 200,
  },
  {
    title: "Course Name",
    dataIndex: "coursename",
    key: "coursename",
    width: 200,
  },
  {
    title: "Question content",
    dataIndex: "content",
    key: "content",
    width: 200,
  },
  {
    title: "Correct Answer",
    dataIndex: "answer",
    key: "answer",
    width: 200,
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

  async function fetchData(value?: any) {
    const res = await getQuestionList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...value,
    });
    const { data } = res;
    console.log(
      "%c[res]-21",
      "font-size:13px; background:pink; color:#000",
      res
    );
    setData(data);
    setPagination({ ...pagination, current: 1, total: res.total });
  }

  const handleSearchFinish = async (values: QuestionQueryType) => {
    console.log(
      "%c[values]-21",
      "font-size:13px; background:pink; color:#000",
      values
    );
    const res = await getQuestionList({
      ...values,
      current: 1,
      pageSize: pagination.pageSize,
    });
    /*console.log(
      "%c[res.data]-21",
      "font-size:13px; background:pink; color:#000",
      res.data
    );*/
    setData(res.data);
    setPagination({ ...pagination, current: 1, total: res.total });
  };
  const handleSearchReset = () => {
    //console.log(form);
    form.resetFields();
  };
  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
    const query = form.getFieldsValue();
    getUserList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...query,
    });
  };
  const handleQuestionAdd = () => {
    router.push("/question/add");
  };
  const handleQuestionEdit = (id: string) => {
    router.push(`/question/edit/${id}`);
  };
  const handleQuestionDelete = async (id: string) => {
    //console.log(id);
    await questionDelete(id);
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
                handleQuestionDelete(row.id);
              }}
            >
              Delete
            </Button>
            <Button
              type="link"
              onClick={() => {
                handleQuestionEdit(row.id);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Form
        name="search"
        form={form}
        onFinish={handleSearchFinish}
        initialValues={{
          coursename: "",
          type: "",
        }}
      >
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item name="coursename" label="Course Name">
              <Input placeholder="Enter a course name" allowClear />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="type" label="Type">
              <Select placeholder="Select a question type" allowClear>
                <Option key={QUESTION_TYPE.MUL} value={QUESTION_TYPE.MUL}>
                  multiple choices
                </Option>
                <Option key={QUESTION_TYPE.TF} value={QUESTION_TYPE.TF}>
                  true-false question
                </Option>
                <Option
                  key={QUESTION_TYPE.FREE_TEXT}
                  value={QUESTION_TYPE.FREE_TEXT}
                >
                  free text question
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
                onClick={handleQuestionAdd}
              >
                Add a new question
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
            showTotal: (total) => `Total ${total} items`,
          }}
        />
      </div>
    </>
  );
}
