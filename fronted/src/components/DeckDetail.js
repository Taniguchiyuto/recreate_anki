import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";

function DeckDetail() {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

    fetch(`http://localhost:8000/api/card/${cardId}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ option }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
      })
      .catch((error) => console.error("Error updating card:", error));
  };

  return (
    <div>
      <h1>Deck {id}</h1>
      {cards.length > 0 ? (
        <>
          <Card flds={cards[currentIndex].flds} />
          <div>
            <p>Choose the correct answer:</p>
            <button onClick={() => handleOptionSelect("again")}>Again</button>
            <button onClick={() => handleOptionSelect("hard")}>Hard</button>
            <button onClick={() => handleOptionSelect("good")}>Good</button>
            <button onClick={() => handleOptionSelect("easy")}>Easy</button>
          </div>
        </>
      ) : (
        <p>今日の学習は終了しました</p>
      )}
    </div>
  );
}

export default DeckDetail;
