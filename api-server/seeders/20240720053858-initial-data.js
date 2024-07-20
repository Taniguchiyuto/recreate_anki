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
        },
        {
          user_id: 1,
          deck_name: "うんこ単語帳",
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
