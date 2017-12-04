require('dotenv').config();

const Twitter = require('twitter');
const puppeteer = require('puppeteer');
var tmp = require('tmp');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_SECRET_TOKEN
});

async function screenshotTweet(link, path) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(link);
  await page.setViewport({ width: 1920, height: 1080 });

  const tweetElement = await page.$(".tweet");
  await tweetElement.screenshot({ path });

  await browser.close();
}

(async () => {
  const tweets = await client.get('search/tweets', { q: '"pauvre france"', lang: "fr", result_type: "recent", count: 100 });

  for (status of tweets.statuses) {
    console.log(status.in_reply_to_status_id, status.text);
    if (!status.in_reply_to_status_id && status.text.match(/pauvre france/i)) {
      console.log(status);
      tmp.dir(async function(err, dirPath) {
        const path = dirPath + "/screenshot.png";

        await screenshotTweet(`https://twitter.com/${status.user.screen_name}/status/${status.id_str}`, path);
        const mediaData = require('fs').readFileSync(path);

        const mediaRecord = await client.post('media/upload', { media: mediaData });
        await client.post('statuses/update', {
          media_ids: mediaRecord.media_id_string
        });
      });
      break;
    }
  }
})();
