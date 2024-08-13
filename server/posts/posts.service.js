
const axios = require('axios').default;

/**
 * Fetches posts from a remote API.
 * @async
 * @param {Object} [params] - The parameters for fetching posts.
 * @param {number} [params.start=0] - The start index of posts to fetch.
 * @param {number} [params.limit=10] - The maximum number of posts to fetch.
 * @returns {Promise<Array>} - A promise that resolves to an array of posts.
 */
async function fetchPosts({ start = 0, limit = 10 }) {
  const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts', {
    params: {
      _start: start,
      _limit: limit,
    },
  });

  return posts;
}

module.exports = { fetchPosts };
