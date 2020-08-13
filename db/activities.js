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
