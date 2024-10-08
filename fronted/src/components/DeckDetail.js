import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";

function DeckDetail() {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [updatedIvl, setUpdatedIvl] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState(null); // 追加

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
        setUpdatedIvl(data.ivl);
        setGeneratedMessage(data.generatedMessage); // 生成されたメッセージを保存
        console.log(data.generatedMessage);
        if (currentIndex + 1 < cards.length) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
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
          {/* currentIndexをkeyとして使用して、カードが変わる度にCardコンポーネントを再生成 */}
          <Card
            key={currentIndex} // 修正箇所
            flds={cards[currentIndex].flds}
            factor={cards[currentIndex].factor}
            generated_text={cards[currentIndex].generated_text}
          />
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
          {generatedMessage && (
            <p style={{ fontStyle: "italic", color: "green" }}>
              {generatedMessage}
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
