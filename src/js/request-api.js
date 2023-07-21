import axios from 'axios';
import { messageError } from './error';
import { messageError } from './error';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: '40',
});
async function fetchPhoto(param, page = 1, que) {
  try {
    const resp = await axios.get(
      `?key=38360554-5c725d1bc579413d3e210200a&${param}&page=${page}&q=${que}}`
    );
    return resp.data;
  } catch (error) {
    messageError('Oops! Something went wrong!');
  }
}
export { searchParams, fetchPhoto };
