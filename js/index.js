$(()=>{
    // 点击后滑块固定在当前点击的条目上
    const nav = ['DASHBOARD','PROJECTS','CALENDAR','MAILBOX','SETTINGS']
    const navUl = $('.nav-ul')
    nav.forEach((text,idx)=>{
        const navLi = $(`<li>${text}</li>`)
        idx === 0 && navLi.addClass('active')
        navLi.appendTo(navUl)
    })
    navUl.on('click','li',function(){
        $(this).addClass('active').siblings().removeClass('active')
    })

    // 用自己写的轮播图方法实现轮播图
    $('.carousel').lwCarousel({
        img : ['./img/img1.png','./img/img2.png','./img/img3.png','./img/img4.png','./img/img5.png']
    })

    // 轮播图右边的内容
    const tableData = {
        thead:['TIME','USERNAME','STATUS'],
        tbody:[
            ['9:45pm','info@design.com','Solved'],
            ['9:45pm','info@design.com','Solved'],
        ]
    }
    const thead = tableData.thead.map(item=>`<th>${item}</th>`).join('')
    const tbody = tableData.tbody.map(item=>{
        return `<tr>${item.map((text,idx)=>{
            return idx === item.length - 1  ?  `<td><button>${text}</button></td>` : `<td>${text}</td>`
        }).join('')}</tr>`
    }).join('')
    $('.list table').html(`<thead><tr>${thead}</tr></thead><tbody>${tbody}</tbody>`)


    // 曲线图
    $.get('https://edu.telking.com/api/?type=month')
     .then(({ data })=>{
        const diagram = echarts.init(document.querySelector('#diagram'))
        const option = {
            title: {
                text: '曲线图数据展示',
                left: 'center',
                textStyle:{
                    fontFamily: 'STHeitiSC-Medium',
                    fontSize: 20,
                    fontWeight: 'normal',
                    color: '#262b2e',
                }
            },
            color: ['#4586ef'],
            tooltip: {},
            xAxis: {
                type: 'category',
                axisTick: {
                    alignWithLabel: true,
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        width: 0.5,
                        color: '#cbcbcb',
                        type:'dashed'
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        color: '#4e4c4c'  
                    }
                },
                data: data.xAxis
            },
            yAxis: {
                axisLine: {show:false},
                axisTick: {show:false},
                splitLine: {
                    lineStyle: {
                        width: 0.5,
                        color: '#cbcbcb',
                        type:'dashed'
                    }
                },
                axisLabel: {
                    formatter: '{value} 人'
                }
            },
            series: [{
                type: 'line',
                smooth: true,
                itemStyle : { normal: {label : {show: true } } },
                areaStyle: {
                    color: 'rgba(183, 208, 248,.5)'
                },
                data: data.series
            }]
        }
        diagram.setOption(option)
    })

    // 饼状图和柱状图
    $.get('https://edu.telking.com/api/?type=week')
     .then(({ data })=>{
       const pie = echarts.init(document.querySelector('#pie'))
       const bar = echarts.init(document.querySelector('#bar'))
       const pieOpt = {
            title: {
                text: '饼状图数据展示',
                left: 'center',
                textStyle:{
                    fontFamily: 'STHeitiSC-Medium',
                    fontSize: 20,
                    fontWeight: 'normal',
                    color: '#262b2e',
                }
            },
            series: [{
                type: 'pie',
                radius : '70%',
                center: ['50%', '55%'],
                label:{
                   fontSize:10
                },
                data: data.series.map((item,idx)=>({
                    name:data.xAxis[idx],
                    value:item
                }))
            }]
       }
       const barOpt = {
            title: {
                text: '柱状图数据展示',
                left: 'center',
                textStyle:{
                    fontFamily: 'STHeitiSC-Medium',
                    fontSize: 20,
                    fontWeight: 'normal',
                    color: '#262b2e',
                }
            },
            color: ['#3398DB'],
            barWidth: 14,
            xAxis: {
                type: 'category',
                axisTick: {
                    show:false
                },
                axisLine: {
                    lineStyle: {
                        width: 0.5,
                        color: '#cbcbcb',
                        type:'dashed'
                    }
                },
                axisLabel: {
                    margin: 13,
                    textStyle: {
                        color: '#4e4c4c'  
                    }
                },
                data: data.xAxis
            },
            yAxis: {
                name: '商品数',
                axisLine: {show:false},
                axisTick: {show:false},
                splitLine: {
                    lineStyle: {
                        width: 0.5,
                        color: '#cbcbcb',
                        type:'dashed'
                    }
                },
            },
            series: [{
                type: 'bar',
                data: data.series
            }]
       }
       pie.setOption(pieOpt)
       bar.setOption(barOpt)
    })

    // 底部数据
    const bottomData = [
        ['NEWS', 'CHANNELS', 'OVERVIEW', 'TIMELINE'],
        ['SPORT', 'CULTURE', 'NATURE', 'MUSIC'],
        ['WEATHER','AUTOS', 'LOCAL', 'SHOP'],
        ['FUTURE','FOOD', 'EARTH', 'TV'],
        ['TRAVEL','RADIO'],
    ]
    const bottomList =  $('.bottom-list')
    bottomData.forEach(item=>{
        const $ul = $('<ul/>')
        $ul.html(item.map(text=>`<li>${text}</li>`).join(''))
        bottomList.append($ul)
    })


})