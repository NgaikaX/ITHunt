import { QUESTION_TYPE } from "@/constants";
import { QuestionType } from "@/type/question";
import { Form, Input, Radio, Button, Space } from "antd";
import styles from "./index.module.css";
import { useEffect } from "react";

export default function Question({
  question,
  onAnswerChange,
  answer,
}: {
  question: QuestionType;
  onAnswerChange: (answer: string) => void;
  answer: string;
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ answer });
  }, [answer, form]);

  const renderQuestionContent = () => {
    switch (question.type) {
      case QUESTION_TYPE.MUL:
        return (
          <>
            <Form.Item name="content" label="Question">
              <span>{question.content}</span>
            </Form.Item>
            <Form.Item name="answer" label="Options">
              <Radio.Group
                className={styles.optionlist}
                onChange={(e) => onAnswerChange(e.target.value)}
              >
                <Space direction="vertical">
                  {question.options.map((option, index) => (
                    <Radio value={String.fromCharCode(65 + index)} key={index}>
                      {String.fromCharCode(65 + index)}. {option}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </Form.Item>
          </>
        );
      case QUESTION_TYPE.FREE_TEXT:
        return (
          <>
            <Form.Item name="content" label="Question">
              <span>{question.content}</span>
            </Form.Item>
            <Form.Item name="answer" label="Answer">
              <Input.TextArea
                placeholder="Enter your answer"
                onChange={(e) => onAnswerChange(e.target.value)}
                rows={8}
                className={styles.freetext}
              />
            </Form.Item>
          </>
        );
      case QUESTION_TYPE.TF:
        return (
          <>
            <Form.Item name="content" label="Question">
              <span>{question.content}</span>
            </Form.Item>
            <Form.Item name="answer" label="Answer">
              <Radio.Group onChange={(e) => onAnswerChange(e.target.value)}>
                <Radio value="true">True</Radio>
                <Radio value="false">False</Radio>
              </Radio.Group>
            </Form.Item>
          </>
        );
      default:
        return null;
    }
  };

  return <Form form={form}>{renderQuestionContent()}</Form>;
}
