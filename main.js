song = ""

function preload() {
    song = loadSound("Harry_Potter_Theme_Song.mp3")
}

function setup() {
    canvas = createCanvas(550, 550)
    canvas.center()

    video = createCapture(VIDEO)
    video.hide()
}

function draw() {
    image(video, 0, 0, 550, 550)
}

function play_music() {
    song.play()
}