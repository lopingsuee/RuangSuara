const API_ENDPOINT = "https://story-api.dicoding.dev/v1";

const AuthAPI = {
  async registerUser(name, email, password) {
    try {
      if (!name || !email || !password) {
        console.error("Semua field harus diisi.");
        return { error: true, message: "Semua field harus diisi." };
      }

      if (password.length < 8) {
        console.error("Password harus minimal 8 karakter.");
        return { error: true, message: "Password harus minimal 8 karakter." };
      }

      const requestBody = JSON.stringify({ name, email, password });
      console.log("Request body:", requestBody);

      const response = await fetch(`${API_ENDPOINT}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: requestBody,
      });

      const responseJson = await response.json();
      console.log("API Response:", responseJson);

      return responseJson;
    } catch (error) {
      console.error("Error registering user:", error);
      return { error: true, message: error.message };
    }
  },

  async loginUser(email, password) {
    try {
      const response = await fetch(`${API_ENDPOINT}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseJson = await response.json();

      if (!response.ok) {
        throw new Error(responseJson.message);
      }

      return responseJson;
    } catch (error) {
      console.error("Error logging in:", error);
      return { error: true, message: error.message };
    }
  },
};

export default AuthAPI;
