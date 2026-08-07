const searchInput = document.getElementById("searchBar");
const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("btnResetSearch");
const results = document.getElementById("searchResults");

async function getTravelData(){

    const response = await fetch("./travel_recommendation_api.json");

    return await response.json();

}

function createCard(place){

    return `

        <div class="result-card">

            <img src="${place.imageUrl}" alt="${place.name}">

            <div class="result-info">

                <h3>${place.name}</h3>

                <p>${place.description}</p>

                <button>Visit</button>

            </div>

        </div>

    `;

}

async function searchRecommendation(){
    if (!results) return;
    results.innerHTML="";

    const data = await getTravelData();

    const keyword = searchInput.value.trim().toLowerCase();

    if(keyword==="") return;

    let html="<h2>Search Results</h2>";

    if(keyword.includes("beach")){

        data.beaches.forEach(beach=>{

            html+=createCard(beach);

        });

    }

    else if(keyword.includes("temple")){

        data.temples.forEach(temple=>{

            html+=createCard(temple);

        });

    }

    else{

        data.countries.forEach(country=>{

            if(country.name.toLowerCase().includes(keyword)){

                country.cities.forEach(city=>{

                    html+=createCard(city);

                });

            }

        });

    }

    results.innerHTML=html;

}

btnSearch.addEventListener("click",searchRecommendation);

searchInput.addEventListener("keydown",function(e){

    if(e.key==="Enter"){

        searchRecommendation();

    }

});

btnClear.addEventListener("click",()=>{

    searchInput.value="";
if (results){
    results.innerHTML="";
}

});