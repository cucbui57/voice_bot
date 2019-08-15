<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class AutoOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('AutoOrder.index');
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
                'success' => 34,
                'sent' => 21,
                'fail' => 52
            ],
            [
                'success' => 32,
                'edit' => 52,
                'fail' => 43
            ],
        );
        return response()->json($data);
    }
}
