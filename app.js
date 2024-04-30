
let {Observable}=require('rxjs');

let p=new Promise((resolve,reject)=>{
    resolve("helo");
    resolve("world")
})


let ob$=new Observable(subscribe=>{
    
    subscribe.next("hello from observable");
    subscribe.next("world from observable");
})

ob$.subscribe({
    next:data=>console.log(data)
})