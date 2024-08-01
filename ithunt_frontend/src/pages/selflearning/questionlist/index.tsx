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
  message,
} from "antd";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import router from "next/router";
import { getQuestionList, getUserList, questionDelete } from "@/api";
import { QUESTION_TYPE } from "@/constants";
import { QuestionQueryType } from "@/type/question";

export default function Home() {
  const Option = Select.Option;
  const [form] = Form.useForm();
  const numberToLetter = (num: number) => String.fromCharCode(65 + num);

  const COLUMNS = [
    {
      title: "No.",
      dataIndex: "num",
      key: "num",
      width: 50,
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
      render: (text: string, record: any) => {
        if (record.type === QUESTION_TYPE.MUL) {
          const index = parseInt(text, 10);
          if (!isNaN(index)) {
            return numberToLetter(index);
          }
        }
        return text;
      },
    },
    {
      title: "Update Date",
      dataIndex: "uploaddate",
      key: "uploaddate",
      width: 200,
    },
  ];
  async function fetchData(value?: any) {
    const res = await getQuestionList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...value,
    });
    setData(res.data.records);
    setPagination({ ...pagination, current: 1, total: res.data.total });
  }

  const handleSearchFinish = async (values: QuestionQueryType) => {
    fetchData(values)
  };
  const handleSearchReset = () => {
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
    router.push("/selflearning/addquestion");
  };
  const handleQuestionEdit = (id: number) => {
    console.log("id",id);
    router.push(`/selflearning/editquestion/${id}`);
  };
  const handleQuestionDelete = async (id: number) => {
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
        //console.log(row);
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
