import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";

function DeckDetail() {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [updatedIvl, setUpdatedIvl] = useState(null); // 更新されたivlを管理する状態
  const [isFinished, setIsFinished] = useState(false); // 学習が終了したかどうかを管理する状態

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
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUpdatedIvl(data.ivl);

        if (currentIndex + 1 < cards.length) {
          // まだカードが残っている場合は次のカードに進む
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          // 全てのカードを学習し終えた場合
          setIsFinished(true);
        }
      })
      .catch((error) => console.error("Error updating card:", error));
  };

  return (
    <div>
      <h1>Deck {id}</h1>
      {isFinished ? (
        <p>今日の学習は終了しました。</p>
      ) : cards.length > 0 ? (
        <>
          <Card flds={cards[currentIndex].flds} />
          <div>
            <p>Choose the correct answer:</p>
            <button onClick={() => handleOptionSelect("again")}>Again</button>
            <button onClick={() => handleOptionSelect("hard")}>Hard</button>
            <button onClick={() => handleOptionSelect("good")}>Good</button>
            <button onClick={() => handleOptionSelect("easy")}>Easy</button>
          </div>
          {updatedIvl !== null && (
            <p>
              先程学習したカードは{updatedIvl}日後に復習することになっています。
            </p>
          )}
        </>
      ) : (
        <p>Loading cards...</p>
      )}
    </div>
  );
}

export default DeckDetail;
