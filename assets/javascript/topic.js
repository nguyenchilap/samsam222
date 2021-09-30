//DEFINE
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

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
        },duration + 1000);

        // remove toast after click
        toast.onclick = function(e) {
            if (e.target.closest('.toast__close')){
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

        toast.classList.add('toast', `toast--${type}`);
        toast.style.animation = `slideInLeft ease 0.3s, fadeOut linear 1s ${delay}s forwards`;
        
        toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <div class="toast__msg">${message}</div>
            </div>
            <div class="toast__close">
                <i class="fas fa-times"></i>
            </div>
        `;
        main.appendChild(toast);
    }
}

function showLoveToast(){
    toast({
    title: 'Loved',
    message: 'Sam Sam received heart!!!',
    type: 'love',
    duration: 2000,
    })
}
function showLikeToast(){
    toast({
    title: 'Liked',
    message: 'Sam Sam received like!',
    type: 'like',
    duration: 2000,
    })
}

function showAngryToast(){
    toast({
    title: 'Got Angry',
    message: 'Sam Sam received angry~',
    type: 'angry',
    duration: 2000,
    })
}

//TOPIC - MUSIC
{
    const audio =  $('.topic__sound-audio');
    const img = $('.topic__sound-img'); 
    const control = $('.topic__sound-control');
    const playBtn = $('i.topic__sound-icon--play');
    const pauseBtn = $('i.topic__sound-icon--pause');


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
                console.log('ok');
            }
            else audio.pause();
        },

        start: function(){
            audio.loop = true;
            //Handle Event
            this.handleEvent();
        }
    }

    app.start();
}