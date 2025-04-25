window.addEventListener("load", function(){
    let start=document.querySelector("#start");
    let header=document.querySelector("#header");
    let menu=header.firstElementChild;
    let gnb=menu.querySelector("#gnb");
    let gnbList=gnb.querySelectorAll("#gnb li");

    let mobile=menu.querySelector(".mobile");
    let mobileGnb=mobile.querySelector("#mobile_gnb");
    let mobileGnbList=mobile.querySelectorAll("#mobile_gnb li");

    let tab=menu.querySelector(".tab");
    let dim=menu.querySelector(".dim");

    let section=this.document.querySelectorAll("section");

    let pageList=[start, ...section];

    function controlMenu(n){
        console.log(n);

        gnbList.forEach(function(item, i){
            if(i == n){
                gnbList[i].classList.add("active");
            }
            else{
                gnbList[i].classList.remove("active");
            }
        });

        if(n != 0){
            menu.classList.add("fixed");
        }
        else{
            menu.classList.remove("fixed");
        }
    }

    pageList.forEach(function(item, i){
        gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: "top center",
                end: "bottom center",
                // markers: true,
                onEnter: function(){
                    controlMenu(i);
                },
                onEnterBack: function(){
                    controlMenu(i);
                }
            }
        });
    });

    tab.addEventListener("click", function(e){
		e.preventDefault();

		tab.classList.toggle("active");
		mobile.classList.toggle("active");
		dim.classList.toggle("active");
	});

    let topPos=0;

	window.addEventListener("resize", function(){
		if(window.innerWidth > 720 && tab.classList.contains("active")){
			tab.classList.remove("active");
			mobile.classList.remove("active");
			dim.classList.remove("active");
		}
	});

    // gnb page duration
    gnbList.forEach(function(item, i){
		gnbList[i].addEventListener("click", function(e){
			e.preventDefault();

			topPos=pageList[i].offsetTop;

			gsap.to(window, { scrollTo: topPos, duration: 0.4 });
		});

		mobileGnbList[i].addEventListener("click", function(e){
			e.preventDefault();

			topPos=pageList[i].offsetTop;

			gsap.to(window, { scrollTo: topPos, duration: 0.4, onComplete: function(){
				tab.classList.remove("active");
				mobile.classList.remove("active");
				dim.classList.remove("active");
			}});
		});
	});
    
    // start animation
	const startTl=gsap.timeline();

	startTl.from(".main_slider .desc p", { y: 30, opacity: 0, duration: 0.5 });

	startTl.from(".main_slider .desc h2", { y: 30, opacity: 0, duration: 0.5 });

	startTl.from(".main_slider .desc .btn", { y: 30, opacity: 0, duration: 0.5 });

    // business animation
    let businessList=document.querySelectorAll("#business li");

    const businessTl=gsap.timeline({
        scrollTrigger: {
            trigger: "#business",
            start: "top center",
            end: "bottom center"
        }
    });

    businessList.forEach(function(item, i){
        if(i%2 == 1){
            businessTl.from(item, { y: 100, opacity: 0, duration: 0.5 });
        }
        else{
            businessTl.from(item, { y: -100, opacity: 0, duration: 0.5 });
        }
    });

    // portfolio animation
    let portfolioList=document.querySelectorAll("#portfolio li");

    gsap.from(portfolioList, { y: 100, opacity: 0, duration: 0.5, stagger: 0.2,
        scrollTrigger: {
            trigger: "#portfolio",
            start: "top center",
            end: "bottom center"
        }
    });

    // culture animation
    let cultureList=document.querySelectorAll("#culture li");
    let cultureListLine=document.querySelectorAll("#culture li .line");

    const cultureTl=gsap.timeline({
        scrollTrigger: {
            trigger: "#culutre",
            start: "top center",
            end: "bottom center"
        }
    });
});