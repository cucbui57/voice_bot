@section('title', trans('general.review'))
@section('assets_head')
    <link href="{{ asset('/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css') }}" rel="stylesheet"
          type="text/css"/>
    <link href="{{ asset('/global/plugins/select2/css/select2.min.css') }}" rel="stylesheet" type="text/css"/>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/paginationjs/2.1.4/pagination.css" rel="stylesheet" type="text/css"/>
    <link href="{{ asset('/global/plugins/select2/css/select2-bootstrap.min.css') }}" rel="stylesheet" type="text/css"/>
    <link href="{{ asset('/global/plugins/bootstrap-toastr/toastr.min.css') }}" rel="stylesheet" type="text/css"/>
    <link href="{{ asset('/global/plugins/bootstrap3-editable/css/bootstrap-editable.css') }}" rel="stylesheet"
          type="text/css"/>
    <link href="{{ asset('/global/plugins/ladda/ladda-themeless.min.css') }}" rel="stylesheet" type="text/css"/>
    <link href="{{ asset('/global/plugins/summernote/dist/summernote.css') }}" rel="stylesheet" type="text/css"/>
    <link href="{{ asset('/global/plugins/bootstrap3-editable/css/bootstrap-editable.css') }}" rel="stylesheet"
          type="text/css"/>

    <link href="{{ asset('/global/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css') }}" rel="stylesheet"
          type="text/css"/>
    {{--<link href="{{ asset('/global/plugins/highcharts@6.0.7/css/highcharts.css') }}" rel="stylesheet" type="text/css" />--}}
    <link href="{{ asset('/global/plugins/jquery-atjs/css/jquery.atwho.min.css') }}" rel="stylesheet" type="text/css"/>
    <link href="http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css" rel="Stylesheet"></link>

@endsection

@section('assets_footer')
        
    <script src="{{ asset('/global/plugins/datatables/datatables.min.js') }}" type="text/javascript"></script>
    <script src="https://cdn.datatables.net/plug-ins/1.10.19/pagination/simple_numbers_no_ellipses.js" type="text/javascript"></script>
    <script src="https://cdn.datatables.net/plug-ins/1.10.19/pagination/select.js" type="text/javascript"></script>
    <script src="{{ asset('/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.js') }}"
            type="text/javascript"></script>
    <script src="{{ asset('/global/plugins/select2/js/select2.full.min.js') }}" type="text/javascript"></script>
    <script src="{{ asset('/global/plugins/ladda/spin.min.js') }}" type="text/javascript"></script>
    <script src="{{ asset('/global/plugins/ladda/ladda.min.js') }}" type="text/javascript"></script>
    <script src="{{ asset('/global/plugins/bootstrap-toastr/toastr.min.js') }}" type="text/javascript"></script>
    <script src="{{ asset('/global/plugins/jquery-validation/js/jquery.validate.min.js') }}"
            type="text/javascript"></script>
    <script src="{{ asset('/global/plugins/jquery-validation/js/additional-methods.min.js') }}"
            type="text/javascript"></script>
    <script src="{{ asset('/global/plugins/highcharts@6.0.7/js/highcharts.js') }}"
            type="text/javascript"></script>
    <script src="{{ asset('/global/plugins/highcharts/js/modules/no-data-to-display.js')}}"
            type="text/javascript"></script>
    <script src="{{ asset('/global/plugins/summernote/dist/summernote.js') }}" type="text/javascript"></script>
    <script src="{{ asset('/apps/scripts/CallSteering.js?version=' . Config::get('setting.assets_version')) }}"
            type="text/javascript"></script>
        <!--<script src="{{ asset('/global/plugins/datatables/plugins/datatables.input.js') }}" type="text/javascript"></script>-->
        <script src="{{ asset('/global/plugins/moment.min.js') }}" type="text/javascript"></script>
        <script src="{{ asset('/global/plugins/bootbox/bootbox.min.js') }}" type="text/javascript"></script>
        <script src="{{ asset('/global/plugins/bootstrap-daterangepicker/daterangepicker_old.js') }}"
                type="text/javascript"></script>
        <script src="{{ asset('/global/plugins/simple-pagination/jquery.simplePagination.js') }}"
                type="text/javascript"></script>
        <script src="{{ asset('/global/plugins/jquery-caretjs/jquery.caret.min.js') }}" type="text/javascript"></script>
        <script src="{{ asset('/global/plugins/jquery-atjs/js/jquery.atwho.min.js') }}" type="text/javascript"></script>
        <link href="{{ asset('/global/plugins/bootstrap3-editable/css/bootstrap-editable.css') }}" rel="stylesheet"
                type="text/css"/>
        <script src="{{ asset('/global/plugins/bootstrap3-editable/js/bootstrap-editable.min.js') }}"
                type="text/javascript"></script>
                <script src="http://code.jquery.com/ui/1.10.2/jquery-ui.js" ></script>
    
@endsection
