export const QUESTION_TYPE = {
  GENERIC_QUESTION: 1,
  IMAGE_QUESTION: 2,
};
export default [
  {
    type: QUESTION_TYPE.GENERIC_QUESTION,
    question: "Can you introduce about your self and the lastest projects?",
  },
  {
    type: QUESTION_TYPE.GENERIC_QUESTION,
    question:
      "What is the hardest part of your last project, and how do you solve it?",
  },
  {
    type: QUESTION_TYPE.GENERIC_QUESTION,
    question:
      "What is the most important thing when you init the codebase for your project?",
  },
  {
    type: QUESTION_TYPE.IMAGE_QUESTION,
    question:
      "Please take a look at this image, how long does this function execute?",
    image:
      "https://user-images.githubusercontent.com/31009750/155464566-a67d646e-16fc-44cc-8346-4f05ec0525c6.png",
  },
  {
    type: QUESTION_TYPE.GENERIC_QUESTION,
    question: "Do you use typescript in your project and why use it?",
  },
  {
    type: QUESTION_TYPE.GENERIC_QUESTION,
    question: "Can you talk about lifecycle in ReactJS?",
  },
  {
    type: QUESTION_TYPE.GENERIC_QUESTION,
    question:
      "What are the main differences class base component vs functional component?",
  },
  {
    type: QUESTION_TYPE.GENERIC_QUESTION,
    question: "Can you talk about react hooks?",
  },
  {
    type: QUESTION_TYPE.IMAGE_QUESTION,
    question: `Can you tell us? What's happened when?<br/> 
    1. 1st time this component rendered<br/>
    2. User clicked on the first button<br/>
    3. User clicked on the second button<br/>
    Also, explain why?
    `,
    image:
      "https://user-images.githubusercontent.com/31009750/164177908-9f16f47f-c0b1-4eb3-a924-659e3ac47532.png",
  },
  {
    type: QUESTION_TYPE.GENERIC_QUESTION,
    question:
      "How do you manage global states and shared state between components?",
  },
  {
    type: QUESTION_TYPE.GENERIC_QUESTION,
    question: "Have you use Redux?",
  },
  {
    type: QUESTION_TYPE.GENERIC_QUESTION,
    question: "Can you talk about Context? And compare with it Redux?",
  },
  {
    type: QUESTION_TYPE.GENERIC_QUESTION,
    question: "Do you use any libs when working with forms?",
  },
  {
    type: QUESTION_TYPE.GENERIC_QUESTION,
    question: "Can you talk about dynamic component?",
  },
  {
    type: QUESTION_TYPE.GENERIC_QUESTION,
    question: `
      Assume that we have a simple dashboard, you need to create an auth module that allow user logged in and stay in a week if they check on remember me, if not they should be logged out when they turn off the browser? What will you do and explain its pros and cons    
    `,
  },
  {
    type: QUESTION_TYPE.GENERIC_QUESTION,
    question: `
    Assume that our Vue App communicate with Server Side via REST API and use JWT Token for each authorized request which can be expired in 1 hour. Can you suggest a solution to improve the UX?
    `,
  },
  {
    type: QUESTION_TYPE.GENERIC_QUESTION,
    question: `
    Have you ever write Unit Test, if yes tell me more about the process? 
    `,
  },
  {
    type: QUESTION_TYPE.GENERIC_QUESTION,
    question: `
    Have you build your app on production?
    `,
  },
  {
    type: QUESTION_TYPE.GENERIC_QUESTION,
    question: `
    How to detect performance issue of ReactJS Application? 
    `,
  },
  {
    type: QUESTION_TYPE.GENERIC_QUESTION,
    question: `
    Event Stream with RxJS
    `,
  },
  {
    type: QUESTION_TYPE.GENERIC_QUESTION,
    question: `
    How do you organize your code base structure for your project?`,
  },
].map((q, i) => {
  return {
    ...q,
    id: i,
  };
});
