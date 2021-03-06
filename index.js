var dAdd = document.getElementById("add"),
    item = document.getElementById("item"),
    numOfItem = document.getElementById("numItem"),
    disp = document.getElementById("display"),
    dRemove = document.getElementById("remove"),
    closeButton = document.getElementById("close"),
    inventItems = document.getElementById("inventoryItems"),
    removeOpen = 0,
    addOpen = 1,
    searchOpen = 0,
    itemObj = {},
    itemArr = [],
    saveBtn = document.getElementById("saveToLs"),
    loadBtn = document.getElementById("loadLS"),
    closeHead = document.getElementById("closeHead"),
    closeHead1 = document.getElementById("closeHead1"),
    searchInp = document.getElementById("searchInp"),
    sAdd = document.getElementById("showAdd"),
    seRe = "",
    editIndiv = "",
    eqNum = document.getElementById("eqNum");

window.onload = function (){
  var savedJSON = localStorage.getItem('lsJSON');
  var saveJSONparsed = JSON.parse(savedJSON);
  //enumerate each item and its quantity
  for (var wKey in saveJSONparsed[0]){
    console.log(wKey.toUpperCase()+ ':', saveJSONparsed[0][wKey]);
    createItem(wKey, saveJSONparsed[0][wKey]);
  }
  if(addOpen == 1){
    sAdd.style.backgroundColor = "#293042";
    sAdd.style.color = "white"
  }
}

//-----START FUNCTION SECTION-----------

//to clear localStorage is needed
function clearLocal(){
  // Clears all data
  window.localStorage.clear();

  //Clears an nItem
  //window.localStorage.removeItem("item_name");
}

function saveIntoLS(){
  itemArr.push(itemObj);
  var myJSON = JSON.stringify(itemArr);
  localStorage.setItem('lsJSON', myJSON);
  saveBtn.style.backgroundColor = "#293042";
  saveBtn.style.color = "white";
  setTimeout(function(){
    saveBtn.style.backgroundColor = "white";
    saveBtn.style.color = "black";
  },200);
  alert("Changes Saved.");
}

function hideResPanel(sBtn){
  $("#dSearchRes").animate({bottom: "-250px"}, 400)

  setTimeout(function(){
    ((sBtn.parentNode).parentNode).removeChild(sBtn.parentNode);
  }, 350)

  seRe = "";
}

function removeThis(btn){
  divObj = $(btn.parentNode).attr('id');
  delete itemObj[divObj];

  $("#"+divObj).animate({height: "0px"}, 400)
  console.log("#"+divObj);

  setTimeout(function(){
    ((btn.parentNode).parentNode).removeChild(btn.parentNode);
  }, 350)
}

function toggleCloseButton(btn){
  var match = document.querySelectorAll(".close");
  var editMatch = document.querySelectorAll(".editHide");
  for(var i = 0; i<match.length; i++){
    match[i].style.display= btn;
    editMatch[i].style.display= btn;
  }

  if(addOpen > 0){
    $("#dInputs").hide(400);
    $("#dIcopy").hide(400);
    addOpen = 0;
    sAdd.style.backgroundColor = "white";
    sAdd.style.color = "black"
  }

  closeHead.style.display = btn;
  closeHead1.style.display = btn;
}

function createItem(iTv, nTv){
  //Add item to array
  itemObj[iTv] = nTv;

  nItem = document.createElement("div");
  nItem.className = "format";
  //give item name to id to help with removing the div
  nItem.id = iTv;
  nItem.innerHTML = "<button class='editHide' onclick='showEditWindow(this)'>Edit</Button><p class='fg'>"+iTv+"</p><p class='fg'>"+nTv+"</p><button class='close' class='fg' onclick='removeThis(this)'>X</button>";

  disp.appendChild(nItem);

}

function showEditWindow(iName){
  editIndiv = $(iName.parentNode).attr('id');
  eqNum.value = itemObj[editIndiv];
  
  $("#eqInnerDiv").show();
}

function showSearchEditWindow(){
  $("#eqInnerDiv").show();
}

function makeResPanel(dName, dNumber){
  document.getElementById("dSearchRes").innerHTML= "";
  nSdiv = document.createElement("div");
  nSdiv.className = "bottomPanel";
  nSdiv.innerHTML = "<p class='fg'>"+dName+"</p><p class='fg' id='seReNum'>"+dNumber+"</p><button class='botClose' class='fgf' onclick='showSearchEditWindow()'>Edit</Button><button class='botClose' class='fgf' onclick='hideResPanel(this)'>X</Button>"
  document.getElementById("dSearchRes").appendChild(nSdiv);
  $("#dSearchRes").animate({bottom: "0px"}, 400);
}

