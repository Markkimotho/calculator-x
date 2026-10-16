import test from 'node:test';
import assert from 'node:assert/strict';
import {createApp} from '../server.js';

test('web server serves direct routes, SEO metadata, and health endpoint',async()=>{
  const server=createApp().listen(0,'127.0.0.1');
  await new Promise(resolve=>server.once('listening',resolve));
  const base=`http://127.0.0.1:${server.address().port}`;
  try{
    const health=await fetch(base+'/api/health');
    assert.equal(health.status,200);
    assert.deepEqual(await health.json(),{status:'ok'});
    const catalog=await fetch(base+'/api/catalog');
    assert.equal((await catalog.json()).length,17);
    const page=await fetch(base+'/calculators/dinner-split/');
    assert.equal(page.status,200);
    const canonicalOrigin=process.env.PUBLIC_ORIGIN||base.replace('http://127.0.0.1','https://127.0.0.1');
    assert.ok((await page.text()).includes(`href="${canonicalOrigin}/calculators/dinner-split/"`));
    const script=await fetch(base+'/features/dinner-split.js');
    assert.equal(script.status,200);
    assert.match(script.headers.get('content-type'),/javascript/);
    assert.equal((await fetch(base+'/missing')).status,404);
    assert.equal((await fetch(base+'/..%2fpackage.json')).status,404);
  }finally{await new Promise(resolve=>server.close(resolve))}
});
