
function AddSlots(event){
    for (i=0;i<42;i++){
        let newSlot = document.createElement("section")
        newSlot.className = "key"
        newSlot.id = "slot"+i
        document.getElementsByClassName("gameBase")[0].appendChild(newSlot);
    }
    document.getElementById("slot34").style.backgroundColor = "red"
}

function AddButtons(event){
    for (i=0;i<7;i++){
        let newSlot = document.createElement("section")
        newSlot.className = "key"
        newSlot.id = "Button"+i
        newSlot.innerHTML = i
        notePress(newSlot)
        document.getElementsByClassName("buttonBase")[0].appendChild(newSlot);
    }
}

window.addEventListener("load", AddSlots)
window.addEventListener("load", AddButtons)

function keyPlay(event){
  event.target.style.backgroundColor = "lightgray"
}
function keyReturn(event){
  event.target.style.backgroundColor = ""
}

function notePress(note){
  note.onmousedown = keyPlay;
  note.onmouseup = keyReturn;
}