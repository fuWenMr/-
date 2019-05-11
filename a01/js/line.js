{
   
    
    /**
     * @method  parsePoint 将一个数学点转换为一个屏幕点（+0.5取整）
     * @param {*} point 
     */
    let parsePoint = function(point){
        var {x,y} = point;
        return {x:parseInt(x+0.5),y:parseInt(y+0.5)}; 
    };
    

    /*
     * 数值微分法的实现
     */
    let zLine_shuZhi = function (p1,p2, k=(p2.y-p1.y)/(p2.x-p1.x)){
       
        var res =[];
        var {x,y}=p1,maxX = p2.x;
        //递增
        while (x<=maxX )
        {
            x++;
            y += k;
            //基于斜率进行的运算 无法绕开小数  要进行一此取证书
            res.push( parsePoint({x,y}));
        }
        return res;
    };

    /**
     * 中点画线算法的实现
     */
    let zLine_zhongDian = function (p1,p2){
        var res = [];
        //使用一般式表示的直线 aX+bY+C=0
        var {x,y}=p1, maxX = p2.x,
        a = -(p2.y-p1.y),b = p2.x-p1.x;
        //构造判别式d
        //这里的d其实是d*2  目的是避开小数
        d = 2*a+b;
        //分离的d1和d2 是为了在增量时省下一次加法
        d1 = 2*a;
        d2 = 2*(a+b);

        res.push({x,y})
       
        while (x<=maxX)
        {
            x++;
            if (d<0)
            {
                y++;
                d+=d2;
            }
            else
            {
                d+=d1;
            }
            res.push({x,y});
        }
        return res;
    };

    /**
     * BresenHam 算法的实现                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
     */

    let zLine_BresenHam = function(p1,p2,k){
        var res =[];
        //比较直线与网格线交点的距离
        var {x,y}=p1,maxX=p2.x,flag=k>=0?1:-1;
        //这里的e其实是d-0.5
        var dx=p2.x-p1.x,dy=p2.y-p1.y,e=-dx;
        //*2以消除小数
        dx=2*dx;dy=2*dy;
        do
        {
            res.push({x,y});
            x++;
            e+=dy;
            if(flag*e>=0)
            {
                y+=flag;
                e-=dx;
            }
        }
        while(x<=maxX)
        return res;


    };

    function drawLine(point1,point2,color){
       
        //k值检测
        var {p1,p2,flag,pNum,k} = getK(toP(point1),toP(point2));
        var fun = zLine_BresenHam; 
        var points = fun(p1,p2,k);
        points.forEach( p=>{
            draw(p, color, flag);
        } );
    }
}

