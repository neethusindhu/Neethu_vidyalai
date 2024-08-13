
const axios = require('axios').default;

/**
 * Fetches a user by their ID.
 * @async
 * @param {number} userId - The ID of the user to fetch.
 * @returns {Promise<Object>} - A promise that resolves to the user's data.
 *
 *
 *
 *
 *
 */

async function fetchAllUsers() {
  const { data: users } = await axios.get(
    'https://jsonplaceholder.typicode.com/users',
  );

  return users;
}
async function fetchUserById(userId) {
  try {
    const { data: user } = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
    );
    return user;
  } catch (error) {
    console.error(`Failed to fetch user with ID ${userId}`, error);
    throw new Error('Failed to fetch user');
  }
}

module.exports = { fetchAllUsers, fetchUserById };
