import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import QUESTIONS, { QUESTION_TYPE } from "./questions";

const getCurrentQuestion = (questions) => {
  // pick the 1st question or pick the current question stored in session
  const currentQuestion = sessionStorage.getItem("currentQuestion") || null;
  if (currentQuestion) {
    return questions[parseInt(currentQuestion)];
  }
  return questions[0];
};
const Question = ({ q, next, prev }) => {
  const { id, question, type } = q;
  function createMarkup() {
    return { __html: `${id + 1}. ${question}` };
  }

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardActions>
          <Button size="small" onClick={() => prev(q)}>
            Prev
          </Button>
          <Button size="small" onClick={() => next(q)}>
            Next
          </Button>
        </CardActions>
        <CardContent>
          <Typography variant="h5" component="div">
            <div dangerouslySetInnerHTML={createMarkup()}></div>
          </Typography>
          {type === QUESTION_TYPE.IMAGE_QUESTION && (
            <CardMedia component="img" image={q.image} />
          )}
        </CardContent>
      </Card>
    </>
  );
};

const QuizApp = () => {
  const [question, setQuestion] = useState(null);

  const nextQuestion = (question) => {
    const nextIndex = Math.min(question.id + 1, QUESTIONS.length - 1);
    setQuestion(QUESTIONS[nextIndex]);
  };

  const prevQuestion = (question) => {
    const prevIndex = Math.max(question.id - 1, 0);
    setQuestion(QUESTIONS[prevIndex]);
  };

  useEffect(() => {
    const currentQuestion = getCurrentQuestion(QUESTIONS);
    setQuestion(currentQuestion);
  }, []);
  return (
    <Container>
      <Box>
        <Typography variant="h3" component="div">
          ReactJS Interview Questions
        </Typography>
        {question ? (
          <Question q={question} prev={prevQuestion} next={nextQuestion} />
        ) : null}
      </Box>
    </Container>
  );
};

export default QuizApp;
