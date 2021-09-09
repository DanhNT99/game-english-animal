$(document).ready(function () {

/**
 * 1. load animal live 1
 * 2. move btn -> frame
 * 3. check answer
 * 5. increment coin for user
 * 4. notification
*/
    const app = (function() {
        let currentIndex = 0
        let sumCoinUser = 0
        let answers = {}
        const  notis =  {
            correct: { title: "Correct!", pathImage: "iconWin.gif", btn: "Next"},
            wrong : {title: "Wrong!", pathImage: "iconSad.gif", btn: "Again"}
        }
        const animals = [
            {
                level : 1,   
                name: "Con rùa",   
                nameEnglish: "turtle",
                pathImage: "turtle.jpg",
                coin: 10
            },
            {
                level : 2,   
                name: "Con vẹt",   
                nameEnglish: "parrot",
                pathImage: "parrot.jpg",
                coin: 20
            },
            {   
                level : 3,   
                name: "Con rắn",    
                nameEnglish: "snake",
                pathImage:"snake.jpg",
                coin: 30
            },
            {   
                level : 4,   
                name: "Con ngựa",  
                nameEnglish: "horse",
                pathImage:"horse.jpg",
                coin: 40
            },
            {  
                 level : 5,   
                 name: "Con tôm",   
                 nameEnglish: "shrimp",
                 pathImage:"shrimp.jpg",
                 coin: 50
            },
            {   
                level : 6,   
                name: "Con cọp",   
                nameEnglish: "tiger",
                pathImage:"tiger.jpg",
                coin: 60
            },
            {   
                level : 7,  
                name: "Con khỉ",  
                nameEnglish: "monkey",
                pathImage:"monkey.jpg",
                coin: 70
            },
            {   
                level : 8,   
                name: "Con thỏ",  
                 nameEnglish: "rabbit",
                 pathImage:"rabbit.jpg",
                 coin: 80
            },
            {   
                level : 9,   
                name: "Con dê",    
                nameEnglish: "goat",
                pathImage:"goat.jpg",
                coin: 90
            },
            {  
                level : 10,   
                name: "Con chim bồ câu", 
                nameEnglish: "dove",
                pathImage:"dove.jpg",
                coin: 100
            }
        ]
        return {
            eventsHmtl() {
                const _this = this
                let notiNode = $(".noti")
                let audioCorrect = document.querySelector(".correct")
                let audioWrong = document.querySelector(".wrong")
                
                //html inner sumCoin of App
                $(".header-coin-box--sumNumber").text(`\\${this.getSumCoin()}`);

                //check answer 
                $(".wrap-btn-confirm").click(function () { 
                    let animalsName = animals[currentIndex].nameEnglish
                    let sizeAnswers = Object.keys(answers).length
                    let strAnswer = ""
                    let key = ""
                    let sum
                    if(animalsName.length == sizeAnswers) {
                        for(let i = 0; i< sizeAnswers; i++) {
                            strAnswer += answers[i]
                        }
                        if(strAnswer === animalsName) {
                            audioCorrect.currentTime = 0
                            audioCorrect.play()
                            key = "correct"
                            incrementCoin()
                        }else {
                            audioCorrect.currentTime = 0
                            audioWrong.play()
                            key = "wrong"
                        }
                        notis[key].title = sumCoinUser == _this.getSumCoin() ? "You win game!" :   notis[key].title
                        notiNode.find(".noti-box-tite").text(notis[key].title)
                        notiNode.find("img").attr("src", `assets/images/${notis[key].pathImage}`)
                        notiNode.find("button").attr("class",notis[key].btn)
                                                .text(notis[key].btn)
                        notiNode.addClass("show")
                    }
                });
                //increment coin for user
                function incrementCoin() {
                    let sum = sumCoinUser
                    sumCoinUser += animals[currentIndex].coin
                    let intervalCoin = setInterval(()=> {
                        sum++
                        $(".header-coin-box--number").text(sum)
                        $(".header-coin-box--slide").animate({
                            width:`${sum / _this.getSumCoin() * 100}%`
                        },0)
                        if(sum === sumCoinUser) {
                            clearInterval(intervalCoin)
                        }
                    }, 1)
                }
                //next level
                $(".noti-box-btn button").click(function () {
                    if($(this).hasClass("Next")) {
                        _this.nextAnimals()
                        _this.eventsHtmlLoad()
                        answers = {}
                        audioCorrect.pause()
                    }
                    else {
                        audioWrong.pause()
                        audioWrong.currentTime = 0
                    }
                    notiNode.removeClass("show") 
                });
            },
            eventsHtmlLoad () {  
                $(".selector-list--btn").click(function() {
                    //find frame empty
                    let audio = document.getElementsByClassName("PressBtn")
                    if($(this).attr("data-click") === "false") {
                        $(this).attr('data-click', true)
                        //shadow for li
                        $(this).next().addClass("showShadow").one('animationend', function(){
                            $(this).removeClass("showShadow")
                        })
                        audio[0].currentTime = 0
                        audio[0].play()
                        let frameEmpty = $(".answer-list--word[data-empty = 'false']")[0]
                        //get vị trí ô trống và đưa btn selector vào
                        let frameTop = $(frameEmpty).position().top + 5
                        let frameLeft = $(frameEmpty).position().left + 8
                        $(frameEmpty).attr({
                            'data-empty': true,
                            'data-btn': $(this).parent().index()
                        })
                        $(this).animate({
                            'width' : `${$(frameEmpty).width()}px`,
                            'height' : `${$(frameEmpty).height()}px`,
                            'left': `${frameLeft}px`,
                            'top': `${frameTop}px`
                        }, 300);
                        //save value user select
                        answers[$(frameEmpty).index()] = $(this).text()
                    }else {
                        $(this).attr({'style': '', 'data-click': false})
                        audio[1].currentTime = 0
                        audio[1].play()
                        let farmeHaveBtn = $(`[data-btn = '${$(this).parent().index()}']`)
                        $(farmeHaveBtn).attr({
                            'data-empty': false,
                            'data-btn' : ""
                        })
                        //delete value
                        delete answers[farmeHaveBtn.index()]
                    }             
                })
            },
            answerWordShuffle (string) {
                var mixStr = ''
                strings = string.split('')
                while (strings.length > 0) {
                    mixStr +=  strings.splice(strings.length * Math.random(), 1)
                }
                return mixStr
            },
            getSumCoin() {
                return animals.reduce((init, item) => (init + item.coin), 0)
            },
            loadAnimalCurrent() {
                let animal = animals[currentIndex]
                let htmlAnswer = ""
                let htmlSelector = ""
                let strShuffle = this.answerWordShuffle(animal.nameEnglish)
                $(".header-level--Num").text(animal.level)
                $(".selector-list").html(htmlSelector)
                $(".frame-img").attr("src", `assets/images/${animal.pathImage}`)
                //load htmls frame and btn
                for(let i = 0; i < animal.nameEnglish.length; i++) {
                    htmlAnswer += "<li class='answer-list--word' data-empty = 'false' data-btn = ''></li>"
                    htmlSelector += `<li><button class="selector-list--btn" data-click = 'false'>${strShuffle[i]}</button>
                                    <span></span></li>`
                }
                $(".answer-list").html(htmlAnswer)
                $(".selector-list").html(htmlSelector)
            },
            nextAnimals() {
                if(sumCoinUser === this.getSumCoin()) {
                    location.reload()
                }
                currentIndex = currentIndex < animals.length - 1 ? ++currentIndex : 0
                this.loadAnimalCurrent()
            },
            start() {
                //event for htmls
                this.eventsHmtl()
                //load html for animal cuttent
                this.loadAnimalCurrent()
                //event fot html load
                this.eventsHtmlLoad()
            }
        }
    })()

    app.start()
});