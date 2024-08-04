// UserQuestionResult.java
package com.backend.entity;

import lombok.Data;

import java.util.List;

@Data
public class UserQuestionResult {
    private Integer questionId;
    private String type;
    private String content;
    private List<String> options;
    private String correctAnswer;
    private String userAnswer;
    private boolean isCorrect;

    public UserQuestionResult(Question question, UserQuestion userQuestion) {
        this.questionId = question.getId();
        this.type = question.getType();
        this.content = question.getContent();
        this.options = question.getOptions();
        this.correctAnswer = question.getAnswer();
        this.userAnswer = userQuestion.getUserAnswer();
        this.isCorrect = question.getAnswer().equals(userQuestion.getUserAnswer());
    }
}
