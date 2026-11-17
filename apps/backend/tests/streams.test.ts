import {test} from "node:test";
import assert from "node:assert/strict";
import {once} from "node:events";
import app from "../src/app.js";
import {prisma} from "../src/db.js";
test("streams persist updates and validate requests",async()=>{
 const server=app.listen(0,"127.0.0.1");await once(server,"listening");const address=server.address();if(!address||typeof address==="string")throw Error();
 const url="http://127.0.0.1:"+address.port+"/api/v1/streams";
 const label="Test"+Date.now();
 const body={gameId:1,title:label,platform:"Twitch"}; let id:number|undefined;
 const call=(path="",method="GET",data?:unknown)=>fetch(url+path,{method,headers:data?{"Content-Type":"application/json"}:{},body:data?JSON.stringify(data):undefined});
 try{
  assert.equal((await call("","POST",{...body,platform:"Invalid"})).status,400);
  const created=await call("","POST",body);assert.equal(created.status,201);id=(await created.json()).id;
  assert.equal((await call("","POST",body)).status,409);
  assert.equal((await call("/"+id,"PUT",{...body,title:label+" edited"})).status,200);
  const rows=await(await call()).json();assert.ok(rows.some((row:{id:number})=>row.id===id));
  assert.ok(await prisma.stream.findUnique({where:{id}}));
  assert.equal((await call("/"+id,"DELETE")).status,204);id=undefined;
 }finally{if(id)await prisma.stream.deleteMany({where:{id}});await new Promise<void>(resolve=>server.close(()=>resolve()));await prisma.$disconnect();}
});
