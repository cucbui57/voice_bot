/**
 Review Module
 **/
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

    // var _handleTypeAction = function () {


    //     jQuery('#btn-save-next').on('click', function () {
    //         _saveContent(false);
    //     });
    //     jQuery('#btn-ignore').on('click', function () {
    //         if (confirm("Bạn có muốn bỏ qua câu này không?")) {
    //             _saveContent(true);
    //         }
    //     });
    //     $('#content').keydown(function (event) {
    //         if (event.keyCode == 13) {
    //             event.preventDefault();
    //         }
    //     });
    //     jQuery('#userTrans').on('change', function () {
    //         _loadReviewTable();
    //     });
    //     var id = 0
    //     var box
    //     var result=''
    //     $('#btn-warning').on('click', function () {
            
    //         id = jQuery('#typing-info').attr('data-id');
    //         // bootbox.prompt("Lý do chưa đạt", function (result) {
    //         //     if (result) {
    //         //         saveSegment(id, 3, result);
    //         //     } else if (result == '') {
    //         //         toastr.error(Lang.Message.reasonNotNull, Lang.Message.title);
    //         //     }
    //         //     else {

    //         //     }
    //         // });
    //         box = bootbox.dialog({
    //             message : $("#sending-reason").html(),
    //             title : "Lý do chưa đạt"
    //         });
    //         box.bind('shown.bs.modal', function(){
    //             var availableTags = ["Thừa từ","Sai từ","Thiếu từ", "Sai format", "Sai chính tả"];
    //             $(".sending-info").autocomplete({source:availableTags});
    //         });
    //         $('.sending-info').change(function() {
    //             result=$(this).val()
    //         });
    //     })

    //     jQuery(document).on('click', '#small', function () {
    //         document.getElementById("content").style.fontSize = "16px";
    //         jQuery('#content').trigger('change');
    //     });
    //     jQuery(document).on('click', '#medium', function () {
    //         document.getElementById("content").style.fontSize = "24px";
    //         jQuery('#content').trigger('change');
    //     });
    //     jQuery(document).on('click', '#big', function () {
    //         document.getElementById("content").style.fontSize = "32px";
    //         jQuery('#content').trigger('change');
    //     });
        
    //     jQuery(document).on('click', '#OK', function () {
    //         if (result) {
    //             saveSegment(id, 3, result);
    //             result=''
    //             box.modal('hide')
    //         } else if (result == '') {
    //             toastr.error(Lang.Message.reasonNotNull, Lang.Message.title);
    //         }
    //         else {

    //         }
    //     });

    //     jQuery('#btn-prev').on('click', function () {
    //         var ord = parseInt(jQuery('#typing-info').attr('data-current')) - 1;
    //         jQuery('#typing-info').attr('data-current', ord);
    //         _initModal(ord);
    //     });
    //     jQuery('#current-audio').on('keyup', function (event) {
    //         if (event.keyCode === 13) {
    //             var ord = jQuery(this).val();
    //             _initModal(ord)
    //         }
    //     });
    //     jQuery('#current-audio').on('change', function () {
    //         var ord = jQuery(this).val();
    //         _initModal(ord)
    //     })

    //     jQuery('#btn-next').on('click', function () {

    //         var ord = parseInt(jQuery('#typing-info').attr('data-current')) + 1;

    //         jQuery('#typing-info').attr('data-current', ord);

    //         _initModal(ord);
    //     });

    //     jQuery(document).on('click', '.table-action-listen', function () {
    //         var e = jQuery(this).closest('tr');
    //         var ord = jQuery(e).find('.tb-number').html();

    //         jQuery('#total-audio').html(listSegments.length);
    //         jQuery('#current-audio').attr('max', listSegments.length);
    //         _initModal(ord);
    //     });


    //     jQuery('#current-audio').on('keyup', function (event) {
    //         if (event.keyCode === 13) {
    //             var ord = jQuery(this).val();
    //             jQuery('#typing-info').attr('data-current', ord);
    //             _initAudio();
    //             jQuery('#modal-content-section').fadeIn();
    //         }
    //     });

    //     jQuery('#content').on('keyup', function (event) {
    //         if (event.keyCode === 13) {
    //             if ($('#content').hasClass('just-add-autocomplete')) {
    //                 $('#content').removeClass('just-add-autocomplete');
    //                 return;
    //             }
    //             _saveContent(false);
    //         } else {
    //             jQuery('#content').attr('data-status', 'normal');
    //         }
    //     });

    //     jQuery('#btn-reset').on('click', function () {
    //         jQuery('#content').val('');
    //     });

    //     $('#typing-modal').on('hidden.bs.modal', function (e) {
    //         isReloadCall = 1;
    //         isHideModal = 0;
    //         _loadReviewTable();
    //         jQuery('#audio-player').attr('src', '');
    //         var audio = document.getElementById("audio-player");
    //         audio.pause();
    //     });

    //     $('#error-modal').on('hidden.bs.modal', function (e) {

    //         jQuery('#status-filter').val('error_only').trigger('change');
    //     })

    //     jQuery(document).on('click', '.table-action-mail', function () {
    //         var userRe = jQuery(this).attr('data-id');
    //         var userReName = jQuery(this).attr('data-name');
    //         jQuery('#email-modal').modal('show');
    //         jQuery('#userRece').val(userReName);
    //         jQuery('#sending-info').attr('data-id', userRe);
    //     });
    //     jQuery(document).on('click', '#btn-send', function () {

    //         if (jQuery('#title').val().trim() === '') {
    //             toastr.error('Tiêu đề là bắt buộc', Lang.Message.title);
    //             return;
    //         }
    //         if (jQuery('#title').val().trim().length > 80) {
    //             toastr.error('Tiêu đề phải nhỏ hơn 80 ký tự', Lang.Message.title);
    //             return;
    //         }
    //         sendEmail();
    //     })
    //     $('.addData').on('click', function () {

    //         var number = this.value;
    //         if (confirm("Bạn có muốn lấy thêm " + number + " câu dữ liệu cho tháng " + current_round + " không?")) {
    //             getData(number);
    //         }

    //     })

    //     $('#keyword').on('input', _.debounce(_loadReviewTable, 500, false));


    //     $(document).on('click', '#getSegment', function () {
    //         $('#getDataModal').modal('show')
    //     })

    //     $(document).on('click', '#addData', function () {
    //         getData();
    //     })

    // };

    // var _initModal = function (ord) {

    //     if (ord == 1) {
    //         jQuery('#btn-prev').hide();

    //     } else {
    //         jQuery('#btn-prev').show();
    //     }

    //     if (ord == listSegments.length) {
    //         jQuery('#btn-next').hide();
    //         isnext = 0;
    //     } else {
    //         jQuery('#btn-next').show();
    //     }
    //     var status = 1;

    //     jQuery('#modal-status').val(listSegments[ord - 1].status).trigger('change.select2');
    //     if (jQuery('#modal-status').val() == 1) {
    //         jQuery('.status').hide()
    //     } else {
    //         jQuery('.status').show()
    //     }

    //     jQuery('#typing-info').attr('data-current', ord);
    //     jQuery('#current-audio').val(ord);
    //     jQuery('#typing-info').attr('data-id', listSegments[ord - 1].id)
    //     jQuery('#typing-modal').modal('show');
    //     $('#content').focus();
    //     isHideModal = 1;
    //     setTimeout(function () {
    //         jQuery('#audio-player').attr('src', audioBaseUrl + '/' + listSegments[ord - 1].path);
    //         jQuery('#audio-player').prop('muted', false);
    //     }, 1000);


    //     if (listSegments[ord - 1].content === null) {
    //         jQuery('#content').attr('placeholder', 'Mời bạn nhập text nghe được vào đây!');
    //         jQuery('#content').val('');
    //     } else {
    //         jQuery('#content').val(listSegments[ord - 1].content);
    //     }

    //     return true;

    // }
    // var _settingStateCheckbox = function () {

    //     jQuery('.config-text').editable({
    //         validate: _validateScription,
    //         display: function (value) {
    //             var html = $.fn.dataTable.render.text().display(value);
    //             $(this).html(html);
    //         }
    //     });
    //     jQuery('.config-text-content').editable({
    //         validate: _validateContent,
    //         url: baseUrl + '/review/editContent',
    //         display: function (value) {
    //             var html = $.fn.dataTable.render.text().display(value);
    //             $(this).html(html);
    //         },
    //         inputclass: 'editable_class',

    //     });
    //     jQuery('.sateSegment').on('change', function (event, state) {
    //         var btn = jQuery(this);
    //         var id = btn.attr('data-id');
    //         var status = btn.val();
    //         if (status == 3) {
    //             bootbox.prompt("Lý do chưa đạt", function (result) {
    //                 if (result) {
    //                     saveSegment(id, status, result);
    //                 } else if (result == '') {
    //                     toastr.error(Lang.Message.reasonNotNull, Lang.Message.title);
    //                 }
    //                 else {

    //                 }
    //                 _loadReviewTable();
    //             });
    //         } else {
    //             saveSegment(id, status);
    //             _loadReviewTable();
    //         }
    //     });
    // };

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
    var _loadDataHightChart = function () {
	    
        var dateRange = jQuery('#chosen-time-range').data('daterangepicker');
        $.ajax({
            url: baseUrl + '/CallSteering/getHightChart',
            type: 'POST',
            dataType: 'json',
            data: {
                // startDate: dateRange.startDate.valueOf(),
                // endDate: dateRange.endDate.valueOf(),

            },
            beforeSend: function () {
                App.blockUI({
                    target: jQuery('#hight_chart'),
                    boxed: true
                });
            },
            complete: function () {
                $("#activeDashboard-user").css({'padding-bottom': '10px'});
                App.unblockUI(jQuery('#hight_chart'));
            },
            success: function (data) {
                // console.log(data.fail);
                _drawChart('#hight_chart', data);
            }
        })
    }

    var _loadLineChart= function () {
        var dateRange = jQuery('#chosen-time-range').data('daterangepicker');
        $.ajax({
            url: baseUrl + '/CallSteering/getLineChart',
            type: 'POST',
            dataType: 'json',
            data: {
                // startDate: dateRange.startDate.valueOf(),
                // endDate: dateRange.endDate.valueOf(),

            },
            beforeSend: function () {
                App.blockUI({
                    target: jQuery('#hight_chart'),
                    boxed: true
                });
            },
            complete: function () {
                $("#activeDashboard-user").css({'padding-bottom': '10px'});
                App.unblockUI(jQuery('#hight_chart'));
            },
            success: function (data) {
                // console.log(data.fail);
                drawLineChart('#line_chart', data);
            }
        })
    }

    Highcharts.setOptions({lang: {noData: "Không có dữ liệu hiển thị"}});
    var _drawChart = function (element, data) {
        jQuery(element).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,

            },
            // colors: ['#4B74FF', '#9CAED0', '#F2938D', '#6BD78C', '#B0E3FF'],
            title: {
                text: 'Biểu đồ tròn',
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
                    name: 'Option 1',
                    y: data.success,
                },                    
                    {
                    name: 'Option 2',
                    y: data.fail,
                },              
                    {
                    name: 'Option 3',
                    y: data.fail,
                },                    
                    {
                    name: 'Fail',
                    y: data.fail,
                }, ],
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

    var lineChart = function() {
        drawLineChart('#line_chart');
    }
    var drawLineChart = function (element) {
        jQuery(element).highcharts({
            title: {
                text: 'Biểu đồ đường'
            },
        
            // subtitle: {
            //     text: 'Call Steering'
            // },

            // colors: ['#4B74FF', '#9CAED0', '#F2938D', '#6BD78C', '#B0E3FF'],
        
            xAxis:{
                categories: ['09/08', '10/08', '11/08', '12/08', '13/08', '14/08', '15/08', '16/08']

            },

            yAxis: {
                title: {
                    text: 'Min Call'
                }
            },
            // legend: {
            //     layout: 'vertical',
            //     align: 'right',
            //     verticalAlign: 'middle'
            // },
        
            plotOptions: {
                // series: {
                //     label: {
                //         connectorAllowed: false
                //     },
                //     pointStart: 2019
                
            },
        
            series: [{
                name: 'Option 1',
                data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
            }, {
                name: 'Option 2',
                data: [24916, 52453, 43542, 48551, 32490, 65282, 63121, 46434]
            }, {
                name: 'Option 3',
                data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
            }, {
                name: 'Fail',
                data: [32916, 72064, 85742, 62851, 43490, 53282, 63121, 32434]
            }],
        
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        });
    }

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
            _loadDataHightChart();
            // getdataChart();
            lineChart();
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