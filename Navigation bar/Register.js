 (   function checkTexts(){
        let texts=document.querySelectorAll(".effect-wrapper");
        texts.forEach( container=>{
            let text=container.querySelector('.text');
            let svg=container.querySelector('.effect').querySelectorAll('rect');
            let reg=new RegExp('^[a-zA-Z]+$');
            text.addEventListener('change',(e)=>{
                if(!reg.test(text.value)){
                    svg.forEach(Element=>Element.setAttribute('stroke','red'));
                    svg.forEach(element=>element.setAttribute('stroke-dashoffset','80'));
                setTimeout(()=>{
                    svg.forEach(element=>element.setAttribute('stroke-dashoffset','0'));
                    svg.forEach(element=>element.setAttribute('stroke','white'));
                },800);
                console.log("hjkjk");
                }
                

        console.log("ooooo");
            });
        });
    }
 )();