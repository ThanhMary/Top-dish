APP = (()=>{
  let currentPage = 0;
  const divs = [$("#page1"), $("#page2"), $("#page3")];
  const nextPage = $("#nextPage");
  const prevPage = $("#prevPage");
  const init = ()=>{
    divs[0].removeClass("hidden");
    divs[1].removeClass("hidden");
    divs[2].removeClass("hidden");
    
    nextPage.click(()=>{
      if(currentPage === 2) return;
      currentPage += 1;
    divs.forEach((div,i)=>{
      console.log(i, currentPage);
      if(i=== currentPage){
        div.removeClass("hidden");
      }else {
        div.addClass("hidden")
      }
    }); 
    });
    prevPage.click(()=>{
      if(currentPage === 3) return;
      currentPage -= 1;
      divs.forEach((div,i)=>{
      console.log(i, currentPage);
      if(i=== currentPage){
        div.removeClass("hidden");
      }else {
        div.addClass("hidden")
      }
    }); 
    });
  };
  return {init};

})();

APP.init();