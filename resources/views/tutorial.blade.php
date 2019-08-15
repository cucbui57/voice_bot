<div class="bootbox modal fade" id="tutorial-modal" role="dialog">
    <div class="vertical-alignment-wrapper">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    {{--<button type="button" class="close" data-dismiss="modal">&times;</button>--}}
                    <h4 class="modal-title">{{trans('general.tutorial')}}</h4>
                </div>
                <div class="modal-body">          
                    <p>Đây là nguồn dữ liệu quan trọng cho bài toán Voice2Text hỗ trợ việc CSKH tốt hơn. Kính đề nghị
                        các anh/chị nghe cẩn thận và nhập chính xác theo một số hướng dẫn cơ bản sau:</p>
                    <ol class="transcript-tutorials">
                        <li>Chỉ trans khi ta nghe rõ và chắc chắn <b>tất cả các từ</b> trong đoạn ghi âm. Nếu không nghe
                            rõ chỉ 1 từ ta cũng bỏ qua. (Điều này không những tăng chất lượng dữ liệu mà còn giúp tăng
                            tốc độ trans cũng như quá trình review được thuận tiện hơn.)
                            <ul>
                                <li>Chú ý là chỉ trans chắn chắn cả mình và cả người khác (review) đều nghe rõ, tránh
                                    trường hợp không thống nhất.
                                </li>
                                <li>Tỷ lệ bỏ qua có thể lên đến trên 50%
                                </li>
                            </ul>
                        </li>
                        <li>Những câu như sau cũng cần bỏ qua:
                            <ul>
                                <li class="liAudi">
                                    <div class="divAudi">
                                        <span style="margin-top: 7px" class="textAudi">Bị cắt ở giữa từ:</span>
                                        <audio
                                                src={{URL::asset('assets/audio_tutorial/catchu1.wav')}} preload="none"
                                                controls=""></audio>
                                    </div>
                                </li>
                                <li class="liAudi">
                                    <div class="divAudi">
                                        <span class="textAudi">Nghe không rõ chữ:</span>
                                        <audio
                                                src={{URL::asset('assets/audio_tutorial/nghekhongro2.wav')}} preload="none"
                                                controls=""></audio>
                                    </div>
                                </li>
                                <li class="liAudi">
                                    <div class="divAudi">
                                        <span class="textAudi">Bị rè:</span>
                                        <audio
                                                src={{URL::asset('assets/audio_tutorial/re1.wav')}} preload="none"
                                                controls=""></audio>
                                    </div>
                                </li>
                                <li class="liAudi">
                                    <div class="divAudi">
                                        <span class="textAudi">Bị lẫn giọng khác vào:</span>
                                        <audio
                                                src={{URL::asset('assets/audio_tutorial/langiong1.wav')}} preload="none"
                                                controls=""></audio>
                                    </div>
                                </li>
                                <li class="liAudi">
                                <div class="divAudi">
                                <span class="textAudi">Bị ồn quá nhiều: </span>
                                <audio
                                src={{URL::asset('assets/audio_tutorial/noise.wav')}} preload="none"
                                controls=""></audio>
                                </div>
                                </li>
                            </ul>
                        </li>
                        <li>Đề nghị viết rõ tiếng Việt chữ thường (không hoa) có dấu, đúng chính tả, không chứa các ký
                            tự đặc
                            biệt, phiên âm con số ra chữ ví dụ: “68” cần nhập thành “sáu tám” hoặc “sáu mươi tám” tùy
                            người dùng
                            phát âm, “K+” viết thành “k cộng”.
                        </li>
                        <li>Những từ kiểu dạng như sau sẽ viết theo từ chuẩn và viết phiên âm theo âm nói, hoặc những từ
                            nói
                            ngọng.
                            <ul>
                                <li>đi vô [dô], đi luôn [lun], trong [trỏng], không [hổng], nhiều [nhìu], làm [nàm]
                                    việc,…
                                </li>
                            </ul>
                        </li>
                        <li>Những từ thông dụng sau không cần phiên âm: tivi, wifi, modem, viettel, internet, iphone,
                            ok, web.
                            Xem danh sách đầy đủ: <a href="{{url('tech_word')}}">Link</a> hoặc <a href="{{URL::asset('assets/document/list.txt')}}" download>
                                download</a>
                        </li>
                        <li>Từ MB, Mb người dùng thường đọc là “mê” vì đây là từ quan trọng nên cần viết rõ mb [mê]
                            trong ngoặc
                            vuông là cách từ đó được phát âm có thể là "mê" hoặc "mê ga" tùy theo người nói.
                        </li>
                        <li>Những từ “hả, hở” hoặc “à, ừ, ờ” hoặc "nhá, nhớ, nhỉ" hoặc "kí, cái",... viết theo âm nói,
                            không quá
                            quan trọng (tức nghe thế nào gõ như vậy).
                        </li>
                        <li>Những từ nghe không rõ lắm do nói nhanh như “đúng không ạ”, từ “không” thường được nói nhỏ
                            và nhanh
                            nên nghe thường là “đúng kh ạ” thì ta vẫn trans theo cách viết (nghĩ) thông thường là “đúng
                            không
                            ạ”.
                        </li>
                        <li>Khi nhập liệu xong một câu anh/chị có thể gõ Enter hoặc click vào “Lưu và chuyển” để lưu dữ
                            liệu và
                            chuyển sang câu tiếp theo. Hệ thống sẽ tự động bật lại file âm thanh sau 5s (mặc định).
                        </li>
                        <li>Những cuộc gọi sau khi trans xong sẽ được xem xét (review) bởi một người khác, anh/chị có
                            thể được
                            yêu cầu làm lại những câu/cuộc gọi bị lỗi sau đó gửi lại và review tiếp.
                        </li>
                    </ol>
                    Chi tiết xem: <a href="{{URL::asset('assets/document/huongdanchitiet_Transcriber.doc')}}" download>
                        hướng dẫn</a>
                    <p>Chúc anh/chị có một ngày làm việc vui vẻ! </p>
                    <p>Nếu gặp vấn đề lỗi nghiêm trọng anh chị có thể liên hệ cho Nguyễn Quốc Bảo - TTKGM (<a
                                href="mailto:baonq2@viettel.com.vn">baonq2@viettel.com.vn</a>) - 0984907246</p>
                </div>
                {{--<div class="modal-footer">--}}
                    {{--{{ Form::submit(@trans('general.close'), array('class' => 'btn btn-default', 'data-dismiss' => 'modal')) }}--}}
                {{--</div>--}}
            </div>

        </div>
    </div>
</div>
