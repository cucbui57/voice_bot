<div class="page-header navbar">
    <!-- BEGIN HEADER INNER -->
    <div class="page-header-inner ">
        <!-- BEGIN LOGO -->
        <div class="page-logo">
            {{--  <a href="{{ url('/') }}">
                <img src="{{ asset('/layouts/layout/img/logo.png') }}" alt="logo" class="logo-default" width="124"/>
            </a>  --}}
            <div class="menu-toggler sidebar-toggler" style="    padding-left: 160px !important;">
                <span></span>
            </div>
        </div>
        <!-- END LOGO -->
        <!-- BEGIN RESPONSIVE MENU TOGGLER -->
        <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse"
           data-target=".navbar-collapse">
            <span></span>
        </a>
        <ul class="pull-left" style="margin-top: 10px; font-size: 16px">
            {{-- {{ Form::bsPageBar('')}} --}}
        </ul>
        <!-- END RESPONSIVE MENU TOGGLER -->
        <!-- BEGIN TOP NAVIGATION MENU -->
        <div class="top-menu">
            <ul class="nav navbar-nav pull-right">
                {{--  <li class="dropdown dropdown-extended dropdown-notification" id="header_notification_bar">
                    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" id="notifition">
                        <i class="fa fa-bell"></i>
                        <span class="badge badge-default" style="background-color: red"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li class="external">
                            <h3 id="headNotify">
                                Có <span class="bold"></span> thông báo mới </h3>
                            <a href="javascript:;" id="viewAll">Xem tất cả</a>
                        </li>
                        <li>
                            <ul class="dropdown-menu-list scroller" style="height: 250px;" data-handle-color="#637283">

                            </ul>
                        </li>
                        <li style="hidden: hidden;" id="readMore">
                            <a href="javascript:;"><u style="font-size: 13px;margin-left: 100px">Xem thêm</u></a>
                        </li>
                    </ul>
                </li>  --}}
                {{--  <li class="dropdown dropdown-user">
                    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
                       data-close-others="true">
                        <img alt="" class="img-circle" src="{{ asset('/layouts/layout/img/avatar.png') }}"/>
                        <i class="fa fa-angle-down"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-default">
                        <li>
                            <a href="{{ url('/site/profile') }}"><i class="icon-user"></i> {{trans('general.profile')}}
                            </a>
                        </li>
                        <li>
                            <a href="{{ url('/logout') }}"><i class="icon-key"></i> {{trans('general.logout')}} </a>
                        </li>
                    </ul>
                </li>  --}}
            </ul>
        </div>
        <!-- END TOP NAVIGATION MENU -->
    </div>
    <!-- END HEADER INNER -->
</div>