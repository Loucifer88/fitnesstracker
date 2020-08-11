const { client } = require("./client.js");

async function createUser({ username, password, name, gym }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(username, password, name, gym) 
        VALUES($1, $2, $3, $4) 
        ON CONFLICT (username) DO NOTHING 
        RETURNING *;
      `,
      [username, password, name, gym]
    );

    return user;
  } catch (error) {
    throw error;
  }
}
async function createActivities({ actname, acttype }) {
  try {
    const {
      rows: [activities],
    } = await client.query(
      `
        INSERT INTO users(actname,acttype) 
        VALUES($1, $2) 
        RETURNING *;
      `,
      [actname,acttype]
    );

    return activities;
  } catch (error) {
    throw error;
  }
}

async function createRoutineActivities({})

module.exports = { client, createUser, createActivities };
