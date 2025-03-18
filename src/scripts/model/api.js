const API_ENDPOINT = "https://story-api.dicoding.dev/v1";

const API = {
  async registerUser(name, email, password) {
    try {
      const response = await fetch(`${API_ENDPOINT}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const responseJson = await response.json();
      if (!response.ok) {
        throw new Error(responseJson.message);
      }

      return responseJson;
    } catch (error) {
      console.error("Register error:", error);
      return { error: true, message: error.message };
    }
  },
};

export default API;
