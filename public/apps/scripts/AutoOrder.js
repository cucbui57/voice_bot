
var AppReview = function () {
    var isPickedTime = false;
    var dateFormat = 'DD/MM/YYYY';
    var baseUrl = jQuery('#site-meta').attr('data-base-url');
    $.fn.editable.defaults.send = "always";
    $.fn.editable.defaults.params = function (params) {
        params.oldValue = jQuery(this).attr('data-value');
        return params;
    };
    $.fn.editable.defaults.ajaxOptions = {
        type: 'POST',
        dataType: 'json',
    };
    $.fn.editable.defaults.url = baseUrl + '/review/editNote';
    $.fn.editable.defaults.emptytext = '...';
    $.fn.editable.defaults.mode = 'inline';
    $.fn.editable.defaults.success = function (res, newVal) {
        if (res.code != 0) {
            return res.message;
        }
    };

    $.fn.editable.defaults.error = function (res, newVal) {
        return Lang.Message.error;
    };
    $.fn.select2.defaults.set("theme", "bootstrap");
    var table = null;
    var listSegments;
    var isnext = 1;
    // var audioBaseUrl = 'https://10.30.154.10:8088/voice_trans/public';


    var isReloadCall = 0;
    var isHideModal = 0;
    var toastrOption = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "2000",
        "hideDuration": "1000",
        "timeOut": "12000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    /**
     * init select2 for page
     * @private
     */
    var _initSelect2 = function () {
        jQuery('select.form-control').select2({
            minimumResultsForSearch: -1
        });
        $(document).on('click', "li.disabled", function (e) {
            e.preventDefault();
            return false;
        });

        $('#contentsms').summernote({
            toolbar: [
                ['style', ['bold', 'italic', 'underline', 'clear']],
                ['font', ['strikethrough', 'superscript', 'subscript']],
                ['fontsize', ['fontsize']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']]
            ],
            disableDragAndDrop: true
        });
        $('.select-get-data').select2({
            minimumResultsForSearch: -1,
            width: '250px'
        })
    };

    var _handleChangeStatus = function () {
        jQuery('#status').on('change', function () {
            _loadReviewTable();
        });

        $('#month').on('change', function () {
            _getUsertrans();
            getdataChart();
            drawTabelStatic();
            // _loadDataHightChart();
            _loadReviewTable();
        })
        jQuery('#cb-auto').on('click', function () {
            var check = jQuery(this).is(':checked');
            if (check) {
                jQuery(this).prop('checked', true);
                jQuery(this).parent().addClass('checked');
            } else {
                jQuery(this).prop('checked', false);
                jQuery(this).parent().removeClass('checked');
            }
            if (check) {
                jQuery('#audio-player').trigger('play');
            }
        });
    };

    var table1 = null;
    var drawTabelStatic = function () {
        // var startDate, endDate;
        // var dateRange = jQuery('#chosen-time-range').data('daterangepicker');
        if (table1 != null){
            table1.ajax.reload();
            return;
        }
        table1 = $('#callsteering-table').DataTable({
            "ajax": {
                "url": baseUrl + '/CallSteering/drawTableStatic',
                "type": 'POST',
                "async": "false",
                "data": function (d) {
                    // try{
                    //     dateRange = jQuery('#chosen-time-range').data('daterangepicker');
                    //     startDate = dateRange.startDate.valueOf();
                    //     endDate = dateRange.endDate.valueOf();
                    // }catch(e){
                    //     startDate = null;
                    //     endDate = null;
                    // }
                    // d.isPickedTime = isPickedTime,
                    // d.startDate =startDate;
                    // d.endDate = endDate;
                    // d.round = $('#month').val()
                }
                ,
                "dataType": 'json',
            },
            // "dom": "<'row'<'col-md-6 col-sm-12'>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
            "bDestroy": true,
            "pagingType": "full_numbers",
            "processing": true,
            "pageLength": 10,
            "language": {
                "aria": {
                    "sortAscending": Lang.DataTable.sortAscending,
                    "sortDescending": Lang.DataTable.sortDescending
                },
                "processing": '<div class="loading-message"><img src="'
                + baseUrl
                + '/layouts/layout/img/loading-spinner-grey.gif"/><span>&nbsp;&nbsp;&nbsp; '
                + Lang.DataTable.processing
                + '...</span></div>',
                "emptyTable": Lang.DataTable.emptyTable,
                "info": Lang.DataTable.info,
                "infoEmpty": Lang.DataTable.infoEmpty,
                "infoFiltered": Lang.DataTable.infoFiltered,
                "lengthMenu": Lang.DataTable.lengthMenu,
                "search": Lang.DataTable.search,
                "zeroRecords": Lang.DataTable.zeroRecords,
                "sPaginate": {
                    "previous": Lang.DataTable.previous,
                    "next": Lang.DataTable.next,
                    "last": Lang.DataTable.last,
                    "first": Lang.DataTable.first,
                }
            },
            columns: [
                {
                    'data': null,
                    'sortable': false,
                    'className': 'tb-no-sort tb-number'
                },
                {
                    'data': 'id',
                    'className': 'text-center'
                },
                {
                    'data': 'phone',
                    'className': 'cell-editable',
                },
                {
                    'data': 'path',
                    'className': 'cell-editable',
                },
                {
                    'data': 'status',
                    'className': 'text-center',
                },
                {
                    'data': 'action',
                    'className': 'text-center',
                },
            ], columnDefs: [
                {
                    targets: [0, 1, 2, 3, 4, 5],
                    sortable: false
                },
                {
                    targets: [3],
                    render: function (data, type, row) {
                        return '<audio controls="" preload="none" src="' + audioBaseUrl + '/' + row['path'] + '"></audio>';
                    }
                },
                // {
                //     targets: [6],
                //     render: function (data, type, row) {
                //         return '<a  href="javascript:void(0);" class="table-action-mail" data-name="' + row.userName + '"  data-id="' + row.userId + '" title="' + 'Phản hồi' + '"><i class="fa fa-envelope"></i></a>';
                //     }
                // }
            ],

        }),
            table1.on('order.dt search.dt draw.dt', function () {
                var info = table1.page.info();
                var start = info.start;
                table1.column(0, {search: 'applied', order: 'applied'}).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1 + start;
                });
            });
        jQuery(".dataTables_length select").select2({
            minimumResultsForSearch: -1,
            width: '70px'
        });
    }
    var _loadDataHightChart_total_time = function () {
	    
        var dateRange = jQuery('#chosen-time-range').data('daterangepicker');
        $.ajax({
            url: baseUrl + '/AutoOrder/getHightChart',
            type: 'POST',
            dataType: 'json',
            data: {
                // startDate: dateRange.startDate.valueOf(),
                // endDate: dateRange.endDate.valueOf(),

            },
            beforeSend: function () {
                App.blockUI({
                    target: jQuery('#hight_chart_total_call'),
                    target: jQuery('#hight_chart_total_time'),
                    target: jQuery('#hight_chart_order'),
                    target: jQuery('#hight_chart_confirm_order'),
                    boxed: true
                });
            },
            complete: function () {
                $("#activeDashboard-user").css({'padding-bottom': '10px'});
                App.unblockUI(jQuery('#hight_chart_total_call'));
                App.unblockUI(jQuery('#hight_chart_total_time'));
                App.unblockUI(jQuery('#hight_chart_order'));
                App.unblockUI(jQuery('#hight_chart_confirm_order'));

            },
            success: function (data) {
                // console.log(data.fail);
                _drawChart_total_call('#hight_chart_total_call', data[0]);
                console.log(data[1]);
                _drawChart_total_time('#hight_chart_total_time', data[1]);
                _drawChart_order('#hight_chart_order', data[2]);
                _drawChart_confirm_order('#hight_chart_confirm_order', data[3]);
            }
        })
    }

    Highcharts.setOptions({lang: {noData: "Không có dữ liệu hiển thị"}});
    var _drawChart_total_call = function (element, data) {
        jQuery(element).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,

            },
            // colors: ['#4B74FF', '#9CAED0', '#F2938D', '#6BD78C', '#B0E3FF'],
            title: {
                text: 'Tổng cuộc gọi',
                align: 'left',
            },
            credits: {
                enabled: false
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y} ({point.percentage:.1f})%</b>'
            },
            legend: {
                symbolHeight: 10,
                symbolWidth: 10,
                symbolRadius: 5,
                squareSymbol: false,
                align: 'right',
                verticalAlign: 'middle',
                y: 0,
                floating: false,
                itemMarginBottom: 5,
                layout: 'vertical',
                labelFormatter: function () {
                    return (this.name);
                },
                itemStyle: {
                    width: "150px"
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    showInLegend: true,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Thời gian',
                // colorByPoint: true,
                type: 'pie',
                innerSize: '60%',
                data: [{
                    name: 'Nhấc máy',
                    y: data.pickup,
                },                    
                    {
                    name: 'Đang gọi',
                    y: data.calling,
                },              
                    {
                    name: 'Thất bại',
                    y: data.fail,
                },],
                point: {
                    events: {
                        click: function (event) {
                            switch (this.x) {
                                case 0:
                                    filter_Table(6)
                                    break;

                                case 1:
                                    filter_Table(0)
                                    break;

                                case 2:
                                    filter_Table(3)
                                    break;

                                case 3:
                                    filter_Table(5)
                                    break;

                                case 4:
                                    filter_Table(4)
                                    break;
                            }
                        }
                    }
                },
            }]

        });
    };

    var _drawChart_total_time = function (element, data) {
        jQuery(element).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,

            },
            // colors: ['#4B74FF', '#9CAED0', '#F2938D', '#6BD78C', '#B0E3FF'],
            title: {
                text: 'Thời lượng',
                align: 'left',
            },
            credits: {
                enabled: false
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y} ({point.percentage:.1f})%</b>'
            },
            legend: {
                symbolHeight: 10,
                symbolWidth: 10,
                symbolRadius: 5,
                squareSymbol: false,
                align: 'right',
                verticalAlign: 'middle',
                y: 0,
                floating: false,
                itemMarginBottom: 5,
                layout: 'vertical',
                labelFormatter: function () {
                    return (this.name);
                },
                itemStyle: {
                    width: "150px"
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    showInLegend: true,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            //smaller_than_15: 34, upto_30: 44, greater_than_30: 12, fail: 5
            series: [{
                name: 'Thời gian',
                // colorByPoint: true,
                type: 'pie',
                innerSize: '60%',
                data: [{
                    name: '<15s',
                    y: data.smaller,
                },                    
                    {
                    name: '15-30s',
                    y: data.upto,
                },              
                    {
                    name: '>30s',
                    y: data.greater,
                }, {
                    name: 'fail',
                    y: data.fail,
                },],
                point: {
                    events: {
                        click: function (event) {
                            switch (this.x) {
                                case 0:
                                    filter_Table(6)
                                    break;

                                case 1:
                                    filter_Table(0)
                                    break;

                                case 2:
                                    filter_Table(3)
                                    break;

                                case 3:
                                    filter_Table(5)
                                    break;

                                case 4:
                                    filter_Table(4)
                                    break;
                            }
                        }
                    }
                },
            }]

        });
    };

    var _drawChart_order = function (element, data) {
        jQuery(element).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,

            },
            // colors: ['#4B74FF', '#9CAED0', '#F2938D', '#6BD78C', '#B0E3FF'],
            title: {
                text: 'Đơn đặt hàng',
                align: 'left',
            },
            credits: {
                enabled: false
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y} ({point.percentage:.1f})%</b>'
            },
            legend: {
                symbolHeight: 10,
                symbolWidth: 10,
                symbolRadius: 5,
                squareSymbol: false,
                align: 'right',
                verticalAlign: 'middle',
                y: 0,
                floating: false,
                itemMarginBottom: 5,
                layout: 'vertical',
                labelFormatter: function () {
                    return (this.name);
                },
                itemStyle: {
                    width: "150px"
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    showInLegend: true,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Thời gian',
                // colorByPoint: true,
                type: 'pie',
                innerSize: '60%',
                data: [{
                    name: 'Xử lý thành công',
                    y: data.success,
                },                    
                    {
                    name: 'Chuyển đến ĐTV',
                    y: data.sent,
                },
                {
                    name: 'Thất bại',
                    y: data.fail,
                },],
                point: {
                    events: {
                        click: function (event) {
                            switch (this.x) {
                                case 0:
                                    filter_Table(6)
                                    break;

                                case 1:
                                    filter_Table(0)
                                    break;

                                case 2:
                                    filter_Table(3)
                                    break;

                                case 3:
                                    filter_Table(5)
                                    break;

                                case 4:
                                    filter_Table(4)
                                    break;
                            }
                        }
                    }
                },
            }]

        });
    };

    var _drawChart_confirm_order = function (element, data) {
        jQuery(element).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,

            },
            // colors: ['#4B74FF', '#9CAED0', '#F2938D', '#6BD78C', '#B0E3FF'],
            title: {
                text: 'Xác nhận đơn hàng',
                align: 'left',
            },
            credits: {
                enabled: false
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y} ({point.percentage:.1f})%</b>'
            },
            legend: {
                symbolHeight: 10,
                symbolWidth: 10,
                symbolRadius: 5,
                squareSymbol: false,
                align: 'right',
                verticalAlign: 'middle',
                y: 0,
                floating: false,
                itemMarginBottom: 5,
                layout: 'vertical',
                labelFormatter: function () {
                    return (this.name);
                },
                itemStyle: {
                    width: "150px"
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    showInLegend: true,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Thời gian',
                // colorByPoint: true,
                type: 'pie',
                innerSize: '60%',
                data: [{
                    name: 'Thành công',
                    y: data.success,
                },                    
                    {
                    name: 'Sửa thông tin',
                    y: data.edit,
                },              
                    {
                    name: 'Thất bại',
                    y: data.fail,
                },],
                point: {
                    events: {
                        click: function (event) {
                            switch (this.x) {
                                case 0:
                                    filter_Table(6)
                                    break;

                                case 1:
                                    filter_Table(0)
                                    break;

                                case 2:
                                    filter_Table(3)
                                    break;

                                case 3:
                                    filter_Table(5)
                                    break;

                                case 4:
                                    filter_Table(4)
                                    break;
                            }
                        }
                    }
                },
            }]

        });
    };
    
    var initTime = function () {
        var startDate = '01/01/2019';
        (isPickedTime == false) ? (jQuery('#chosen-time-range').val('Tất cả')) : jQuery('#chosen-time-range').val(startDate + ' ' + 'đến' + ' ' + moment().format('DD/MM/YYYY'));
        // jQuery('#chosen-time-range').val(startDate + ' ' + 'đến' + ' ' + moment().format('DD/MM/YYYY'));
        var range = {};
        range['Hôm nay'] = [moment().subtract('days'), moment().endOf('day')];
        range['7 ngày trước'] = [moment().subtract(6, 'days'), moment().endOf('day')];
        // range['30 ngày trước'] = [moment().subtract(29, 'days'), moment().endOf('day')];
        range['Tháng này'] = [moment().startOf('month'), moment().endOf('day')];
        range['Tháng trước'] = [moment().subtract(1, 'months').startOf('month'), moment().subtract(1, 'months').endOf('month')];

        jQuery('#chosen-time-range').daterangepicker({
            showDropdowns: true,
            autoApply: true,
            ranges: range,
            opens: 'left',
            drops: 'down',
            buttonClasses: ['btn', 'btn-sm'],
            applyClass: 'btn green-seagreen',
            cancelClass: 'btn btn-default',
            dateLimit: {days: 365},
            startDate:'01/01/2019',
            endDate: moment().endOf('day'),
            maxDate: moment().endOf('day'),
            minDate: '01/01/2019',
            separator: " đến ",
            format: dateFormat,
            locale: {
                applyLabel: "Áp dụng",
                cancelLabel: "Xóa",
                fromLabel: "Từ",
                toLabel: " to ",
                customRangeLabel: 'Tùy chọn',
                daysOfWeek: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', '7'],
                monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                firstDay: 1
            }
        }, function (start, end, label) {
            isPickedTime = true;
            // drawTabelStatic();
             

        });
        //  _loadDataHightChart();
        // drawTabelStatic();
    }

    var getData = function () {

        var number = $('#select').val();
        $.ajax({
            url: baseUrl + '/review/getData',
            type: 'POST',
            dataType: 'json',
            data: {
                number: number
            },
            beforeSend: function () {

            },
            complete: function () {
            },
            success: function (data) {
                if (data.code == 0) {
                    _loadReviewTable();
                    toastr.success(data.messenge, Lang.Message.title);
                }
                if (data.code == 1) {
                    toastr.error(data.messenge, Lang.Message.title);
                }
            }
        })
    }
    // public functions
    return {
        //main function
        init: function () {
            toastr.options = toastrOption;
            toastrInfo = toastr;
            toastrInfo.timeOut = 2000;
            _initSelect2();
            _loadDataHightChart_total_time();
            // getdataChart();
            // lineChart();
            // _handleTypeAction();
            drawTabelStatic();
            // initTime();
            // _handleChangeStatus();

            if (jQuery('#tutorial-modal-review').attr('data-state') === 'just_login') {
                jQuery('#tutorial-modal-review').modal('show');
            }

            jQuery('#audio-player').on('ended', function () {
                if (jQuery('#cb-auto').is(':checked')) {
                    setTimeout(function () {
                        jQuery('#audio-player').trigger('play');
                    }, 3000);
                }
            });

        }

    };

};

jQuery(document).ready(function () {
    AppReview().init();
});