{
    //由八分之一圆弧扩展到整个圆弧
    let toAllCircle = function(points)
    {
        var temp = points.slice(0);
        points.forEach(p=>{
            temp.push({x:p.y,y:p.x});
        });
        points = temp.slice(0);
        points.forEach(p=>{
            temp.push({x:p.x,y:-p.y});
        });
        points = temp.slice(0);
        points.forEach(p=>{
            temp.push({x:-p.x,y:p.y});
        });
        return temp;
    }

    let zCricle_zhongDian = function(o,r,res=[]){
        //首先看作圆心为(0,0)的圆，运算出点之后加上真正的圆心偏移量 d为顶点向右第一个点的判定表达式
        //每次判断两个候选点中点与圆的位置关系 e= 4*d
        var x=0,y=r,d=1.25-r,e=5-4*r;
        res.push({x,y});
        while(x<=y)
        {
            if(e<0)
            {
                e+=8*x+12;
            }
            else
            {
                e+=8*(x-y)+20;y--;
            }
            x++;
            res.push({x,y});
        }
        res = toAllCircle(res);
        res.forEach(p=>{
            p.x+=o.x;
            p.y+=o.y;
        })
        return res;
    };
    /**
     * @methid 绘制圆的方法
     * @param {*} o 
     * @param {*} r 
     * @param {*} color 
     * @param {*} res 
     */
    function drawCircle(o,r,color)
    {
        o = toP(o);
        var fun = zCricle_zhongDian;
        var points = fun(o,r);
        points.forEach(p=>{
            draw(p,color);
        })
    }
}

/**
 * 关于多边形
 */




 {
    /**
     * @method sortPointsByY 将传入的几个点按照的先y再x的顺序排雷
     * @param  {...any} points 
     */
    let sortLinesByY = function(lines){
        lines.forEach(line=>{
            var {p1,p2} = line;
            if(p2.y<p1.y){let temp =p2;p2=p1;p1=temp;}
            line.maxY = p2.y;
            line.minY = p1.y;
            line.xOfMinY = p1.x;
            line.dx = 1/line.k;
        });

        lines.sort((l1,l2)=>{
            return l1.minY-l2.minY;
        });
        return lines;
    };

    /**
     * @method getLinesByPoints 将传入的几个点转化为带斜率边
     * @param  {...any} points 
     */
    let getLinesByPoints = function(points){
        var res=[];
        var firstPoint = points.shift();
        var p1 = firstPoint,p2;
        for(let i in points)
        {
            p2 = points[i];
            res.push({p1,p2,k:(p2.y-p1.y)/(p2.x-p1.x)});
            p1=p2;
        }
        p2 = firstPoint;
        res.push({p1,p2,k:(p2.y-p1.y)/(p2.x-p1.x)});

        res = sortLinesByY(res)
        return res;
    };
    
    /**
     * @method zPolygonByXRay 使用x扫描线算法转换多边形为点阵表示 写死我算了
     * @param {*} points 
     */
    let zPolygonByXRay = function(points)
    {
        function con(ae = aeT.next)
        {
            if(ae&&ae.next)
            {
                let {x,dx,maxY} = ae;
                console.log('活性边',{x,dx,maxY});
                con(ae.next)
            }
            console.log('temp list');
        }
        var maxY=0,minY=1/0; 
        points = points.map(p=>{
            let y =p[1];
            if(y>maxY){maxY=y;}
            if(y<minY){minY=y;}
            return toP(p);
        });
        var tRes = [];
        var res = [];
        //活性边表
        var aeT = {next:null},ae=aeT;
        var currentY=minY,currentIndex=0;
        //吊桶新边表
        
        var neT = getLinesByPoints(points);
        console.log(neT);
        neT.forEach(l=>{
            drawLine(l.p1,l.p2);
        })
        // return 0;
        console.log('全部边表',neT);
        //构造出第一个版本的活性边表
        while(neT[currentIndex]&&neT[currentIndex].minY==currentY)
        {
            let {xOfMinY,dx,maxY} = neT[currentIndex];
            
            ae.next = {x:xOfMinY,dx,maxY,next:null};
            console.log(ae.next);
            ae=ae.next;
            currentIndex++;
        }
        // console.log('初始边表');
        // con();
        console.log('*******************');
        //开始扫描
        for(;currentY<=maxY;currentY++)
        {
            //扫描转换
            //交点数组
            let activeXs = [];
            let aeLast = aeT,ae,aeNext;
            
            do
            {
                ae = aeLast.next;
                activeXs.push(ae.x);
                ae.x+=ae.dx;
                // console.log('ae',ae.x,ae.dx);
                //结束边
                if(ae.maxY==currentY){
                    // console.log('结束边',ae);
                    aeLast.next = ae.next;
                // con();
                }
                else{
                    aeLast = ae;
                }
                
            }
            while(ae.next)

            //得到所有的x
            // con();
            console.log('排序前',activeXs);
            activeXs = xHandler(activeXs);
            console.log('排序后',activeXs,currentY);
            for(let i=0;i<activeXs.length;i+=2)
            {
                // console.log(currentY);
                // console.log(getAllXPoints(activeXs[i],activeXs[i+1],currentY).length);
                // tRes.push(getAllPointsByX(activeXs[i],activeXs[i+1],currentY));
                console.log('储备',[activeXs[i],activeXs[i+1]],currentY);
                res = res.concat( getAllPointsByX(activeXs[i],activeXs[i+1],currentY) );
            }
            // console.log(res);
            //到达新边
            
            while(neT[currentIndex]&&neT[currentIndex].minY==currentY)
            {
                console.log('新边');
                let {xOfMinY,dx,maxY} = neT[currentIndex];
                aeLast.next = {x:xOfMinY,dx,maxY,next:null};
                aeLast = aeLast.next;
                currentIndex++;
            }
            
            console.log('----------------------');
        }
        console.log(tRes);
        return res;

        function xHandler(xs)
        {
            // xs = Array.from(new Set(xs));
            xs.sort((a,b)=>{return a-b;});
            if(xs.length==1){xs.push(xs[0])};
            return xs;
        }
        function getAllPointsByX(x1,x2,y)
        {
            // x1 = parseInt(x1+0.5);
            // x2 = parseInt(x2+0.5);
            var res=[],x=x1;
            for(;x<=x2;x++)
            {
                res.push(toP([x,y]));
            }
           
            return res;
        }
    }

    

    /**
     * @method drawPolygon 根据顶点 绘制一个多边形并返回点阵 
     * @param {*} points 
     * @param {*} color 
     */
    function drawPolygon(points,color){
        console.log(points);
        var res =[];
        var fun = zPolygonByXRay;
        res = fun(points);
        draw(res,color);
        return res;
    }

    /**
     * @method drawRect 绘制一个矩形 并且返回内部点阵
     * @param {*} startX 
     * @param {*} startY 
     * @param {*} w 
     * @param {*} h 
     * @param {*} color 
     */
    function drawRect(startX,startY,w,h,color)
    {
        var {x,y} = toP([startX,startY]);
        w = parseInt(w);h=parseInt(h);
        var p1=[x,y],p2=[x,y+h],p3=[x+w,y+h],p4=[x+w,y];
        return drawPolygon([p1,p2,p3,p4],color);
    }
}