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
getUser({ username, password });
//this should be able to verify the password against the hashed password
