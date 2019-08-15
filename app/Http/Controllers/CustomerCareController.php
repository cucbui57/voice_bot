<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class CustomerCareController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('CustomerCare.index');
    } 
    

    public function getHightChart() 
    {
        $data = array(
            [
                'pickup' => 3,
                'calling' => 2,
                'fail' => 3
            ],
            [
                'smaller' => 34,
                'upto' => 44,
                'greater' => 12,
                'fail' => 5
            ],
            [
                'ok' => 34,
                'fail' => 52
            ],
        );
        return response()->json($data);
    }
}
