"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "USERS",
      [
        {
          username: "demo_user",
          email: "demo@example.com",
          password: "password123",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "DECKS",
      [
        {
          user_id: 1,
          deck_name: "My First Deck",
          image_path: "normal.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1,
          deck_name: "うんこ単語帳",
          image_path: "unko.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("USERS", null, {});
    await queryInterface.bulkDelete("DECKS", null, {});
  },
};
