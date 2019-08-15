<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;


class CallSteeringController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('CallSteering.index');
    }

    public function getHightChart()

    {
        $data = array(
            'fail' => 3,
            'success' => 6,
        );
        return response()->json($data);
    }

    public function getLineChart()

    {
        $data = array(
            
        );
        return data;
    }

    public function drawTableStatic() 
    {
        
        $data = array([
            "id" => 1234,
            "phone" => "0987654321",
            "path" => "data_youtube/tuvankhuyenong-00030.wav-0144432-0144792.mp3",
            "content" =>"mỗi hành dòng đời khoảng chừng hơn một tháng tháng mười ngày gì đấy",
            "status" => 1,
            "action" => null,
        ],
        [
            "id" => 1534,
            "phone" => "0987655421",
            "path" => "data_youtube/tuvankhuyenong-00030.wav-0144432-0144792.mp3",
            "status" => 1,
            "action" => null,

        ],
        [
            "id" => 1534,
            "phone" => "0987655421",
            "path" => "data_youtube/tuvankhuyenong-00030.wav-0144432-0144792.mp3",
            "status" => 1,
            "action" => null,

        ],
        [
            "id" => 1534,
            "phone" => "0987655421",
            "path" => "data_youtube/tuvankhuyenong-00030.wav-0144432-0144792.mp3",
            "status" => 1,
            "action" => null,

        ],
        [
            "id" => 1534,
            "phone" => "0987655421",
            "path" => "data_youtube/tuvankhuyenong-00030.wav-0144432-0144792.mp3",
            "status" => 1,
            "action" => null,

        ],
        );
        error_log($data[0]['id']);
        // return response()->json($data);
        $arr = array(
            'recordsTotal' => 5,
            'data' => $data,
        );
        return response()->json($arr);
    }
}
