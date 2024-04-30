
const express=require('express');
const bodyParser=require('body-parser');
const mysql=require('mysql2');

const cors=require('cors');

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors({
    origin:"*"
}))

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'B@tr$$*2022',
    database:'employeedb'
});

connection.connect((err)=>{

    if(err){
        console.log(err);
    }else{
        console.log('db connected ....')
    }

});

app.get("/getAllEmp",(req,res)=>{

    connection.query("select * from employee",(err,result)=>{

        if(err){
            console.log(err)
        }else{
            
            setTimeout(()=> res.status(200).json(result),0)
           
        }
    })
});

app.get("/checkId/:id",(req,res)=>{

    let {id} =req.params;

    connection.query("select count(id) count from employee where id=?",[id],
    (err,result)=>{

        if(err){
            console.log(err)
        }else{
            res.status(200).json(result[0])
        }

    })
})

app.post("/regEmp",(req,res)=>{

    let{id,name,salary}=req.body;

    connection.query("insert into employee values(?,?,?)",
    [id,name,salary],(err,result)=>{

        if(err){
           res.status(400).json({status:"duplicate id"});
        }else{
            res.status(201).json({status:'employee registered'})
        }

    })


});

app.get("/checkName/:name",(req,res)=>{

    let {name}=req.params;

    connection.query("select count(name) count from user where name=?",
    [name],(err,result)=>{

        if(err){
            console.log(err)
        }else{
            res.status(200).json(result[0])
        }

    })

})


app.get("/searchEmp/:id",(req,res)=>{

    let {id}=req.params;

    connection.query("select * from employee where id=?",[id]
    ,(err,result)=>{

        if(err){
            console.log(err);
        }else{

            if(result.length>0){
                res.status(200).json(result[0]);
            }else{
                res.status(404).json({status:false});
            }

        }

    })
})

app.delete("/deleteEmp/:id",(req,res)=>{

    let {id}=req.params;

     connection.query("delete from employee where id=?",
     [id],(err,result)=>{

        if(err){
            console.log(err)
        }else{

        if(result.affectedRows>0){
            res.status(200).json({status:true})
        }else{
            res.status(404).json({status:false});
        }

        }

     })


})

app.post("/auth",(req,res)=>{
    let {name,password}=req.body;

    connection.query("select password from user where name=?"
    ,[name],(err,result)=>{
        if(err){
            console.log(err);
        }else{
          if(result.length>0 && result[0].password==password){
            res.status(200).json({status:true});
          }else{
            res.status(400).json({status:false});
          }

        }
    })
})

app.listen(5001,()=>console.log("server connected on 5001"))

