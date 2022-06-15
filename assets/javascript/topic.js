
//TOAST
function toast({
    title = '',
    message = '',
    type = 'info',
    duration = 1000
})
{
    const main = document.getElementById('toast');
    if (main){
        const toast = document.createElement('div');
        
        // auto remove toast
        const autoRemoveId = setTimeout(function(){
            main.removeChild(toast);
        }, duration + 1000);

        // remove toast after click
        toast.onclick = function(e) {
            if (e.target.closest('.custom-toast__close')){
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            };
        }
        
        const icons = {
            love: 'fab fa-gratipay',
            like: 'fas fa-thumbs-up',
            angry: 'fas fa-angry',
        };

        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toast.classList.add('custom-toast', `custom-toast--${type}`);
        toast.style.animation = `slideInLeft ease 0.3s, fadeOut linear 1s ${delay}s forwards`;
        
        toast.innerHTML = `
            <div class="custom-toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="custom-toast__body">
                <h3 class="custom-toast__title">${title}</h3>
                <div class="custom-toast__msg">${message}</div>
            </div>
            <div class="custom-toast__close">
                <i class="fas fa-times"></i>
            </div>
        `;
        main.appendChild(toast);
    }
}

function showLoveToast(){
    toast({
        title: 'Loved',
        message: 'Yêu Sam Sam',
        type: 'love',
        duration: 2000,
    })
}
function showLikeToast(){
    toast({
        title: 'Liked',
        message: 'Thích Sam Sam',
        type: 'like',
        duration: 2000,
    })
}

function showAngryToast(){
    toast({
        title: 'Got Angry',
        message: 'Dận Sam Sam',
        type: 'angry',
        duration: 2000,
    })
}

//TOPIC - MUSIC
{
    const audio =  document.querySelector('.topic__sound-audio');
    const img = document.querySelector('.topic__sound-img'); 
    const control = document.querySelector('.topic__sound-control');
    const playBtn = document.querySelector('i.topic__sound-icon--play');
    const pauseBtn = document.querySelector('i.topic__sound-icon--pause');


    const app = {
        isPausing: true,

        handleEvent: function(){
            const _this = this;

            img.onclick = function(){
                playBtn.style.animation = "fadeOut ease 1s, growthOver ease 1s";
                pauseBtn.style.animation = "fadeOut ease 1s, growthOver ease 1s";
                _this.isPausing = !_this.isPausing;
                _this.checkPlaying();

                control.classList.toggle('pausing', _this.isPausing);
            }
        },

        checkPlaying: function(){
            if(this.isPausing === false) {
                audio.play();
            }
            else audio.pause();
        },

        start: function(){
            audio.loop = true;
            //Handle Event
            this.handleEvent();
            this.autoAvatarSlider();
        },

        autoAvatarSlider: function() {
            let count = 1;
            $(`img.topic__avatar-img-${count}`).addClass('active');
            setInterval(function(){
                if (count == 6) count = 1;
                count++;
                $('img.topic__avatar-img').removeClass('active');
                $(`img.topic__avatar-img-${count}`).addClass('active');
            }, 1500);
        }
    }

    app.start();
}