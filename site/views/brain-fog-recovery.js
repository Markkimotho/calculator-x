import {group,pick,highlight,details,title,timeline} from './shared.js';
import {num,esc,find} from '../ui/utils.js';
export const layout='timeline';export const mark='☼';export const formTitle='Map today, gently';export const lede='Use your own energy check-ins to plan rest, without a recovery countdown.';export const action='Plan my next check-in';
export const form=all=>`${group('Sleep & energy',pick(all,['sleep','target','energy']))}${group('Today so far',pick(all,['water','screen','work','breaks']))}${group('Your previous check-ins',pick(all,['history']),'Optional: one date and energy rating per line, separated by |.')}`;
export const preview=v=>`${title('A rest-first timeline')}${timeline([['NOW',`Energy ${esc(v.energy)}/10`],['SOON','A short pause'],['LATER','Check in again'],['TONIGHT',`${esc(v.target)} h sleep opportunity`]])}`;
export const result=r=>`${highlight('SLEEP SHORTFALL',r.primary,r.summary)}${details(r,['Screen time','Work time','Breaks taken','Previous check-ins'])}<div class="rest-rail">${timeline([['PAUSE','Take a short rest'],['CHECK IN','Notice your energy'],['PLAN','Protect tonight’s sleep']])}</div>`;
