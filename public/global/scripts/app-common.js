/**
 Common Module
 **/
var AppCommon = function () {

    var baseUrl = jQuery('#site-meta').attr('data-base-url');
    /**
     * setup ajax
     * @returns {undefined}
     */
    var setupAjax = function () {
        jQuery.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': jQuery('#site-meta').attr('data-token')
            }
        });
    };

    var changeLanguage = function () {
        jQuery(document).on('click', '.lang-option', function () {
            var imgSrc = $(this).children('img').attr('src');
            var langName = $(this).text().trim();
            var locale = $(this).attr('data-locale');
            $('.lang-img').attr('src', imgSrc);
            $('.langname').html(langName);
            jQuery.ajax({
                url: baseUrl + '/site/change_language',
                type: 'POST',
                data: {locale: locale},
                success: function (data, textStatus, jqXHR) {
                    window.location.reload();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert('Error!!!');
                }
            });
        });
    };

    var getNotifications = function () {
        jQuery.ajax({
            url: baseUrl + '/notification/check',
            dataType: 'json',
            type: 'post',
            data: {
                lengthOrder:lengthOrder
            },
            success: function (data, textStatus, jqXHR) {
                if (data.messenge) {
                    finDataNofition(data.messenge,data.countAll);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    };
    var lengthOrder=10;
    var finDataNofition = function (data,countAll) {
        var countSesion = Object.keys(data).length;
        if(countAll>0){
            $('.badge-default').text(countAll)
            $('.badge-default').show()
        }else {
            $('.badge-default').hide();
        }

        $('.scroller').empty();
        var html = '';
        for (var i = 0; i < countAll; i++) {
            var user = data[i].guest;
            var title = $.fn.dataTable.render.text().display(data[i].title)
            var lastcontent = $.fn.dataTable.render.text().display(data[i].last_content);
            html = html + '<li>' +
                '<a href="javascript:;" data-id="' + data[i].id + '" class="viewNotify">'+
                '<span class="details">' +
                '<span class="label label-sm label-icon label-success">' +
                '<i class="fa fa-bullhorn"></i>' +
                '</span>Tin nhắn mới từ ' + user + ':'+title+ '</span>'+
            '</a>' +
            '</li>'
        }
        if(countAll>countSesion){
            $('#readMore').show();
        }else {
            $('#readMore').hide();
        }
        $('.scroller').append(html);
    }
    var viewNotify = function () {
        jQuery(document).on('click', '.viewNotify', function () {
            var btn = jQuery(this);
            var id = parseInt(btn.attr('data-id'));
            window.location.assign(baseUrl+'/messenge/view/'+id);
        });
        jQuery(document).on('click', '#viewAll', function () {
            window.location.assign(baseUrl+'/messenge');
        });
        jQuery(document).on('click', '#readMore', function () {
            lengthOrder = lengthOrder+10;
            getNotifications();
        });
        $(document).on('click', '.dropdown-menu', function (e) {
            e.stopPropagation();
        });
    }
    setInterval(function () {
        getNotifications();
    }, 300000);

    // public functions
    return {
        //main function
        init: function () {
            setupAjax();
            changeLanguage();
            getNotifications();
            viewNotify();
        }

    };

};

jQuery(document).ready(function () {
    AppCommon().init();
});