const sequelize = require("../config/connection");
const { User, BlogPost, Comment } = require("../models");
const userData = require("./userData.json");
const blogPostData = require("./blogPostData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    for (const blogPost of blogPostData) {
      await BlogPost.create({
        ...blogPost,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }

    await Comment.bulkCreate(commentData);

    console.log("Database seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();