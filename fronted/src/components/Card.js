import React, { useState } from "react";

function Card({ flds }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const question = flds[0];
  const answer = flds[1];

  const handleCardClick = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div onClick={handleCardClick} style={cardStyle}>
      <p>{question}</p> {/* 質問 */}
      {showAnswer && <p style={answerStyle}>{answer}</p>} {/* 答え */}
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ccc",
  borderRadius: "5px",
  padding: "20px",
  margin: "10px",
  cursor: "pointer",
  textAlign: "center",
  width: "300px",
};

const answerStyle = {
  marginTop: "10px",
  fontWeight: "bold",
  color: "#333",
};

export default Card;
