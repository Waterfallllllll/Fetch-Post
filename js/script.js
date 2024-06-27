window.addEventListener("DOMContentLoaded", () => {
    function req() {
        getResources("http://localhost:3000/people")
            .then(data => createCards(data))
            .catch(err => console.error(err));
        
        this.remove();
    }

    document.querySelector("button").addEventListener("click", req, { "once": true });
    
    async function getResources(url) {
        const res = await fetch(`${url}`);

        if (!res.ok) { // Своство ok говорит - у нас все прошло успешно и запрос выполнился
            throw new Error(`Could not fetch ${url}, status: ${res.status}`); // Своство status такоже как и в XMLHttpRequest
        }

        return await res.json(); // Нам нужно дождаться превращения json в обычный объект. Поэтому ставим await. 
    }

    function createCards(data) {
        data.forEach(item => {
            let card = document.createElement("div");

            card.classList.add("card");

            let icon;
            if (item.sex == "male") {
                icon = "icons/mars.png";
            } else {
                icon = "icons/female.png";
            }

            card.innerHTML = `
                <img src ="${item.photo}" alt="photo">
                <div class"name">${item.name} ${item.surname}</div>
                <div class="sex">
                    <img src=${icon} alt="male">
                </div>
                <div class="age">${item.age}</div>
            `;

            document.querySelector(".app").appendChild(card);
        });
    }
});