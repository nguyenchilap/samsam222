let FILTER_SELECTED = {
    photos: 'daihoc',
    posts: 'cap2'
}

let MUSIC_SELECTED_INDEX = 1;



function init() {
    if (renderPhotos(FILTER_SELECTED.photos)) {
        $(`.filter__item-link[filterValue="${FILTER_SELECTED.photos}"]`).addClass('active');
    };
    responsive();
    handleScroll();
    renderTopicMusic();
    renderListMusic();
    // handleMusicItemBtn();
}

function renderPhotos(filterValue) {
    if (!LIST_PHOTO[filterValue]) {
        return false; 
    }
    if (LIST_PHOTO[filterValue].photos.length <= 0) {
        $('#list-photo').append(`
            <h2>CHƯA CÓ ẢNH ĐỂ HIỂN THỊ</h2>
        `);
        return false;;
    }
    $('#list-photo').html('');
    $('.content__title').html(LIST_PHOTO[filterValue].title)

    LIST_PHOTO[filterValue].photos.forEach(function(photo, index) {
        let itemImg = '';
        if (photo.img) {
            itemImg = `<div class="item__img" style="background-image: url('./assets/img/photos/${filterValue}/${filterValue}_${index}.jpg')"></div>`;
        } else if (photo.imgs) {
            itemImg = `
                <div class="item__imgs" albumIndex="${index}" currentIndex="${0}">
                    <button class="btn btn-item-img btn-item-img-left">
                        <i class="fa-solid fa-caret-left"></i>
                    </button>
            `
            photo.imgs.forEach((img, i) => {
                if (i == 0) itemImg += `<div class="item__img active item__img-${i}" style="background-image: url(${img})"></div>`;
                else itemImg += `<div class="item__img item__img-${i}" style="background-image: url(${img})"></div>`
            });

            itemImg += `
                    <button class="btn btn-item-img btn-item-img-right">
                        <i class="fa-solid fa-caret-right"></i>
                    </button>
                </div>
            `
        }
        $('#list-photo').append(`
            <div class="col-3">
                <div class="container__item">
                    ${itemImg}
                    <a href="${photo.url}" target="_blank" class="item__detail">
                        <div class="item__review">${photo.title}</div>
                        <div class="item__date">${photo.date}</div>
                        <div class="item__footer">
                            <div class="item__react item__react--liked">
                                <i class="item__react-like-icon far fa-heart"></i>
                                <i class="item__react-liked-icon fas fa-heart"></i>
                            </div>
                            <div class="item__location">${photo.location}</div>
                        </div>

                        <div class="item__label-favor">
                            <i class="item__label-favor-icon fas fa-crown"></i>
                            <span class="item__label-favor-text">Favorite</span>
                        </div>
                    </a>
                </div>
            </div>  
        `);
    });
    handleItemImgBtn();
    return true;
}

function renderTopicMusic() {
    $('audio.topic__sound-audio').attr('src', MUSICS[MUSIC_SELECTED_INDEX].url);
    $('.topic__sound-name').html(MUSICS[MUSIC_SELECTED_INDEX].name);
    $('.topic__sound-img').css('background-image',`url('${MUSICS[MUSIC_SELECTED_INDEX].img}')`);
}

function renderListMusic() {
    $('ul.nav__music-list').html('');
    MUSICS.forEach((music, index) => {
        $('ul.nav__music-list').append(`
            <li class="nav__music-item" onclick="onMusicItemBtn(event, ${index})">
                <div class="nav__music-item-link">
                    <img src="${music.img}" alt="page-img" class="nav__music-item-img">
                    <div class="nav__music-item-name">${music.name}</div>
                    <div class="nav__music-item-author">${music.author}</div>
                </div>
            </li>
        `);
    })
}

function onMusicItemBtn(event, index) {
    $('.nav__music-item').removeClass('active');
    event.target.classList.add('active');
    MUSIC_SELECTED_INDEX = index;
    renderTopicMusic();
}

function handleScroll() {
    $(window).scroll(() => {
        if($(window).scrollTop() + $(window).height() >= ($('#photos').height() - 120)/2) {
            $('.btn-scroll-top-content').addClass('active');
        } else {
            $('.btn-scroll-top-content').removeClass('active');
        }
    });

    $('.btn-scroll-top-content').click(() => {
        $('html, body').animate({
            scrollTop: $("#photos").offset().top
        }, 100);
    })
}

function handleItemImgBtn() {
    $('.btn-item-img-left').click((e) => {
        const parent = $(e.target).parents('.item__imgs');
        const albumIndex = parent.attr('albumIndex');
        let currentIndex = Number.parseInt(parent.attr('currentIndex'));

        if (currentIndex == 0) {
            return;
        }

        currentIndex -= 1;

        parent.attr('currentIndex', currentIndex);
        $(`.item__imgs[albumIndex="${albumIndex}"] .item__img`).removeClass('active');
        $(`.item__imgs[albumIndex="${albumIndex}"] .item__img-${currentIndex}`).addClass('active');
    })

    $('.btn-item-img-right').click((e) => {
        const parent = $(e.target).parents('.item__imgs');
        const albumIndex = parent.attr('albumIndex');
        let currentIndex = Number.parseInt(parent.attr('currentIndex'));

        if (currentIndex == LIST_PHOTO[FILTER_SELECTED.photos].photos[albumIndex].imgs.length - 1) {
            return;
        }

        currentIndex += 1;

        parent.attr('currentIndex', currentIndex);
        $(`.item__imgs[albumIndex="${albumIndex}"] .item__img`).removeClass('active');
        $(`.item__imgs[albumIndex="${albumIndex}"] .item__img-${currentIndex}`).addClass('active');
    })
}



$(document).ready(function() {

    init();

    $('.filter__item-link').click(function() {
        FILTER_SELECTED.photos = $(this).attr('filterValue');
        if (renderPhotos(FILTER_SELECTED.photos)) {
            $('.filter__item-link').removeClass('active');
            $(this).addClass('active');
        }
    });

    $(window).resize(function() {
        responsive();
    }) 
    
})

