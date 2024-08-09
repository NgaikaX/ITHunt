import {
  Button,
  Form,
  Input,
  Radio,
  Select,
  Space,
  message,
} from "antd";

import { useRouter } from "next/router";
import {questionAdd, questionUpdate} from "@/api";
import { QUESTION_TYPE } from "@/constants";
import { useEffect, useState } from "react";
import { QuestionType } from "@/type/question";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import styles from "./index.module.css";
import {formatTimestamp} from "@/utils";

export default function QuestionForm({
  editData = {
    coursename: "",
    options:null,
  },
}: {
  editData?: Partial<QuestionType>;
}) {
  const [form] = Form.useForm();
  const router = useRouter();
  const Option = Select.Option;
  const [answer, setAnswer] = useState<string | null>(null);
  const [type, setType] = useState<string>(""); //

  useEffect(() => {
    if (editData.id) {
      form.setFieldsValue(editData);
      setType(editData.type || ""); // set default selected option
      setAnswer(editData.answer || "");
      console.log("Edit data set in form:", editData);
      console.log("Edit data type:", editData.type);
    }
  }, [editData, form]);

  const handleFinish = async (values: QuestionType) => {
    values.uploaddate = formatTimestamp(Date.now());
    let questionData: any = {
      ...values,
      answer: values.answer, // Assign the selected index as string
    };
    if (editData?.id) {
      await questionUpdate({ ...editData, ...values });
    } else {
      await questionAdd({ ...questionData });
      console.log("get question data:", { ...editData, ...questionData });
    }
    message.success("Create Successfully");
    router.push("/selflearning/questionlist");
  };
  const handleCancel = () => {
    router.push("/selflearning/questionlist");
  };

  const handleTypeChange = (value: string) => {
    form.resetFields(["content", "answer", "options"]);
    setType(value);
    setAnswer(null); // 重置 answer
  };

  const handleRadioChange = (index: number) => {
    const answerString = index.toString();
    setAnswer(answerString);
    form.setFieldsValue({ answer: answerString });
  };

  //if admin select multiple choices
  const MultipleChoicesForm = () => (
    <>
      <Form.Item
        name="content"
        label="Question"
        rules={[{ required: true }]}
        extra="Please select the correct answer using the radio button"
      >
        <Input.TextArea placeholder="Enter the question" />
      </Form.Item>
      <Form.List
        name="options"
        rules={[
          {
            validator: async (_, options) => {
              if (!options || options.length < 2) {
                return Promise.reject(
                  new Error("At least 2 options are required")
                );
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                label={`${String.fromCharCode(65 + index)}`}
                required={false}
                key={field.key}
              >
                <Space className={styles.mul_op}>
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input option or delete this field.",
                      },
                    ]}
                    className={styles.mul_ip}
                  >
                    <Input.TextArea placeholder="Option" />
                  </Form.Item>
                  <Radio
                    onChange={() => handleRadioChange(index)}
                    checked={answer === index.toString()}
                  />
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className={styles.mul_minus}
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Space>
              </Form.Item>
            ))}
            <Form.Item label=" " colon={false}>
              <Button
                type="dashed"
                onClick={() => add()}
                className={styles.mul_add}
                icon={<PlusOutlined />}
              >
                Add Option
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      {/* Hidden field to store the answer */}
      <Form.Item name="answer" hidden>
        <Input type="hidden" />
      </Form.Item>
    </>
  );

  const FreeTextQuestionForm = () => (
    <>
      <Form.Item name="content" label="Question" rules={[{ required: true }]}>
        <Input.TextArea
          placeholder="Enter the question"
          defaultValue={editData.content}
        />
      </Form.Item>
      <Form.Item
        name="answer"
        label="Correct Answer"
        rules={[{ required: true }]}
      >
        <Input.TextArea
          placeholder="Enter the answer"
          defaultValue={editData.answer}
        />
      </Form.Item>
    </>
  );

  const TrueFalseForm = () => (
    <>
      <Form.Item name="content" label="Question" rules={[{ required: true }]}>
        <Input.TextArea placeholder="Enter the statement" />
      </Form.Item>
      <Form.Item
        name="answer"
        label="Correct Answer"
        rules={[{ required: true }]}
      >
        <Radio.Group>
          <Radio value="true">True</Radio>
          <Radio value="false">False</Radio>
        </Radio.Group>
      </Form.Item>
    </>
  );
  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={editData}
        onFinish={handleFinish}
        className={styles.formWrap}
      >
        <Form.Item
          label="Course Name"
          name="coursename"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter a course name" />
        </Form.Item>
        <Form.Item
          label="Question Type"
          name="type"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select a question type"
            onChange={handleTypeChange}
          >
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
        {type === QUESTION_TYPE.MUL && <MultipleChoicesForm />}
        {type === QUESTION_TYPE.FREE_TEXT && <FreeTextQuestionForm />}

        {type === QUESTION_TYPE.TF && <TrueFalseForm />}

        <Form.Item label=" " colon={false}>
          <Space>
            <Button type="primary" htmlType="submit">
              Finish
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}
