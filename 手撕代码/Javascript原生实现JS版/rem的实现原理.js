function setRem(){
    let doc=document.documentElement;
    let width=doc.getBoundingClientRect().width;
    let rem=width/75
    doc.style.fontsize=rem+'px';
}
addEventListener("resize",setRem);