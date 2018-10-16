
function getCurrentDate(){
    let date=new Date();
    let year=date.getFullYear();
    let month=date.getMonth()+1;
    let day=date.getDate();
    
    if(month<10){
        month='0'+month;
    }
    if(day<10){
        day='0'+day;
    }
    return `${year}-${month}-${day}`;
}

//监听滚动条位置，使用了闭包的写法封装了节流函数，实现了滚动条、点击事件的节流,优化了网页性能
//method:传入调用的方法名。mustRun:两者之间的间隔大于多少则必定执行.delay:如果点击过快，那么就设置一个定时器来触发函数。
function throttle(method,mustRun,delay){
    //scroll方法中当间隔时间大于2s，do somthing执行一次
    let timer;//使用闭包，缓存startTime
    let startTime = new Date();
    
    return function(){
        let curTime = new Date();
        if(curTime - startTime >= mustRun){//如果前后两次操作相隔时间超过mustRun,那么就会执行一次
//			        	console.log('立即执行了函数');
            method();
            startTime = curTime;//重置startTime
        }else{//操作间隔没有超过,那么就排队delay秒后执行一次
            clearTimeout(timer);
            timer=setTimeout(function(){
//			    console.log('延时执行了函数')
                method();
            },delay);
        }
    }
}


export default{
    getCurrentDate,
    throttle,
}