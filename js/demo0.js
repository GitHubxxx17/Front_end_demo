
let flag1 = true;
$('.candles').onclick = () => {
    if (flag1) {
        $('.warpper').style.animation = 'change-background 3s linear';
        $('.candle1').style.animation = 'expand-body 3s linear';
        $('.candle1_eyes-left').style.animation = 'blink-eyes 3s linear';
        $('.candle1_eyes-right').style.animation = 'blink-eyes 3s linear';
        $('.candle1_mouth').style.animation = 'uff 3s linear';

        $('.candle2_stick').style.animation = 'stick-animation 3s linear';
        $('.candle_smoke1').style.animation = 'move-left 3s linear';
        $('.candle_smoke2').style.animation = 'move-top 3s linear';
        $('.candle2').style.animation = 'shake-left 3s linear';
        $('.candle2_eyes-left').style.animation = 'changeto-lower 3s linear';
        $('.candle2_eyes-right').style.animation = 'changeto-greater 3s linear';
        $('.light_wave').style.animation = 'expand-light 3s linear';
        $('.candle2_fire').style.animation = 'dance-fire 3s linear';

        setTimeout(() => {
            $('.warpper').style.animation = '';
            $('.candle1').style.animation = '';
            $('.candle1_eyes-left').style.animation = '';
            $('.candle1_eyes-right').style.animation = '';
            $('.candle1_mouth').style.animation = '';

            $('.candle2_stick').style.animation = '';
            $('.candle_smoke1').style.animation = 'smoke_none 1s infinite';
            $('.candle_smoke2').style.animation = 'smoke_none 1s infinite';
            $('.candle2').style.animation = '';
            $('.candle2_eyes-left').style.animation = '';
            $('.candle2_eyes-right').style.animation = '';
            $('.light_wave').style.animation = '';
            $('.candle2_fire').style.animation = 'dance-fire2 3s infinite linear ';
            flag1 = true;
        }, 3000);
        flag1 = false;
    }
}

$('.candle_smoke1').style.animation = 'smoke_none 1s infinite';
$('.candle_smoke2').style.animation = 'smoke_none 1s infinite';
$('.candle2_fire').style.animation = 'dance-fire2 3s infinite linear ';