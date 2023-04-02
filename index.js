function getCrypt(){
    fetch('https://api.coingecko.com/api/v3/exchange_rates',{
        method: "GET",
        headers:{
            'Content-Type' : 'application/json'
        }
    })
        .then( response => response.json())
        .then(data => {
            renderResult(data)
    })
        .catch(err => console.log(err))
}

function searchCrypto(){
    const userInput = document.getElementById("search").value
    console.log(userInput)
    
    const removeElem = document.querySelectorAll(".card")

    removeElem.forEach(function(element) {
        element.remove();
    });

    fetch(`https://api.coingecko.com/api/v3/search?query=${userInput}`,{
        method: "GET",
        headers:{
            'Content-Type' : 'application/json'
        }
    })
        .then( response => response.json())
        .then(data => {
            console.log(data)
            renderResult(data)
    })
        .catch(err => console.log(err))
}

function renderResult(data){

    const uiResult = document.querySelector(".result")
    const coins = data && data.rates || data && data.coins

    for(let key in coins){

        const resultCard = document.createElement("div")
        const cryptImgHandler = document.createElement("div")
        const cryptInfoHandler = document.createElement("div")

        resultCard.setAttribute("class", "card fade-in")
        cryptImgHandler.setAttribute("class", "cryp_img")
        cryptInfoHandler.setAttribute("class", "crypt_info")

        uiResult.appendChild(resultCard)
        resultCard.appendChild(cryptImgHandler)
        resultCard.appendChild(cryptInfoHandler)

        cryptImgHandler.innerHTML = `<img src="${coins[key].large|| ""}" alt="${coins[key].name}" width="50px"/>`
        cryptInfoHandler.innerHTML = `<ul>
                                    <li>Rate: ${coins[key].value || ""}</li>
                                    <li>Crypto name: ${coins[key].name}</li>
                                    <li>Crypto unit: ${coins[key].unit || coins[key].symbol}</li>
                                    </ul>`
    }

    const loadingSpinner = document.getElementById('loading-spinner');
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions ={
        threshold: .2,
        rootMargin: "0px 0px -150px 0px"
    };
    const appearOnScroll = new IntersectionObserver(
        function(entries, appearOnScroll){
            entries.forEach(entry =>{
                if(!entry.isIntersecting){
                    loadingSpinner.style.display = 'block';
                }else{
                    entry.target.classList.add('appear');
                    appearOnScroll.unobserve(entry.target);
                }
            })
        }, appearOptions);

    faders.forEach(fader =>{
        appearOnScroll.observe(fader);
    });
}

window.addEventListener('scroll', function() {
    const isAtEndOfPage = document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight;
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isAtEndOfPage) {
        loadingSpinner.style.display = 'none';
    }
});