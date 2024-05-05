
function displayText(textID) {
    var text = document.getElementById(textID)
    text.style.display = "block"
}

function hideText(textID) {
    var text = document.getElementById(textID)
    text.style.display = "none"
}

(async () => {

    // const updateMenu = async (item, description, price) => {
    //     const menu = document.getElementById('entrees')
    //     const div = document.createElement('div')
    //     const h3 = document.createElement('h3')
    //     const newDescription = document.createElement('p')
    //     const newPrice = document.createElement('p')
    //     const priceSpan = document.createElement('span')

    //     div.classList.add('menu-item')
    //     h3.textContent = item
    //     newDescription.textContent = description

    //     priceSpan.textContent = 'Price: '
    //     priceSpan.classList.add('bold')
    //     newPrice.prepend(priceSpan)
    //     newPrice.textContent = price

    //     div.appendChild(h3)
    //     div.appendChild(newDescription)
    //     div.appendChild(newPrice)

    //     menu.appendChild(div)

    // }



    const getMenu = async () => {
        const response = await fetch('/api/menu')
		const menu = await response.json()
		return menu
    }

    const displayMenu = menu => {
        const entrees = document.getElementById('entrees')
        const sides = document.getElementById('sides')
        const drinks = document.getElementById('grid-two')

        menu.forEach(({ item, description, price, category }) => {
            //div holding all item info (name, description, price)
            const div = document.createElement('div')

            //item info
            const h3 = document.createElement('h3')
            const newDescription = document.createElement('p')
            const newPrice = document.createElement('p')
            const priceSpan = document.createElement('span')

            div.classList.add('menu-item')
            h3.textContent = item
            newDescription.textContent = description

            priceSpan.textContent = 'Price: '
            priceSpan.classList.add('bold')
            newPrice.prepend(priceSpan)
            newPrice.textContent = price

            div.appendChild(h3)
            div.appendChild(newDescription)
            div.appendChild(newPrice)

            if(category == 'entree'){
                entrees.appendChild(div)
            }else if(category == 'side'){
                sides.appendChild(div)
            }else{
                drinks.appendChild(div)
            }

        })
    }


    //adding menu item
    const addItemBtn = document.getElementById('add-menu')
    const addItem = document.getElementById('menu-item')
    const addDescription = document.getElementById('description')
    const addPrice = document.getElementById('price')

    addItemBtn.addEventListener('click', async () => {
        const response = await fetch('/api/menu', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item: addItem.value, description: addDescription.value, price: addPrice.value })
        })

        addItem.value = ''
        addDescription.value = ''
        addPrice.value = ''
        
        displayMenu(await getMenu())
    })


    //adding event
    const addEventBtn = document.getElementById('add-event')
    const addEvent = document.getElementById('event-name')
    const addDate = document.getElementById('event-date')

    addEventBtn.addEventListener('click', async () => {
        const response = await fetch('/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: addEvent.value, description: addDate.value })
        })

        addEvent.value = ''
        addDate.value = ''
        
        displayMenu(await getMenu())
    })


})()