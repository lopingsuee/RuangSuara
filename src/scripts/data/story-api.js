const StoryAPI = {
  async getAllStories() {
    const response = await fetch("https://story-api.dicoding.dev/v1/stories");
    const responseJson = await response.json();
    return responseJson.listStory;
  },
};

export default StoryAPI;
