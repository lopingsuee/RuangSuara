const API_ENDPOINT = "https://story-api.dicoding.dev/v1";

const StoryAPI = {
  async getAllStories() {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login ulang.");
      }

      const response = await fetch(`${API_ENDPOINT}/stories`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const responseJson = await response.json();

      if (!response.ok) {
        throw new Error(responseJson.message);
      }

      return responseJson.listStory;
    } catch (error) {
      console.error("Error fetching stories:", error);
      return { error: true, message: error.message };
    }
  },

  async postStory(formData) {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login ulang.");
      }

      const response = await fetch(`${API_ENDPOINT}/stories`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const responseJson = await response.json();

      if (!response.ok) {
        throw new Error(responseJson.message || "Gagal mengunggah cerita");
      }

      return responseJson; 
    } catch (error) {
      console.error("Error posting story:", error);
      return { error: true, message: error.message };
    }
  },
};

export default StoryAPI;
