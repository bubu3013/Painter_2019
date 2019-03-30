var pushStack=new Array();
var step=(0);
var isDrawing=false; //to check 是否正在繪圖狀態
var color="#000000"; //default color is black
var shape=0;
var brush_shape=0;
/*
0=>rectangle 
1=>round 
2=>triangle 
3=>default
*/
var cur=true;
/*
0:draw
1:eraser
*/
function InitPainter(div)
{
    /*add a title*/
    var title=document.createElement('h2');
    title.innerHTML='painter';
    document.getElementById(div).appendChild(title);
    //page name
    document.title="myPainter";

    /*css QQQQQQQQQQQQQQQQQQQQQQQQQQ*/
    var css=document.createElement("style");
    css.type="text/css";
    css.innerHTML="#title{font-size:100pt}";
    document.body.appendChild(css);

    /*background*/
    document.body.style.background="#ff9f80";

    /*to layout the canvas*/
    var canvas=document.createElement('canvas');
    canvas.width=500;
    canvas.height=400;
    canvas.style="border:1px solid #000000";
    document.getElementById(div).appendChild(canvas);

    //to draw line
    ctx=canvas.getContext("2d");
    ctx.strokeStyle='#000000';
    ctx.lineWidth=10;
    ctx.fillStyle="#ffffff";
    ctx.fillRect(0,0,500,400);
    
    //event binding
    canvas.addEventListener('mouseup',()=>isDrawing=false);
    canvas.addEventListener('mouseout',()=>isDrawing=false);
    canvas.addEventListener('mousedown',(e)=>
    {
        //allow to draw
        isDrawing=true;
        //begin to draw
        ctx.moveTo(e.offsetX,e.offsetY);
        ctx.beginPath();
    });
    canvas.addEventListener('mousemove',draw);
    canvas.addEventListener('mousemove',ChangeCursor);
    canvas.addEventListener('mouseup',()=>
    {
        step++;
        if(step<pushStack.length)
        {
            pushStack.length=step;
        }
        pushStack.push(canvas.toDataURL());
    })

    /*add a sub-title*/
    var title=document.createElement('h3');
    title.innerHTML='Brush Shape';
    document.getElementById(div).appendChild(title);

    //add a button rectangle
    var button=document.createElement('button');
    button.type="button";
    button.innerHTML="Rectangle";
    button.addEventListener('click',()=>Shape(0));
    document.getElementById(div).appendChild(button);

    //add a button round
    var button=document.createElement('button');
    button.type="button";
    button.innerHTML="Round";
    button.addEventListener('click',()=>Shape(1));
    document.getElementById(div).appendChild(button);

    //add a button triangle
    var button=document.createElement('button');
    button.type="button";
    button.innerHTML="Triangle";
    button.addEventListener('click',()=>Shape(2));
    document.getElementById(div).appendChild(button);

    /*add a sub-title*/
    var title=document.createElement('h3');
    title.innerHTML='Brush Color';
    document.getElementById(div).appendChild(title);

    //choose color : red
    var button=document.createElement('button');
    button.type="button";
    button.innerHTML="Red";
    button.addEventListener('click',()=>Color(0));
    document.getElementById(div).appendChild(button);

    //choose color : green
    var button=document.createElement('button');
    button.type="button";
    button.innerHTML="Green";
    button.addEventListener('click',()=>Color(1));
    document.getElementById(div).appendChild(button);

    //choose color : black
    var button=document.createElement('button');
    button.type="button";
    button.innerHTML="Black";
    button.addEventListener('click',()=>Color(2));
    document.getElementById(div).appendChild(button);

    /*add a sub-title*/
    var title=document.createElement('h3');
    title.innerHTML='Eraser, Reset & Save';
    document.getElementById(div).appendChild(title);

    //an eraser 
    var button=document.createElement('button');
    button.type="button";
    button.innerHTML="Eraser";
    button.addEventListener('click',()=>Color(3));
    document.getElementById(div).appendChild(button);

    //a reset button 
    var button=document.createElement('button');
    button.type="button";
    button.innerHTML="Reset";
    button.addEventListener('click',()=>Reset());
    document.getElementById(div).appendChild(button);

    //an undo button 
    var button=document.createElement('button');
    button.type="button";
    button.innerHTML="Undo";
    document.getElementById(div).appendChild(button);
    button.addEventListener('click',()=>
    {
        if (step==0)
        {
            //reset the canvas
            ctx.clearRect(0,0,500,400);
            ctx.fillStyle="#ffffff";
            ctx.fillRect(0,0,500,400);
            step--;
        }
        else if (step>0)
        {
            step--;
            var canvasPic=new Image();
            canvasPic.src=pushStack[step];
            canvasPic.onload=function()
            {
                ctx.drawImage(canvasPic,0,0);
            }
        }
    });

    //a redo button 
    var button=document.createElement('button');
    button.type="button";
    button.innerHTML="Redo";
    button.addEventListener('click',()=>
    {
        if (step<pushStack.length-1)
        {
            step++;
            var canvasPic=new Image();
            canvasPic.src=pushStack[step];
            canvasPic.onload=function()
            {
                ctx.drawImage(canvasPic,0,0);
            }
        }
    });
    document.getElementById(div).appendChild(button);

    //save image button
    var a=document.createElement('a');
    a.href="#";
    a.innerHTML="Download";
    a.download="test.png";
    a.addEventListener('click',()=>
    {
        a.href=canvas.toDataURL();
        a.download="mypainter.png";

    });
    document.getElementById(div).appendChild(a);

}
function draw(e)
{

    //看是不是在畫畫的狀態
    if(!isDrawing)
    {
        return;
    }
    ctx.strokeStyle=color;
    ctx.lineJoin=shape;
    ctx.lineCap=brush_shape;

    //line to the place where the mouse is
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();

}
function Color(e)
{
    /*red*/
    if (e==0)
    {
        cur=true;
        color="#cc0000"
    }
    //green
    else if (e==1)
    {
        cur=true;
        color = "#00cc00"
    } 
    //black
    else if (e==2)
    {
        cur=true;
        color = "#000000"
    } 
    //eraser
    else if (e==3)
    {
        cur=false;
        color="#ffffff"
    }
};
//change the cursor
function ChangeCursor()
{
    if (cur)
    {
        document.body.style.cursor="cell";
    }
    else
    {   
        document.body.style.cursor="pointer";  
    }
}
function Shape(e)
{
    //rectangle
    if (e==0)
    {
        brush_shape = 'square';
        shape ='bevel'
    }
    //round 
    else if (e==1)
    {
        brush_shape = 'round';
        shape='round'
    } 
    //triangle
    else if (e==2)
    {
        brush_shape = 'butt';
        shape = 'miter'
    }
};
function Reset()
{
    //init all the variable
    isDrawing=false; 
    color="#000000"; 
    cur=true;
    shape=0;
    //reset the canvas
    ctx.clearRect(0,0,500,400);
    ctx.fillStyle="#ffffff";
    ctx.fillRect(0,0,500,400);
    //init the pushStack
    step=(-1);
    pushStack=[];
}
