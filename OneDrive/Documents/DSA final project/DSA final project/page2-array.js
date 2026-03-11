const visualizer = document.getElementById("dav-visualizer");
const lenInput = document.getElementById("dav-len");
const createBtn = document.getElementById("dav-create");
const opsSection = document.getElementById("dav-operations");
const inputSection = document.getElementById("dav-input-section");
const lenDisplay = document.getElementById("dav-length");
const sortType = document.getElementById("sort-type");
const sortBtn = document.getElementById("sort-btn");

let arr = [];
let maxLen = 0;

// RENDER FUNCTION
function render() {
  visualizer.innerHTML = "";
  lenDisplay.textContent = `Array Length: ${arr.length} / ${maxLen}`;
  arr.forEach((val, i) => {
    const div = document.createElement("div");
    div.className = "dav-item";
    div.innerHTML = `<div>${val}</div><div class="dav-index">${i}</div>`;
    visualizer.appendChild(div);
  });
}

// CREATE ARRAY
createBtn.onclick = () => {
  const n = parseInt(lenInput.value);
  if (isNaN(n) || n <= 0) return alert("Enter valid length");
  maxLen = n;
  arr = [];
  render();
  document.getElementById("dav-length-section").classList.add("dav-hidden");
  opsSection.classList.remove("dav-hidden");
};

// UTILS
function message(msg) { alert(msg); }
function delay(ms){ return new Promise(res=>setTimeout(res,ms)); }

// DYNAMIC INPUT SECTION HANDLER
function showInputs(type){
  inputSection.innerHTML="";
  let html="";
  if(type==="insert") html=`<input id="val" class="dav-input" placeholder="Element">
                            <input id="idx" class="dav-input" type="number" min="0" placeholder="Index">
                            <button class="dav-btn dav-primary" id="doInsert">Insert</button>`;
  if(type==="delete") html=`<input id="val" class="dav-input" placeholder="Element (optional)">
                            <input id="idx" class="dav-input" type="number" min="0" placeholder="Index">
                            <button class="dav-btn dav-primary" id="doDelete">Delete</button>`;
  if(type==="update") html=`<input id="val" class="dav-input" placeholder="New Value">
                            <input id="idx" class="dav-input" type="number" min="0" placeholder="Index">
                            <button class="dav-btn dav-primary" id="doUpdate">Update</button>`;
  if(type==="search") html=`<input id="val" class="dav-input" placeholder="Element">
                            <button class="dav-btn dav-primary" id="doSearch">Search</button>`;
  inputSection.innerHTML=html;
}

// EVENT BUTTONS
document.getElementById("op-insert").onclick=()=>showInputs("insert");
document.getElementById("op-delete").onclick=()=>showInputs("delete");
document.getElementById("op-update").onclick=()=>showInputs("update");
document.getElementById("op-search").onclick=()=>showInputs("search");

// ACTIONS
inputSection.addEventListener("click", async (e)=>{
  if(e.target.id==="doInsert"){
    const val=document.getElementById("val").value.trim();
    const idx=parseInt(document.getElementById("idx").value);
    if(val===""||isNaN(idx)) return message("Invalid input");
    if(arr.length>=maxLen) return message("Array Overflow!");
    if(idx<0||idx>arr.length) return message("Index out of bounds!");
    arr.splice(idx,0,val);
    render();
  }

  if(e.target.id==="doDelete"){
    const val=document.getElementById("val").value.trim();
    const idx=document.getElementById("idx").value;
    if(arr.length===0) return message("Array Underflow!");
    if(val!==""){
      const pos=arr.indexOf(val);
      if(pos===-1) return message("Element not found");
      arr.splice(pos,1);
    } else if(idx!==""){
      const i=parseInt(idx);
      if(i<0||i>=arr.length) return message("Index out of bounds!");
      arr.splice(i,1);
    }
    render();
  }

  if(e.target.id==="doUpdate"){
    const val=document.getElementById("val").value.trim();
    const idx=parseInt(document.getElementById("idx").value);
    if(val===""||isNaN(idx)||idx<0||idx>=arr.length) return message("Invalid input");
    arr[idx]=val;
    render();
  }

  if(e.target.id==="doSearch"){
    const val=document.getElementById("val").value.trim();
    if(val==="") return message("Enter element to search");
    const items=visualizer.children;
    for(let i=0;i<arr.length;i++){
      items[i].classList.add("highlight");
      await delay(400);
      if(arr[i]==val){
        items[i].classList.add("found");
        message(`Element found at index ${i}`);
        break;
      }
      items[i].classList.remove("highlight");
    }
  }
});

// SORTING
sortBtn.onclick=()=> {
  const type=sortType.value;
  if(!type) return message("Select sorting type");
  if(type==="bubble") bubbleSort();
  if(type==="selection") selectionSort();
  if(type==="insertion") insertionSort();
  if(type==="quick") quickSortDriver();
};

async function bubbleSort(){
  for(let i=0;i<arr.length-1;i++){
    for(let j=0;j<arr.length-i-1;j++){
      const items=visualizer.children;
      items[j].classList.add("highlight");
      items[j+1].classList.add("highlight");
      await delay(200);
      if(Number(arr[j])>Number(arr[j+1])) [arr[j],arr[j+1]]=[arr[j+1],arr[j]];
      render();
      await delay(100);
      items[j].classList.remove("highlight");
      items[j+1].classList.remove("highlight");
    }
  }
  render();
}

async function selectionSort(){
  for(let i=0;i<arr.length-1;i++){
    let min=i;
    for(let j=i+1;j<arr.length;j++){
      if(Number(arr[j])<Number(arr[min])) min=j;
    }
    [arr[i],arr[min]]=[arr[min],arr[i]];
    render(); await delay(300);
  }
}

async function insertionSort(){
  for(let i=1;i<arr.length;i++){
    let key=Number(arr[i]),j=i-1;
    while(j>=0 && Number(arr[j])>key){
      arr[j+1]=arr[j]; j--;
      render(); await delay(200);
    }
    arr[j+1]=key;
    render(); await delay(200);
  }
}

async function quickSortDriver(){
  await quickSort(0,arr.length-1);
  render();
}

async function quickSort(low,high){
  if(low<high){
    let p=await partition(low,high);
    await quickSort(low,p-1);
    await quickSort(p+1,high);
  }
}

async function partition(low,high){
  let pivot=Number(arr[high]);
  let i=low-1;
  for(let j=low;j<high;j++){
    if(Number(arr[j])<pivot){
      i++; [arr[i],arr[j]]=[arr[j],arr[i]];
      render(); await delay(200);
    }
  }
  [arr[i+1],arr[high]]=[arr[high],arr[i+1]];
  render(); await delay(200);
  return i+1;
}
