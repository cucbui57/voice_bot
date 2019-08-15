@extends('template')
@include('CustomerCare.particials.common')

@section('content')

    <div class="row">
        <div class="filter">
            <div class="col-md-12">
                <div class="row">
                        <div class="search" style="display: flex; justify-content: center" >
                                <div class="form-time col-md-4" style="margin-right: 50px">
                                    </div>
                                    <div class="form-time col-md-10" style="margin-right: 50px">
                                        </div>
                            <div class="form-time col-md-1">
                                <button type="button" class="btn btn-default" id="today">Hôm nay</button>
                            </div>
                            <div class="form-group col-md-2">
                                <button type="button" class="btn btn-default" id="week">7 ngày gần nhất</button>
                            </div>
                            <div>
                                
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        <div class="static">
        
            <div class="col-md-12">
                <div class="portlet box blue-soft">
                    <div class="portlet-title">
                        <div class="title col-md-8" style="margin-top: 10px">
                            Bản đồ và thống kê cuộc gọi
                        </div>
                        <div class="tools col-md-1">
                            <a href="javascript:;" style="float: right" class="collapse"> </a>
                        </div>
                    </div>
    
                    <div class="col-md-12 portlet-body" style="border: 1px solid  #4c87b9; margin-bottom: 10px">
    
                        <div class="col-md-6 portlet-body" id="hight_chart_total_call">
    
                        </div>
                        {{--  <div class="col-md-1 portlet-body">
    
                        </div>  --}}
                        {{--  <div class="col-md-3 portlet-body"></div>  --}}
                        <div class="col-md-6 portlet-body" id="hight_chart_satisfaction">
    
                        </div>
                        {{--  <div class="col-md-3 portlet-body"></div>  --}}
                    </div>
                    
                </div>
            </div>
            <p style="font-family: Roboto;font-style: normal;font-weight: 500;line-height: 24px;font-size: 18px;color: #333333;    margin-left: 17px;">Thống kê chi tiết</p>
            <div class="col-md-12 portlet light">
                <div class="portlet-body">
                    @include('CallSteering.particials.table')
                </div>
            </div>
        </div>
    </div>

   
@endsection