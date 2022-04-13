
newsAccordion = document.getElementById("newsAccordion");
loadingSpinner = document.getElementById("loadingSpinner");
newsSourceHeadingElement = document.getElementById("newsSource");

selectSourceDropdown = document.getElementById("navbarDropdown");
selectSourceDropdownMenus = document.getElementById("selectSourceDropdownMenus");

selectCategoryDropdown = document.getElementById("navbarCategoryDropdown");
selectCategoryDropdownMenus = document.getElementById("selectCategoryDropdownMenus");

let apiKey = "0fd2fe239ff64c88ba18dad856ee525c";
let gnewsApiKey = "01e296327d16b7b491bfe098f1d29f63";
let newsSource = "country=in";
let sourceName = "";

const CategoryList = ["business","technology","entertainment","health","science","sports"];
const gnNewsCategoryList = ["breaking-news","business","technology","entertainment","health","science","sports","world", "nation"];

//https://gnews.io/api/v4/top-headlines?topic=entertainment&token=01e296327d16b7b491bfe098f1d29f63

const xhr = new XMLHttpRequest();
//xhr.open('GET', `https://newsapi.org/v2/top-headlines?${newsSource}&apiKey=${apiKey}`);
xhr.open('GET', `https://gnews.io/api/v4/top-headlines?country=in&lang=en&token=${gnewsApiKey}`);

xhr.addEventListener("load", function (event) {
    console.log("HI");
    if (this.status == 200) {
        html = "";
        newsSourceHeadingElement.value = newsSource;
        loadingSpinner.innerHTML = "";

        let json = JSON.parse(this.responseText);
        console.log(json);

        let articles = json.articles;
        let title = "";
        let content = "";
        let description = "";
        let image = "";

        articles.forEach((element, index) => {
            title = element["title"];
            content = element["content"];
            description = element["description"];
            image = element["image"];
            sourceName = element["source"].name;

            if (image == null)
                image = "";
            if (content == null)
                content = "No Content Found";
            if (description == null)
                description = "No Description Found";
            if (title == null)
                title = "No Title Found";

            html += `<div id="${sourceName}${index}" class="accordion-item">
                        <h2 class="accordion-header" id="heading${index}">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                Breaking News ${index + 1} :- ${title} 
                            </button>
                        </h2>
                        <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#newsAccordion">
                            <div class="accordion-body">
                                <div class="container-row">
                                    <img src="${image}" class="NewsImage img-thumbnail float-start" alt="No image found"></img>
                                    <div class="container divMarginToImage">
                                        <b>Content</b><br>${content}<a href="${element["url"]}" target="_blank"> Read more here...</a>
                                        <hr>
                                        <b>Description</b><br>${description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`

            newsAccordion.innerHTML = html;
        });
    } else {
        console.log("Some error occurred");
    }
});

let html = `<div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            `;


loadingSpinner.innerHTML = html;


selectSourceDropdown.addEventListener("click", function () {
    html = `
            <b>Select News Source</b>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            `
    selectSourceDropdown.innerHTML = html;
    const xhr1 = new XMLHttpRequest();
    //xhr1.open('GET', `https://newsapi.org/v2/top-headlines?${newsSource}&apiKey=${apiKey}`, true);
    xhr1.open('GET', `https://gnews.io/api/v4/top-headlines?country=in&lang=en&token=${gnewsApiKey}`);

    xhr1.onload = function () {

        html = "<b>Select News Source</b>";
        selectSourceDropdown.innerHTML = html;

        if (this.status == 200) {
            html = "";
            let json = JSON.parse(this.responseText);
            console.log(json);

            let articles = json.articles;
            let sourceSet =  new Set();
            articles.forEach(element => {
                sourceName = element["source"].name;
                sourceSet.add(sourceName);
            });

            sourceSet.forEach(function(element){
                html += `<li>
                            <button id="${element}" class="dropdown-item btn btn-primary" type="button" onclick="DisplayNewsFromSelectedSource(this.id)">
                                ${element}
                            </button>
                        </li>`
            })

            selectSourceDropdownMenus.innerHTML = html;
        } else {
            console.log("Some error occurred");
        }
    }
    xhr1.send();

})

selectCategoryDropdown.addEventListener("click", function () {
    html="";
    gnNewsCategoryList.forEach(function(element){
        html += `<li>
                    <button id="${element}" class="dropdown-item btn btn-primary" type="button" onclick="DisplayNewsForSelectedCategory(this.id)">
                        ${element}
                    </button>
                </li>`
    })

    selectCategoryDropdownMenus.innerHTML = html;
})


// xhr.onload = function () {
//     if (this.status == 200) {
//         html = "";
//         newsSourceHeadingElement.value = newsSource;
//         loadingSpinner.innerHTML = "";

//         let json = JSON.parse(this.responseText);
//         console.log(json);

//         let articles = json.articles;
//         let title = "";
//         let content = "";
//         let description = "";
//         let image = "";

//         articles.forEach((element, index) => {
//             title = element["title"];
//             content = element["content"];
//             description = element["description"];
//             image = element["urlToImage"];
//             sourceName = element["source"].name;

//             if (image == null)
//                 image = "";
//             if (content == null)
//                 content = "No Content Found";
//             if (description == null)
//                 description = "No Description Found";
//             if (title == null)
//                 title = "No Title Found";

