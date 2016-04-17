function getPosTop(i,j){
	return 20 + i*120;
}

function getPosLeft(i,j){
	return 20 + j*120; 
}

//设置不同数字的背景色
function getNumberBackgroundColor(num){
		switch(num){
			case 2:return '#eee4da';break;
			case 4:return '#ede0c8';break;
			case 8:return '#f2b179';break;
			case 16:return '#f59563';break;
			case 32:return '#f67c5f';break;
			case 64:return '#f65e3b';break;
			case 128:return '#edcf72';break;
			case 256:return '#edcc61';break;
			case 512:return '#9c0';break;
			case 1024:return '#33b5e5';break;
			case 2048:return '#09c';break;
			case 4096:return '#a6c';break;
		}
		return'black';
}

//设置数字的颜色
function getNumberColor(num){
	if(num<=4){
		return '#776e65';
	}
	else{
		return 'white';
	}
}

//判断该位置是否有元素存在
function nospace(board){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]==0){
				return false;
			}
		}
	}
	return true;
}

//判断是否能够向左移动
function canMoveLeft( board ){
	for(var i = 0;i<4;i++){
		for(var j = 1;j<4;j++ ){
			if(board[i][j] != 0){
				if(board[i][j-1]==0||board[i][j-1]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

//判断是否能够向右移动
function canMoveRight( board ){
	for(var i = 0;i<4;i++){
		for(var j = 2;j>=0;j-- ){
			if(board[i][j] != 0){
				if(board[i][j+1]==0||board[i][j+1]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

//判断是否能够向上移动
function canMoveUp( board ){
	for(var j = 0;j<4;j++){
		for(var i = 1;i<4;i++){
			if(board[i][j] != 0){
				if(board[i-1][j]==0||board[i-1][j]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

//判断是否能够向下移动
function canMoveDown( board ){
	for(var j = 0;j<4;j++){
		for(var i = 2;i>=0;i--){
			if(board[i][j] != 0){
				if(board[i+1][j]==0||board[i+1][j]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

//判断移动的路径左右有无障碍物
function noBlockHorizontal(row,col1,col2,board){
	for(var i=col1+1;i<col2;i++){
		if(board[row][i]!=0){
			return false;
		}
	}
	return true;
}

//判断移动的路径上下有没障碍物
function noBlockVertical(col,row1,row2,board){
	for(var i = row1+1;i<row2;i++){
		if(board[i][col]!=0){
			return false;
		}
	}
	return true;
}

function nomove(board){
	if(canMoveLeft(board)||
	   canMoveRight(board)||
	   canMoveUp(board)||
	   canMoveDown(board)){
	   	return false;
	   }
	else{
		return true;
	}
}

function transportnum(num){
	switch(num){
		case 2: return $("input")[0].value;break;
		case 4: return $("input")[1].value;break;
		case 8: return $("input")[2].value;break;
		case 16: return $("input")[3].value;break;
		case 32: return $("input")[4].value;break;
		case 64: return $("input")[5].value;break;
		case 128: return $("input")[6].value;break;
		case 256: return $("input")[7].value;break;
		case 512: return $("input")[8].value;break;
		case 1024: return  $("input")[9].value;break;
		case 2048: return  $("input")[10].value;break;
		case 4096: return  $("input")[11].value;break;
	}
}

function submitdata(){
	newgame();
}
