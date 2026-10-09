import {createServer} from 'node:http';
import {readFile, stat} from 'node:fs/promises';
import {resolve, sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {registry} from './site/registry.js';

const siteRoot = resolve(fileURLToPath(new URL('./site/', import.meta.url)));
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon'};
const extension = path => path.slice(path.lastIndexOf('.'));
const host = req => {
  const value=String(req.headers.host||'').toLowerCase();
  return /^[a-z0-9.-]+(?::\d{1,5})?$/.test(value)?value:'localhost';
};
const origin = req => process.env.PUBLIC_ORIGIN || `${host(req).startsWith('localhost')?'http':'https'}://${host(req)}`;
const send = (res,status,content,type='text/plain; charset=utf-8',head=false) => {
  res.writeHead(status,{'Content-Type':type,'Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});
  res.end(head?undefined:content);
};
export function createApp(){return createServer(async(req,res)=>{
  const head=req.method==='HEAD';
  if(req.method!=='GET'&&!head){send(res,405,'Method not allowed');return}
  let path;
  try{path=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{send(res,400,'Invalid URL');return}
  if(path==='/api/health'){send(res,200,JSON.stringify({status:'ok'}),'application/json; charset=utf-8',head);return}
  if(path==='/api/catalog'){send(res,200,JSON.stringify(registry),'application/json; charset=utf-8',head);return}
  const target=resolve(siteRoot,`.${path}`);
  if(target!==siteRoot&&!target.startsWith(siteRoot+sep)){send(res,404,'Not found');return}
  try{
    const info=await stat(target);
    if(info.isDirectory()&&!path.endsWith('/')){res.writeHead(308,{Location:path+'/'});res.end();return}
    const file=info.isDirectory()?resolve(target,'index.html'):target;
    const body=await readFile(file);
    const kind=types[extension(file)]||'application/octet-stream';
    if(file.endsWith('.html')||file.endsWith('sitemap.xml')||file.endsWith('robots.txt')){
      const currentOrigin=origin(req);
      const text=body.toString('utf8').replaceAll('https://markkimotho.github.io/calculator-x/',currentOrigin+'/');
      send(res,200,text,kind,head);
    }else send(res,200,body,kind,head);
  }catch{send(res,404,'Not found')}
})}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const port=Number(process.env.PORT)||10000;
  createApp().listen(port,'0.0.0.0',()=>console.log(`Calculator X listening on ${port}`));
}
