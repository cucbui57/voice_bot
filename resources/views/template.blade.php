<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html>
    <!--<![endif]-->
    <!-- BEGIN HEAD -->

    <head>
        <meta charset="utf-8" />
        <title>Voice Trans |  @yield('title', 'Page')</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="" name="description" />
        <meta content="" name="author" />
        <!-- BEGIN GLOBAL MANDATORY STYLES -->        
        <link href="{{ asset('/global/plugins/font-awesome/css/font-awesome.min.css') }}" rel="stylesheet" type="text/css" />
        <link href="{{ asset('/global/plugins/simple-line-icons/simple-line-icons.min.css') }}" rel="stylesheet" type="text/css" />
        <link href="{{ asset('/global/plugins/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css" />
        <link href="{{ asset('/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css') }}" rel="stylesheet" type="text/css" />
        <!-- END GLOBAL MANDATORY STYLES -->
        <!-- BEGIN THEME GLOBAL STYLES -->
        <link href="{{ asset('/global/css/components.min.css') }}" rel="stylesheet" id="style_components" type="text/css" />
        <link href="{{ asset('/global/css/plugins.min.css') }}" rel="stylesheet" type="text/css" />
        <!-- END THEME GLOBAL STYLES -->
        <!-- BEGIN THEME LAYOUT STYLES -->
        <link href="{{ asset('/layouts/layout2/css/layout.min.css') }}" rel="stylesheet" type="text/css" />
        <link href="{{ asset('/layouts/layout2/css/themes/blue.min.css') }}" rel="stylesheet" type="text/css" id="style_color" />
        <link href="{{ asset('/layouts/layout2/css/custom.min.css?version=' . Config::get('setting.assets_version')) }}" rel="stylesheet" type="text/css" />
        <link href="{{ asset('/css/app.css?version=' . Config::get('setting.assets_version')) }}" rel="stylesheet" type="text/css" />
        <!-- END THEME LAYOUT STYLES -->
        <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" />
        @yield('assets_head')
    </head>
    <!-- END HEAD -->

    <body class="page-sidebar-closed-hide-logo">
        <!-- BEGIN HEADER -->
        @include('header')
        <!-- END HEADER -->
        <!-- BEGIN HEADER & CONTENT DIVIDER -->
        <div class="clearfix"> </div>
        <!-- END HEADER & CONTENT DIVIDER -->
        <!-- BEGIN CONTAINER -->
        <div class="page-container">
            <!-- BEGIN SIDEBAR -->
            @include('sidebar')
            <!-- END SIDEBAR -->
            <!-- BEGIN CONTENT -->
            <div class="page-content-wrapper">
                <!-- BEGIN CONTENT BODY -->
                <div class="page-content">
                    <!-- BEGIN PAGE HEADER-->                    
                    <!-- BEGIN PAGE BAR -->
                    @yield('page-bar')                    
                    <!-- END PAGE BAR -->                    
                    <!-- END PAGE HEADER-->
                    @yield('content')                    
                </div>
                <!-- END CONTENT BODY -->
            </div>
            <!-- END CONTENT -->
            <!-- BEGIN QUICK SIDEBAR -->
            @include('quick-sidebar')
            <!-- END QUICK SIDEBAR -->
        </div>
        <!-- END CONTAINER -->
        <!-- BEGIN FOOTER -->
        <div class="page-footer">
            <div class="page-footer-inner"> 2019 &copy; Voice Bot</div>
            <div class="scroll-to-top">
                <i class="icon-arrow-up"></i>
            </div>
        </div>
        <!-- END FOOTER -->
        <!--[if lt IE 9]>
        <script src="{{ asset('/global/plugins/respond.min.js') }}"></script>
        <script src="{{ asset('/global/plugins/excanvas.min.js') }}"></script> 
        <![endif]-->
        <!-- BEGIN CORE PLUGINS -->
        <script src="{{ asset('/apps/lang/' . Session::get('locale', 'vn') . '.js?version=' . Config::get('setting.assets_version')) }}" type="text/javascript"></script>
        <script src="{{ asset('/global/plugins/jquery.min.js') }}" type="text/javascript"></script>
        <script src="{{ asset('/global/plugins/bootstrap/js/bootstrap.min.js') }}" type="text/javascript"></script>
        <script src="{{ asset('/global/plugins/js.cookie.min.js') }}" type="text/javascript"></script>
        <script src="{{ asset('/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js') }}" type="text/javascript"></script>
        <script src="{{ asset('/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js') }}" type="text/javascript"></script>
        <script src="{{ asset('/global/plugins/jquery.blockui.min.js') }}" type="text/javascript"></script>
        <script src="{{ asset('/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js') }}" type="text/javascript"></script>
        <!-- END CORE PLUGINS -->
        <!-- BEGIN THEME GLOBAL SCRIPTS -->
        <script src="{{ asset('/global/scripts/app.min.js?version=' . Config::get('setting.assets_version')) }}" type="text/javascript"></script>
        <!-- END THEME GLOBAL SCRIPTS -->
        <!-- BEGIN THEME LAYOUT SCRIPTS -->
        <script src="{{ asset('/layouts/layout2/scripts/layout.min.js') }}" type="text/javascript"></script>
        <script src="{{ asset('/layouts/global/scripts/quick-sidebar.min.js') }}" type="text/javascript"></script>
        <script src="{{ asset('/global/scripts/app-common.js?version=' . Config::get('setting.assets_version')) }}" type="text/javascript"></script>
        <!-- END THEME LAYOUT SCRIPTS -->
        <script>
            var baseUrl = "{!! url('/') !!}";
            var audioBaseUrl = '{{ env('AUDIO_BASE_URL') }}'
        </script>
        @yield('assets_footer')
        <input type="hidden" id="site-meta"
               data-token="{!! csrf_token() !!}"               
               data-base-url="{!! url('/') !!}"/>

    </body>
</html>