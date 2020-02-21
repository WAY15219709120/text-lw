$.fn.lwCarousel = function(opt){
    $(this).each(function(idx,item){ //jq选择器可能选中多个
        new Carousel(item,opt)
    })
    return this
} 

class Carousel {
    constructor(dom,opt){
        const defaults = {
            img : [],
            width : 539,
            height : 267,
            btn: true, //是否需要左右按钮
            page: true, //是否需要页码
            horizontal : true, //是否水平滚动
            time: 1800,  //启动位移的时间，如果 === speed,将无缝滚动
            speed: 1200, //速度
            idx : 0 //初始显示的图片
        }
        this.newOpt = Object.assign({},defaults,opt)
        this.newOpt.img.push(this.newOpt.img[0])
        this.len = this.newOpt.img.length
        this.$ul = null
        this.newOpt.idx = this.newOpt.idx % (this.len-1)
        this.key = this.newOpt.horizontal ? 'left' : 'top'
        this.bian = this.newOpt.horizontal ? 'width' : 'height'
        this.timer = null
        this.init(dom)
    }
    init(dom){
        this.jqDom = $(dom)
        this.$ul = $("<ul/>")
        this.$ul.appendTo(this.jqDom.addClass("lwCarousel"))
        this.newOpt.img.forEach(item=>{
            $(`<img src="${item}"/>`).width(this.newOpt.width)
                                     .height(this.newOpt.height)
                                     .appendTo($('<li/>').appendTo(this.$ul))
        })
        this.jqDom.width(this.newOpt.width).height(this.newOpt.height)
        if(this.newOpt.horizontal){
            this.$ul.width(this.newOpt.width*this.len).addClass("horizontal")
        }
        this.initPosition()
        this.startMove()
        this.jqDom.on('mouseover',this.stopMove.bind(this))
        this.jqDom.on('mouseout',this.startMove.bind(this))
        this.newOpt.btn && this.createBtn()
        this.newOpt.page && this.createPage()
    }
    initPosition(){
        this.$ul.animate({[this.key]: -this.newOpt.idx * this.newOpt[this.bian]},0)
    }
    startMove(){
        this.timer = setInterval(this.move.bind(this), this.newOpt.time)
    }
    stopMove(){
        clearInterval(this.timer)
    }
    move(speed = this.newOpt.speed){
        this.newOpt.idx ++
        this.$ul.animate({[this.key]: -this.newOpt.idx * this.newOpt[this.bian]},speed)
        if(this.newOpt.idx === this.len - 1){
            this.newOpt.idx = 0 
            this.initPosition()
        }
        this.changePage()
    }
    _move(speed = this.newOpt.speed){
        if(this.newOpt.idx === 0){
            this.newOpt.idx = this.len -1 
            this.initPosition()
        }
        this.newOpt.idx --
        this.$ul.animate({[this.key]: -this.newOpt.idx * this.newOpt[this.bian]},speed)
        this.changePage()
    }
    createBtn(){
        const nextBtn = $('<img class="nextBtn" src="./img/next.jpg"/>')
        const prevBtn = $('<img class="prevBtn" src="./img/prev.jpg"/>')
        this.jqDom.append(nextBtn).append(prevBtn)
        nextBtn.on('click',this.move.bind(this,100))
        prevBtn.on('click',this._move.bind(this,100))
    }
    createPage(){
        const page = $('<div class="page"/>')
        for(let i = 0; i < this.len-1; i++){
            let span = $(`<span id="page-${i}" />`)
            span.on('click',e => {
                this.newOpt.idx = i - 1
                this.move(300)
                $(e.target).addClass('active').siblings().removeClass('active')
            }).appendTo(page)
        }
        this.jqDom.append(page)
        this.changePage()
    }
    changePage(){
        if(this.newOpt.page){
            $(`.page #page-${this.newOpt.idx}`).addClass('active').siblings().removeClass('active')
        }
    }
}        

