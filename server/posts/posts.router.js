
const express = require('express');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
  const { start = 0, limit = 10 } = req.query;



  try {
    // Fetch posts with pagination
    const posts = await fetchPosts({ start: parseInt(start), limit: parseInt(limit) });

    // Fetch and attach images and user details to each post
    const postsWithDetails = await Promise.all(
      posts.map(async post => {
        const [imagesResponse, userResponse] = await Promise.all([
          axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`),
          fetchUserById(post.userId),
        ]);

        const images = imagesResponse.data.map(image => ({
          url: image.url,
        }));

        const user = userResponse;
        const userNameParts = user.name.split(' ');
        const formattedUserName = `${userNameParts[0][0]}. ${userNameParts.length > 1 ? userNameParts.slice(-1)[0][0] + '.' : ''}`;

        return {
          ...post,
          images,
          user: {
            fullName: user.name,
            formattedName: formattedUserName,
            email: user.email,
          },
        };
      })
    );

    res.json(postsWithDetails);
  } catch (error) {
    console.error('Error fetching posts or user details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
