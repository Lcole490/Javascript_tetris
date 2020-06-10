
// Starts app as soon as page is loaded completely
document.addEventListener("DOMContentLoaded", ()=>{


//  V A R I A B L E S

    const grid =document.querySelector(".grid");
    let squares = Array.from(document.querySelectorAll(".grid div")) // Creates an array from the divs of class grid
    const width = 10; // defines width of the gamefield (10 divs  or squares per row)
    const ScoreDisplay = document.querySelector("#score");  // this is where the score id will be updated
    const StartBtn = document.querySelector("#start-button"); // Game start button defined
    let nextRandom = 0;    // initialization of nextRandom variable that allows for previews of upcoming game pieces
    
    
    
    
    console.log()
    
    
    // T H E _ _ T E T R O M I N O E S
    // Each tetromino is an array of the divs(squares) that create the shape when background color is added to each square specifically
    // Each index of the array represents a configuration or rotation of  the same shape
    
    const lTetromino = [                        // l-tetromino
      [1, width+1, width*2+1, 2],
      [width, width+1, width+2, width*2+2],
      [1, width+1, width*2+1, width*2],
      [width, width*2, width*2+1, width*2+2]
    ];
    
    
    const lTetrominoAlt = [                     // Alternate configuration of l-tetromino
      [1, width+1, width*2+1, 0],
      [width, width+1, width+2, 2],
      [1, width+1, width*2+1, width],
      [width, width*2, width+1, width+2]
    ];
    
    
      const zTetromino = [                      // z-Tetromino
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
      ];
    
      const zTetrominoAlt= [                      // Alternate configuration of z-Tetromino
        [ 2, width+2, width+1, width*2+1],
        [width, width+1, width*2+1, width*2+2],
        [ 2, width+2, width+1, width*2+1],
        [width, width+1, width*2+1, width*2+2]
      ];
    
    
    
      const tTetromino = [                          // t-Tetromino
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
      ];
    
      const oTetromino = [                          // o-Tetromino
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
      ];
    
      const iTetromino = [                              // i-Tetromino
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
      ];
    
    
    
    
    // Array of all tetromino shapes, this is where the game randomly picks a shape to display in the game screen and preview screen
      const allTetrominoes = [lTetromino, lTetrominoAlt, iTetromino, oTetromino, zTetromino, zTetrominoAlt, tTetromino];
    
    
      
    
    
    // Current position is the starting point of the tetromino when it enters the arena of play
    let currentPosition = 4;
    

    // Current Rotation is the selected orientation of the tetromino 
    let currentRotation = 0;
    
    
    // Current gives the newest tetromino and is generated from the "All tetrominoes array"
    // the first [] below chooses the tetromino shape while the second [] chooses the orientation which is 1 of 4 within the tetromino shape array
    let random = Math.floor(Math.random()*allTetrominoes.length)
    let randomconfig =Math.floor(Math.random()*allTetrominoes[random].length)
    console.log(random);
    console.log(randomconfig);
    let current = allTetrominoes [random][randomconfig] // This is the chosen tetromino that will enter gameplay
    
    
    
    
    
    
    // Forms the tetromino that was chosen above
    // for each index of array current, add the tetromino class to the corresponding squares in order to draw shape
    function draw() { 
      current.forEach(index => {
        squares[currentPosition + index].classList.add("tetromino")
      })
    }
    
    
    
    
    
    // Erases the drawn tetromino to make the canvas clear as the tetromino moves
    // for each index of array current, remove the tetromino class from the corresponding squares in order to clear shape
    function undraw() {
      current.forEach (index =>{
        squares[currentPosition + index].classList.remove("tetromino")
      })
    }
    
    
    
    
    // Make the tetromino move down every second
    
    timerId = setInterval(moveDown, 1000)
    
    
    // Function to make the tetromino move down the canvas by a factor of the width(10)
    function moveDown(){
    
      undraw()
      currentPosition += width
      draw()
      freeze()
    }
    
    
    // assign control functions to keyCodes
    function control(e){
      if(e.keyCode ===37){
      moveLeft()
    } else if (e.keyCode === 38){
      rotate()
    } else if (e.keyCode === 39) {
      moveRight()
    } else if (e.keyCode === 40){
      moveDown()
    }
    }
    
    document.addEventListener("keydown", control)
    
    function freeze(){
      if(current.some(index => squares[currentPosition + index + width].classList.contains("taken"))){
        current.forEach(index => squares[currentPosition + index].classList.add("taken"))
    
        // Start a new Tetromino
        random= nextRandom
        nextRandom = Math.floor(Math.random()*allTetrominoes.length)
        current = allTetrominoes[random][currentRotation]
        currentPosition = 4
    
        draw()
        previewShape()
      }
    }
    
    
    
    
    
    
    
    // Move the tetromino left, unless it is at the edge or is blocked by another tetromino
    function moveLeft(){
      undraw()
      const isAtLeftEdge = current.some(index =>(currentPosition + index)% width === 0)
    
      if(!isAtLeftEdge) currentPosition -=1
    
      if(current.some(index => squares[currentPosition + index].classList.contains("taken")))
      currentPosition +=1
    
      draw()
    }
    
    
    
    
    // Move the tetromino right, unless it is at the right edge or is blocked by another tetromino
    function moveRight(){
      undraw()
      const isAtRightEdge = current.some(index =>(currentPosition + index)% width === width-1)
    
      if(!isAtRightEdge) currentPosition +=1
    
      if(current.some(index => squares[currentPosition + index].classList.contains("taken")))
      currentPosition -=1
    
      draw()
    }
    
    
    
    // Rotate the orientation of the tetromino
    function rotate(){
      undraw()
      currentRotation ++
      if(currentRotation === current.length){
        currentRotation = 0
      }
      current = allTetrominoes[random][currentRotation]
      draw()
    }
    
    
    
    
    // Show player what the next tetromino will below
    const displaySquares = document.querySelectorAll(".mini-grid div")
    const displayWidth = 4
    let displayIndex = 0
    
    
    
    // Show the future tetrominoes in original orientation only
    const onDeckTetrominoes = [
      [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
      [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
      [1, displayWidth, displayWidth+1, displayWidth*2],//tTetromino
      [0, 1, displayWidth, displayWidth+1],// oTetromino
      [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
    ]
    
    
    
    // Display the future tetromino shape in the mini-grid display
    function previewShape(){
    
    displaySquares.forEach(square =>{
      square.classList.remove("tetromino")
    
    })
    onDeckTetrominoes[nextRandom].forEach( index => {
      displaySquares[displayIndex + index].classList.add("tetromino")
    })
    
    }
    
    
    // Button functionality
    StartBtn.addEventListener("click", ()=> {
      if (timerId){
        clearInterval(timerId)
        timerId=null
      }else{
        draw()
        timerId = setInterval(moveDown, 1000)
      }
    })
    
    
    undraw();
    
    
    console.log(squares);
    console.log(allTetrominoes [6][3])
    
    
    
    
    
    })