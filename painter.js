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
//variance of text
var with_text=false;
var text="";
var typeface="Georgia";//字體
var typefont="30px";//字大小

function InitPainter(div)
{
    /*add a title*/
    var title=document.createElement('h2');
    title.id="t1";
    title.innerHTML='Welcome To MyPainter';
    document.getElementById(div).appendChild(title);
    //page name
    document.title="myPainter";

    /*css*/
    var css=document.createElement("style");
    css.type="text/css";
    css.innerHTML="#t1{font:italic 30pt Georgia}";
    document.body.appendChild(css);

    /*background*/
    document.body.style.background="#ff9f80";

    /*to layout the canvas*/
    var canvas=document.createElement('canvas');
    canvas.width=600;
    canvas.height=500;
    canvas.style="border:20px solid #000000";
    document.getElementById(div).appendChild(canvas);

    //to draw line
    ctx=canvas.getContext("2d");
    ctx.strokeStyle='#000000';
    ctx.lineWidth=30;
    ctx.fillStyle="#ffffff";
    ctx.fillRect(0,0,600,500);
    
    //event binding
    canvas.addEventListener('mouseup',()=>isDrawing=false);
    canvas.addEventListener('mouseout',()=>isDrawing=false);
    canvas.addEventListener('mousedown',(e)=>
    {
        if (with_text==true)
        {
            ctx.fillStyle=color;
            ctx.font=typefont+" "+typeface;
            ctx.fillText(text,e.offsetX,e.offsetY);
            with_text=false;
        }
        else
        {
            //allow to draw
            isDrawing=true;
            //begin to draw
            ctx.moveTo(e.offsetX,e.offsetY);
            ctx.beginPath();
        }
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
    title.id="brush_shape"
    title.innerHTML='Brush Shape';
    document.getElementById(div).appendChild(title);

    /*css*/
    var css=document.createElement("style");
    css.type="text/css";
    css.innerHTML="#brush_shape{font: bold italic 15pt Georgia}";
    document.body.appendChild(css);

    //add a button rectangle
    var button=document.createElement('button');
    button.type="button";
    button.id="Rec";
    button.style="border:5px double #b3b3b3";
    button.innerHTML="Rectangle";
    button.addEventListener('click',()=>Shape(0));
    document.getElementById(div).appendChild(button);

    //add a button round
    var button=document.createElement('button');
    button.type="button";
    button.innerHTML="Round";
    button.id="Round";
    button.style="border:5px double #b3b3b3";
    button.addEventListener('click',()=>Shape(1));
    document.getElementById(div).appendChild(button);

    //add a button normal
    var button=document.createElement('button');
    button.type="button";
    button.innerHTML="Normal";
    button.id="Tri";
    button.style="border:5px double #b3b3b3";
    button.addEventListener('click',()=>Shape(2));
    document.getElementById(div).appendChild(button);

    /*css*/
    var css=document.createElement("style");
    css.type="text/css";
    css.innerHTML="#Rec{font: italic 12pt Georgia}";
    document.body.appendChild(css);

    /*css*/
    var css=document.createElement("style");
    css.type="text/css";
    css.innerHTML="#Round{font: italic 12pt Georgia}";
    document.body.appendChild(css);

    /*css*/
    var css=document.createElement("style");
    css.type="text/css";
    css.innerHTML="#Tri{font: italic 12pt Georgia}";
    document.body.appendChild(css);

    /*add a sub-title*/
    var title=document.createElement('h3');
    title.innerHTML='Brush Color';
    title.id="brush_color";
    document.getElementById(div).appendChild(title);

    /*css*/
    var css=document.createElement("style");
    css.type="text/css";
    css.innerHTML="#brush_color{font: bold italic 15pt Georgia}";
    document.body.appendChild(css);

    //choose color : red
    var button=document.createElement('button');
    button.type="button";
    button.innerHTML="Red";
    button.id="Red";
    button.style="border:5px solid #cc0000";
    button.addEventListener('click',()=>Color(0));
    document.getElementById(div).appendChild(button);

    //choose color : Yellow
    var button=document.createElement('button');
    button.type="button";
    button.innerHTML="Yellow";
    button.id="Yellow";
    button.style="border:5px solid #ffff66";
    button.addEventListener('click',()=>{color="#ffff66";cur=true;});
    document.getElementById(div).appendChild(button);

    //choose color : green
    var button=document.createElement('button');
    button.type="button";
    button.innerHTML="Green";
    button.id="Green";
    button.style="border:5px solid #00cc00";
    button.addEventListener('click',()=>Color(1));
    document.getElementById(div).appendChild(button);

    //choose color : blue
    var button=document.createElement('button');
    button.type="button";
    button.innerHTML="Blue";
    button.id="Blue";
    button.style="border:5px solid #0000ff";
    button.addEventListener('click',()=>{color="#0000ff";cur=true;});
    document.getElementById(div).appendChild(button);

    //choose color : purple
    var button=document.createElement('button');
    button.type="button";
    button.innerHTML="Purple";
    button.id="Purple";
    button.style="border:5px solid #660066";
    button.addEventListener('click',()=>{color="#660066";cur=true;});
    document.getElementById(div).appendChild(button);

    //choose color : black
    var button=document.createElement('button');
    button.type="button";
    button.innerHTML="Black";
    button.id="Black";
    button.style="border:5px solid #000000";
    button.addEventListener('click',()=>Color(2));
    document.getElementById(div).appendChild(button);

    //css of six colors button
    var css=document.createElement("style");
    css.type="text/css";
    css.innerHTML="#Black{font:bold 12pt Georgia}";
    document.body.appendChild(css);

    var css=document.createElement("style");
    css.type="text/css";
    css.innerHTML="#Red{font:bold 12pt Georgia}";
    document.body.appendChild(css);

    var css=document.createElement("style");
    css.type="text/css";
    css.innerHTML="#Green{font: bold 12pt Georgia}";
    document.body.appendChild(css);

    var css=document.createElement("style");
    css.type="text/css";
    css.innerHTML="#Yellow{font:bold 12pt Georgia}";
    document.body.appendChild(css);
        
    var css=document.createElement("style");
    css.type="text/css";
    css.innerHTML="#Blue{font:bold 12pt Georgia}";
    document.body.appendChild(css);

    var css=document.createElement("style");
    css.type="text/css";
    css.innerHTML="#Purple{font:bold 12pt Georgia}";
    document.body.appendChild(css);

    //add a subtitle
    var title=document.createElement('h3');
    title.innerHTML='Text Input, type face and size';
    title.id="textInput";
    document.getElementById(div).appendChild(title);

    /*css*/   
    var css=document.createElement("style");
    css.type="text/css";
    css.innerHTML="#textInput{font: bold italic 15pt Georgia}";
    document.body.appendChild(css);
    
    //text size
    var button=document.createElement('button');
    button.type="button";
    button.id="px10";
    button.innerHTML="10px";
    button.style="border:5px double #b3b3b3";
    button.addEventListener('click',()=>{typefont="10px";});
    document.getElementById(div).appendChild(button);

    var button=document.createElement('button');
    button.type="button";
    button.innerHTML="30px";
    button.style="border:5px double #b3b3b3";
    button.id="px30";
    button.addEventListener('click',()=>{typefont="30px";});
    document.getElementById(div).appendChild(button);

    var button=document.createElement('button');
    button.type="button";
    button.innerHTML="60px";
    button.style="border:5px double #b3b3b3";
    button.id="px60";
    button.addEventListener('click',()=>{typefont="60px";});
    document.getElementById(div).appendChild(button);

    //the css of pixel buttons
    var css=document.createElement("style");
    css.type="text/css";
    css.innerHTML="#px10{font: bold 12pt Georgia}";
    document.body.appendChild(css);

    var css=document.createElement("style");
    css.type="text/css";
    css.innerHTML="#px30{font:bold 12pt Georgia}";
    document.body.appendChild(css);
        
    var css=document.createElement("style");
    css.type="text/css";
    css.innerHTML="#px60{font:bold 12pt Georgia}";
    document.body.appendChild(css);

    var css=document.createElement("style");
    css.type="text/css";
    css.innerHTML="#Purple{font:bold 12pt Georgia}";
    document.body.appendChild(css);

    //換行
    var br=document.createElement('br');
    document.getElementById(div).appendChild(br);

    //typeface button
    var button=document.createElement('button');
    button.type="button";
    button.id="Arial"
    button.innerHTML="Arial";
    button.style="border:5px dotted #b3b3b3";
    button.addEventListener('click',()=>{typeface="Arial";});
    document.getElementById(div).appendChild(button);

    var button=document.createElement('button');
    button.type="button";
    button.id="Impact";
    button.innerHTML="Impact";
    button.style="border:5px dotted #b3b3b3";
    button.addEventListener('click',()=>{typeface="Impact";});
    document.getElementById(div).appendChild(button);

    var button=document.createElement('button');
    button.type="button";
    button.id="LucidaConsole"
    button.innerHTML="Lucida Console";
    button.style="border:5px dotted #b3b3b3";
    button.addEventListener('click',()=>{typeface="Lucida Console";});
    document.getElementById(div).appendChild(button);

    //css of three type face button
    var css=document.createElement("style");
    css.type="text/css";
    css.innerHTML="#LucidaConsole{font:bold 12pt Lucida Console}";
    document.body.appendChild(css);

    var css=document.createElement("style");
    css.type="text/css";
    css.innerHTML="#Impact{font:bold 12pt Impact}";
    document.body.appendChild(css);

    var css=document.createElement("style");
    css.type="text/css";
    css.innerHTML="#Arial{font: bold 12pt Arial}";
    document.body.appendChild(css);

    //input box
    var form=document.createElement('form');
    form.action="/action_page.php";
    document.getElementById(div).appendChild(form);

    var input=document.createElement('input');
    input.id="inputText";
    input.type="text";
    document.getElementById(div).appendChild(input);

    //submit button
    var button=document.createElement('button');
    button.type="button";
    button.innerHTML="Submit";
    button.addEventListener('click',()=>
    {
        with_text=true;
        text=(document.getElementById('inputText').value);
        alert("Please Click on Canvas for the Location of Text");
    });
    document.getElementById(div).appendChild(button);

    /*add a sub-title*/
    var title=document.createElement('h3');
    title.innerHTML='Eraser, Reset & Save';
    title.id="ERS";
    document.getElementById(div).appendChild(title);

    /*css*/
    var css=document.createElement("style");
    css.type="text/css";
    css.innerHTML="#ERS{font: bold italic 15pt Georgia}";
    document.body.appendChild(css);

    //an eraser 
    var button=document.createElement('button');
    button.type="button";
    button.id="Eraser";
    button.style="border:5px double #b3b3b3";
    button.innerHTML="Eraser";
    button.addEventListener('click',()=>
    {
        Color(3);
    });
    document.getElementById(div).appendChild(button);

    //a reset button 
    var button=document.createElement('button');
    button.type="button";
    button.id="Reset";
    button.innerHTML="Reset";
    button.style="border:5px double #b3b3b3";
    button.addEventListener('click',()=>Reset());
    document.getElementById(div).appendChild(button);

    //an undo button 
    var button=document.createElement('button');
    button.type="button";
    button.id="Undo";
    button.innerHTML="Undo";
    button.style="border:5px double #b3b3b3";
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
    button.id="Redo";
    button.style="border:5px double #b3b3b3";
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

    /*css*/
    var css=document.createElement("style");
    css.type="text/css";
    css.innerHTML="#Eraser{font: italic 12pt Georgia}";
    document.body.appendChild(css);

    /*css*/
    var css=document.createElement("style");
    css.type="text/css";
    css.innerHTML="#Reset{font: italic 12pt Georgia}";
    document.body.appendChild(css);

    /*css*/
    var css=document.createElement("style");
    css.type="text/css";
    css.innerHTML="#Undo{font: italic 12pt Georgia}";
    document.body.appendChild(css);

    /*css*/
    var css=document.createElement("style");
    css.type="text/css";
    css.innerHTML="#Redo{font: italic 12pt Georgia}";
    document.body.appendChild(css);

    //save image button
    var a=document.createElement('a');
    a.href="#";
    a.id="download";
    a.innerHTML="Download";
    a.download="test.png";
    a.addEventListener('click',()=>
    {
        a.href=canvas.toDataURL();
        a.download="mypainter.png";

    });
    document.getElementById(div).appendChild(a);


    /*css*/   
    var css=document.createElement("style");
    css.type="text/css";
    css.innerHTML="#download{font:Bold 12pt Georgia}";
    document.body.appendChild(css);

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
        color = "#4CAF50"
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
    ChangeCursor();
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
    //Default
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
    shape=2;
    brush_shape=0;
    with_text=false;
    text="";
    typeface="Georgia";
    typefont="30px";

    //reset the canvas
    ctx.clearRect(0,0,600,500);
    ctx.fillStyle="#ffffff";
    ctx.fillRect(0,0,600,500);
    
    //init the pushStack
    step=(0);
    pushStack=[];
}
