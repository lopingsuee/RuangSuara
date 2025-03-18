export default class PostStoryPage {
  async render() {
    return `
      <section id="main-content" class="max-w-lg mx-auto p-4 fade-in show">
        <h1 class="text-xl font-semibold mb-4">Post a New Story</h1>
        
        <form id="postStoryForm" class="space-y-4">
          <div>
            <label for="description" class="block text-sm font-medium">Description</label>
            <textarea id="description" class="w-full p-2 border rounded" required></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium">Take a Photo</label>
            <video id="camera" class="w-full rounded" autoplay></video>
            <button type="button" id="captureBtn" class="bg-green-500 text-white px-4 py-2 rounded w-full mt-2">
              Capture Photo
            </button>
          </div>

          <div>
            <label class="block text-sm font-medium">Preview Photo</label>
            <canvas id="canvas" class="w-full border rounded"></canvas>
          </div>

          <div id="map" class="w-full h-64 bg-gray-200 rounded"></div>

          <div class="flex space-x-4">
            <div>
              <label for="lat" class="block text-sm font-medium">Latitude</label>
              <input type="text" id="lat" class="w-full p-2 border rounded" readonly>
            </div>
            <div>
              <label for="lon" class="block text-sm font-medium">Longitude</label>
              <input type="text" id="lon" class="w-full p-2 border rounded" readonly>
            </div>
          </div>

          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded w-full">
            Post Story
          </button>
        </form>
      </section>
    `;
  }

  async afterRender() {
    console.log("PostStoryPage loaded");
    window.addEventListener("hashchange", () => {
      if (window.location.hash !== "#/story") {
        stopCamera();
      }
    });

    document.body.classList.add("fade-in", "show");

    const latInput = document.getElementById("lat");
    const lonInput = document.getElementById("lon");
    const form = document.getElementById("postStoryForm");
    const camera = document.getElementById("camera");
    const canvas = document.getElementById("canvas");
    const captureBtn = document.getElementById("captureBtn");

    let photoBlob = null;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          camera.srcObject = stream;
        })
        .catch((err) => {
          console.error("Error accessing camera:", err);
          alert("Failed to access camera");
        });
    }

    captureBtn.addEventListener("click", function () {
      const context = canvas.getContext("2d");
      canvas.width = camera.videoWidth;
      canvas.height = camera.videoHeight;
      context.drawImage(camera, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        photoBlob = blob;
        console.log("Captured Photo Blob:", photoBlob);
      }, "image/jpeg");

      alert("Photo captured!");
    });

    const map = L.map("map").setView([-6.2, 106.816666], 10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map
    );

    let marker;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        map.setView([latitude, longitude], 14);
      });
    }

    map.on("click", function (e) {
      const { lat, lng } = e.latlng;
      latInput.value = lat;
      lonInput.value = lng;

      if (marker) {
        marker.setLatLng(e.latlng);
      } else {
        marker = L.marker(e.latlng).addTo(map);
      }
    });

    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      const description = document.getElementById("description").value;
      const lat = latInput.value;
      const lon = lonInput.value;

      if (!photoBlob) {
        console.error("PhotoBlob is null, cannot upload!");
        alert("Please capture a photo before submitting.");
        return;
      }

      const submitButton = form.querySelector("button[type='submit']");
      submitButton.textContent = "Posting...";
      submitButton.disabled = true;

      const formData = new FormData();
      formData.append("description", description);
      formData.append("photo", photoBlob, "story.jpg");
      if (lat && lon) {
        formData.append("lat", lat);
        formData.append("lon", lon);
      }

      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          alert("Anda harus login terlebih dahulu!");
          return;
        }

        const stopCamera = () => {
          const camera = document.getElementById("camera");
          const stream = camera?.srcObject;
          if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop()); // Matikan semua track kamera
          }
          if (camera) {
            camera.srcObject = null; // Hapus referensi stream dari elemen video
          }
        };

        const response = await fetch(
          "https://story-api.dicoding.dev/v1/stories",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        const result = await response.json();
        console.log("Upload Response:", result);

        if (!response.ok) {
          throw new Error(result.message || "Failed to upload story");
        }

        alert("Story posted successfully!");

        stopCamera();

        if (document.startViewTransition) {
          document.startViewTransition(() => {
            window.location.href = "#/";
          });
        } else {
          window.location.href = "#/";
        }
      } catch (error) {
        console.error("Error posting story:", error);
        alert(`Gagal memposting cerita: ${error.message}`);
      } finally {
        submitButton.textContent = "Post Story";
        submitButton.disabled = false;
      }
    });
  }
}
