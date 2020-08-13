async function createRoutine({ creatorId, public, name, goal }) {
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
