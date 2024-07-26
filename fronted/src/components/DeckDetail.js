import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function DeckDetail() {
  const { id } = useParams(); // デッキIDを取得
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch(`http://api-server-domain:8000/api/deck/${id}/cards`) // APIエンドポイントにリクエストを送信
      .then((response) => response.json())
      .then((data) => setCards(data));
  }, [id]);

  return (
    <div>
      <h1>Deck {id}</h1>
      <ul>
        {cards.map((card) => (
          <li key={card.id}>{card.id}</li> // カードの内容を表示
        ))}
      </ul>
    </div>
  );
}

export default DeckDetail;
