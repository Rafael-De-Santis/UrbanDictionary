const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1b0d22e825msh3677617cd410e8ep1a4eedjsn0a04c0f4ddda',
		'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'
	}
};

const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("searchBtn");
const leftBtn = document.getElementById("resultBtnLeft");
const rightBtn = document.getElementById("resultBtnRight");
let list;
const term = document.getElementById("term");
const author = document.getElementById("author");
const definition = document.getElementById("definition");
const exampleWord = document.getElementById("wordExample");
var indexList = 0
const pages = document.getElementById("pages");

btn.addEventListener("click", () => {
    let newInput = document.getElementById("inputWord").value;
    
   
    
    fetch('https://mashape-community-urban-dictionary.p.rapidapi.com/define?term='+newInput, options)
	.then(response => response.json())
	.then(data => {
        list = data.list
        console.log(list)
        if(data.list.length > 0){
            pages.classList.remove("hidden");
            rightBtn.classList.remove("hidden");
            indexList = 0;
            setInfo(list[indexList])
        }
        })
	.catch(err => console.error(err)
    );    
})

function setInfo(data){
    term.innerHTML = data.word;
    author.innerHTML = data.author;
    definition.innerHTML = data.definition.replace(/[\[\]]/g, "");
    exampleWord.innerHTML = data.example.replace(/[\[\]]/g, "");
    pages.innerHTML = "Result "+(indexList+1)+" of "+list.length;
}

rightBtn.addEventListener("click", () => {
    indexList++;
    if (indexList > 0){
        leftBtn.classList.remove("hidden")
    }
    if (indexList == list.length - 1){
        rightBtn.classList.add("hidden")
    }
    if (indexList <= list.length) {
        setInfo(list[indexList]);

    }

    if (indexList > list.length){
        indexList = list.length - 1;
    }
    
})

leftBtn.addEventListener("click", () => {
    indexList--;
    if (indexList == 0){
        leftBtn.classList.add("hidden")
    }
    if (indexList > 0){
        rightBtn.classList.remove("hidden")
    }

    if (indexList <= list.length && indexList > -1) {
        setInfo(list[indexList]);
    }

    if (indexList == -1){
        indexList = 0;
        leftBtn.classList.add("hidden")
    }
})

