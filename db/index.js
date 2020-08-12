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
      [actname, acttype]
    );

    return activities;
  } catch (error) {
    throw error;
  }
}

async function createRoutine({ creratorId, public, name, goal }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
        INSERT INTO routine(creatorId,public,name,goal) 
        VALUES($1, $2, $3, $4) 
        RETURNING *;
      `,
      [creatorId, public, name, goal]
    );

    return routine;
  } catch (error) {
    throw error;
  }
}

async function createRoutineActivities({
  routineId,
  activitiesId,
  duration,
  count,
}) {
  try {
    const {
      rows: [routine_activities],
    } = await client.query(
      `
        INSERT INTO users(routineId, activitiesId, duration, count) 
        VALUES($1, $2, $3, $4) 
        RETURNING *;
      `,
      [routineId, activitiesId, duration, count]
    );

    return routine_activities;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  createUser,
  createActivities,
  createRoutine,
  createRoutineActivities,
};
