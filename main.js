song = "";
score_right_wrist = 0;
score_left_wrist = 0;
right_wristX = 0;
right_wristY = 0;
left_wristX = 0;
left_wristY = 0;

function preload()
{
    song = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet Has Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        right_wristX = results[0].pose.rightWrist.x;
        right_wristY = results[0].pose.rightWrist.y;
        left_wristX = results[0].pose.leftWrist.x;
        left_wristY = results[0].pose.leftWrist.y;
        console.log('leftWrist x = ' + left_wristX + 'leftWrist y = ' + left_wristY);
        console.log('rightWrist x = ' + right_wristX + 'rightWrist y = ' + right_wristY);
        score_left_wrist = results[0].pose.keypoints[9].score
        score_right_wrist = results[0].pose.keypoints[10].score
    }
}

function draw()
{
    image(video, 0, 0, 600, 500);
    fill("green");
    stroke("lime");
    if(score_right_wrist > 0.2)
    {
        circle(right_wristX, right_wristY, 20);
        if(right_wristY > 0 && right_wristY <= 100)
        {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if(right_wristY > 100 && right_wristY <= 200)
        {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        else if(right_wristY > 200 && right_wristY <= 300)
        {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        else if(right_wristY > 300 && right_wristY <= 400)
        {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        else
        {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }
    if(score_left_wrist > 0.2)
    {
        circle(left_wristX, left_wristY, 20);
        InNumberleftwristY = Number(left_wristY);
        remove_decimal = floor(InNumberleftwristY);
        volume = remove_decimal/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}

function play()
{
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}

function stop()
{
    song.stop();
}

function pause()
{
    song.pause();
}

























//dont delete!!!!

//let mySound;
//function preload() {
//  soundFormats('mp3', 'ogg');
//  mySound = loadSound('assets/doorbell');
//}

//function setup() {
//  let cnv = createCanvas(100, 100);
//  cnv.mousePressed(canvasPressed);
//  background(220);
//  text('tap here to play', 10, 20);
//}

//function canvasPressed() {
  // playing a sound file on a user gesture
  // is equivalent to `userStartAudio()`
//  mySound.play();
//

