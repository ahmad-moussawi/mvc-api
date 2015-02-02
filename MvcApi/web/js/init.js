(function ($) {
    $(function () {
        $('.button-collapse').sideNav();

    }); // end of document ready
})(jQuery); // end of jQuery name space

function openModal(text, title, onClose) {
    var $modal = $('#modal1');
    $modal.children('p').text(text || '');
    $modal.children('h4').text(title || '');
    $modal.openModal({dismissible:true, complete: onClose || function () {}});
    return $modal;
}

function concat() {
    var arr = [],
            len = arguments.length;

    for (var i = 0; i < len - 1; i++) {
        arr.push(arguments[i]);
    }


    var seperator = ' ';
    if (len > 2) {
        seperator = arguments[len - 1];
    } else {
        arr.push(arguments[len - 1]);
    }
    return arr.join(seperator);

}


function getMonthName(i) {
    return moment().month(i - 1).format('MMMM');
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getColor() {
    return getRandomInt(0, 255) + ',' + getRandomInt(0, 255) + ',' + getRandomInt(0, 255);
}

function getColorAlpha(c, alpha) {
    return 'rgba(' + c + ',' + alpha + ')';
}
