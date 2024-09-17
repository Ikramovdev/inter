let elModalWrapper = document.querySelector(".modal-wrappper")
let elModalInner = document.querySelector(".modal-inner")
let elCatigoryList = document.querySelector(".catigory-list")
let elPoolList = document.querySelector(".pool-tbody")
let product = JSON.parse(localStorage.getItem("product")) || []

const active = "text-[#009398] text-[35px] font-bold leading-[40px] border-b-[2px] border-[#009398] pb-2 cursor-pointer"
const disabled = "text-[#A6A6A6] text-[35px] font-bold leading-[40px] border-b-[2px] border-transparent pb-2 cursor-pointer"


// add part start 
function handleAddProductBtn(){
    elModalWrapper.classList.remove("scale-0") 
    elModalInner.innerHTML = `
        <form class="add-product-form p-[41px]" autocomplete="off">
          <label class="block mb-[24px]"> 
            <input class="choose-input hidden" type="file">
            <img class="choose-img mx-auto object-contain rounded-md" src="./images/admin-none-img.png" alt="admin-none-img" width="550" height="300">
          </label>
          <div class="flex justify-between">
            <div class="w-[49%] space-y-5">
              <select class="w-full py-[14px] rounded-md outline-none pl-2 border-slate-500 border-[1px]" name="catigoryId">
                  <option value="1">Каркасные</option>
                  <option value="2">Надувные</option>
              </select>
                <input class="w-full py-3 rounded-md outline-none pl-2 border-slate-500 border-[1px]" type="number" name="oldPrice" placeholder="Стартая цена (сум) " required>
                <select class="w-full py-[14px] rounded-md outline-none pl-2 border-slate-500 border-[1px]" name="frame">
                  <option value="1">Прямоугольная</option>
                  <option value="2">Металлический</option>
                  <option value="3">Рамка призмы</option>
              </select>
            </div>
            <div class="w-[49%] space-y-5">
              <input class="w-full py-3 rounded-md outline-none pl-2 border-slate-500 border-[1px]" name="amount"  type="number" placeholder="Количество" required>
              <input class="w-full py-3 rounded-md outline-none pl-2 border-slate-500 border-[1px]" name="newPrice"  type="number" placeholder="Цена со скидкой (сум) " required>
            </div>
          </div>
         <button class="block mx-auto w-[237px] py-[7px] mt-[40px] font-bold text-center bg-[#3F8C8E] rounded-[25px] text-white text-[25px] leading-[29px]">Добавить</button>
        </form>
    `  

    let elAddproductForm = document.querySelector(".add-product-form")
    let elchooseInput = document.querySelector(".choose-input")
    let elchooseImg = document.querySelector(".choose-img")


    elchooseInput.addEventListener("change",function(e){
        elchooseImg.src = URL.createObjectURL(e.target.files[0])
        elchooseImg.classList.add("bg-white")
    })

    elAddproductForm.addEventListener("submit",function(e){
        e.preventDefault()
        const data = {
            id:product.length ? product[product.length -1].id + 1 : 1,
            imgUrl:elchooseImg.src,
            catigoryId:e.target.catigoryId.value,
            oldPrice:e.target.oldPrice.value,
            frame:e.target.frame.value,
            amount:e.target.amount.value,
            newPrice:e.target.newPrice.value,

        }
        e.target.lastElementChild.innerHTML = `
        <img class="mx-auto scale-[1.4]" src="./images/loading.png" alt="loading" width="40" height="40" />
        `
        setTimeout(()=>{
            e.target.lastElementChild.innerHTML = `Добавить`
            product.push(data)
            elModalWrapper.classList.add("scale-0")
            renderProducts(product, data.catigoryId)
            localStorage.setItem("product",JSON.stringify(product))
        },1000)
    })
}
elModalWrapper.addEventListener("click",(e)=>{
    if(e.target.id == "wrapper") elModalWrapper.classList.add("scale-0") 
})
// add part end

