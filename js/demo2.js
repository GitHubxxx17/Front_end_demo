window.addEventListener('load', () => {
    //放烟花小游戏 start
    //创建canvas画布
    let canvas = document.createElement('canvas');
    const fireworkArea = document.querySelector('.fireworkArea');
    
    fireworkArea.append(canvas);
    let context = canvas.getContext("2d");
    let width = $('.fireworkArea').offsetWidth;
    let height = $('.fireworkArea').offsetHeight;
    canvas.width = width;
    canvas.height = height;
    //设定画布的大小
    function resizeCanvas() {
        canvas.width = width;
        canvas.height = height;
        clearCanvas();
    }

    function clearCanvas() {
        context.fillStyle = 'transparent';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    //页面缩放改变画布的大小
    fireworkArea.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
    //获取鼠标点击的位置
    function mouseDownHander(e) {
        //获取当前鼠标的坐标
        let x = e.clientX - canvas.getBoundingClientRect().left;
        let y = e.clientY - canvas.getBoundingClientRect().top;
        createFireworks(x, y);
        fireworkAudio(); //烟花的声音
    }
    canvas.addEventListener('mousedown', mouseDownHander);
    let particles = [];
    //实现鼠标点击产生烟花的初级形态
    function createFireworks(x, y) {
        //初始半径，以及粒子的数量
        let count = 100;
        let radius = 0;
        let hue = Math.floor(Math.random() * 51) + 150;
        let hueVariance = 30;

        for (let i = 0; i < count; i++) {
            let angle = 360 / count * i;
            let radians = angle * Math.PI / 180;

            let p = {};
            p.x = x;
            p.y = y;
            p.radians = radians;

            p.size = 2;
            p.speed = (Math.random() * 5) + 0.4;
            p.radius = p.speed;

            p.hue = Math.floor(Math.random() * ((hue + hueVariance) - (hue - hueVariance))) + (hue - hueVariance);
            p.brightness = Math.floor(Math.random() * 31) + 50;
            p.alpha = (Math.floor(Math.random() * 61) + 40) / 100;
            particles.push(p);
        }
    }
    //实现鼠标点击产生烟花的初级状态
    function drawFireworks() {
        clearCanvas();
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            let moveX = Math.cos(p.radians) * p.radius;
            let moveY = Math.sin(p.radians) * p.radius + 0.4;
            p.x += moveX;
            p.y += moveY;
            p.radius *= 1 - p.speed / 100;
            p.alpha -= 0.005;

            if (p.alpha <= 0) {
                particles.splice(i, 1);
                continue;
            }
            //开始路径
            context.beginPath();
            context.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
            //结束
            context.closePath();
            //随机颜色，hsla()使用色相，饱和度，亮度，透明度来定义颜色
            context.fillStyle = 'hsla(' + p.hue + ',100%,' + p.brightness + '%,' + p.alpha + ')';
            context.fill();
        }

    }
    //渲染，更新粒子的信息
    function tick() {
        context.globalCompositeOperation = 'destination-out';
        context.fillStyle = 'rgba(0,0,0,' + 10 / 100 + ')';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.globalCompositeOperation = 'lighter';
        //更新画布
        drawFireworks();
        requestAnimationFrame(tick);
    }
    tick();

    const button = fireworkArea.querySelector('button');
    let autoplay = false; //判断是否点击自动播放按钮
    let auto; //设置定时器
    const fireworksAudio = document.querySelector('.fireworksAudio');
    //点击自动播放按钮判断是否自动放烟花
    button.addEventListener('click', () => {
        if (autoplay == false) { //若为false,自动放烟花
            button.innerHTML = '取消播放';
            auto = setInterval(function() {
                createFireworks(Math.random() * canvas.width, Math.random() * canvas.height);
            }, 1500);
            fireworksAudio.play();
            autoplay = true;
        } else { //若为true，关闭自动放烟花
            button.innerHTML = '自动播放';
            clearInterval(auto);
            auto = null;
            fireworksAudio.pause();
            autoplay = false;
        }
    });
    //自动播放烟花
    function fireworkAudio() {
        const audio = document.createElement('audio');
        audio.src = 'audio/firework.wav';
        fireworkArea.appendChild(audio);
        audio.play();
        setTimeout(function() {
            fireworkArea.removeChild(audio);
        }, 2000);
    }

    //放烟花小游戏 end
})