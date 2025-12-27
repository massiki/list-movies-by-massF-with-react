import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL
const apiKey = process.env.REACT_APP_API_KEY

const options = {
  method: 'GET',
  url: `${baseUrl}/favorite/movies`,
  params: { language: 'en-US', page: '1', sort_by: 'created_at.asc' },
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apiKey}`
  }
};

export const getMoviewList = async () => {
  const movies = await axios.request(options)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
  return movies.results;
}