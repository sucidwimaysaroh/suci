import $ from 'jquery';

const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("52a84b214268af6c71ff31a9512cefc18eb10337d394d6c9287c042f88459aaf");

function params (query) {
    return {
        engine: "home_depot",
        q: query,
        hd_sort: "best_match" 
    }
}

function callbackCategory (data) {
    $('.recomm-picture').each(function(index, value) {
        $(value).attr('src', `${data["products"][index].thumbnails[0][5]}`);
    })
}

function callbackBestSeller (data) {
    console.log(data["products"])
    function renderUrl(i) {
        return data["products"][i].thumbnails[0][5];
    }

    function renderPrice(i) {
        return `$${data["products"][i].price}`;
    }

    function renderDesc(i) {
        return data["products"][i].title.split(' ').slice(0,1).join(' ');        ;
    }

    function loadBestseller(i, j, k, l) {
        $('.first').attr('src', `${renderUrl(i)}`);
        $('.second').attr('src', `${renderUrl(j)}`);
        $('.third').attr('src', `${renderUrl(k)}`);
        $('.fourth').attr('src', `${renderUrl(l)}`);
        $('.photos-desc').find('span').text(`${renderPrice(j)}`);
        $('.photos-desc').find('p').text(`${renderDesc(j)}`);
    }

    $('.hero-desc').css('background-image', `url(${renderUrl(1)})`);
    $('.hero-desc-pricebtn').find('span').text(`${renderPrice(1)}`);
    $('.hero-desc-pricebtn').find('p').text(`${renderDesc(1)}`);

    let i = 0;
    let j = 1;
    let k = 2;
    let l = 3;
    loadBestseller(i, j, k, l);

    $('.btn-arrow-left').on('click', function () {
        if (i == 0) {
            i=10; j--; k--; l--;
        } else if (i == 10) {
            i=9; j=10; k--; l--;
        } else if (i == 9) {
            i=8; j=9; k=10; l--;
        } else if (i == 8) {
            i=7; j=8; k=9; l=10;
        } else {
            i--; j--; k--; l--;
        }
        loadBestseller(i, j, k, l);
    });
    $('.btn-arrow-right').on('click', function () {
        if (i == 7) {
            i++; j++; k++; l=0;
        } else if (i == 8) {
            i++; j++; k=0; l=1;
        } else if (i == 9) {
            i++; j=0; k=1; l=2;
        } else if (i == 10) {
            i=0; j=1; k=2; l=3;
        } else {
            i++; j++; k++; l++;
        }
        loadBestseller(i, j, k, l);
    })
}

search.json(params('Furniture Cute'), callbackBestSeller)

$('.accordion').each(function(index, value) {
    let $thisAcc = value;
    $($thisAcc).on('click', function () {
        search.json(params(`Cute ${$($thisAcc).text()} Sets`), callbackCategory)
        $('.accordion').each(function(index, value) {
            if ($thisAcc == value) {
                return;
            } else {
                $(value).next().css('max-height', '0px');
                $(value).css('background-color', '#FCFAFA');
                $(value).next().css('background-color', '#FCFAFA');
                $(value).parent().css('background-color', '#FCFAFA');
            }
        })
        if ($($thisAcc).next().css('max-height') != '0px') {
            $($thisAcc).next().css('max-height', '0px');
            $($thisAcc).css('background-color', '#FCFAFA');
            $($thisAcc).next().css('background-color', '#FCFAFA');
            $($thisAcc).parent().css('background-color', '#FCFAFA');
        } else {
            $($thisAcc).next().css('max-height', `${$($thisAcc).next()[0].scrollHeight}px`);
            $($thisAcc).css('background-color', '#E5F0B6');
            $($thisAcc).next().css('background-color', '#E5F0B6');
            $($thisAcc).parent().css('background-color', '#E5F0B6');
        }
    })
})

$('.recomm-picture').each(function (index, value) {
    let $thisPic = value;
    $($thisPic).on('click', function () {
        $('.recomm-picture').each(function (index, value) {
            $(value).removeClass('recomm-picture-selected');
        })
        $($thisPic).addClass('recomm-picture-selected');
    })
})