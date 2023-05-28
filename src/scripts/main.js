const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("de1b595221101a2f56c123b50f1d4f3ff63fb968f1d9052f2fa7286a511a02a9");

const params = {
    engine: "home_depot",
    q: "furniture",
    hd_sort: "top_sellers"
  };
  
const callback = function(data) {
    for (let i = 0 ; i < recommPic.length ; i++) {
        recommPic[i].src = `${data["products"][i].thumbnails[0][5]}`;
    }
    for (let i = 0 ; i < bestseller.length ; i++) {
        bestseller[i].src = `${data["products"][i].thumbnails[0][5]}`;
    }
    let urls = `${data["products"][10].thumbnails[0][5]}`
    document.getElementsByClassName('hero-desc')[0].style.backgroundImage = urls;
};

search.json(params, callback);

let recommPic = document.getElementsByClassName('recomm-picture');
let bestseller = document.getElementsByClassName('header-photos')

let acc = document.getElementsByClassName("accordion");
for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
      this.style.backgroundColor = '#FCFAFA';
      this.parentElement.style.backgroundColor = '#FCFAFA';
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      panel.style.backgroundColor = '#E5F0B6';
      this.style.backgroundColor = '#E5F0B6';
      this.parentElement.style.backgroundColor = '#E5F0B6';
    } 
  });
}

