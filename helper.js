function createCard(obj){
  
        let card=document.createElement('div');

        card.classList.add('card');

        card.innerHTML =`

            <img src=${obj.picture.thumbnail} class="profilePhoto">
            <div class="divName">
                <p class="title">${obj.name.title}</p>
                <p class="first">${obj.name.first}</p>
                <p class="last">${obj.name.last}</p>

            </div>
            
            <p class="mail">${obj.email}</p>
            <div class="joinDate">
                <p class="date">${obj.registered.date}</p>
                <p class="age">${obj.registered.age}</p>

            </div>

        `
        return card;

   
  
}
let myModal = document.querySelector(".modal");

function populateModal(obj){
  
  

    myModal.innerHTML =`


        <i class="fa-solid fa-arrow-left" id="al"></i>
        <i class="fa-solid fa-arrow-right" id="ar"></i>
        <i class="fa-solid fa-xmark closing" id="close"></i>
        <div class="zoomCard">

            <img src=${obj.picture.thumbnail} class="profilePhoto">
            <div class="divName">
                <p class="title">${obj.name.title}</p>
                <p class="first">${obj.name.first}</p>
                <p class="last">${obj.name.last}</p>

            </div>
            
            <p class="mail">${obj.email}</p>
            <div class="joinDate">
                <p class="date">${obj.registered.date}</p>
                <p class="age">${obj.registered.age}</p>

            </div>

        </div>

    `
    return myModal;

}




let modal=false;

myModal.style.display="none";
function createCards(arr){

  
    let cards=[];

    for(let i=0; i<arr.length; i++){

       cards.push(createCard(arr[i]));

    }
    return cards;

}

function  populateCards(arr){

    let mainArea = document.querySelector(".cards");

    mainArea.innerHTML="";

    let anArr=[];

    createCards(arr).forEach(e=>{

         mainArea.appendChild(e);
    });

}
//primim ca parametru (arr ,perPagina ,numarulPagini)
//[12,32,45,76,79,90,23,43,56,787,9,8,90,12]=>
//
//todo functie paginatie

function pagination(arr, perPagina, pagina){
    
    let newArr = [];

    for(let i=(pagina-1)*perPagina; i<=perPagina*pagina-1 && i<arr.length; i++){

        newArr.push(arr[i]);
    }

     return newArr;
}

function addButtons(numar){

    let btnArr=[];

    for(let i=1; i<=numar; i++){

        let pageNrButton = document.createElement("input");
        pageNrButton.type = "button";
        pageNrButton.classList.add("btnPagina");
        pageNrButton.value = i;

        btnArr.push(pageNrButton);

    }

    return btnArr;
}
//functie ce primeste ca parametru un numar si ataseaza paginii numarul de butoane

function populateWithButtons(numar){

    let arr=addButtons(numar);
    let mainArea = document.querySelector(".butoane");

    mainArea.innerHTML="";

    arr.forEach(e=>{
        mainArea.appendChild(e);
    });
}

//todo functie ce priemste ca parametru un array nr paginii

function populateCardsPerPage(arr, pageNr){


     if(window.innerWidth<720){

        populateCards(pagination(arr,4,pageNr));

        populateWithButtons((arr.length/4) + rest(arr,4));


     }else if(window.innerWidth>720 && window.innerWidth<1020){

        populateCards(pagination(arr,6,pageNr));

        populateWithButtons((arr.length/6) + rest(arr,6));

     }else{

        populateCards(pagination(arr,9,pageNr));

        populateWithButtons((arr.length/9) + rest(arr,9));
     }

}

function rest(arr, perPage){

    let x;

    return x = 1?arr.length%perPage!=0 :0;

}


document.querySelector(".butoane").addEventListener("click", (e)=>{

    let obj = e.target;

   populateCardsPerPage(data,obj.value);


});




function filtrare(arr ,text){

    let objects= arr.filter(
        e=>e.name.first.includes(text)||
        e.name.last.includes(text));

     return objects.length>0 ? objects:
     
        [
            {
              name: {
                title: "President",
                first: "Vladimir",
                last: "Putin",
              },
              email: "vp@kremlin.ru",
              registered: {
                date: "17.11.1952",
                age: 70,
              },
              picture: {
                large: "https://randomuser.me/api/portraits/women/25.jpg",
                medium: "https://randomuser.me/api/portraits/med/women/25.jpg",
                thumbnail: "/imagini/visuals-JpTY4gUviJM-unsplash.jpg",
              },
            }
        ]



}


document.querySelector("#stdName").addEventListener("input",(e)=>{

    let obj=e.target;
 
    populateCardsPerPage(filtrare(data,obj.value),1);

});

let carduri = document.querySelector(".cards");



carduri.addEventListener("click",(e)=>{

    let obj = e.target;

    if(obj.classList.contains("divName")){

        if(modal==false){

            modal=true;

            
    
            populateModal(obj).style.display="none";
    
        }else{
    
            modal=false;

            
            populateModal(filtrare(data,obj.children[1].innerText)[0]).style.display="block";

      
           
        }

    }


});




//myModal -> modal

myModal.addEventListener("click", (e)=>{

    let obj = e.target;

    if(obj.classList.contains("closing")){

        myModal.style.display="none";

    }else if(obj.classList.contains("fa-arrow-right")){

        

        let keyWord = myModal.children[3].children[1].children[2].innerText;
        
       

        populateModal(getNext(data,filtrare(data,keyWord)[0])).style.display="block";

    }else if(obj.classList.contains("fa-arrow-left")){

        let keyWord = myModal.children[3].children[1].children[2].innerText;

        populateModal(getPrevious(data,filtrare(data,keyWord)[0])).style.display="block";

    }

    

});


function getNext(arr, actualObject){

    let nextObject;

    for(let i=0; i<arr.length; i++){

        if(arr[i]==actualObject){

            nextObject = arr[i+1];
        }
    }

    return nextObject;
}

function getPrevious(arr, actualObject){

    let prevObject;

    for(let i=0; i<arr.length; i++){

        if(arr[i]==actualObject){

            prevObject = arr[i-1];
        }

    }

    return prevObject;


}