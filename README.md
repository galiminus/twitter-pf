# pauvre-france

A Twitter bot that take screenshot and post them them based on some keywords.

## Configuration

Create a `.env` file in the project directory with the following configuration:

```
TWITTER_ACCESS_TOKEN=XXX
TWITTER_SECRET_TOKEN=XXX
TWITTER_CONSUMER_KEY=XXX
TWITTER_CONSUMER_SECRET=XXX
REDIS_URL=XXX
SEARCH_QUERY="pauvre france"
MATCH_FILTER="pauvre france"
MIN_TEXT_LENGTH="80"
SEARCH_LANGUAGE="fr"
```

## Deployment

It works well on Heroku with the Heroku Scheduler.
