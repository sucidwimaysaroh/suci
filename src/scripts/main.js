import $ from 'jquery';

const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("de1b595221101a2f56c123b50f1d4f3ff63fb968f1d9052f2fa7286a511a02a9");

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
    $('.hero-desc').css('background-image', `url(${data["products"][1].thumbnails[0][5]})`);
    $('.hero-desc-pricebtn').find('span').text(`$${Math.round(data["products"][1].price_was)}`);
    $('.hero-desc-pricebtn').find('p').text(data["products"][1].brand);
    $('.header-photos').each(function(index, value) {
        $(value).attr('src', `${data["products"][index].thumbnails[0][5]}`);
    })
}

search.json(params('Best Home Furniture'), callbackBestSeller)

$('.accordion').each(function(index, value) {
    let $thisAcc = value;
    $($thisAcc).on('click', function () {
        console.log($($thisAcc).text())
        search.json(params(`Best ${$($thisAcc).text()} set`), callbackCategory)
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
            console.log(value)
        })
        $($thisPic).addClass('recomm-picture-selected');
        console.log($thisPic)
    })
    console.log('ss')
})