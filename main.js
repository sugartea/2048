var board = new Array();//放数字的数组
var score = 0;

$(document).ready(function(){
	newgame();
});

function newgame(){
   	var score = 0
	updateScore(score);
	$(".gameover").removeClass('gameover').text("");
	init();//初始化棋盘
	generateOneNumber();
	generateOneNumber();//在棋盘上随机生成两个数字
}

//初始化棋盘格
function init(){
	for(var i = 0 ; i<4 ; i++){
		for(var j = 0 ; j<4 ; j++ ){
			var gridCell = $("#grid-cell-"+i+"-"+j)//i为行数，j为列数
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		}
	}
	for(var i = 0;i<4;i++){
		 board[i] = new Array();
		 for(var j = 0;j<4;j++){
		 	board[i][j] = 0;
		 }
	}
	updateBoardView();
}	

//更新棋盘的数字的颜色和位置
function updateBoardView(){
	
	$(".number-cell").remove();
	for(var i = 0;i<4;i++){
		for(var j = 0;j<4;j++){
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell = $('#number-cell-'+i+'-'+j);
	
            if(board[i][j]==0){
				theNumberCell.css('width','0px');
				theNumberCell.css('height','0px');
				theNumberCell.css('top',getPosTop(i,j)+50);
				theNumberCell.css('left',getPosLeft(i,j)+50);
			}
			else{
				theNumberCell.css('width','100px');
				theNumberCell.css('height','100px');
				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				theNumberCell.css('background-color',getNumberBackgroundColor( board[i][j]) );
				theNumberCell.css('color',getNumberColor( board[i][j]) );
				theNumberCell.text( transportnum(board[i][j]));
			}
		}
	}	
}

//在没有数字的地方生成一个数字
function generateOneNumber(){
	if(nospace(board))
		return false;
	
	//随机一个位置（如果位置有数，则继续随机生成）
	var randx = parseInt(Math.floor(Math.random()*4));
	var randy = parseInt(Math.floor(Math.random()*4));
	var times = 0;
	while(times < 64){
		if(board[randx][randy]==0)
			break;
		
		randx = parseInt(Math.floor(Math.random()*4));
		randy = parseInt(Math.floor(Math.random()*4));
		times++;
	}
	//为了避免while循环次数过多而导致游戏性能下降
	if(times == 64){
		for(i=0;i<4;i++){
			for(j=0;j<4;j++){
				if(board[i][j] == 0){
					randx = i;
					randy = j;
				}
			}
		}
	}	
	//随机一个数字
	var randNum = (Math.random()<0.5)?2:4;//随机生成2或4
	
	//在随机位置显示显示随机数字
	board[randx][randy] = randNum;
	showNumwithAnimate(randx,randy,randNum);
	
	return true;
}


//键盘按下时的动作
$(document).keydown(function( event ){
	switch (event.keyCode){
		case 37://left
			if( moveLeft() ){
				setTimeout('generateOneNumber()',210);
				setTimeout('isgameover()',300);
			};
			break;
		
		case 38://up
			if( moveUp() ){
				setTimeout('generateOneNumber()',210);
				setTimeout('isgameover()',300);
			};
			break;
		
		case 39://right
			if( moveRight() ){
				setTimeout('generateOneNumber()',210);
				setTimeout('isgameover()',300);
			};
			break;
		
		case 40://down
			if( moveDown() ){
				setTimeout('generateOneNumber()',210);
				setTimeout('isgameover()',300);
			};
			break;
		
		default://default
		break;
	}
})

function isgameover(){
	if(nospace(board)&&nomove(board)){
		gameover();
	}
}

function gameover(){
	var gameovertext = $('<div></div>')
	$("#grid-container").append(gameovertext);
	gameovertext.addClass("gameover");
	gameovertext.html("游戏结束!点击New Game再来一次。");
}

//向左移动
function moveLeft(){
	if( !canMoveLeft(board) ){
		return false;
	}
	for(var i = 0;i<4;i++){
		for(var j = 1;j<4;j++){
			if(board[i][j]!=0){
				
				for(var k = 0;k<j;k++){
					if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)){
						//move
						showMoveAnimation(i,j,i,k);				
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//add score
						score += board[i][k]
						updateScore(score);		
					}
				}
			}
		}
	}
	setTimeout('updateBoardView()',200);//为了解决移动时动画出来的问题，可能是updateBoardView函数执行太快
	return true;
}

//向右移动
function moveRight(){
	if( !canMoveRight(board) ){
		return false;
	}
	for(var i = 0;i<4;i++){
		for(var j = 2;j>=0;j--){
			if(board[i][j]!=0){
				
				for(var k = 3;k>j;k--){
					if(board[i][k] == 0 && noBlockHorizontal(i,j,k,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)){
						//move
						showMoveAnimation(i,j,i,k);				
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//add score 
						score += board[i][k]
						updateScore(score);				
					}
				}
			}
		}
	}
	setTimeout('updateBoardView()',200);//为了解决移动时动画出来的问题，可能是updateBoardView函数执行太快
	return true;
}

//向上移动
function moveUp(){
	if( !canMoveUp(board) ){
		return false;
	}
	for(var j = 0;j<4;j++){
		for(var i = 1;i<4;i++){
			if(board[i][j]!=0){
				
				for(var k = 0;k<i;k++){
					if(board[k][j] == 0 && noBlockVertical(j,k,i,board)){
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[k][j]==board[i][j]&&noBlockVertical(j,k,i,board)){
						//move
						showMoveAnimation(i,j,k,j);				
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;
						//add score 
						score += board[k][j]
						updateScore(score);
					}
				}
			}
		}
	}
	setTimeout('updateBoardView()',200);//为了解决移动时动画出来的问题，可能是updateBoardView函数执行太快
	return true;
}

//向下移动
function moveDown(){
	if( !canMoveDown(board) ){
		return false;
	}
	//注意遍历的顺序，i要从大到小，不然会产生最上面一行有时不会向下的bug
	for(var j = 0;j<4;j++){
		for(var i = 2;i>=0;i--){
			if(board[i][j]!=0){
				
				for(var k = 3;k>i;k--){
					if(board[k][j] == 0 && noBlockVertical(j,i,k,board)){
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[k][j]==board[i][j]&&noBlockVertical(j,i,k,board)){
						//move
						showMoveAnimation(i,j,k,j);				
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;
						//add score
						score += board[k][j]
						updateScore(score);
					}
				}
			}
		}
	}
	setTimeout('updateBoardView()',200);//为了解决移动时动画出来的问题，可能是updateBoardView函数执行太快
	return true;
}






