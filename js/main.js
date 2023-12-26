
var allSites = [];
var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");

if (localStorage.getItem("allSites") != null) {
  allSites = JSON.parse(localStorage.getItem("allSites"));
  displayAllsites();
}

var nameRegularEx = /^[a-zA-Z]{3,}$/;
function nameIsvaild(){
  if (nameRegularEx.test(siteName.value)){
    return true ;
  }else{
    return false ;
  }
}

var urlRegularEx = /^(www)/;
function urlIsvaild(){
  if (urlRegularEx.test(siteUrl.value)){
    return true ;
  }else{
    return false ;
  }
}

function addSite() {

  if (nameIsvaild() && urlIsvaild() ){
    var newSite = {
      siteName: siteName.value,
      siteUrl: siteUrl.value
    };
    allSites.push(newSite);
    localStorage.setItem("allSites", JSON.stringify(allSites))
    clearInput();
    console.log("new site added");
    displayAllsites();
     // this for when update site and choise add as a new site
    document.getElementById("buttons").innerHTML=`<button class=" btn btn-success " onclick="addSite();">subment</button>
    <button class=" btn btn-primary" onclick="clearInput();">clear</button>`;

  }else{
    alert(`site name or site url not vaild
    be sure that url like www.example.com
    be sure thta name 3 characters or more`)
  }

  

}

function clearInput() {
  siteName.value = "";
  siteUrl.value = "";
}

function displayAllsites() {
  var cartonna = "";
  for (var i = 0; i < allSites.length; i++) {
    cartonna += `
    <tr>
                    <td>${i + 1}</td>
                    <td>${allSites[i].siteName}</td>
                    <td><a href="https://${allSites[i].siteUrl}" target="_blank"><button class="btn btn-success"> <i class="fa-regular fa-eye"></i> visit</button></a></td>
                    <td>
                        <button class="btn btn-danger " onclick="deleteSite (${i});"> <i class="fa-regular fa-trash-can"></i> delete</button>
                        <button class="btn btn-warning " onclick="updateSite (${i});" ><i class="fa-solid fa-wrench"></i> update</button>
                    </td>
                </tr>`;
  }

  document.getElementById("table").innerHTML = cartonna;

}

function deleteSite(index) {
  allSites.splice(index, 1);
  localStorage.setItem("allSites", JSON.stringify(allSites));
  displayAllsites();

}

function searchSite() {
  cartonna = "";
  for (var i = 0; i < allSites.length; i++) {
    if (allSites[i].siteName.toLocaleLowerCase().trim().includes(document.getElementById("searchSite").value.toLocaleLowerCase().trim()) == true) {
      cartonna += `
      <tr>
                      <td>${i + 1}</td>
                      <td>${allSites[i].siteName}</td>
                      <td><a href="https://${allSites[i].siteUrl}" target="_blank"><button class="btn btn-success"> <i class="fa-regular fa-eye"></i> visit</button></a></td>
                      <td>
                          <button class="btn btn-danger " onclick="deleteSite (${i});"> <i class="fa-regular fa-trash-can"></i> delete</button>
                          <button class="btn btn-warning "><i class="fa-solid fa-wrench"></i> update</button>
                      </td>
                  </tr>`;

    }
  }
  document.getElementById("table").innerHTML = cartonna;
  console.log("function works ")
}

function updateSite(index) {
  siteName.value = allSites[index].siteName;
  siteUrl.value = allSites[index].siteUrl;
  document.getElementById("buttons").innerHTML=
  `<button class=" btn btn-warning" onclick="updating(${index})">update site </button>
  <button class=" btn btn-success " onclick="addSite();">add as a new site</button>
  <button class=" btn btn-primary" onclick="clearInput();">clear</button>
  `;
  
}

function updating(i){
  if (nameIsvaild() && urlIsvaild() ){
    allSites[i].siteName =siteName.value ;
  allSites[i].siteUrl =siteUrl.value ;
  clearInput();
  displayAllsites();
  localStorage.setItem("allSites",JSON.stringify(allSites))
  document.getElementById("buttons").innerHTML=`<button class=" btn btn-success " onclick="addSite();">subment</button>
  <button class=" btn btn-primary" onclick="clearInput();">clear</button>`;
  }else{
    alert(`site name or site url not vaild
    be sure that url like www.example.com
    be sure thta name 3 characters or more`)

  }
 

}