function renderProducts(arr,catigoryId){
    elPoolList.innerHTML = null
    const filterArr = arr.filter(item => item.catigoryId == catigoryId)
    arr.forEach(item => {
        let elPoolRow = document.createElement("tr")
        elPoolRow.className = "bg-white"
        elPoolRow.innerHTML = `
                <td class="py-[17px] rounded-tl-[30px] rounded-bl-[30px]">
                  <img class="mx-auto" src="${item.imgUrl}" alt="pool-1" width="110" height="41">
                </td>
                <td>
                  <div class="flex flex-col">
                    <span class="text-[12px] text-red-500 font-medium line-through">${item.oldPrice} сум</span>
                    <strong class="text-[16px] font-bold leading-[13px]">${item.newPrice} сум</strong>
                  </div>
                </td>
                <td>
                  <span class="text-[20px] font-medium leading-[35px]">${item.amount}</span>
                </td>
                <td>
                  <span class="text-[20px] font-medium leading-[35px]">
                      ${item.frame == "1" ? "Металлический":""}
                      ${item.frame == "2" ? "Прямоугольная":""}
                      ${item.frame == "3" ? "Рамка призмы":""}
                  </span>
                </td>
                <td>
                  <span class="text-[20px] font-medium leading-[35px]">
                      ${item.catigoryId == "1" ? "Каркасные" : ""}
                      ${item.catigoryId == "2" ? "Надувные" : ""}
                  </span>
                </td>
                <td>
                  <div class="flex items-center gap-[18px]">
                   <button class="hover:scale-[1.7] duration-300">
                      <img src="./images/edit-icon.svg" alt="edit-icon" width="22" height="22">
                   </button>
                   <button onclick="handleDeleteBtnClick(${item.id})" class="hover:scale-[1.7] duration-300">
                    <img src="./images/delete-icon.svg" alt="delete-icon" width="22" height="22">
                 </button>
                  </div>
                </td>
        `
        elPoolList.appendChild(elPoolRow)
    });
}
renderProducts(product, "2")


// catigory list part start 
elCatigoryList.addEventListener("click",function(e){
    if(e.target.id == "1"){
        e.target.className = active
        e.target.nextElementSibling.className = disabled
        renderProducts(product, "1")
    }
    else if(e.target.id == "2"){
        e.target.className = active
        e.target.previousElementSibling.className = disabled
        renderProducts(product, "2")
    }
})
// catigory list part end 

// delete part start 
 
function handleDeleteBtnClick(id){
  elModalWrapper.classList.remove("scale-0")
  elModalInner.classList.remove("w-[1000px]")
  elModalInner.classList.remove("h-[700px]")
  elModalInner.classList.add("w-[450px]")
  elModalInner.classList.add("h-[200px]")
  elModalInner.classList.add("shadow-lg")
  elModalInner.classList.add("shadow-gray-500")

  const deleteIndex = product.findIndex(item => item.id == id)
  elModalInner.innerHTML = `
      <div class="p-5">
        <h2 class="text-center text-[25px] text-black">Вы уверены, что хотите удалить?</h2>
        <div class="flex items-center justify-between mt-[45px]">
            <button onclick="handleCancelBtnClick()" class="cancel-btn block mx-auto w-[45%] py-[10px] font-bold text-center bg-blue-500 rounded-[25px] text-white text-[25px] leading-[29px] hover:text-blue-600 hover:bg-transparent duration-300">отмена</button>
            <button onclick="handleDeleteProductBtnClick(${id})" class="delete-btn block mx-auto w-[45%] py-[10px] font-bold text-center bg-red-600 rounded-[25px] text-white text-[25px] leading-[29px] hover:text-red-600 hover:bg-transparent duration-300">да</button>
        </div>
      </div>
  `
}
function handleCancelBtnClick(){
  elModalWrapper.classList.add("scale-0") 

  setTimeout(()=>{
  elModalInner.className = "w-[1000px] h-[700px] bg-[#F8F8F8] shadow-md absolute top-0 bottom-0 right-0 left-0 m-auto rounded-[20px] "
},500)
 
}
function handleDeleteProductBtnClick(id){
  let elDeleteBtn = document.querySelector(".delete-btn")
  const deleteIndex = product.findIndex(item => item.id == id)
  const findedObj = product.find(item => item.id == id)
  elDeleteBtn.innerHTML = `
        <img class="mx-auto scale-[1.4]" src="./images/loading-green.png" alt="loading" width="50" height="50" />
  `
  setTimeout(()=>{
    handleCancelBtnClick(product)
    product.splice(deleteIndex,1)
    renderProducts(product, findedObj.catigoryId)
    localStorage.setItem("product",JSON.stringify(product))
  },1000)
}
// delete part end