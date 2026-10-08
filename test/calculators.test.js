import test from 'node:test';
import assert from 'node:assert/strict';
import {registry} from '../site/registry.js';
import {allocate} from '../site/lib/helpers.js';

test('all 17 published routes have a unique feature module and meaningful result', async()=>{
  assert.equal(registry.length,17);
  assert.equal(new Set(registry.map(x=>x.slug)).size,17);
  for(const item of registry){
    const feature=await import(`../site/features/${item.slug}.js`);
    assert.ok(feature.fields.length>0,item.slug);
    assert.ok(feature.methodology.length>60,item.slug);
    const values=Object.fromEntries(feature.fields.map(f=>[f.key,f.value]));
    if(item.slug==='leftover-expiration'){const date=new Date(Date.now()-86400000);values.cooked=date.toISOString().slice(0,16);values.refrigerated=new Date(+date+3600000).toISOString().slice(0,16)}
    const output=feature.calculate(values);
    assert.ok(output.primary&&output.summary&&output.breakdown.length>0,item.slug);
    assert.ok(output.breakdown.every(([label,value])=>label&&value!==undefined&&!Number.isNaN(value)),item.slug);
  }
});
test('money allocation reconciles odd cents deterministically',()=>{
  assert.deepEqual(allocate(101,[1,1,1]),[34,34,33]);
  assert.equal(allocate(1001,[2,3,4]).reduce((a,b)=>a+b),1001);
});
test('itemized dinner split reconciles bill to the cent',async()=>{
  const {calculate}=await import('../site/features/dinner-split.js');
  const r=calculate({people:'A\nB\nC',items:'Starter | 10.01 | A,B,C\nMain | 7.99 | A',tax:1.03,service:0,tip:2.01,mode:'itemized'});
  const shares=r.chart.map(x=>x[1]);
  assert.equal(Math.round(shares.reduce((a,b)=>a+b,0)*100),2104);
  assert.equal(r.primary,'21.04 total bill');
});
test('episode calculation crosses midnight',async()=>{
  const {calculate}=await import('../site/features/one-more-episode.js');
  const r=calculate({now:'23:30',bedtime:'23:45',episode:45,count:1,sleepLatency:15,wake:'07:00',preferred:8,existing:0});
  assert.equal(r.breakdown.find(x=>x[0]==='New bedtime')[1],'00:15');
  assert.equal(r.breakdown.find(x=>x[0]==='Sleep opportunity lost')[1],'30 min');
});
test('grocery waste can reverse nominal bulk discount',async()=>{
  const {calculate}=await import('../site/features/grocery-waste.js');
  const r=calculate({smallPrice:4,smallQty:1,bulkPrice:10,bulkQty:3,rate:.1,shelf:10,waste:0,storage:'refrigerated'});
  assert.match(r.primary,/Small package/);
});
test('food guidance flags extended unrefrigerated time and rejects future dates',async()=>{
  const {calculate}=await import('../site/features/leftover-expiration.js');
  const date=new Date(Date.now()-86400000),cooked=date.toISOString().slice(0,16),refrigerated=new Date(+date+10800000).toISOString().slice(0,16);
  assert.match(calculate({food:'cooked leftovers',cooked,refrigerated,temperature:4,unrefrigerated:3,container:'shallow sealed'}).primary,/Discard/);
  assert.throws(()=>calculate({food:'cooked leftovers',cooked:'2099-01-01T00:00',refrigerated:'2099-01-01T01:00',temperature:4,unrefrigerated:1,container:'shallow sealed'}));
});
