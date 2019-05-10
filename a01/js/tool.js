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


/**
    * @method getK 对点的一些前置处理 可以优化为函数装饰器
    * @param {*} point1 
    * @param {*} point2 
    */ 
function getK(p1,p2){
    //大小排序
    if(p1.x>p2.x)
    {
        let temp = p1;p1 = p2;p2 = temp;
    }
    var flag = false;
    var k=0;
    var pNum = p2.x - p1.x,
        dy = p2.y - p1.y,
        dx = p2.x - p1.x;

    k = dy/dx;
    flag = (Math.abs(k)>1);
    if(flag)
    {
        k =  1/k;
        pNum = p2.y - p1.y;
        //对点的坐标进行倒置换
        let temp;
        temp = p1.x; p1.x=p1.y; p1.y=temp;
        temp = p2.x; p2.x=p2.y; p2.y=temp; 
    }
    return {p1,p2,flag,pNum,k};
};