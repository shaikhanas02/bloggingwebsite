addbtn = document.getElementById("addbtn"),
popupBox = document.querySelector(".popup-box"),
popupTitle = popupBox.querySelector("header p"),
closeIcon = popupBox.querySelector("header i"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),
closeIcon = popupBox.querySelector("header i"),
Publish = document.querySelector(".Publish") ,
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),
Cancel = document.querySelector(".Cancel") ,
//Delete = document.querySelector(".Delete") ,
addBox = document.querySelector(".add-box");


//Delete.addEventListener('click', deleteNote) ;

addbtn.addEventListener("click", () => {
    popupTitle.innerText = "Add a new Note";
    Publish.innerText = "Publish Post";
    Cancel.innerText = "Cancel Post";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    if(window.innerWidth > 660) titleTag.focus();
   Cancel.addEventListener('click',close);

});
Cancel.addEventListener('click', ()=>{
    if(Cancel.innerText.includes("Cancel")) {close()} 
    else deleteNote() ;
})

closeIcon.addEventListener("click", close) ;
function close(){
    isUpdate = false;
    titleTag.value = descTag.value = "";
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
}; 
//Cancel.addEventListener("click", close); 

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

function deleteNote(noteId) {

    //let confirmDel = confirm("Are you sure you want to delete this note?");
    //if(!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}
function updateNote(noteId, title, filterDesc) {
    let description = filterDesc.replaceAll('<br/>', '\r\n');
    updateId = noteId;
    isUpdate = true;
 addbtn.click(); 
    titleTag.value = title;
    descTag.value = description;
    popupTitle.innerText = "Update a Note";
    Publish.innerText = "Save Post";
    Cancel.innerText = "Delete Post"
    Cancel.addEventListener('click',deleteNote);
   }

 let date = new Date();
    let time = date.getHours() + ":" + date.getMinutes() + " PM";
    let d = date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
    let final = "Created At :" + d + " at " + time;
    console.log(final);
function showNotes() {
    if(!notes) return;
   
    document.querySelectorAll(".note").forEach(li => li.remove());
    notes.forEach((note, id) => {
        let filterDesc = note.description.replaceAll("\n", '<br/>');
        let liTag = `<li class="note">
                        <div class="details">
                            <h1>${note.title}</h1>
                            <span>${note.description}</span> 

                            <div class='bottom-content'>
                            <div style= "margin-top: 50px" class="menu">
                                    <button style = "width: 150px; height: 40px" onclick="updateNote(${id}, '${note.title}', '${filterDesc}')"><i class="uil uil-pen"></i>Edit Post</button>
                                    <button style = "width: 150px; height: 40px" onclick="deleteNote(${id})"><i class="uil uil-trash"></i>Delete Post</button>
                            <span style="margin-left: 600px">${final}</span> 

                                </div>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();
Publish.addEventListener("click", e => {
    e.preventDefault();
    let title = titleTag.value,
    description = descTag.value ;

    if(title || description) {
        let currentDate = new Date(),
        month = currentDate.getMonth(),
        day = currentDate.getDate(),
        year = currentDate.getFullYear();

        let noteInfo = {title, description, date: `${month} ${day}, ${year}`}
        if(!isUpdate) {
            notes.push(noteInfo);
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes(); 
        closeIcon.click();
    }
});