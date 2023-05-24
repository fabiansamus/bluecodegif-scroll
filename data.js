const { json } = require("body-parser");


const apiKey = 'jTAuqirruj85Vtd9DISWXopoSqNOHRUG';
const limit = 25;
const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}`;


// request fuction for trenfding gif to load
module.exports.trending= function(){
    return fetch(url)
    .then(response => response.json())
    .then(data => {
      const parsedInfo = [];

      for (const gif of data.data) {
        const title = gif.title;
        const url = gif.images.fixed_height.url;
        const fixed_height = gif.images.fixed_height.height;
        const fixed_width = gif.images.fixed_height.width;

        const gifInfo = {
          title: title,
          url: url,
          fixed_height: fixed_height,
          fixed_width: fixed_width
        };

        parsedInfo.push(gifInfo);
      }

      return parsedInfo;
    })
}
// module.exports.search= function(keyword){
//     return fetch(url=`&q=${keyword}`)
//     .then(response => response.json())
//     .then(data => {
//       const parsedInfo = [];

//       for (const gif of data.data) {
//         const title = gif.title;
//         const url = gif.images.fixed_height.url;
//         const fixed_height = gif.images.fixed_height.height;
//         const fixed_width = gif.images.fixed_height.width;

//         const gifInfo = {
//           title: title,
//           url: url,
//           fixed_height: fixed_height,
//           fixed_width: fixed_width
//         };

//         parsedInfo.push(gifInfo);
//       }

//       return parsedInfo;
//     })
//   }
  
