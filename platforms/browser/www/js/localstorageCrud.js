(function() {

    'use strict';
  
    var lastId = 0;
    var topWrapper = document.getElementById("top_wrapper");
    var btnSave = document.getElementById("save_top");
    var removeIcon;
    var updateIcon;
    var topList;
    // Initialize topList 
    // Add event to save button
    // Render the list
    function init() {
      if (!!(window.localStorage.getItem('topList'))) {
        topList = JSON.parse(window.localStorage.getItem('topList'));
      } else {
        topList = [];
      }
     btnSave.addEventListener('click', saveTop);
      showList();
    }
  
    //End Init
  
    //CRUD top
  
    function showList() {
      if (!!topList.length) {
        getLastTopId();
        for (var item in topList) {
          var top = topList[item];
          addTopToList(top);
        }
        syncEvents();
      }
      
    }
  
    function saveTop(event) {

      var top = {
        topId: lastId,
        topName: document.getElementById("top_name").value,
        topImg: document.getElementById("top_img").value
      };
      topList.push(top);
      syncTop();
      addTopToList(top);
      syncEvents();
      lastId++;
    }
  
    function addTopToList(top) {
  
      var removeIcon = document.createElement('span');
      var element = document.createElement('p');
      var updateIcon = document.createElement('span');
  
      removeIcon.innerHTML = "Delete |";
      removeIcon.className = "remove_item clickeable";
      removeIcon.setAttribute("title", "Remove");
  
      updateIcon.innerHTML = "Update |";
      updateIcon.className = "update_icon clickeable";
      updateIcon.setAttribute("title", "Update");
  
  
      element.appendChild(removeIcon);
      element.appendChild(updateIcon);
      element.setAttribute("id", top.topId);
      element.innerHTML += top.topName + "  " + top.topImg;
      topWrapper.appendChild(element);
    }
  
    function updateTop(event) {
  
      var topTag = event.currentTarget.parentNode;
      var topId = topTag.id;
      var topToUpdate = findTop(topId).top;
      var pos = findTop(topId).pos;
      if (!!topToUpdate) {
        var name = prompt("Top Name", topToUpdate.topName);
        var img = prompt("Top Image", topToUpdate.topImg);
        topToUpdate.topName = name;
        topToUpdate.topImg = img;
        topList[pos] = topToUpdate;
        topTag.lastChild.textContent = topToUpdate.topName;
        // topTag.lastChild.textContent = topToUpdate.topImg;
        syncTop();
      }
    }
  
    function removeTop(event) {
  
      var topToRemove = event.currentTarget.parentNode;
      var topId = topToRemove.id;
      topWrapper.removeChild(topToRemove);
      topList.forEach(function(value, i) {
        if (value.topId == topId) {
          topList.splice(i, 1);
        }
      })
  
      synctop();
    }
  
    // End CRUD
  
  
    //Common
  
    function syncTop() {
  
      window.localStorage.setItem('topList', JSON.stringify(topList));
      topList = JSON.parse(window.localStorage.getItem('topList'));
    }
  
    function getLastTopId() {
      var lastTop = topList[topList.length - 1];
      lastId = lastTop.topId + 1;
    }
  
    function syncEvents() {
  
      updateIcon = document.getElementsByClassName("update_icon");
      removeIcon = document.getElementsByClassName("remove_item");
      if (!!removeIcon.length) {
        for (var i = 0; i < removeIcon.length; i++) {
          removeIcon[i].addEventListener('click', removeTop);
        }
      }
      if (!!updateIcon.length) {
        for (var j = 0; j < updateIcon.length; j++) {
          updateIcon[j].addEventListener('click', updateTop);
        }
      }
    }
  
    function findTop(id) {
  
      var response = {
        top: '',
        pos: 0
      };
      topList.forEach(function(value, i) {
        if (value.topId == id) {
          response.top = value;
          response.pos = i;
        }
      });
  
      return response;
    }
  
    //End Common
  
  
    init();
  
  
  })();