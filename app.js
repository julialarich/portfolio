const dialog=document.querySelector('#case-dialog');
let opener;
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
 document.querySelectorAll('[data-project]').forEach(card=>{card.hidden=button.dataset.filter!=='Все'&&card.dataset.category!==button.dataset.filter;});
}));
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
 const p=projects.find(p=>p.id===button.dataset.project);opener=button;
 document.querySelector('#case-content').innerHTML=`<span class="case-tag">${p.client} / ${p.tag}</span><h2 id="case-title" class="case-title">${p.title}</h2><p class="case-copy">${p.text}</p>${p.task?`<p class="case-copy">Задача: ${p.task}</p>`:''}<p class="case-role">${p.role?'Моя роль — '+p.role:p.desc}</p><div class="case-images ${p.tag==='SMM'?'squares':''}">${p.images.map((src,i)=>`<figure><img src="${src}" alt="${p.title} — работа ${i+1}" loading="lazy"><figcaption>${p.title} / ${String(i+1).padStart(2,'0')}</figcaption></figure>`).join('')}</div>`;
 const content=document.querySelector('#case-content');
 const facts=document.createElement('div');facts.className='case-facts';
 for(const [label,value] of [['Контекст',[p.date,p.agency].filter(Boolean).join(' · ')],['Мой вклад',p.contribution],['Итог',p.outcome]]){
  if(!value)continue;const block=document.createElement('section');const heading=document.createElement('h3');heading.textContent=label;const copy=document.createElement('p');copy.textContent=value;block.append(heading,copy);facts.append(block);
 }
 content.querySelector('.case-images').replaceWith(facts);
 dialog.showModal();dialog.scrollTop=0;document.body.classList.add('no-scroll');
}));
document.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('no-scroll');opener?.focus();});
