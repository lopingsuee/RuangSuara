class PostStoryView {
  getTemplate() {
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

  render(container) {
    container.innerHTML = this.getTemplate();
  }

  getElements() {
    return {
      form: document.getElementById("postStoryForm"),
      description: document.getElementById("description"),
      camera: document.getElementById("camera"),
      canvas: document.getElementById("canvas"),
      captureBtn: document.getElementById("captureBtn"),
      latInput: document.getElementById("lat"),
      lonInput: document.getElementById("lon"),
      mapContainer: document.getElementById("map"),
    };
  }

  showErrorMessage(message) {
    alert(message);
  }
}

export default PostStoryView;
