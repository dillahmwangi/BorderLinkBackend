import  express from 'express';
const router = express.Router();

import NewsAPI from 'newsapi';
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

export default router;