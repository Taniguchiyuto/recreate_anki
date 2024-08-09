import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useHistoryをuseNavigateに変更
import "./ClientComponent.css"; // CSSファイルをインポート

function ClientComponent() {
  const [data, setData] = useState(null);
  const navigate = useNavigate(); // useNavigateを取得

  useEffect(() => {
    fetch("http://localhost:8000/api/client")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDeckClick = (id) => {
    navigate(`/deck/${id}`); // デッキ詳細ページに移動
  };

  return (
    <div>
      <h1>Client Data</h1>
      <div className="card-container">
        {data ? (
          data.map((item, index) => (
            <div
              className="card"
              key={index}
              onClick={() => handleDeckClick(item.id)}
              style={{ cursor: "pointer" }}
            >
              {/* <div className="card-image">
                <img src={`../img/${item.image_path}`} alt="Deck" />
              </div> */}
              <div className="card-title">{item.deckname}</div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default ClientComponent;
