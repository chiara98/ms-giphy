const express = require('express');
const router = express.Router();
const request = require('request');

/* GET home page. */
router.get('/', (req, res, next) => {
  const url = "http://api.giphy.com/v1/gifs/random?api_key=w8aea7bN3j2spY9lyM33QiA4Z7g7rccF";
  request.get(url, (err, response, body) => {
    if(err) { console.error(err) }

    body = JSON.parse(body);
    const imgUrl = body.data.image_url

    res.render('index', { title: 'Make School Giphy', imgUrl: imgUrl });
  });
});

router.get("/search", (req,res, next) => {
  res.render('search');
})

router.post('/search', (req, res, next) => {
  const query = req.body['giphy-query']
  const url = `http://api.giphy.com/v1/gifs/search?api_key=w8aea7bN3j2spY9lyM33QiA4Z7g7rccF&q=${query}`;

  request.get(url, (err, response, body) => {
    if(err) { console.error(err) }

    body = JSON.parse(body);
    console.log(body)

    // First, we select a random .gif from the Giphy results and get the URL
    const randomResult = body.data[Math.floor(Math.random() * body.data.length)];
    const searchResultUrl = randomResult.images.fixed_height.url;

    // Then we pass the URL to search.hbs
    res.render('search', { searchResultUrl: searchResultUrl });
  });
});

module.exports = router;
