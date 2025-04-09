const createInstagramCard = (story, isFollowing) => `
  <section class="w-full max-w-md">
    <div class="mb-6 overflow-hidden">
      
      <div class="flex justify-between items-center p-3">
        <div class="flex items-center">
          <a href="#" class="font-semibold text-sm text-black dark:text-black">
            ${story.name}
          </a>
          <span class="mx-1 text-black dark:text-gray-400 text-sm">•</span>
          <span class="text-sm text-black dark:text-gray-400">
            ${new Date(story.createdAt).toLocaleDateString()}
          </span>
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
        <span class="text-sm text-black dark:text-gray-400">Latitude: ${
          story.lat || "N/A"
        }</span>
        <span class="text-sm text-black dark:text-gray-400">Longitude: ${
          story.lon || "N/A"
        }</span>
      </div>

      <div class="p-3 flex justify-end">
        <button class="save-btn" data-id="${story.id}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 3.75h13.5a2.25 2.25 0 0 1 2.25 2.25v14.25l-8.25-4.5-8.25 4.5V6a2.25 2.25 0 0 1 2.25-2.25z" />
          </svg>
        </button>
      </div>
    </div>
  </section>
`;

export default createInstagramCard;
