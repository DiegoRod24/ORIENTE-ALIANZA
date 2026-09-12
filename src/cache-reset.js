const OA_CACHE_FIX='oriente-alianza-cache-fix-061';

(async()=>{
  try{
    if(localStorage.getItem(OA_CACHE_FIX)==='1') return;
    if('serviceWorker' in navigator){
      const regs=await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(r=>r.unregister().catch(()=>false)));
    }
    if('caches' in window){
      const keys=await caches.keys();
      await Promise.all(keys.filter(k=>k.startsWith('oriente-alianza-')).map(k=>caches.delete(k)));
    }
    localStorage.setItem(OA_CACHE_FIX,'1');
    const url=new URL(location.href);
    if(url.searchParams.get('v')!=='061'){
      url.searchParams.set('v','061');
      location.replace(url.toString());
    }
  }catch(err){console.warn('Cache reset omitido',err)}
})();
