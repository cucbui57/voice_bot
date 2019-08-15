<?php

use Illuminate\Support\Facades\Mail;
use App\RequestsStatistic;
use Illuminate\Support\Facades\Log;
use App\Models\UsersLogs;
use App\Models\PublisherLog;
use App\Models\AdvertiserLog;

/**
 * set active menu
 * @param type $route
 * @return type
 */
function setActiveMenu($route) {
    if (is_array($route)) {
        foreach ($route as $r) {
            if (Request::is($r)) {
                return 'active open';
            }
        }

        return '';
    }
    return Request::path() == $route ? 'active open' : '';
}

/**
 * set open parent menu
 * @param type $route
 */
function setOpenMenu($route) {
    if (is_array($route)) {
        foreach ($route as $r) {
            if (Request::is($r)) {
                return 'open';
            }
        }

        return '';
    }
    return Request::path() == $route ? 'open' : '';
}

/**
 * send email
 * @param $template
 * @param $data
 * @param $mailInfo
 */
function sendEmail($template, $data = array(), $from, $to, $title) {

    $mailInfo = array(
        'from' => $from,
        'to' => $to,
        'title' => $title
    );

    Mail::send($template, $data, function ($message) use ($mailInfo) {

        $message->from($mailInfo['from'], $mailInfo['title'])->subject($mailInfo['title']);

        $message->to($mailInfo['to']);
    });
}

/**
 * update statistic
 * @param $time
 * @param $type
 */
function updateStatistic($time, $type) {
    $format_time = 'Y-m-d H';
    $compare_time = '%Y-%m-%d %H';
    $addition = ':00:00';
    switch ($type) {
        case 'dl':
            $format_time = 'Y-m-d';
            $compare_time = '%Y-%m-%d';
            $addition = ' 00:00:00';
            break;
        case 'ml':
            $format_time = 'Y-m';
            $compare_time = '%Y-%m';
            $addition = '-01 00:00:00';
            break;
        default:
            break;
    }
    $time_str = date($format_time, $time);

    $query = DB::table('services_requests')
        ->select(DB::raw('count(request_time) as total_requests'), 'service_id')
        ->join('services_usages', 'services_usages.id', '=', 'usage_id')
        ->where(DB::raw("time_format(request_time, '$compare_time')"), '=', $time_str)
        ->groupBy('service_id')
        ->get();

    foreach ($query as $item) {
        $requests_statistic = RequestsStatistic::where(DB::raw("time_format(time, '$compare_time')"), '=', $time_str)
            ->where('type', '=', $type)
            ->where('service_id', '=', $item->service_id)
            ->first();
        if (count($requests_statistic) == 0) {
            $requests_statistic = new RequestsStatistic();
            $requests_statistic->type = $type;
            $requests_statistic->total_requests = $item->total_requests;
            $requests_statistic->service_id = $item->service_id;
            $requests_statistic->time = $time_str . $addition;
        } else {
            $requests_statistic->total_requests = $item->total_requests;
        }
        $requests_statistic->save();
    }
}

function assignAudio($user, $configs) {
    $current_round = (int) $configs['current_round'];
    $total_audio = (int) $configs['total_audio_per_user'];
    $total_audience = (int) $configs['max_users_per_audio'];
    $audio_table = "re_audio_r$current_round";
    $texts_table = "re_texts_r$current_round";

    if ($user->chief_id == 1283) {//just for Jimmy Tan
        $audio_table = "audio_r$current_round"."_room_$user->chief_id";
        $texts_table = "texts_r$current_round";
        $total_audience = 1;
    }

    try {
        while (TRUE) {
            $query = DB::table('configs')->where('key', '=', 'assign_audio_lock')->first();
            if ($query->value == 0) {
                break;
            }
            usleep(3 * 100000);
        }
        DB::table('configs')->where('key', '=', 'assign_audio_lock')->update(['value' => 1]);

        $assigned_audio_id_arr = DB::table($texts_table)
            ->where('audience_id', '=', $user->id)
            ->pluck('id')
            ->toArray();

        for ($i = $total_audience - 1; $i >= 0; $i--) {
            $query = DB::table($audio_table)
                ->select('id', 'content')
                ->where('total_audiences', '=', $i)
                ->where('chief_id', '=', $user->chief_id)
                ->whereNotIn('id', $assigned_audio_id_arr)
                ->orderBy(DB::raw("RAND()"))
                ->limit($total_audio)
                ->get();
            $total_audio = $total_audio - count($query);
            $data = array();
            $audio_id_arr = array();
            foreach ($query as $item) {
                $data[] = array(
                    'audience_id' => $user->id,
                    'audio_id' => $item->id,
                    'content' => $item->content,
                    'ord' => $i + 1
                );
                $audio_id_arr[] = $item->id;
            }
            DB::table($audio_table)->whereIn('id', $audio_id_arr)->increment('total_audiences');
            DB::table($texts_table)->insert($data);
        }
        $old_total = $user->total;
        $user->total = DB::table($texts_table)->where('audience_id', '=', $user->id)->count();
        $user->save();
        if ($old_total < $user->total) {
            $assigned = DB::table($audio_table)->where('total_audiences', '>', '0')->where('chief_id', '=', $user->chief_id)->count();
            DB::table("users")->where('id', '=', $user->chief_id)->update(['assigned' => $assigned]);
        }
    } catch (Exception $exc) {
        echo $exc->getTraceAsString();
    }
    DB::table('configs')->where('key', '=', 'assign_audio_lock')->update(['value' => 0]);
}

