// Add future release titles here. Empty URLs show a short "coming soon" message.
const ADDITIONAL_RELEASES = [
  // {title: {en: 'Title', fa: 'عنوان'}, url: '', cover: ''}
];
// Paste the remaining platform URLs here when they are ready.
const MUSIC_PLATFORM_URLS = {
  appleMusic: '',
  facebook: '',
  instagram: SITE_CONFIG.socials.instagram,
  spotify: SITE_CONFIG.socials.spotify,
  tiktok: '',
  website: SITE_CONFIG.socials.all,
  youtube: SITE_CONFIG.socials.youtube
};

function initMusicLinks(){
  const section=document.getElementById('music');
  const list=section.querySelector('.releaseGrid');
  const status=document.getElementById('musicLinkStatus');
  const icons={
    appleMusic:'<rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor"/><path d="M10 16V7l8-1v9M10 10l8-1" fill="none" stroke="var(--music-bg)" stroke-width="2"/><ellipse cx="8" cy="17" rx="3" ry="2" fill="var(--music-bg)"/><ellipse cx="16" cy="16" rx="3" ry="2" fill="var(--music-bg)"/>',
    facebook:'<circle cx="12" cy="12" r="11" fill="currentColor"/><path d="M14 22v-8h3l.5-4H14V8c0-1 .4-2 2-2h2V2.5c-.6-.2-2-.3-3-.3-3 0-5 1.8-5 5V10H7v4h3v8" fill="var(--music-bg)"/>',
    instagram:'<rect x="2.5" y="2.5" width="19" height="19" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="6" r="1.3" fill="currentColor"/>',
    spotify:'<circle cx="12" cy="12" r="11" fill="currentColor"/><g fill="none" stroke="var(--music-bg)" stroke-linecap="round"><path d="M5.5 9c4-1.5 9-1.3 13 1" stroke-width="2.2"/><path d="M6.4 12.5c3.4-1.1 7.5-.8 11 1" stroke-width="1.9"/><path d="M7.2 16c3-.8 6.3-.5 9 1" stroke-width="1.6"/></g>',
    tiktok:'<path fill="currentColor" d="M16.5 2h-4v13.1a3.1 3.1 0 1 1-2.6-3.1V8A7.1 7.1 0 1 0 16.5 15V8.8c1.5 1 3.2 1.6 5 1.6V6.5c-2.8-.2-4.7-2-5-4.5Z"/>',
    website:'<g fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4.4" ry="10"/><path d="M2 12h20M4.5 6h15M4.5 18h15"/></g>',
    youtube:'<rect x="1" y="4" width="22" height="16" rx="5" fill="currentColor"/><path d="m10 8 6 4-6 4Z" fill="var(--music-bg)"/>'
  };
  const names={appleMusic:'Apple Music',facebook:'Facebook',instagram:'Instagram',spotify:'Spotify',tiktok:'TikTok',website:'Website',youtube:'YouTube'};
  function announce(name){
    status.textContent=document.documentElement.lang==='fa'?'لینک '+name+' به‌زودی اضافه می‌شود.':name+' link will be added soon.';
  }
  const nav=section.querySelector('.musicPlatforms');
  for(const key of Object.keys(icons)){
    const url=MUSIC_PLATFORM_URLS[key];
    const control=document.createElement(validUrl(url)?'a':'button');
    if(control.tagName==='A'){
      control.href=url;control.target='_blank';control.rel='noopener noreferrer';
    }else{
      control.type='button';control.addEventListener('click',()=>announce(names[key]));
    }
    control.className='musicPlatform';
    control.setAttribute('aria-label',names[key]);
    control.title=names[key];
    control.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">'+icons[key]+'</svg>';
    nav.append(control);
  }
  for(const release of ADDITIONAL_RELEASES){
    const row=document.createElement('article');row.className='releaseCard musicExtra';
    const title=document.createElement('h3');
    const content=document.createElement('div');content.append(title);
    const control=document.createElement(validUrl(release.url)?'a':'button');control.className='musicListen';
    if(control.tagName==='A'){
      control.href=release.url;control.target='_blank';control.rel='noopener noreferrer';
    }else{control.type='button';control.onclick=()=>announce(title.textContent)}
    control.textContent='›';
    row.append(content,control);
    if(release.cover){const img=document.createElement('img');img.src=release.cover;img.alt='';img.loading='lazy';row.prepend(img)}
    function update(){
      const lang=document.documentElement.lang;
      title.textContent=typeof release.title==='string'?release.title:release.title[lang];
      control.setAttribute('aria-label',title.textContent);
    }
    new MutationObserver(update).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    update();list.append(row);
  }
  new MutationObserver(()=>{status.textContent=''}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
}
initMusicLinks();
