const cav1 = document.getElementById('cav1');
const ctx1 = cav1.getContext('2d');
const basicSize = 1;


/*
 *配置对象 
 */
const config = {
    line :1,//使用的直线转换算法的id
};

/*
 *绘制点的方法
 */ 
function draw(p,color="#000",isInversion)
{
    var {x,y} = p;
    ctx1.fillStyle = color;
    //交换x,y
    if (isInversion)
    {
        let temp = x;x=y;y=temp;
    }
    ctx1.fillRect(x*basicSize,y*basicSize,basicSize,basicSize);
}

function toP(arr)
{
    //对象化  取整数
    return {x:parseInt(arr[0]),y:parseInt(arr[1])}
}
