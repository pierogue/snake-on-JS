document.addEventListener("keydown", (event)=>{
    if (event.key == "ArrowUp" && snake.moveDestination!="down"){
        snake.moveDestination = "up"
    }
    if (event.key == "ArrowDown" && snake.moveDestination!="up"){
        snake.moveDestination = "down"
    }
    if (event.key == "ArrowLeft" && snake.moveDestination!="right"){
        snake.moveDestination = "left"
    }
    if (event.key == "ArrowRight" && snake.moveDestination!="left"){
        snake.moveDestination = "right"
    }
})

let field = document.getElementById("field");

let snake = {
    isAlive:true,
    moveDestination:"up",
    length:3,
    score:"0"
}

let apple = {
    position : {
        x : "",
        y : ""
    }
}

let gr = 128;
function snakeGrow() {
    snake.length++;
 
    gr+=1;
    setTimeout(()=>{
        document.getElementById("field").innerHTML += `<div style='background-color:rgb(0, ${gr},0),' class='snakeBody'></div>`;
    }, 0)
    snakeBody[snakeBody[0].length - 1].style.top = snakeBody[snakeBody.length - 2].style.top;
    snakeBody[snakeBody.length - 1].style.left = snakeBody[snakeBody.length - 2].style.left;
    if(snake.length == 81){
        setWin();
    }
}

function setWin(){
    field.innerHTML=`<span id='loseText'>Вы победили</span>`;
}

let timing;
timing = 200;

let snakeBody = document.getElementsByClassName("snakeBody");
snakeBody[0].style.top = "160px";
snakeBody[0].style.left = "160px";
snakeBody[1].style.top = "200px";
snakeBody[1].style.left = "160px";
snakeBody[2].style.top = "240px";
snakeBody[2].style.left = "160px";

setApple();

function setApple() {
    for(let i = 0; i < snakeBody.length; i++){
        do {
            for(let j = 0;j<snakeBody.length; j++){
                do {
                    apple.position.x = Math.floor(Math.random() * 360);
                    apple.position.x -= (apple.position.x)%40;
            
                    apple.position.y = Math.floor(Math.random() * 360);
                    apple.position.y -= (apple.position.y)%40;
            
                    document.getElementById("apple").style.top = `${apple.position.y}px`;
                    document.getElementById("apple").style.left = `${apple.position.x}px`;
                    
                }
                while(apple.position.x == snakeBody[j].style.left && apple.position.y == snakeBody[j].style.top)
            }
        }
        while(apple.position.x == snakeBody[i].style.left && apple.position.y == snakeBody[i].style.top)
    }
}

function snakeDeath() {
    clearInterval(moveInterval)
    for(let i =0;i<snakeBody.length;i++)
    {
        setTimeout(()=>{
            snakeBody[i].style.visibility = "hidden";
            document.getElementById("apple").style.visibility = "hidden"
        }, 500)
    }
    field.innerHTML=`<span id='loseText'>Вы проиграли</span>`
}

function setScore() {
    console.log(score)
}


let moveInterval = setInterval(function snakeMove(){
    //Snake transition
    if(snake.moveDestination == "up"){
        for(let i = snakeBody.length - 1;i > 0; i--){
            snakeBody[i].style.top = snakeBody[i - 1].style.top;
            snakeBody[i].style.left = snakeBody[i - 1].style.left;
        }
        snakeBody[0].style.top = `calc(${snakeBody[0].style.top} - 40px)`;
    }
    else if(snake.moveDestination == "down"){
        for(let i = snakeBody.length - 1;i > 0; i--){
            snakeBody[i].style.top = snakeBody[i - 1].style.top;
            snakeBody[i].style.left = snakeBody[i - 1].style.left;
        }
        snakeBody[0].style.top = `calc(${snakeBody[0].style.top} + 40px)`;
    }
    else if(snake.moveDestination == "left"){
        for(let i = snakeBody.length - 1;i > 0; i--){
            snakeBody[i].style.top = snakeBody[i - 1].style.top;
            snakeBody[i].style.left = snakeBody[i - 1].style.left;
        }
        snakeBody[0].style.left = `calc(${snakeBody[0].style.left} - 40px)`;
    }
    else if(snake.moveDestination == "right"){
        for(let i = snakeBody.length - 1;i > 0; i--){
            snakeBody[i].style.top = snakeBody[i - 1].style.top;
            snakeBody[i].style.left = snakeBody[i - 1].style.left;
        }
        snakeBody[0].style.left = `calc(${snakeBody[0].style.left} + 40px)`;
    }

    //snake growth
    let x = snakeBody[0].style.left;
    let y = snakeBody[0].style.top;
    if(x == `calc(${apple.position.x}px)` && y == `calc(${apple.position.y}px)`){
        setApple();
        snakeGrow();
        setScore();
    }

    //out of border transition
    if(snakeBody[0].style.top == `calc(360px)`){
        snakeBody[0].style.top = `0px`;
    }
    else if(snakeBody[0].style.top == `calc(-40px)`){
        snakeBody[0].style.top = `320px`;
    }
    else if(snakeBody[0].style.left == `calc(-40px)`){
        snakeBody[0].style.left = `320px`;
    }
    else if(snakeBody[0].style.left == `calc(360px)`){
        snakeBody[0].style.left = `0px`;
    }

    for(let i = 0;i < snakeBody.length;i++){
        for(let j = 0; j < snakeBody.length;j++){
            if(j == i){j+=1}
            if(snakeBody[i].style.top == snakeBody[j].style.top && snakeBody[i].style.left == snakeBody[j].style.left){
                snakeDeath();
            }
        }
    }
}, timing)


//field filling
for(let i = 0; i < 81; i++){
    field.innerHTML += "<div class='cell'></div>";
}
