const express = require("express");
const server = express();
server.listen(3000,()=>{
    console.log("server listening at port-3000");
});
let room=[];
let bookroom=[];
let customers=[];


server.post('/createroom/:id/:roomname/:seatsavailability/:amenities/:price_per_hr',(req,res)=>{
let id = req.params.id;
let roomname = req.params.roomname;
let seatavailable =parseInt(req.params.seatsavailability);
let amenities = json.parse(req.params.amenities);
let price_per_hr = req.params.price_per_hr;
let roomobj = {id,roomname,seatavailable,amenities,price_per_hr,bookedstatus:false};
room.push(roomobj);
console.log(room);
res.status(200).json({
    message:'room created',
    roomObj:roomobj
})
});

server.get("/showrooms",(req,res)=>{
    res.send(room);
    console.log(room);
});

server.post("/bookroom/:name/:date/:start/:end/:roomid",(req,res)=>{
    let flag = false;
    for(i=0;i<room.length;i++){
        if(req.params.roomid === room[i].id && room[i].seatavailable>0 ){
            flag = true;
            let roombookobj={
                customername:req.params.name,
                roomname : room[i].roomname,
                date : req.params.date,
                start:req.params.start,
                end:req.params.end,
                roomid:req.params.roomid,
                bookedstatus:true
            };
            let customerobj={
                customername:req.params.name,
                roomname:room[i].roomname,
                date:req.params.date,
                start:req.params.start,
                end:req.params.end
            };
            bookroom.push(roombookobj);
            customers.push(customerobj);
            res.status(200).json({
                'message':'room booked!',
                roombookobj,
            })
        }
    }
    if(flag == false){
        res.send("Cannot book room all places full! Please try later");
    }
});

server.get('/showbookedrooms',(req,res)=>{
    res.send(bookroom);
});

server.get('/showcustomer',(req,res)=>{
    res.send(customers);
});