import {
  Button,
  Col,
  Form,
  Image,
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
import { courseDelete, getCourseList } from "@/api/course";
import { CourseQueryType } from "@/type";
import router from "next/router";
import { getSl_CourseList, slCourseDelete } from "@/api";

const COLUMNS = [
  {
    title: "Course Name",
    dataIndex: "coursename",
    key: "coursename",
    width: 150,
  },
  {
    title: "Cover",
    dataIndex: "cover",
    key: "cover",
    render: (text: string) => {
      return <Image width={100} src={text} alt="" />;
    },
    width: 150,
  },
  {
    title: "Video Url",
    dataIndex: "videourl",
    key: "videourl",
    width: 200,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    ellipsis: true,
    width: 300,
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
  async function fetchData(search?: CourseQueryType) {
    const res = await getSl_CourseList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...search,
    });
    const { data } = res;
    setData(data);
    setPagination({ ...pagination, total: res.total });
  }
  const handleSearchFinish = async (values: CourseQueryType) => {
    const res = await getSl_CourseList({
      ...values,
      current: 1,
      pageSize: pagination.pageSize,
    });
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
    getSl_CourseList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...query,
    });
  };
  const handleCourseAdd = () => {
    router.push("/selflearning/addcourse");
  };
  const handleCourseEdit = (id: string) => {
    router.push(`/selflearning/editcourse/${id}`);
  };
  const handleCourseDelete = async (id: string) => {
    //console.log(id);
    await slCourseDelete(id);
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
                handleCourseDelete(row.id);
              }}
            >
              Delete
            </Button>
            <Button
              type="link"
              onClick={() => {
                handleCourseEdit(row.id);
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
          <Col span={8}>
            <Form.Item>
              <Button
                type="link"
                className={styles.addbtn}
                onClick={handleCourseAdd}
              >
                Add a course
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