function nomalizeContent($content) {
    if ($content != null) {
        $content = preg_replace('/\[[^\[\]]*\]/', ' ', $content);
        $content = preg_replace('/[~!@#$%^&*()_+{}\[\]:;\'"\\,.?\/]/', ' ', $content);
        $content = preg_replace('/\s+/', ' ', $content);
        $content = trim($content);
        $content = mb_convert_case($content, MB_CASE_LOWER, 'UTF-8');
    }
    return $content;
}

function getAudioDuration($path) {
    if (preg_match('/[^?#]+\.(?:wma|mp3|wav|mp4)/', strtolower($path))) {
        $result = shell_exec("ffmpeg -i " . $path . ' 2>&1 | grep -o \'Duration: [0-9:.]*\'');
        if (strcmp($result, '') == 0) {
            return -1;
        }
        $duration = str_replace('Duration: ', '', $result);
        //get the duration in seconds
        $timeArr = preg_split('/:|\./', str_replace('s', '', $duration));
        return ($timeArr[0] * 60 * 60 + $timeArr[1] * 60 + $timeArr[2]);
    }
    return -1;
}

function getTranscriptTable($audioId, &$callCode, &$transcriptedTable) {
    $current_round = (int) DB::table('configs')->select('value')->where('key', '=', 'current_round')->first()->value;
    $audio_table = "audio_r$current_round";
    $callCode = DB::table($audio_table)
        ->where('id', '=', $audioId)
        ->value('call_code');
    if($callCode === null) {
        return;
    }
    $matchs = [];
    preg_match('/(\d{8}).+-(\d+)/', $callCode, $matchs);
    $date = \DateTime::createFromFormat('Ymd', $matchs[1])->format('Y_m_d');
    $phoneCenter = $matchs[2];
    $transcriptedTable = "transcripted_call_$phoneCenter". "_$date";
}

function updateCallSubject($audioId, $subjectId) {
    $transcriptedTable = null;
    $callCode = null;
    getTranscriptTable($audioId, $callCode, $transcriptedTable);
    if($transcriptedTable === null) {
        return null;
    }
    DB::table("voice2text.$transcriptedTable")
        ->where('code', '=', $callCode)
        ->update([
            'vt_subject_id' => $subjectId,
        ]);
}

if (!function_exists('ctMbTrim')) {
    function ctMbTrim($str) {
        return preg_replace("/(^\s+)|(\s+$)/u", "", $str);
    }
}

if(!function_exists('createPartition')) {
    function createPartition($table, $round) {
        $partitionName = "pr$round";
        $partitionCnt = DB::table(DB::raw('information_schema.PARTITIONS'))
            ->where('TABLE_NAME', '=', $table)
            ->where('TABLE_SCHEMA', '=', 'voice_test')
            ->where('PARTITION_NAME', '=', $partitionName)
            ->count();

        if($partitionCnt > 0) {
            return;
        }
        //create new partition
        $createPartitionStm =  "ALTER TABLE $table
                                ADD PARTITION (
                                    PARTITION $partitionName VALUES IN ($round)
                                );";
        if(DB::statement($createPartitionStm)) {
            return true;
        } else {
            return false;
        }
    }
}

