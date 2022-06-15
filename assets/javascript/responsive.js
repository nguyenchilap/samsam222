function responsive() {
    const width = $(window).width();
    const height = $(window).height();

    if (width <= 739) {
        $('.container__item').parent().removeClass('col-3');
        $('.container__item').parent().removeClass('col-4');
        $('.container__item').parent().addClass('col-12');
    }

    if (width > 739 && width <= 1000) {
        $('.container__item').parent().removeClass('col-12');
        $('.container__item').parent().removeClass('col-3');
        $('.container__item').parent().addClass('col-4');
    }

    if (width > 1000) {
        $('.container__item').parent().removeClass('col-12');
        $('.container__item').parent().removeClass('col-4');
        $('.container__item').parent().addClass('col-3');
    }
}