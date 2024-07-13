import { QUESTION_TYPE } from "@/constants";
import { QuestionType } from "@/type/question";
import { Form, Input, Radio, Button, Space } from "antd";

export default function Question({ question }: { question: QuestionType }) {
  const [form] = Form.useForm();

  const renderQuestionContent = () => {
    switch (question.type) {
      case QUESTION_TYPE.MUL:
        return (
          <>
            <Form.Item name="content" label="Question">
              <span>{question.content}</span>
            </Form.Item>
            <Form.Item name="answer" label="Options">
              <Radio.Group>
                {question.options.map((option, index) => (
                  <Radio value={String.fromCharCode(65 + index)} key={index}>
                    {String.fromCharCode(65 + index)}. {option}
                  </Radio>
                ))}
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
              <Input.TextArea placeholder="Enter your answer" />
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
              <Radio.Group>
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
