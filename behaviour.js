const start=document.querySelector(".btn");
const mole=document.querySelector(".display");
const moles=Array.from(document.querySelectorAll(".mole_img"));
const score=document.querySelector("h1");
const max_score=document.querySelector("h2");
const form=document.querySelector(".form");
let points=0,game_end=12,maximum=JSON.parse(localStorage.getItem("maximum"))?JSON.parse(localStorage.getItem("maximum")).max : 0;
max_score.textContent="Max Score : "+maximum;

mole.addEventListener("click",(e)=>{
    
    points++;
    if(e.target.classList.contains("mole_img"))
    {
        score.textContent="Whack a mole : "+points;
        e.target.classList.remove("add_height");
    }
    
});

function startgame()
{
    score.textContent="Whack a mole : 0";
    points=0;
    let timer,stop_game=0;
    timer=setInterval(()=>{

        moles.forEach((value)=>{
            value.classList.remove("add_height");
        });
        let number=Math.floor(Math.random()*moles.length);
        moles[number].classList.toggle("add_height");

        stop_game++;
        if(stop_game===parseInt(game_end))
        {
            clearInterval(timer);
            moles.forEach((value)=>{
                value.classList.remove("add_height");
            });
            if(points>maximum) 
            {
                maximum=points;
                localStorage.setItem("maximum",JSON.stringify({max:maximum}));
                max_score.textContent="Max Score : "+maximum;
            }
        } 
    },700);
}

start.addEventListener("click",startgame);

form.addEventListener("submit",function (e){

    e.preventDefault();
    let data=this.querySelector("[name=type_value]").value;
    game_end=data;
    this.reset();
    
});

