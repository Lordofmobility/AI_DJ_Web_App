scoreleftWrist = ""
song = ""
leftWristX = ""
leftWristY = ""
rightWristX = ""
rightWristY = ""

function preload() {

}

function setup() {
    canvas = createCanvas(500, 500)
    canvas.center()

    video = createCapture(VIDEO)
    video.hide()
    video.size(500, 500)

    posenet = ml5.poseNet(video, modelLoaded)
    posenet.on("pose", gotPoses)

    song = loadSound("music.mp3")
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score
        console.log(scoreleftWrist);

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
    if (scoreleftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20)
        InNumberleftWristY = Number(leftWristY)
        remove_decimals = Math.floor(leftWristY)
        volume = remove_decimals / 500
        song.setVolume(volume)
        document.getElementById("volume").innerHTML = "Volume is " + volume
    }
}

function play_music() {
    song.play()
    song.setVolume(1)
    song.rate(1)
}