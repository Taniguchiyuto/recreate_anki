import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";

function DeckDetail() {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // 現在のカードインデックス

  useEffect(() => {
    fetch(`http://localhost:8000/api/deck/${id}/cards`)
      .then((response) => response.json())
      .then((data) => {
        const parsedData = data.map((card) => ({
          ...card,
          flds: JSON.parse(card.flds),
        }));
        setCards(parsedData);
      })
      .catch((error) => console.error("Error fetching cards:", error));
  }, [id]);

  const handleOptionSelect = (option) => {
    const cardId = cards[currentIndex].id;

    // dueを1日後に更新するリクエストを送信
    fetch(`http://localhost:8000/api/card/${cardId}/update-due`, {
      method: "POST",
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data); // "Due updated successfully" のメッセージが表示される
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
      })
      .catch((error) => console.error("Error updating due:", error));
  };

  return (
    <div>
      <h1>Deck {id}</h1>
      {cards.length > 0 ? (
        <>
          <Card flds={cards[currentIndex].flds} />
          <div>
            <p>Choose the correct answer:</p>
            <button onClick={() => handleOptionSelect("option1")}>
              Option 1
            </button>
            <button onClick={() => handleOptionSelect("option2")}>
              Option 2
            </button>
            <button onClick={() => handleOptionSelect("option3")}>
              Option 3
            </button>
            <button onClick={() => handleOptionSelect("option4")}>
              Option 4
            </button>
          </div>
        </>
      ) : (
        <p>Loading cards...</p>
      )}
    </div>
  );
}

export default DeckDetail;
