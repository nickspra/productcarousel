function productSlider(){
        
    var productSliders = document.querySelectorAll('.product_slider');
    
    for(var i = 0; i<productSliders.length; i++){
        
        var obj = productSliders[i];

        if(!obj.hasbeeninit){
            obj.hasbeeninit = true;
            
            var docWidth = obj.offsetWidth;
            var ul = obj.getElementsByTagName('ul')[0];
            var next = obj.querySelector('.next');
            var prev = obj.querySelector('.prev');
            var posters = obj.getElementsByTagName('li');
            var postersLength = posters.length;
           
            var beforeDocFrag = document.createDocumentFragment();
            var afterDocFrag = document.createDocumentFragment();
            var middleClass = " "+obj.id + '_middle';

            for(var j = 0; j<postersLength; j++){
                var clone1 = posters[j].cloneNode(true);
                var clone2 = posters[j].cloneNode(true);

                clone1.className += ' clone-before';
                clone2.className += ' clone-after';

                //get fav button and remove id
                var cloneBtn = clone1.querySelectorAll('.fav_btn_wrapper');
                var clone2Btn = clone2.querySelectorAll('.fav_btn_wrapper');
                for(var x = 0; x<cloneBtn.length; x++){
                    cloneBtn[x].id='';
                    clone2Btn[x].id='';    
                }

                beforeDocFrag.appendChild(clone1);
                afterDocFrag.appendChild(clone2);
                posters[j].className += middleClass;

            }
            
            ul.insertBefore(beforeDocFrag, posters[0]);
            ul.appendChild(afterDocFrag);
            
            var posters = obj.getElementsByTagName('li');
            var posterWidth = posters[1].offsetWidth + 22;
            var listLength = posters.length * posterWidth + 20;
            var startingPosition =  -(listLength/2) + (docWidth / 2) + 'px';

            ul.style.width = listLength +'px';
            ul.slideIndex =  -(listLength/2) + (docWidth / 2);
            ul.counter = 0;
            ul.style.left = startingPosition;

            next.onclick = sliderNext(next, ul, postersLength, docWidth);
            prev.onclick = sliderPrev(prev, ul, postersLength, docWidth);

            obj.addEventListener('touchstart', function(e){

                obj.longTouch = null;
                //e.preventDefault();

                setTimeout(function(){
                    obj.longTouch = true;
                }, 250);

                ul.style.msTransitionDuration = '0s';
                ul.style.transitionDuration = '0s';
                obj.touchstartx = e.pageX;
                obj.currentIndex = ul.counter;

                /*var d = new Date();
                obj.startTime = d.getTime();*/
            }, false);

            obj.addEventListener('touchmove', function(e){
                obj.touchmovex = e.pageX;
                obj.movex = (ul.slideIndex* (-1)) + (obj.touchstartx - obj.touchmovex);
                ul.style.left = -obj.movex+'px';
            }, false);

            obj.addEventListener('touchend', function(e){
                //var d = new Date();
                //obj.endTime = d.getTime();

               /* var timeDiff = obj.endTime - obj.startTime;
                var velocity = obj.movex / timeDiff;*/
                var travel = e.pageX - obj.touchstartx;
                var travelRemaining = posterWidth%travel;

                if(travel>0){
                    travelRemaining = travel-posterWidth;
                    ul.counter--;
                }else{
                    ul.counter++;
                    /*if((travel * (-1)) > posterWidth){
                        (travel * (-1))
                        console.log('test')
                    }*/
                }

                ul.style.msTransitionDuration = '0.25s';
                ul.style.transitionDuration = '0.25s';
               /* var test = -(-obj.movex * (velocity*0.008) - obj.movex);
                ul.slideIndex = -test;
                ul.style.left = -test+'px';*/
                //console.log((-obj.movex * test)-obj.movex);
                if(ul.counter == postersLength){
                    setTimeout(function(){
                        ul.style.msTransitionDuration = '0s';
                        ul.style.transitionDuration = '0s';
                        ul.style.left =  -(listLength/2) + (docWidth / 2) + 'px';
                        ul.slideIndex =  -(listLength/2) + (docWidth / 2);
                        setTimeout(function(){
                            ul.style.msTransitionDuration = '0.25s';
                            ul.style.transitionDuration = '0.25s';
                        },100);
                        
                    }, 350);
                    ul.counter = 0;
                }

                if(ul.counter + postersLength === 0){
                    setTimeout(function(){
                        ul.style.msTransitionDuration = '0s';
                        ul.style.transitionDuration = '0s';
                        ul.style.left = -(listLength/2) + (docWidth / 2) + 'px';
                        ul.slideIndex = -(listLength/2) + (docWidth / 2);
                        setTimeout(function(){
                            ul.style.msTransitionDuration = '0.25s';
                            ul.style.transitionDuration = '0.25s';
                        }, 100);
                    }, 350);
                    ul.counter = 0;
                }

                ul.slideIndex = -obj.movex-travelRemaining;
                ul.style.left = -obj.movex-travelRemaining+'px';
            }, false);

        }//if not init
    }//for
    

    function sliderNext(el, slider, totalSlides, docWidth){
        
        return function(){
            
            if(!slider.clicked){
                slider.counter++;

                if(slider.counter == totalSlides){
                    setTimeout(function(){
                        ul.style.msTransitionDuration = '0s';
                        ul.style.transitionDuration = '0s';
                        ul.style.left =  -(listLength/2) + (docWidth / 2) + 'px';
                        slider.slideIndex =  -(listLength/2) + (docWidth / 2);
                        setTimeout(function(){
                            ul.style.msTransitionDuration = '0.25s';
                            ul.style.transitionDuration = '0.25s';
                        },100);
                        
                    }, 350);
                    slider.counter = 0;
                }
                
                slider.slideIndex -= posterWidth;
                moveSlider(slider);
            }else{
                return;
            }
            slider.clicked = true;
            
            setTimeout(function(){
                slider.clicked = null;
            },450);
        }//return
    }//sliderNext 

    function sliderPrev(el, slider, totalSlides, docWidth){

        return function(){

            if(!slider.clicked){
                slider.counter--;
                slider.slideIndex += posterWidth;
                moveSlider(slider);

                if(slider.counter + totalSlides === 0){
                    setTimeout(function(){
                        ul.style.msTransitionDuration = '0s';
                        ul.style.transitionDuration = '0s';
                        ul.style.left = -(listLength/2) + (docWidth / 2) + 'px';
                        slider.slideIndex = -(listLength/2) + (docWidth / 2);
                        setTimeout(function(){
                            ul.style.msTransitionDuration = '0.25s';
                            ul.style.transitionDuration = '0.25s';
                        }, 100);
                    }, 350);
                    slider.counter = 0;
                }
            }else{
                return;
            }

            slider.clicked = true;
            
            setTimeout(function(){
                slider.clicked = null;
            },450);
           
        }//return
    }//sliderPrev

    function moveSlider(slider){
        slider.style.left = slider.slideIndex+'px';
    }


    function inview (el) {

        var rect = el.getBoundingClientRect();
        
        if((rect.left<= window.innerWidth|| rect.left<=document.documentElement.clientWidth) && rect.right>=posterWidth ){
            return true;
        }else{
            return false;
        }
        /*return (
            rect.top >= 0 &&
            rect.right >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && 
            rect.left <= (window.innerWidth || document.documentElement.clientWidth)
        );*/
    }
}//productSlider
productSlider();