const express = require('express');
const router = express.Router();

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('fd3949e9fc8d439f8d810573dc948437');

router.get('/', (req, res) =>{
    newsapi.v2.topHeadlines({
        q: 'law',
        category: 'general',
        language: 'en',
        country: 'us'
      }).then(response => {
        res.send(response)
      }).catch((err) => res.json({error: "err"}));
})

module.exports = router;
