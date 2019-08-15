<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class TeleSaleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('TeleSale.index');
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
                'zero' => 34,
                'one' => 21,
                'two' => 43,
                'more_than_two' => 12,
                'fail' => 52
            ],
            [
                'care' => 32,
                'dont_care' => 52,
                'fail' => 43
            ],
        );
        return response()->json($data);
    }
}
