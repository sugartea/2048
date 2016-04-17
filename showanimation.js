//生成数字时的动画
function showNumwithAnimate(i,j,randNum){
	var numberCell = $('#number-cell-'+i+'-'+j)
	
	numberCell.css('background-color',getNumberBackgroundColor(randNum));
	numberCell.css('color',getNumberColor(randNum));
	numberCell.text(transportnum(randNum));
	
	numberCell.animate({
		width:'100px',
		height:'100px',
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	},50);
}

//移动数字的动画
function showMoveAnimation(fromx,fromy,tox,toy){
	var numberCell = $('#number-cell-'+fromx+'-'+fromy);
	numberCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},200);
}

function updateScore(score){
	$("#score").text(score);
}