function makeNotFoundResPanel(){
  document.getElementById("dSearchRes").innerHTML= "";
  nSdiv = document.createElement("div");
  nSdiv.className = "bottomPanel";
  nSdiv.innerHTML = "<p class='mNFRP'>Sorry, no match found</p><button class='botClose' class='fgf' onclick='hideResPanel(this)'>X</Button>";
  document.getElementById("dSearchRes").appendChild(nSdiv);
  $("#dSearchRes").animate({bottom: "0px"}, 400);
}

function search(nameKey, theObj){
  var toReturn = "";
    for(var q = 0;q<Object.keys(theObj).length;q++){
      if(theObj[q] == nameKey){
        toReturn = theObj[q];
      }
    }
  return toReturn;
}

//-----END FUNCTION SECTION-----------

//-----START EVENT LISTENERS----------
$("#closeEditWindow").click(function(){
    $("#eqInnerDiv").hide();
});

$("#eqEnter").click(function (){
    if(seRe != ""){
      itemObj[seRe] = eqNum.value;

      disp.innerHTML = "";
      for (var tKey in itemObj){
          console.log(tKey.toUpperCase()+ ':', itemObj[tKey]);
          createItem(tKey, itemObj[tKey]);
      }
      $("#seReNum").text(eqNum.value);
      $("#eqInnerDiv").hide();
      $("#dSearchRes").animate({bottom: "0px"}, 400);
      $("#searchDiv").animate({bottom: "-120px"}, 399);
      $("#enableSearch").animate({bottom: "-3px"}, 400);

      //edit remove buttons go back to display None. *This changes them back to block

      var Match = document.querySelectorAll(".close");
      var editmatch = document.querySelectorAll(".editHide");
      for(var i = 0; i<Match.length; i++){
        Match[i].style.display= "block";
        editmatch[i].style.display= "block";
      }

      if(removeOpen == 0){
        toggleCloseButton("block");
        removeOpen++;
        dRemove.style.backgroundColor = "#293042";
        dRemove.style.color = "white"
      }
      seRe = "";
      console.log("eqENter IF");
    }
    else{
      itemObj[editIndiv] = eqNum.value;
      disp.innerHTML = "";
      for (var kKey in itemObj){
          console.log(kKey.toUpperCase()+ ':', itemObj[kKey]);
          createItem(kKey, itemObj[kKey]);
      }
      var Match = document.querySelectorAll(".close");
      var editmatch = document.querySelectorAll(".editHide");
      for(var i = 0; i<Match.length; i++){
        Match[i].style.display= "block";
        editmatch[i].style.display= "block";
      }
      $("#eqInnerDiv").hide();
    }
});

$("#enableSearch").click(function(){
  if(searchOpen == 0){
    $("#searchDiv").animate({bottom: "0px"}, 400);
    $("#enableSearch").animate({bottom: "121px"}, 399);
    searchOpen++
  }

  else if(searchOpen > 0){
    $("#searchDiv").animate({bottom: "-120px"}, 399);
    $("#enableSearch").animate({bottom: "-3px"}, 400);
    searchOpen = 0;
  }
});

$("#search").click(function (){
  var searchResult = search(searchInp.value, Object.getOwnPropertyNames(itemObj));

  if(searchResult == ""){
    makeNotFoundResPanel();
  }
  else{
    makeResPanel(searchResult, itemObj[searchResult]);
    seRe = searchResult;
    console.log(itemObj[searchResult]);
  }
})

$("#showAdd").click(function(){
  if(addOpen == 0){

    if(removeOpen > 0){
      toggleCloseButton("none");
      removeOpen = 0;
      dRemove.style.backgroundColor = "white";
      dRemove.style.color = "black"
    }

    $("#dInputs").show(400);
    $("#dIcopy").show(400);
    addOpen++;
    sAdd.style.backgroundColor = "#293042";
    sAdd.style.color = "white"
  }
  else if(addOpen > 0){
    $("#dInputs").hide(400);
    $("#dIcopy").hide(400);
    addOpen = 0;
    sAdd.style.backgroundColor = "white";
    sAdd.style.color = "black"
  }
});

saveBtn.addEventListener("click", function(){
  saveIntoLS()
});

dAdd.addEventListener("click", function(){
  if(item.value == "" || numOfItem.value == "" ){
    alert("Please fill in the empty fields.");
  }
  else{
    createItem(item.value, numOfItem.value);
    item.value= "";
    numOfItem.value= "";
  }
});

dRemove.addEventListener("click", function(){

  if(removeOpen == 0){
    toggleCloseButton("block");
    removeOpen++;
    dRemove.style.backgroundColor = "#293042";
    dRemove.style.color = "white"
  }
  else if(removeOpen > 0){
    toggleCloseButton("none");
    removeOpen = 0;
    dRemove.style.backgroundColor = "white";
    dRemove.style.color = "black"

  }
});

//-----END EVENT LISTENERS----------
