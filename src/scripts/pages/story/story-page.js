export default class StoryPage {
  async render() {
    return `
      <section>
        <h1>Story Page</h1>
        <p>List of stories will be displayed here.</p>
      </section>
    `;
  }

  async afterRender() {
    console.log("StoryPage loaded");
  }
}