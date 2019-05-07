{
    let check = function(point1,point2){
        var k=0;
        var dy = point2[1] - point1[1];
        var dx = point2[0] - point1[0];
        if (dy)
        {
            k = dy/dx;
            k =  (Math.abs(k)>1)?false:true;
        }
        return !!k;
    };

    /*
     * 数值微分法的实现
     */
    let zLine_shuZhi = function (p1,p2){
        var res =[];
        var x = p1[0];
        var y = p1[1];
        //首先求k
        var k = (p2[1]-p1[1])/(p2[0]-p1[0]);
        //递增
        while (res.length != p2[0]-p1[0])
        {
            x++;
            y += k;
            res.push([x,y]);
        }
        return res;
    };

    function drawLine(p1,p2,color){
        var points = zLine_shuZhi(p1,p2);
        points.forEach( p=>{
            draw(p[0],p[1],color)
        } );
    }
}

drawLine([20,20],[40,20]);