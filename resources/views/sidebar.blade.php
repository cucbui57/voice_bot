<div class="page-sidebar-wrapper">
    <!-- BEGIN SIDEBAR -->
    <div class="page-sidebar navbar-collapse collapse">
        <ul class="page-sidebar-menu  page-header-fixed page-sidebar-menu-hover-submenu " data-keep-expanded="false" data-auto-scroll="true"
            data-slide-speed="200" style="padding-top: 20px"
            
            <li class="nav-item  {{ setActiveMenu(['/'])}}">
                {{--  <a href="{{url('/')}}" class="nav-link">
                    <i class="fa fa-envelope"></i>
                    <span class="title">Call Steering</span>
                </a>  --}}
            </li>

            <li class="nav-item  {{ setActiveMenu(['/'])}}">
                <a href="{{url('/')}}" class="nav-link">
                    <i class="fa fa-phone-square"></i>
                    <span class="title">Call Steering</span>
                </a>
            </li>

            <li class="nav-item  {{ setActiveMenu(['auto-order'])}}">
                <a href="{{url('/auto-order')}}" class="nav-link">
                    <i class="fa fa-tty"></i>
                    <span class="title">Auto Order</span>
                </a>
            </li>

            <li class="nav-item  {{ setActiveMenu(['telesale'])}}">
                <a href="{{url('/telesale')}}" class="nav-link">
                    <i class="	fa fa-phone"></i>
                    <span class="title">TeleSale</span>
                </a>
            </li>
            

            <li class="nav-item  {{ setActiveMenu(['customer-care'])}}">
                <a href="{{url('/customer-care')}}" class="nav-link">
                    <i class="fa fa-users"></i>
                    <span class="title">Customer Care</span>
                </a>
            </li>

        </ul>
        <!-- END SIDEBAR MENU -->
    </div>
    <!-- END SIDEBAR -->
</div>