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
