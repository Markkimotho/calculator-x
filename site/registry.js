export const categories = ['Time & Productivity','Shopping & Choices','Career & Working Life','Mental Energy & Wellness','Home & Lifestyle','Social & Relational'];
export const registry = [
['should-i-pay-someone','Should I Just Pay Someone?','Time & Productivity','Compare DIY effort with hiring help.','◷','diy outsource task'],
['one-more-episode','One More Episode Sleep Debt Predictor','Time & Productivity','See the sleep opportunity behind one more episode.','☾','sleep bedtime television'],
['subscription-bloat','Subscription Bloat Lifespan Calculator','Time & Productivity','See what recurring charges add up to.','↻','monthly annual subscriptions'],
['internet-rabbit-hole','Internet Rabbit Hole Opportunity Cost Tracker','Time & Productivity','Know when researching a deal stops paying off.','⌕','research shopping time'],
['cost-per-use-wardrobe','Cost-Per-Use Wardrobe Predictor','Shopping & Choices','Estimate the real cost of every wear.','♧','clothes clothing purchase'],
['grocery-waste','Grocery Unit Price vs. Waste Calculator','Shopping & Choices','Compare package value after food waste.','◒','bulk food unit price'],
['decision-comparison','Decision Comparison Calculator','Shopping & Choices','Score options against criteria you choose.','⚖','weighted options choice'],
['meeting-cost','Meeting That Could Have Been an Email Invoice Generator','Career & Working Life','Turn meeting time into a transparent invoice.','▤','salary attendees work'],
['commute-vs-raise','Is This Commute Killing My Raise?','Career & Working Life','Compare jobs after commute time and costs.','⇄','job salary transport'],
['impostor-syndrome','Impostor Syndrome Reality Check','Career & Working Life','Compare self-doubt with documented evidence.','✦','skills qualifications confidence'],
['decision-fatigue','Decision Fatigue Meter','Mental Energy & Wellness','Check in on your decision load and energy.','◫','decisions breaks energy'],
['are-they-mad-at-me','Are They Actually Mad at Me? Text Analyzer','Mental Energy & Wellness','Read an ambiguous text with more perspective.','♡','message communication context'],
['brain-fog-recovery','Brain Fog Recovery Timeline','Mental Energy & Wellness','Plan rest and track your own energy.','☼','sleep water screen breaks'],
['will-it-fit','Will It Fit Around the Corner? Geometry Helper','Home & Lifestyle','Check furniture, doorway, and corner clearances.','▱','furniture hallway door geometry'],
['leftover-expiration','Leftover Expiration Roulette Predictor','Home & Lifestyle','Review storage timelines and warning conditions.','◴','food safety fridge storage'],
['social-battery','Social Battery Depletion Estimator','Social & Relational','Plan an event around your personal comfort window.','◌','social event energy breaks'],
['dinner-split','Group Dinner Split-Bill Fairness Index','Social & Relational','Split a bill exactly by orders and shared costs.','÷','restaurant tax tip participants']
].map(([slug,name,category,description,icon,keywords],i)=>({id:`X${String(i+1).padStart(2,'0')}`,slug,name,category,description,icon,keywords,route:`/calculators/${slug}/`,status:'published'}));
export const bySlug = Object.fromEntries(registry.map(x=>[x.slug,x]));
