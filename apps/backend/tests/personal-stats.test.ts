import { PrismaClient } from "@prisma/client";
import {test} from "node:test";
import assert from "node:assert/strict";
import {once} from "node:events";
import app from "../src/app.js";
import {prisma} from "../src/db.js";
test("personal-stats persist updates and validate requests",async()=>{
 const server=app.listen(0,"127.0.0.1");await once(server,"listening");const address=server.address();if(!address||typeof address==="string")throw Error();
 const url="http://127.0.0.1:"+address.port+"/api/v1/personal-stats";
 await prisma.game.create({data:{name:"IntegrationProfileGame",genre:"Test",topPlayer:"Demo"}});
 const body={name:"IntegrationProfileGame",hoursPlayed:5.5,highestScore:0,rank:"Gold"}; let id:number|undefined;
 const call=(path="",method="GET",data?:unknown)=>fetch(url+path,{method,headers:data?{"Content-Type":"application/json"}:{},body:data?JSON.stringify(data):undefined});
 try{
  assert.equal((await call("","POST",{...body,hoursPlayed:-1})).status,400);
  const created=await call("","POST",body);assert.equal(created.status,201);id=(await created.json()).id;
  assert.equal((await call("","POST",body)).status,409);
  assert.equal((await call("/"+id,"PUT",{...body,hoursPlayed:7.5})).status,200);
  const rows=await(await call()).json();assert.ok(rows.some((row:{id:number})=>row.id===id));
  const connection = new PrismaClient();
  try { const saved = await connection.personalStat.findUniqueOrThrow({where:{id}}); assert.equal(saved.hoursPlayed, 7.5); } finally { await connection.$disconnect(); }
  const game = await prisma.game.findUniqueOrThrow({where:{name:body.name}});
  assert.equal((await fetch(url.replace("personal-stats", "games/")+game.id,{method:"DELETE"})).status,409);
  assert.equal((await call("/"+id,"DELETE")).status,204);id=undefined;
 }finally{if(id)await prisma.personalStat.deleteMany({where:{id}});await prisma.game.deleteMany({where:{name:"IntegrationProfileGame"}});await new Promise<void>(resolve=>server.close(()=>resolve()));await prisma.$disconnect();}
});
