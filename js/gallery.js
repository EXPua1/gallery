const images = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const gallery = document.querySelector(".gallery");
const addVideo = document.querySelector(".btns .add-video");
const addGallery = document.querySelector(".btns .add-gal");
const delGal = document.querySelector(".btns .del-gal");
const input = document.querySelector(".input-video input");

const clean = () => ((gallery.innerHTML = ""), (isCreatedGallery = false));
delGal.addEventListener("click", () => clean());
addGallery.addEventListener("click", () => createCoolGallert());
let isCreatedGallery = false;
const createCoolGallert = () => {
  if (isCreatedGallery) {
    return;
  }
  const gallaryItems = images
    .map(
      ({ preview, original, description }) => `<li class="gallery-item">
  <a class="gallery-link"  href="${original}">
    <img
      class="gallery-image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
    )
    .join("");
  isCreatedGallery = true;

  gallery.addEventListener("click", (event) => {
    event.preventDefault();
    // Проверка, именно изображение клик
    if (event.target.tagName === "IMG") {
      // Получаем ориг ссылку изображения
      const originalSrc = event.target.getAttribute("data-source");
      //  создаем мод окно лайтбокс
      const instance = basicLightbox.create(
        `<img src="${originalSrc}" width="800" height="600">`
      );
      instance.show();
    }
  });

  gallery.insertAdjacentHTML("beforeend", gallaryItems);
  console.log(isCreatedGallery);
};

const extractYouTubeID = (url) => {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regex);
  return match ? match[1] : null;
};

addVideo.addEventListener("click", () => {
  const videoUrl = input.value;
  const videoId = extractYouTubeID(videoUrl);
  if (isCreatedGallery) {
    alert(`Удали галерею`);
    return;
  }
  if (videoId) {
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    console.log(`Embed URL: ${embedUrl}`); // Для проверки правильности URL
    const instance = basicLightbox.create(`
      <iframe src="${embedUrl}" width="560" height="315" frameborder="0" allowfullscreen></iframe>
    `);
    instance.show();
    input.value = "";
  } else {
    alert("Please enter a valid YouTube URL");
  }
});