//             html += `<div id="${sourceName}${index}" class="accordion-item">
//                         <h2 class="accordion-header" id="heading${index}">
//                             <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
//                                 Breaking News ${index + 1} :- ${title} 
//                             </button>
//                         </h2>
//                         <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#newsAccordion">
//                             <div class="accordion-body">
//                                 <div class="container-row">
//                                     <img src="${image}" class="NewsImage img-thumbnail float-start" alt="No image found"></img>
//                                     <div class="container divMarginToImage">
//                                         <b>Content</b><br>${content}<a href="${element["url"]}" target="_blank"> Read more here...</a>
//                                         <hr>
//                                         <b>Description</b><br>${description}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>`

//             newsAccordion.innerHTML = html;
//         });
//     } else {
//         console.log("Some error occurred");
//     }
// }
xhr.send();

function DisplayNewsFromSelectedSource(sourcename){
    newsSourceHeadingElement.innerText = sourcename;
    navbarDropdown.innerText = sourcename;
    // let accordionItems = document.getElementsByClassName("accordion-item");
    // Array.from(accordionItems).forEach(function(element){
    //     if(!element.id.includes(sourcename)){
    //         element.style.display = "none";
    //     }else{
    //         element.style.display = "block";
    //     }
    // });
    const xhr3 = new XMLHttpRequest();
    //xhr3.open('GET', `https://newsapi.org/v2/top-headlines?${newsSource}&apiKey=${apiKey}`, true);
    xhr3.open('GET', `https://gnews.io/api/v4/top-headlines?country=in&lang=en&token=${gnewsApiKey}`);

    xhr3.onload = function () {
        if (this.status == 200) {
            html = "";
            newsSourceHeadingElement.innerText = sourcename;
            selectSourceDropdown.innerText = sourcename;
            
            html = "<b>Select News Category</b>";
            selectCategoryDropdown.innerHTML = html;
            
            html = "";

            let json = JSON.parse(this.responseText);
            console.log(json);
    
            let articles = json.articles;
            let title = "";
            let content = "";
            let description = "";
            let image = "";
    
            articles.forEach((element, index) => {
                title = element["title"];
                content = element["content"];
                description = element["description"];
                image = element["image"];
                sourceName = element["source"].name;
    
                if (image == null)
                    image = "";
                if (content == null)
                    content = "No Content Found";
                if (description == null)
                    description = "No Description Found";
                if (title == null)
                    title = "No Title Found";

                if(sourceName==sourcename){
    
                    html += `<div id="${sourceName}${index}" class="accordion-item">
                                <h2 class="accordion-header" id="heading${index}">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                        Breaking News ${index + 1} :- ${title} 
                                    </button>
                                </h2>
                                <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#newsAccordion">
                                    <div class="accordion-body">
                                        <div class="container-row">
                                            <img src="${image}" class="NewsImage img-thumbnail float-start" alt="No image found"></img>
                                            <div class="container divMarginToImage">
                                                <b>Content</b><br>${content}<a href="${element["url"]}" target="_blank"> Read more here...</a>
                                                <hr>
                                                <b>Description</b><br>${description}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
                };
            });
            newsAccordion.innerHTML = html;
        }
        else {
            console.log("Some error occurred");
        }
    };
    xhr3.send();

}


function DisplayNewsForSelectedCategory(id){
    html = "";
    const xhr2 = new XMLHttpRequest();
    //xhr2.open('GET', `https://newsapi.org/v2/top-headlines?country=in&category=${id}&apiKey=${apiKey}`, true);
    xhr2.open('GET', `https://gnews.io/api/v4/top-headlines?topic=${id}&country=in&lang=en&token=${gnewsApiKey}`);

    xhr2.onload = function () {
        if (this.status == 200) {
            html = "";
            newsSourceHeadingElement.innerText = id;
            selectCategoryDropdown.innerText = id;
            
            html = "<b>Select News Source</b>";
            selectSourceDropdown.innerHTML = html;

            html = "";

            loadingSpinner.innerHTML = "";
    
            let json = JSON.parse(this.responseText);
            console.log(json);
    
            let articles = json.articles;
            let title = "";
            let content = "";
            let description = "";
            let image = "";
    
            articles.forEach((element, index) => {
                title = element["title"];
                content = element["content"];
                description = element["description"];
                image = element["image"];
                sourceName = element["source"].name;
    
                if (image == null)
                    image = "";
                if (content == null)
                    content = "No Content Found";
                if (description == null)
                    description = "No Description Found";
                if (title == null)
                    title = "No Title Found";
    
                html += `<div id="${sourceName}${index}" class="accordion-item">
                            <h2 class="accordion-header" id="heading${index}">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                    Breaking News ${index + 1} :- ${title} 
                                </button>
                            </h2>
                            <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#newsAccordion">
                                <div class="accordion-body">
                                    <div class="container-row">
                                        <img src="${image}" class="NewsImage img-thumbnail float-start" alt="No image found"></img>
                                        <div class="container divMarginToImage">
                                            <b>Content</b><br>${content}<a href="${element["url"]}" target="_blank"> Read more here...</a>
                                            <hr>
                                            <b>Description</b><br>${description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
    
                newsAccordion.innerHTML = html;
            });
        } else {
            console.log("Some error occurred");
        }
    }
    xhr2.send();
}