if (!function_exists('compareText')) {
    /**
     * @param $text1
     * @param $text2
     * @return int
     *
     * compare 2 text like kaldi
     */
    function compareText($text1, $text2) {
        $text1 = mb_convert_case($text1, MB_CASE_LOWER, 'UTF-8');
        $text2 = mb_convert_case($text2, MB_CASE_LOWER, 'UTF-8');
        $text1 = trim($text1);
        $text2 = trim($text2);
        $words1 = $text1 === "" ? [] : preg_split('/\s+/', $text1);
        $words2 = $text2 === "" ? [] : preg_split('/\s+/', $text2);
        $res = "";
        $text1Len = count($words1);
        $text2Len = count($words2);
        if($text1Len == 0) {
            for ($i = 0; $i < $text2Len; $i++) {$res = "I $res";}
        } else if($text1Len == 0) {
            for ($i = 0; $i < $text1Len; $i++) {$res = "D $res";}
        } else {
            $dp = [];
            for ($i = 0; $i <= $text1Len; $i++) {
                $dp[$i] = [];
                for($j = 0; $j <= $text2Len; $j++) {
                    $dp[$i][$j] = $text1Len + $text2Len;
                }
            }
            for ($i = 0; $i <= $text1Len; $i++) {$dp[$i][0] = $i;}
            for ($i = 0; $i <= $text2Len; $i++) {$dp[0][$i] = $i;}
            for ($i = 0; $i < $text1Len; $i++) {
                for($j = 0; $j < $text2Len; $j++) {
                    $cost = 0;
                    if($words1[$i] !== $words2[$j]) {
                        $cost = 1;
                    }
                    $dp[$i + 1][$j + 1] = min($dp[$i][$j] + $cost, min($dp[$i + 1][$j] + 1, $dp[$i][$j + 1] + 1));
//                    echo $dp[$i + 1][$j + 1] . " ";
                }
//                echo "\n";
            }
            while($text1Len > 0 || $text2Len > 0) {
//                echo "$text1Len $text2Len\n";
//            echo "pr " . ($dp[$text1Len][$text2Len] === $dp[$text1Len - 1][$text2Len - 1] + ($words1[$text1Len - 1] === $words2[$text2Len - 1] ? 0 : 1)) . "\n";
//            echo $dp[$text1Len][$text2Len] . " - " . $dp[$text1Len - 1][$text2Len] . "\n";

                if($text1Len * $text2Len > 0) {
                    $cost = ($words1[$text1Len - 1] === $words2[$text2Len - 1] ? 0 : 1);
                    if($dp[$text1Len][$text2Len] === $dp[$text1Len - 1][$text2Len - 1] + $cost) {
                        $res = ($cost === 0 ? 'C' : 'S') . " $res";
                        $text1Len--;
                        $text2Len--;
                        continue;
                    }
                }
                if($text1Len > 0 && $dp[$text1Len][$text2Len] === $dp[$text1Len - 1][$text2Len] + 1)  {
                    $res = "D $res";
                    $text1Len--;
                    continue;
                }
                if($text2Len > 0 && $dp[$text1Len][$text2Len] === $dp[$text1Len][$text2Len - 1] + 1)  {
                    $res = "I $res";
                    $text2Len--;
                    continue;
                }
                break;
            }
        }

        return trim($res);
    }
}

if (!function_exists('calWordErrorRate')) {
    /**
     * @param $transcripted
     * @param $decoded
     * @return int
     *
     * calculate word error betweet two text
     */
    function calWordErrorRate($transcripted, $decoded) {
        $transcripted = preg_replace('/\[[^\[\]]+\]/', ' ', $transcripted);
        $transcripted = preg_replace('/<[^<>]+>/', ' ', $transcripted);
        $compares = compareText($transcripted, $decoded);
        $totalNotC = preg_match_all('/[DIS]/', $compares);
        $totalW = preg_match_all('/[CDIS]/', $compares);
        if($totalW === 0) {
            return 0;
        }
        return number_format((float)$totalNotC / $totalW, 4);
    }
}

if (!function_exists('spellErrHightlight')) {

    function spellErrHightlight($content) {
        $contentParam = urlencode($content);
        $requestUrl = "http://localhost:8081/v2/check?language=vi&text=$contentParam";

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,$requestUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = json_decode(curl_exec($ch), true);
        $res = "";
        $lastChar = 0;
        if(!is_array($response)) {
            return null;
        }
        $hasError = false;
        foreach ($response['matches'] as $item) {
            $hasError = true;
            $start = $item['offset'];
            $length = $item['length'];
            $end = $start + $item['length'];
            $res = $res . mb_substr($content, $lastChar, $start - $lastChar);
            $lastChar = $end;
            $res = $res . '<span class="spell-error-hightlight">' . mb_substr($content, $start, $length) . '</span>';
        }
        if(!$hasError) {
            return null;
        }
        $res = $res . mb_substr($content, $lastChar, mb_strlen($content) - $lastChar);
        return $res;
    }
}

if (!function_exists('formatParam')) {

    function formatParam($content) {
        $content = trim(preg_replace('/\n+/', '', $content));
        $content = trim(preg_replace('/\r+/', '', $content));
        $content = trim(preg_replace('/\s+/', ' ', $content));
        $content = mb_convert_case($content, MB_CASE_LOWER, 'UTF-8');
        return $content;
    }
}

function sendRequest($url, $params = array(), $method = 'POST', $isJSON = true)
{
    $request = \Ixudra\Curl\Facades\Curl::to($url)
        ->withData($params)
        ->withOption('TIMEOUT', 3000)
        ->withOption('CONNECTTIMEOUT', 0)
        ->withOption('SSL_VERIFYPEER', 0)
        ->withOption('FOLLOWLOCATION', true)
        ->returnResponseObject();

    if ($isJSON) {
        $request->asJsonRequest();
    }

    $response = '';

    switch ($method) {
        case 'GET':
            $response = $request->get();
            break;
        case 'POST':
            $response = $request->post();
            break;
        case 'PUT':
            $response = $request->put();
            break;
        case 'PATCH':
            $response = $request->patch();
            break;
        case 'DELETE':
            $response = $request->delete();
            break;
        default:
            break;
    }

    app('debugbar')->info(array(
        'action' => $method,
        'url' => $url,
        'data' => $params,
        'result' => $response,
    ));
    return $response->content;
}

?>
