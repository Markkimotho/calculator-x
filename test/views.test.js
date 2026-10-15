import test from 'node:test';
import assert from 'node:assert/strict';
import {registry} from '../site/registry.js';

test('all calculator routes have dedicated view modules and their own controls',async()=>{
 const layouts=new Set();
 for(const item of registry){
  const [feature,view]=await Promise.all([import(`../site/features/${item.slug}.js`),import(`../site/views/${item.slug}.js`)]);
  assert.equal(typeof view.form,'function',item.slug);
  assert.equal(typeof view.preview,'function',item.slug);
  assert.equal(typeof view.result,'function',item.slug);
  layouts.add(view.layout);
  const markup=view.form(feature.fields);
  for(const field of feature.fields)assert.match(markup,new RegExp(`name="${field.key}"`),`${item.slug}: ${field.key}`);
  const values=Object.fromEntries(feature.fields.map(f=>[f.key,f.value]));
  if(item.slug==='leftover-expiration'){
   const cooked=new Date(Date.now()-86400000);
   values.cooked=cooked.toISOString().slice(0,16);
   values.refrigerated=new Date(+cooked+3600000).toISOString().slice(0,16);
  }
  const result=feature.calculate(values);
  assert.ok(view.preview(values,result).length>50,item.slug);
  assert.ok(view.result(result,values).length>50,item.slug);
 }
 assert.ok(layouts.size>=8,'Calculator pages need varied compositions');
});
