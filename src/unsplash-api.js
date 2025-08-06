import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/';

export const fetchImagesWithQuery = async ({ query, page }) => {
  const response = await axios.get('/search/photos', {
    params: {
      query,
      page,
      per_page: 12,
      orientation: 'landscape',
      client_id: 'CYozRxlhJzGMXS6PlNhiiWHESacoKrOzvWApWnfX60E',
    },
  });

  return response.data;
};
