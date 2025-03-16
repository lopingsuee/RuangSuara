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
        <div class="flex items-center">
          <button class="text-instagram-blue font-semibold text-sm mr-2 focus:outline-none">Follow</button>
          <button class="text-black dark:text-black focus:outline-none">
            <i class="fas fa-ellipsis"></i>
          </button>
        </div>
      </div>
      
      <div class="w-full">
        <img class="w-full object-cover" src="${
          story.photoUrl
        }" alt="Story image">
      </div>
      
      <div class="flex justify-between p-3">
        <div class="flex space-x-4">
          <button class="text-black dark:text-black focus:outline-none">
            <i class="far fa-heart text-2xl"></i>
          </button>
          <button class="text-black dark:text-black focus:outline-none">
            <i class="far fa-comment text-2xl"></i>
          </button>
          <button class="text-black dark:text-black focus:outline-none">
            <i class="far fa-paper-plane text-2xl"></i>
          </button>
        </div>
        <button class="text-black dark:text-black focus:outline-none">
          <i class="far fa-bookmark text-2xl"></i>
        </button>
      </div>
      
      <div class="px-3 mb-2">
        <p class="text-sm text-black dark:text-black">
          <a href="#" class="font-semibold mr-1">${story.name}</a>
          ${story.description}
        </p>
      </div>
      
      <a href="#" class="block px-3 mb-2 text-sm text-black dark:text-gray-400">View comments</a>
      
      <div class="flex p-3 border-t border-gray-200 dark:border-gray-700">
        <input type="text" class="w-full bg-transparent text-sm text-black dark:text-black outline-none" placeholder="Add a comment...">
      </div>
    </div>
  </section>
`;

export default createInstagramCard;
