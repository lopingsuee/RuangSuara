const createInstagramCard = (story) => `
  <section class="w-full max-w-md">
    <div class="mb-6 overflow-hidden">
      
      <div class="flex justify-between items-center p-3">
        <div class="flex items-center">
          <div class="flex items-center">
            <a href="#" class="font-semibold text-sm text-black dark:text-black">${
              story.name
            }</a>
            <span class="mx-1 text-black dark:text-gray-400 text-sm">•</span>
            <span class="text-sm text-black dark:text-gray-400">${new Date(
              story.createdAt
            ).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      
      <div class="w-full">
        <img class="w-full object-cover" src="${
          story.photoUrl
        }" alt="Story image">
      </div>

      <div class="px-3 mb-2">
        <p class="text-sm text-black dark:text-black">
          <a href="#" class="font-semibold mr-1">${story.name}</a>
          ${story.description}
        </p>
      </div>

      <div class="flex flex-col p-3 border-t border-gray-200 dark:border-gray-700">
        <span class="text-sm text-black dark:text-gray-400"> Latitude: ${
          story.lat || "N/A"
        }</span>
        <span class="text-sm text-black dark:text-gray-400"> Longitude: ${
          story.lon || "N/A"
        }</span>
      </div>
    </div>
  </section>
`;

export default createInstagramCard;
