let images = document.getElementsByClassName('FFVAD');
let urlContainers = document.getElementsByClassName('v1Nh3 kIKUG  _bz0w');

let thumbnailUrls = [];

for(let i = 0; i < images.length; i++)
{
    thumbnailUrls.push( '"' + images[i].src + '"');
}

let hrefs =  [];

for(let i = 0; i < urlContainers.length; i++)
{
    hrefs.push(urlContainers[i].childNodes[0].href);
}

let jsoned = '';

// for(let i = 0; i < thumbnailUrls.length; i++)
// {
//     let thumb = thumbnailUrls[i];
//     let href = hrefs[i];

//     jsoned += '"daily' + i + '": {\n\t"tumbnail": ' + thumb + ',\n\t"url": "' + href + '",\n},\n\n';
// }

jsoned += '{';
for (let i = 0; i < thumbnailUrls.length; i++)
{
    let thumb = thumbnailUrls[i];
    
    jsoned += '"thumbURL": ';
    jsoned += thumb;
    jsoned += ',\n';
}

jsoned += '}'

console.log(jsoned);
copy(jsoned);
