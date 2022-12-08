import key from './key.js'
const API = 'https://youtube138.p.rapidapi.com/channel/videos/?id=UCsBjURrPoezykLs9EqgamOA&hl=en&gl=US'
const STORAGE_KEY = 'asynclanding'

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': key,
		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
	}
}

async function fetchJson(url) {
  try {
    const response = await fetch(url, options)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

(async () => {
  const videosGrid = document.querySelector('#videos-grid')

  let videos = JSON.parse(localStorage.getItem(STORAGE_KEY))
  debugger
  
  if(!videos) {
    videos = await fetchJson(API)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(videos))
  }

  const template = `${videos.contents.map(({video}) => {
    const { thumbnails, title } = video
    return `<div class="group relative">
    <div
      class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
      <img src="${thumbnails[3].url}" alt="Thumbnail for the video: ${title}" class="w-full">
    </div>
    <div class="mt-4 flex justify-between">
      <h3 class="text-sm text-gray-700">
        <span aria-hidden="true" class="absolute inset-0 font-extrabold"></span>
        ${title}
      </h3>
    </div>
  </div>`
  }).slice(0, 4).join('')}`

  videosGrid.innerHTML = template
})()
