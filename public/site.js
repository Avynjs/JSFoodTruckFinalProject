
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



    // const getMenu = async () => {
    //     const response = await fetch('/api/menu')
    //     const menu = await response.json()
    //     return menu
    // }

    // const displayMenu = menu => {
    //     const page = window.open('menu.html')

    //     page.addEventListener('DOMContentLoaded', () => {
    //         const entrees = page.document.getElementById('entrees')
    //         const sides = page.document.getElementById('sides')
    //         const drinks = page.document.getElementById('grid-two')

    //         menu.forEach(({ item, description, price, category }) => {
    //             //div holding all item info (name, description, price)
    //             const div = page.document.createElement('div')

    //             //item info
    //             const h3 = page.document.createElement('h3')
    //             const newDescription = page.document.createElement('p')
    //             const newPrice = page.document.createElement('p')
    //             const priceSpan = page.document.createElement('span')

    //             div.classList.add('menu-item')
    //             h3.textContent = item
    //             newDescription.textContent = description

    //             priceSpan.textContent = 'Price: '
    //             priceSpan.classList.add('bold')
    //             newPrice.prepend(priceSpan)
    //             newPrice.textContent = price

    //             div.appendChild(h3)
    //             div.appendChild(newDescription)
    //             div.appendChild(newPrice)

    //             if (category == 'entree') {
    //                 entrees.appendChild(div)
    //             } else if (category == 'side') {
    //                 sides.appendChild(div)
    //             } else {
    //                 drinks.appendChild(div)
    //             }
    //         })
    //     })
    // }


    //adding menu item
    const addItemBtn = document.getElementById('add-menu')
    const addItem = document.getElementById('menu-item')
    const addDescription = document.getElementById('description')
    const addPrice = document.getElementById('price')
    // const addCategory = document.getElementById('category')
    // const category = addCategory.options[addCategory.selectedIndex]

    addItemBtn.addEventListener('click', async () => {
        const response = await fetch('/api/menu', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item: addItem.value, description: addDescription.value, price: addPrice.value })
        })

        addItem.value = ''
        addDescription.value = ''
        addPrice.value = ''

        // displayMenu(await getMenu())
    })


    //adding event
    const addEventBtn = document.getElementById('add-event')
    const addEvent = document.getElementById('add-name')
    const addDate = document.getElementById('add-date')

    addEventBtn.addEventListener('click', async () => {
        const response = await fetch('/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: addEvent.value, date: addDate.value })
        })

        addEvent.value = ''
        addDate.value = ''

    })

    //updating event
    const updateEventBtn = document.getElementById('update-event-btn')
    const updateEvent = document.getElementById('update-name')
    const updateDate = document.getElementById('update-date')
    const updateHours = document.getElementById('update-hours')
    const updateLocation = document.getElementById('update-location')

    updateEventBtn.addEventListener('click', async () => {
        const id = document.getElementById('update-event-id').value

        const response = await fetch(`/api/events/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: updateEvent.value, date: updateDate.value, hours: updateHours.value, location: updateLocation.value})
        })

        addEvent.value = ''
        addDate.value = ''
    })

    //deleting event
    const deleteEventBtn = document.getElementById('delete-event-btn')

    deleteEventBtn.addEventListener('click', async () => {
        const id = document.getElementById('delete-event-id').value

        const response = await fetch(`/api/events/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })

        addEvent.value = ''
        addDate.value = ''
    })
})()