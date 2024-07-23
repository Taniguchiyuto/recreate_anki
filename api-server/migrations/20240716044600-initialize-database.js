// "use strict";

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.createTable("USERS", {
//       id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       username: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       email: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true,
//       },
//       password: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       created_at: {
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
//       },
//     });

//     await queryInterface.createTable("DECKS", {
//       id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       user_id: {
//         type: Sequelize.INTEGER,
//         references: {
//           model: "USERS",
//           key: "id",
//         },
//       },
//       deck_name: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//     });

//     await queryInterface.createTable("NOTES", {
//       id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       guid: {
//         type: Sequelize.STRING,
//       },
//       mid: {
//         type: Sequelize.INTEGER,
//       },
//       mod: {
//         type: Sequelize.INTEGER,
//       },
//       usn: {
//         type: Sequelize.INTEGER,
//       },
//       tags: {
//         type: Sequelize.TEXT,
//       },
//       flds: {
//         type: Sequelize.TEXT,
//       },
//       sfld: {
//         type: Sequelize.STRING,
//       },
//       csum: {
//         type: Sequelize.INTEGER,
//       },
//       flags: {
//         type: Sequelize.INTEGER,
//       },
//       data: {
//         type: Sequelize.TEXT,
//       },
//     });

//     await queryInterface.createTable("CARDS", {
//       id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       nid: {
//         type: Sequelize.INTEGER,
//         references: {
//           model: "NOTES",
//           key: "id",
//         },
//       },
//       did: {
//         type: Sequelize.INTEGER,
//         references: {
//           model: "DECKS",
//           key: "id",
//         },
//       },
//       ord: {
//         type: Sequelize.INTEGER,
//       },
//       mod: {
//         type: Sequelize.INTEGER,
//       },
//       usn: {
//         type: Sequelize.INTEGER,
//       },
//       type: {
//         type: Sequelize.INTEGER,
//       },
//       queue: {
//         type: Sequelize.INTEGER,
//       },
//       due: {
//         type: Sequelize.INTEGER,
//       },
//       ivl: {
//         type: Sequelize.INTEGER,
//       },
//       factor: {
//         type: Sequelize.INTEGER,
//       },
//       reps: {
//         type: Sequelize.INTEGER,
//       },
//       lapses: {
//         type: Sequelize.INTEGER,
//       },
//       left: {
//         type: Sequelize.INTEGER,
//       },
//       odue: {
//         type: Sequelize.INTEGER,
//       },
//       odid: {
//         type: Sequelize.INTEGER,
//       },
//       flags: {
//         type: Sequelize.INTEGER,
//       },
//       data: {
//         type: Sequelize.TEXT,
//       },
//     });

//     await queryInterface.createTable("REVLOG", {
//       id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       cid: {
//         type: Sequelize.INTEGER,
//         references: {
//           model: "CARDS",
//           key: "id",
//         },
//       },
//       usn: {
//         type: Sequelize.INTEGER,
//       },
//       ease: {
//         type: Sequelize.INTEGER,
//       },
//       ivl: {
//         type: Sequelize.INTEGER,
//       },
//       lastIvl: {
//         type: Sequelize.INTEGER,
//       },
//       factor: {
//         type: Sequelize.INTEGER,
//       },
//       time: {
//         type: Sequelize.INTEGER,
//       },
//       type: {
//         type: Sequelize.INTEGER,
//       },
//     });

//     await queryInterface.createTable("COL", {
//       id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       crt: {
//         type: Sequelize.INTEGER,
//       },
//       mod: {
//         type: Sequelize.INTEGER,
//       },
//       scm: {
//         type: Sequelize.INTEGER,
//       },
//       ver: {
//         type: Sequelize.INTEGER,
//       },
//       dty: {
//         type: Sequelize.INTEGER,
//       },
//       usn: {
//         type: Sequelize.INTEGER,
//       },
//       ls: {
//         type: Sequelize.INTEGER,
//       },
//       conf: {
//         type: Sequelize.TEXT,
//       },
//       models: {
//         type: Sequelize.TEXT,
//       },
//       decks: {
//         type: Sequelize.TEXT,
//       },
//       dconf: {
//         type: Sequelize.TEXT,
//       },
//       tags: {
//         type: Sequelize.TEXT,
//       },
//     });
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.dropTable("COL");
//     await queryInterface.dropTable("REVLOG");
//     await queryInterface.dropTable("CARDS");
//     await queryInterface.dropTable("NOTES");
//     await queryInterface.dropTable("DECKS");
//     await queryInterface.dropTable("USERS");
//   },
// };
