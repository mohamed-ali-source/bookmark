var bookmarkName=document.querySelector("#bookmarkName");
var bookmarkURL=document.querySelector("#bookmarkURL");
var boxModal = document.querySelector(".box-info");
var closeBtn = document.getElementById("closeBtn");
var sites=[];
if(localStorage.getItem("saveSites")!==null){
    sites=JSON.parse(localStorage.getItem("saveSites"))
    displaySites()
}
function addSite(){
    if(
        validateInputs(bookmarkName)&&
        validateInputs(bookmarkURL)===true
    ){
        var site={
            nameSite:capNameSite(bookmarkName.value),
            urlSite:bookmarkURL.value
        }
        sites.push(site);
        localStorage.setItem("saveSites",JSON.stringify(sites))
        displaySites()
        clearForm()
    }else {
        boxModal.classList.remove("d-none");
    }
}
function displaySites(){
    var cartona=``;
    for(let i=0; i<sites.length; i++){
        cartona+=`<tr>
                        <td>${i+1}</td>
                        <td>${sites[i].nameSite}</td>              
                        <td>
                        <button class="btn btn-visit" data-index="${i}">
                        <a href="${sites[i].urlSite}" target="blank" class="text-white text-decoration-none"><i class="fas fa-eye pe-2"></i>Visit</a>
                        </button>
                        </td>
                        <td>
                        <button class="btn btn-delete pe-2" onclick="deleteSite(${i})">
                            <i class="fas fa-trash-alt"></i>
                            Delete
                        </button>
                        </td>
                    </tr>`
                }
                document.getElementById("tableContent").innerHTML=cartona
}
function clearForm(){
    bookmarkName.value=null;
    bookmarkURL.value=null;

    bookmarkName.classList.remove("is-valid");
    bookmarkURL.classList.remove("is-valid");
}
function deleteSite(index){
    sites.splice(index,1)
    localStorage.setItem("saveSites",JSON.stringify(sites))
    displaySites()
}
function capNameSite(string) {
    var strArray = string.split("");
    strArray[0] = strArray[0].toUpperCase();
    return strArray.join("");
}
function visitSite(e) {
    var siteIndex = e.target.dataset.index;
    var regexUrl = /^https?:\/\//;
        if (regexUrl.test(sites[siteIndex].siteURL)) {
        open(sites[siteIndex].siteURL);
        } else {
        open(`https://${sites[siteIndex].siteURL}`);
        }
}
function validateInputs(element){
    var regex={
        bookmarkName: /^\w{3,}(\s+\w+)*$/,
        bookmarkURL: /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/
    }
    if(regex[element.id].test(element.value) == true){;
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        return true;
    }else{
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        return false;
    }
}
closeBtn.addEventListener("click", function(){
    boxModal.classList.add("d-none");
})
document.addEventListener("keydown", function (eventInfo) {
    if (eventInfo.key == "Escape") {
        boxModal.classList.add("d-none");
    }
});
document.addEventListener("click", function (eventInfo) {
    if (eventInfo.target.classList.contains("box-info")) {
        boxModal.classList.add("d-none");
    }
});