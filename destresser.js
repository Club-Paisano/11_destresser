let audioFile
/*retrieve video and audio files*/
async function destress() {
    if(!environment){
        return error.textContent = 'Please select an AMBIENCE to begin.'
    }else{
player.style.display = 'block';
initBtn.style.display = 'block';
start.style.display = 'none';
let videos = [];
const endpointVideo = `https://api.pexels.com/videos/search?query=${environment}&per_page=10&format=json`;
const endpointAudio1 = `https://freesound.org/apiv2/search/text/?query=${environment}&format=json`;
const api_key_pixel =
	'563492ad6f9170000100000164eb2f7346bb45fa8c6f43e02e19e313';
const token_freesound = 'RoHr85KPTz8nzxyWzfhnhjaLjz0BVi0z21Irx3vf';
fetch(endpointVideo, {
	headers: {
		Authorization: api_key_pixel,
	},
})
	.then((data) => data.json())
	.then((res) => {
		videos = res;
		let videoSrc = videos.videos[1].video_files[2].link;
		video.setAttribute('src', `${videoSrc}`);
	});
const audioCode = await fetch(endpointAudio1, {
	headers: {
		Authorization: `token ${token_freesound}`,
	},
})
	.then((res) => res.json())
	.then((data) => {
		console.log;
		return data.results[0].id;
	});
console.log(audioCode);
let endpointAudio2 = `https://freesound.org/apiv2/sounds/${audioCode}/?format=json`;
fetch(endpointAudio2, {
	headers: {
		Authorization: `token ${token_freesound}`,
	},
})
	.then((res) => res.json())
	.then((data) => {
		audio.setAttribute('src', `${data.previews['preview-hq-mp3']}`);
	});
    }
    

    
    }
    
        


/*retrieve audio data
//uplaod random nature video
//upload random ambient sound
//loop video for a total of 30min




/* get our elements */
let environment
const error = document.querySelector('.error');
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const audio = player.querySelector('.audio');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const screenSize = player.querySelector('[data-screen]')
const ranges = player.querySelectorAll('.player__slider');
const stressLevel = document.querySelector('.stress_level');
const stressRange = document.querySelector('.stress_range');
const ambience = document.getElementById('ambience');
const start = document.querySelector('.start')
const initBtn = document.querySelector('.init')
/* build out functions */

function togglePlay() {
	if(video.paused){
        video.play();
        audio.play();
    }else{
        video.pause()
        audio.pause();
    }
}

function updateButton() {
	const icon = this.paused ? '►' : '❚ ❚';
	console.log(icon);
	toggle.textContent = icon;
}

function skip(){
video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate(){
    video[this.name] = this.value;
}

function fullScreen(){
    if(!document.fullscreenElement){
        video.requestFullscreen();
    }else{
        if (document.exitFullscreen){
            document.exitFullscreen();
        }
    }
}

function handleProgress(){
    const percent = (video.currentTime/video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime
}

function updateStress(){
    stressLevel.textContent = `Rate stress level: ${stressRange.value}`;
}

function setAmbience(){
    environment = ambience.options[ambience.selectedIndex].value
}

function init(){
    player.style.display = 'none'
    start.style.display = 'block'
    initBtn.style.display = 'none'
    error.style.display = 'none'
    audio.pause();
    
}

/* hook up event listeners  */

video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change',handleRangeUpdate));
ranges.forEach((range) => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => (mousedown = false));
screenSize.addEventListener('click', fullScreen);

stressRange.addEventListener('change', updateStress);
ambience.addEventListener('change', setAmbience);