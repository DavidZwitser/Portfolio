let images = document.getElementsByClassName('FFVAD');

let thumbnailUrls = [];

for(let i = 0; i < images.length; i++)
{
    thumbnailUrls.push( '"' + images[i].src + '"');
}

copy(thumbnailUrls.toString());