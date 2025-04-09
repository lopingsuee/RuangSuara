import StoryAPI from "../model/story-api.js";
import PostStoryView from "../views/story-view.js";

class PostStoryPresenter {
  constructor({ container }) {
    this.view = new PostStoryView();
    this.container = container;
    this.photoBlob = null;
    this.handlePageUnload = this.handlePageUnload.bind(this);
  }
  async init() {
    this.view.render(this.container);
    this.elements = this.view.getElements();

    this.setupCamera();
    this.setupMap();

    this.elements.captureBtn.addEventListener("click", () =>
      this.capturePhoto()
    );
    this.elements.form.addEventListener("submit", (event) =>
      this.submitStory(event)
    );

    window.addEventListener("hashchange", this.handlePageUnload);
    window.addEventListener("beforeunload", this.handlePageUnload);
  }

  setupCamera() {
    if (navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          this.cameraStream = stream;
          this.elements.camera.srcObject = stream;
        })
        .catch(() => {
          this.view.showErrorMessage("Failed to access camera");
        });
    }
  }

  stopCamera() {
    if (this.cameraStream) {
      this.cameraStream.getTracks().forEach((track) => track.stop());
      this.elements.camera.srcObject = null;
      this.cameraStream = null;
    }
  }

  handlePageUnload() {
    this.stopCamera();
    window.removeEventListener("hashchange", this.handlePageUnload);
    window.removeEventListener("beforeunload", this.handlePageUnload);
  }

  async submitStory(event) {
    event.preventDefault();

    const description = this.elements.description.value;
    const lat = this.elements.latInput.value;
    const lon = this.elements.lonInput.value;

    if (!this.photoBlob) {
      this.view.showErrorMessage("Please capture a photo before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("photo", this.photoBlob, "story.jpg");
    if (lat && lon) {
      formData.append("lat", lat);
      formData.append("lon", lon);
    }

    try {
      const response = await StoryAPI.postStory(formData);

      if (response.error) {
        throw new Error(response.message || "Failed to upload story");
      }

      alert("Story posted successfully!");
      this.stopCamera();
      window.location.href = "#/";
    } catch (error) {
      this.view.showErrorMessage(`Failed to post story: ${error.message}`);
    }
  }

  capturePhoto() {
    const context = this.elements.canvas.getContext("2d");
    this.elements.canvas.width = this.elements.camera.videoWidth;
    this.elements.canvas.height = this.elements.camera.videoHeight;
    context.drawImage(
      this.elements.camera,
      0,
      0,
      this.elements.canvas.width,
      this.elements.canvas.height
    );
    this.elements.canvas.toBlob((blob) => {
      this.photoBlob = blob;
    }, "image/jpeg");
    alert("Photo captured!");
  }

  setupMap() {
    const map = L.map(this.elements.mapContainer).setView(
      [-6.2, 106.816666],
      10
    );
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map
    );
    let marker;

    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      this.elements.latInput.value = lat;
      this.elements.lonInput.value = lng;

      if (marker) marker.setLatLng(e.latlng);
      else marker = L.marker(e.latlng).addTo(map);
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        map.setView([latitude, longitude], 14);
      });
    }
  }

  async submitStory(event) {
    event.preventDefault();

    const description = this.elements.description.value;
    const lat = this.elements.latInput.value;
    const lon = this.elements.lonInput.value;

    if (!this.photoBlob) {
      this.view.showErrorMessage("Please capture a photo before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("photo", this.photoBlob, "story.jpg");
    if (lat && lon) {
      formData.append("lat", lat);
      formData.append("lon", lon);
    }

    try {
      const response = await StoryAPI.postStory(formData);

      if (response.error) {
        throw new Error(response.message || "Failed to upload story");
      }

      alert("Story posted successfully!");
      window.location.href = "#/";
    } catch (error) {
      this.view.showErrorMessage(`Failed to post story: ${error.message}`);
    }
  }
}

export default PostStoryPresenter;
