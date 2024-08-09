import { QUESTION_TYPE } from "@/constants";
import { QuestionType } from "@/type/question";
import { Form, Input, Radio, Button, Space } from "antd";
import styles from "./index.module.css";
import { useEffect } from "react";

export default function Question({
  question,
  onAnswerChange,
  answer, isReviewMode = false,
}: {
  question: any;
  onAnswerChange: (answer: string) => void;
  answer: string;
  isReviewMode?: boolean;
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ answer });
  }, [answer, form]);

  const renderQuestionContent = () => {
      const correctAnswer = question && (isReviewMode ? question.correctAnswer: question.answer);
      const isCorrect = isReviewMode && correctAnswer !== undefined && correctAnswer === answer;

      switch (question?.type) {
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
                  disabled={isReviewMode}
                  value={answer}
              >
                <Space direction="vertical">
                    {question.options.map((option:string, index:number) => (
                        <Radio value={index.toString()} key={index}>
                            {String.fromCharCode(65 + index)}. {option}
                        </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </Form.Item>
              {isReviewMode && !isCorrect && (
                  <Form.Item label="Correct Answer">
                <span style={{ color: "red" }}>
                 {question.options[correctAnswer]}
                </span>
                  </Form.Item>
              )}
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
                disabled={isReviewMode}
                value={answer}
              />
            </Form.Item>
              {isReviewMode && !isCorrect && (
                  <Form.Item label="Correct Answer">
                <span style={{ color: 'red' }}>
                  {correctAnswer}
                </span>
                  </Form.Item>
              )}
          </>
        );

      case QUESTION_TYPE.TF:
        return (
          <>
            <Form.Item name="content" label="Question">
              <span>{question.content}</span>
            </Form.Item>
            <Form.Item name="answer" label="Answer">
              <Radio.Group
                  onChange={(e) => onAnswerChange(e.target.value)}
                  disabled={isReviewMode}
                  value={answer}
              >
                <Radio value="true">True</Radio>
                <Radio value="false">False</Radio>
              </Radio.Group>
            </Form.Item>
              {isReviewMode && !isCorrect && (
                  <Form.Item label="Correct Answer">
                <span style={{ color: 'red' }}>
                  {correctAnswer === "true" ? 'True' : 'False'}
                </span>
                  </Form.Item>
              )}
          </>
        );
      default:
        return null;
    }
  };

  return <Form form={form}>{renderQuestionContent()}</Form>;
}
