const { client, createUser } = require("./index");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    // have to make sure to drop in correct order
    await client.query(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS activities;
        DROP TABLE IF EXISTS routine;
        DROP TABLE IF EXISTS routine_activities;
      `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username varchar(255) UNIQUE NOT NULL,
          password varchar(255) NOT NULL,
          name varchar(255) NOT NULL,
          gym varchar(255) NOT NULL
        );
  
        CREATE TABLE activities (
          id SERIAL PRIMARY KEY,
          actname varchar(255) NOT NULL,
          acttype TEXT NOT NULL
        );
  
        CREATE TABLE routine (
          id SERIAL PRIMARY KEY,
          "creatorId" INTEGER REFERENCES users(id),
          public 	BOOLEAN 	DEFAULT false,
          name 	VARCHAR(255) 	UNIQUE NOT NULL,
          goal 	TEXT 	NOT NULL
        );
  
        CREATE TABLE routine_activities (
          "routineId" INTEGER REFERENCES routine(id),
          "activitiesId" INTEGER REFERENCES activities(id),
          UNIQUE ("postId", "tagId"),
          duration INTEGER,
          count INTEGER
        );
      `);

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");

    await createUser({
      username: "albert",
      password: "bertie99",
      name: "Al Bert",
      gym: "Home",
    });
    await createUser({
      username: "sandra",
      password: "2sandy4me",
      name: "Just Sandra",
      gym: "Ain't tellin'",
    });
    await createUser({
      username: "glamgal",
      password: "soglam",
      name: "Joshua",
      gym: "Planet Fitness",
    });

    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
