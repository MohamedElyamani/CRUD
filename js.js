let name = document.getElementById('name'),
    price = document.getElementById('price'),
    tax = document.getElementById('tax'),
    ads = document.getElementById('ads'),
    descount = document.getElementById('descount'),
    total = document.getElementById('totlaPrice'),
    money = document.querySelectorAll('.categouryPrice input'),
    search = document.getElementById('search'),
    count = document.getElementById('count'),
    categoury = document.getElementById('categoury'),
    btnSubmit = document.querySelector('.submit'),
    forClr = document.querySelectorAll('.forClr input'); 

// function add product
let dataProduct;
let mood = 'create';
let reuseVar;

if(localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product)
}else{
    dataProduct = [];
}

btnSubmit.addEventListener('click',function(){
    let newProduct = {
        name: name.value,
        price: price.value,
        tax: tax.value,
        ads: ads.value,
        descount: descount.value,
        total: total.innerHTML,
        count: count.value,
        categoury: categoury.value,
    }
    if(name.value != '' 
    && price.value !=''
    && tax.value !=''
    && ads.value !=''
    && categoury.value !=''
    && newProduct.count <= 100){
        if(mood == 'create'){
        if(newProduct.count > 1){
            for(i = 0; i <newProduct.count;i++){
                dataProduct.push(newProduct);
            }
        }else{
            dataProduct.push(newProduct);
        }
    }else{
        dataProduct[reuseVar] = newProduct;
        btnSubmit.innerHTML = 'Create'
    }
    clearData();
    }  
    localStorage.setItem('product', JSON.stringify(dataProduct))  ;
    showData();
    total.innerHTML = '';
    total.style.background = '#DC3545'
})


// function clear
function clearData(){
    for(clear of forClr){
        clear.value = '';
    }
}

// function calc price
/*for(i=0; i<money.length; i++){
    money[i].addEventListener('keyup',function(){
    if(price.value != ''){
        var result = (+price.value + +tax.value + +ads.value) - +descount.value;
        total.innerHTML = result;
        total.style.background = '#040'
    }else{
        total.innerHTML = '';
        total.style.background = '#DC3545'
        }
    })
}
*/

for (totalPrice of money){
    totalPrice.addEventListener('keyup',function(){
        if(price.value != ''){
            var result = (+price.value + +tax.value + +ads.value) - +descount.value;
            total.innerHTML = result;
            total.style.background = '#040'
        }else{
            total.innerHTML = '';
            total.style.background = '#DC3545'
            }
        })
}
// function read
showData();
function showData(){
    let table = '';
    for(i = 0; i < dataProduct.length; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataProduct[i].name}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].tax}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].descount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].categoury}</td>
            <td><button onclick = "updateData(${i})" id = 'update' class="btn btn-primary">update</button></td>
            <td><button onclick = "deleteData(${i})" id = 'delete' class="btn btn-primary">delete</button></td>
        </tr> `
    }
    document.getElementById('tbody').innerHTML = table;
}



// function update
function updateData(i){
    name.value = dataProduct[i].name,
    price.value = dataProduct[i].price,
    tax.value = dataProduct[i].tax,
    ads.value = dataProduct[i].ads,
    descount.value = dataProduct[i].descount,
    categoury.value = dataProduct[i].categoury;


    count.disabled = 'true';
    btnSubmit.innerHTML = 'Update';
    mood = 'update';
    reuseVar = i;

    scroll({
        top:0,
        behavior: 'smooth'
    })
    total.innerHTML = result;
}

// function search
let searchMood = 'name';
function getSearchMood(id){
    if(id == 'searchByName'){
        searchMood = 'name';
    }else{
        searchMood = 'categoury'
    }
    search.placeholder = 'search by ' + searchMood;
    search.focus();
    search.value = '';
    showData();
}
search.onkeyup = function(){
    let table= '';
    let value = search.value;
    for( i =0;i<dataProduct.length;i++){
        if(searchMood == 'name'){
            if(dataProduct[i].name.toLowerCase().includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataProduct[i].name}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].tax}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].descount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].categoury}</td>
                    <td><button onclick = "updateData(${i})" id = 'update' class="btn btn-primary">update</button></td>
                    <td><button  id = 'delete' class="btn btn-primary">delete</button></td>
                </tr>`
            }
        }else{
            if(dataProduct[i].categoury.toLowerCase().includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataProduct[i].name}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].tax}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].descount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].categoury}</td>
                    <td><button onclick = "updateData(${i})" id = 'update' class="btn btn-primary">update</button></td>
                    <td><button  id = 'delete' class="btn btn-primary">delete</button></td>
                </tr>`
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

// 6- function delete
function deleteData(index){
    dataProduct.splice(index,1);
    localStorage.setItem('product',JSON.stringify(dataProduct));
    showData();
}

/*
let deleteBtn = document.getElementById('delete');
let deleteOverlay = document.getElementById('deleteOverlay');
let noDeleteBtn = document.getElementById('noDelete');


function deleteData(i){
    console.log(i)
}

deleteBtn.addEventListener('click',function(){
    deleteOverlay.classList.replace('d-none','d-flex')
})
noDeleteBtn.addEventListener('click',function(){
    deleteOverlay.classList.replace('d-flex','d-none')
})
*/
