const db = require("./models");
const bcrypt = require("bcryptjs");

const User = db.User,
  City = db.City,
  Post = db.Post;

const citiesData = [
  {
    name: "London",
    country: "United Kingdom",
    imageUrl: ""
  },
  {
    name: "San Francisco",
    country: "United States",
    imageUrl: ""
  },
  {
    name: "Cologne",
    country: "Germany",
    imageUrl: ""
  },
  {
    name: "Auckland",
    country: "New Zealand",
    imageUrl: ""
  }
];

const usersData = [
  {
    name: "Leanne Graham",
    email: "Sincere@april.biz",
    city: "San Antonio",
    password: "password1"
  },
  {
    name: "David",
    email: "david@april.biz",
    city: "Portland",
    password: "password1"
  },
  {
    name: "Tiny",
    email: "tiny@april.biz",
    city: "Los Angeles",
    password: "password1"
  },
  {
    name: "Graham",
    email: "graham@april.biz",
    city: "Cologne",
    password: "password1"
  },
  {
    name: "Leaham",
    email: "leaham@april.biz",
    city: "Venice",
    password: "password1"
  }
];

const postsData = [
  {
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body:
      "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    title: "qui est esse",
    body:
      "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body:
      "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut"
  }
];

const seedDatabase = async () => {
  // Delete All Users
  const deletedUsers = await User.deleteMany();
  console.log(`Deleted ${deletedUsers.deletedCount} users.`);
  // Delete All Cities
  const deletedCities = await City.deleteMany();
  console.log(`Deleted ${deletedCities.deletedCount} cities.`);
  // Delete All Posts
  const deletedPosts = await Post.deleteMany();
  console.log(`Deleted ${deletedPosts.deletedCount} posts.`);

  // Hash User Passwords
  for (let user in usersData) {
    const hashedPassword = bcrypt.hashSync(usersData[user].password, 10);
    usersData[user].password = hashedPassword;
  }
  // Create New Users
  const newUsers = await User.create(usersData);
  console.log(`Created ${newUsers.length} users.`);

  // Create New Cities
  const newCities = await City.create(citiesData);
  console.log(`Created ${newCities.length} cities.`);

  // Create New Posts
  const newPosts = await Post.create(postsData);
  console.log(`Created ${newPosts.length} posts.`);

  // Associate Users/Cities/Posts
  console.log("Associating models...");

  let randomIndex = arr => Math.floor(Math.random() * arr.length);

  for (let post in newPosts) {
    console.log("Random Index = ", randomIndex(newPosts));

    newPosts[post].userId = newUsers[randomIndex(newUsers)];
    newPosts[post].cityId = newCities[randomIndex(newCities)];

    // Save Post
    await newPosts[post].save();
  }
  console.info("Models associated.");
  console.info("*Exiting*");
  process.exit();
};
seedDatabase();
