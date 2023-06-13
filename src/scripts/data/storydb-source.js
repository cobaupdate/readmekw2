import API_ENDPOINT from '../globals/api-endpoint';

class StoryDbSource {
  static async getAllStories() {
    const response = await fetch(API_ENDPOINT.LIST);
    const responseJson = await response.json();
    return responseJson.stories;
  }

  static async detailStory(idStory) {
    const response = await fetch(API_ENDPOINT.DETAIL(idStory));
    return response.json();
  }

  static async searchStories(query) {
    const loweredCaseQuery = query.toLowerCase();
    const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

    try {
      const response = await fetch(API_ENDPOINT.SEARCH(jammedQuery));
      const text = await response.text();
      const data = JSON.parse(text);

      return data;
    } catch (error) { return []; }
  }

  static async addCustomerReview({ id, name, review }) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id, name, review,
        }),
      };
      const responseText = await fetch(API_ENDPOINT.ADD_REVIEW, options);
      return responseText.json();
    } catch (error) {
      return { error: true, message: `${error.message}! Review not successfully added!\nPlease check your internet connection!` };
    }
  }

  static async getReview(id) {
    const response = await fetch(API_ENDPOINT.GET_REVIEW(id));
    const responseJson = await response.json();
    return responseJson;
  }
}

export default StoryDbSource;
