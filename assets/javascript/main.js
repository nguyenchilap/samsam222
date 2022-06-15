let FILTER_SELECTED = {
    photos: 'cap2',
    posts: 'cap2'
}

function init() {
    if (renderPhotos(FILTER_SELECTED.photos)) {
        $('.filter__item-link[filterValue="cap2"]').addClass('active');
    };
    responsive();
    handleScroll();
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
        $('#list-photo').append(`
            <div class="col-3">
                <a href="${photo.url}" target="_blank" class="container__item">
                    <div class="item__img" style="background-image: url('./assets/img/photos/${filterValue}/${filterValue}_${index}.jpg')"></div>
                    <div class="item__detail">
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
                    </div>
                </a>
            </div>  
        `);
    });
    return true;
}

function handleScroll() {
    $(window).scroll(() => {
        if($(window).scrollTop() + $(window).height() >= ($('#photos').height() - 120)/1.2) {
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

