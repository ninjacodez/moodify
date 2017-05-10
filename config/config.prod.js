module.exports = {
  WATSON_TONE_API_KEY: {
    username: process.env.WATSON_TONE_USERNAME,
    password: process.env.WATSON_TONE_PASSWORD
  },
  WATSON_NLU_API_KEY: {
    username: process.env.WATSON_NLU_USERNAME,
    password: process.env.WATSON_NLU_PASSWORD
  },
  MM_API_KEY: process.env.MM_API_KEY,
  DATABASE_URL: process.env.MONGODB_URI
};