scoreleftWrist = ""
scorerightWrist = ""
song = ""
leftWristX = ""
leftWristY = ""
rightWristX = ""
rightWristY = ""

function preload() {
    song = loadSound("music.mp3")
}

function setup() {
    canvas = createCanvas(500, 500)
    canvas.center()

    video = createCapture(VIDEO)
    video.hide()
    video.size(500, 500)

    posenet = ml5.poseNet(video, modelLoaded)
    posenet.on("pose", gotPoses)
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score
        console.log(scoreleftWrist);
        scorerightWrist = results[0].pose.keypoints[10].score
        console.log(scorerightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist x = " + leftWristX + ", Left Wrist y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist x = " + rightWristX + ", Right Wrist y = " + rightWristY);
    }
}

function modelLoaded() {
    console.log("PoseNet is initialized");
}

function draw() {
    image(video, 0, 0, 500, 500)
    stroke("red")
    fill("red")
    circle(leftWristX, leftWristY, 20)
    InNumberleftWristY = Number(leftWristY)
    remove_decimals = Math.floor(leftWristY)
    volume = remove_decimals / 500
    song.setVolume(volume)
    document.getElementById("volume").innerHTML = "Volume is " + volume

    circle(rightWristX, rightWristY, 20)
    if (rightWristY > 0 && rightWristY <= 100) {
        song.rate(0.5)
        document.getElementById("speed").innerHTML = "Speed of the song is 0.5x"
    } else if (rightWristY > 100 && rightWristY <= 200) {
        song.rate(1)
        document.getElementById("speed").innerHTML = "Speed of the song is 1x"
    } else if (rightWristY > 200 && rightWristY <= 300) {
        song.rate(1.5)
        document.getElementById("speed").innerHTML = "Speed of the song is 1.5x"
    } else if (rightWristY > 300 && rightWristY <= 400) {
        song.rate(2)
        document.getElementById("speed").innerHTML = "Speed of the song is 2x"
    } else if (rightWristY > 400 && rightWristY <= 500) {
        song.rate(2.5)
        document.getElementById("speed").innerHTML = "Speed of the song is 2.5x"
    }
}

function play_music() {
    song.play()
    song.setVolume(1)
    song.rate(1)
}