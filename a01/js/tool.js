const cav1 = document.getElementById('cav1');
const ctx1 = cav1.getContext('2d');
const basicSize = 2;


/*
 *配置对象 
 */
const config = {
    line :1,//使用的直线转换算法的id
};

/*
 *绘制点的方法
 */ 
function draw(pX,pY,color="#000")
{
    ctx1.fillStyle = color;
    ctx1.fillRect(pX,pY,basicSize,basicSize);
}

