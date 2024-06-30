body {
  font-family: 'Poppins', sans-serif;
  background-color: #f0f0f0;
  padding-top: 60px; /* Adjusted for navbar height */
  margin: 0;
}

.quiz-container {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: left;
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
}

h1 {
  font-size: 24px;
  color: #06053c;
}

#result {
  margin-top: 20px;
  color: #2e2ca1;
}

#answerInput {
  height: 70px; /* 모바일 환경에서 입력 필드 높이 조정 */
  font-size: 12px; /* 입력 필드 텍스트 크기 조정 */
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

#hints {
  margin-top: 20px; /* Add space below the hints block */
  color: #2e2ca1;
}

/* Mobile-friendly adjustments */
@media (max-width: 600px) {
  .quiz-container {
    padding: 15px;
    margin: 10px auto;
  }

  h1 {
    font-size: 20px;
  }

  .button-group button {
    padding: 4px 5px; /* 패딩을 줄여서 버튼 크기 줄이기 */
    font-size: 12px; /* 폰트 크기 줄이기 */
    margin: 5px; /* 버튼 사이의 간격 조정 */
  }

  #answerInput {
    height: 100px; /* 모바일 환경에서 입력 필드 높이 조정 */
    font-size: 12px; /* 입력 필드 텍스트 크기 조정 */
  }
}

/* General button adjustments for all screen sizes */
.button-group button {
  padding: 2px 5px;
    /* top and bottom padding is 8px, left and right padding is 15px */
  font-size: 14px; /* 폰트 크기 줄이기 */
  margin: 5px; /* 버튼 사이의 간격 조정 */
}
