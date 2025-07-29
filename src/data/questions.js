const allQuestions = {
  easy: [
    { question: "What is 12 + 8?", options: ["18", "20", "21", "22"], answer: "20" },
    { question: "What is 7 × 6?", options: ["42", "36", "48", "40"], answer: "42" },
    { question: "What is 15 ÷ 3?", options: ["4", "5", "6", "3"], answer: "5" },
    { question: "What is 9²?", options: ["81", "72", "64", "99"], answer: "81" },
    { question: "What is the square root of 144?", options: ["12", "14", "16", "10"], answer: "12" }
  ],
  medium: [
    { question: "What is 25% of 200?", options: ["25", "50", "75", "100"], answer: "50" },
    { question: "What is 13 × 7?", options: ["91", "90", "86", "97"], answer: "91" },
    { question: "What is √169?", options: ["11", "13", "14", "15"], answer: "13" },
    { question: "Simplify: 3² + 4²", options: ["25", "16", "9", "20"], answer: "25" },
    { question: "What is 72 ÷ 8?", options: ["9", "8", "6", "7"], answer: "9" }
  ],
  hard: [
    { question: "What is the value of π (up to 2 decimal places)?", options: ["3.12", "3.14", "3.16", "3.18"], answer: "3.14" },
    { question: "What is 11² + 2²?", options: ["125", "121", "123", "105"], answer: "125" },
    { question: "Solve: (3x = 12), x=?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "What is 2³ × 2²?", options: ["32", "16", "8", "4"], answer: "32" },
    { question: "What is the cube root of 27?", options: ["2", "3", "4", "5"], answer: "3" }
  ]
};

export default allQuestions;