var arr = [[], [], [], [], [], [], [], [], []]
var temp = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);

    }
}

function initializeTemp(temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            temp[i][j] = false;

        }
    }
}


function setTemp(board, temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                temp[i][j] = true;
            }

        }
    }
}


function setColor(temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (temp[i][j] == true) {
                arr[i][j].style.color = "#DC3545";
            }

        }
    }
}

function resetColor() {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {

            arr[i][j].style.color = "red";


        }
    }
}

var board = [[], [], [], [], [], [], [], [], []]


let button = document.getElementById('generate-sudoku')
let solve = document.getElementById('solve')

console.log(arr)
function changeBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {

                arr[i][j].innerText = board[i][j]
            }

            else
                arr[i][j].innerText = ''
        }
    }
}


button.onclick = function () {
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function () {
        var response = JSON.parse(xhrRequest.response)
        console.log(response)
        initializeTemp(temp)
        resetColor()

        board = response.board
        setTemp(board, temp)
        setColor(temp)
        changeBoard(board)
    }
    xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
    //we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
    xhrRequest.send()
}

//Check if a value val can be filled in a given position r,c
function isSafe(board,r,c,val){

    //checking row and column
    for(var i=0;i<9;i++){
        if(board[r][i]==val || board[i][c]==val){
            return false
        }
    }

    // checking subgrid
    sub_r = r - r%3
    sub_c = c-c%3
    for(var x = sub_r;x<sub_r+3;x++){
        for(var y = sub_c;y<sub_c+3;y++){
            if(board[x][y]==val){
                return false
            }
        }
    }
    return true

}

// you can make a call to changeboard(board) function to update the state on the screen
function solveSudokuHelper(board,r,c){
    //base case 
    if(r==9){
        changeBoard(board);
        return true;
    }
    //other cases - write your code here
    if(c==9){
        return solveSudokuHelper(board,r+1,0);
    }

    if(board[r][c]!=0){
        return solveSudokuHelper(board,r,c+1)
    }

    for(var i =1; i<=9;i++){
        if(isSafe(board,r,c,i)==true){
            board[r][c]=i
            success = solveSudokuHelper(board,r,c+1)
            if(success==true){
                return true
            }
            board[r][c]=0
        }
    }
    return false

   //finish your code here

}

function solveSudoku(board) {
    solveSudokuHelper(board,0,0);
}


solve.onclick = function () {
    solveSudoku(board)
}
