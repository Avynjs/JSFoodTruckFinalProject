
function displayText(textID) {
    var text = document.getElementById(textID)
    text.style.display = "block"
}

function hideText(textID) {
    var text = document.getElementById(textID)
    text.style.display = "none"
}

(async () => {

    // Dynamic Events
    const h2 = document.getElementById('EventTab')

    const getEvents = async() => {
        const response = await fetch(`/api/events`)
        const events = await response.json()
        console.log(events)
        return events
    }

    const displayEvents = events => {

        events.forEach(({ _id, name, date, hours, location, description }) => {
            // Append div to h2
            const div = document.createElement('div')
            div.className = "event-info"
            h2.appendChild(div)

            // Append h3 to div
            const h3 = document.createElement('h3')
            h3.textContent = name
            div.appendChild(h3)

            // Append Drop Button to h3
            const dropButton = document.createElement('button')
            dropButton.id = "drop"
            dropButton.className = "menuBtn"
            dropButton.addEventListener('click', async () => {
                const response = await displayText(`event${_id}`)
            })
            h3.appendChild(dropButton)
            
            // Append i to Drop Button
            const dropi = document.createElement('i')
            dropi.className = "fa-solid fa-caret-down"
            dropButton.appendChild(dropi)

            // Append Hide Button to h3
            const hideButton = document.createElement('button')
            hideButton.id = "hide"
            hideButton.className = "menuBtn"
            hideButton.addEventListener('click', async () => {
                const response = await hideText(`event${_id}`)
            })
            h3.appendChild(hideButton)

            // Append i to Hide Button
            const hidei = document.createElement('i')
            hidei.className = "fa-solid fa-caret-up"
            hideButton.appendChild(hidei)

            // Append Event Text Div to main Div
            const eventDiv = document.createElement('div')
            eventDiv.className = "event-text"
            eventDiv.id = `event${_id}`
            div.appendChild(eventDiv)

            // Append p to Event Div
            const p = document.createElement('p')
            p.textContent = description
            eventDiv.appendChild(p)

            // Append ul to Event Div
            const ul = document.createElement('ul')
            eventDiv.appendChild(ul)

            // Append lis to ul
            const locli = document.createElement('li')
            locli.textContent = "Location: " + location
            ul.appendChild(locli)
            const dateli = document.createElement('li')
            dateli.textContent = "Date: " + date
            ul.appendChild(dateli)
            const hourli = document.createElement('li')
            hourli.textContent = "Hours: " + hours
            ul.appendChild(hourli)
        })
    }
    displayEvents(await getEvents())

    // Dynamic Menu
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
    const addCategory = document.getElementById('category')

    addItemBtn.addEventListener('click', async () => {
        const response = await fetch('/api/menu', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item: addItem.value, description: addDescription.value, price: addPrice.value, category: addCategory.options[addCategory.selectedIndex].text })
        })

        addItem.value = ''
        addDescription.value = ''
        addPrice.value = ''

        // displayMenu(await getMenu())
    })

    // Update menu item
    const updateItemBtn = document.getElementById('update-item-btn')
    const updateItemName = document.getElementById('update-item')
    const updateDescription = document.getElementById('update-description')
    const updatePrice = document.getElementById('update-price')
    const updateCategory = document.getElementById('update-category')

    updateItemBtn.addEventListener('click', async () => {
        const id = document.getElementById('update-item-id').value

        const response = await fetch(`/api/menu/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item: updateItemName.value, description: updateDescription.value, price: updatePrice.value, category: updateCategory.options[updateCategory.selectedIndex].text })
        })

        addItem.value = ''
        addDescription.value = ''
        addPrice.value = ''
    })

    // Deleting menu item
    const deleteItemBtn = document.getElementById('delete-item-btn')

    deleteItemBtn.addEventListener('click', async () => {
        const id = document.getElementById('delete-item-id').value

        const response = await fetch(`/api/menu/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })

        addItem.value = ''
        addDescription.value = ''
        addPrice.value = ''
    })

    //adding event
    const addEventBtn = document.getElementById('add-event-btn')
    const addEventName = document.getElementById('event-name')
    const addEventDate = document.getElementById('date')
    const addEventTime = document.getElementById('time')
    const addEventLocation = document.getElementById('location')
    const addEventDescription = document.getElementById('event-description')

    addEventBtn.addEventListener('click', async event => {
        event.preventDefault()
        await fetch('/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: addEventName.value, date: addEventDate.value, hours: addEventTime.value, location: addEventLocation.value, description: addEventDescription.value })
        })
        
        addEventName.value = ''
        addEventDate.value = ''
        addEventTime.value = ''
        addEventLocation.value = ''
        addEventDescription.value = ''
    })

    //updating event
    const updateEventBtn = document.getElementById('update-event-btn')
    const updateEvent = document.getElementById('update-name')
    const updateDate = document.getElementById('update-date')
    const updateHours = document.getElementById('update-hours')
    const updateLocation = document.getElementById('update-location')
    const updateEventDescription = document.getElementById('update-event-description')

    updateEventBtn.addEventListener('click', async () => {
        const id = document.getElementById('update-event-id').value

        const response = await fetch(`/api/events/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: updateEvent.value, date: updateDate.value, hours: updateHours.value, location: updateLocation.value, description: updateEventDescription.value })
        })

        updateEvent.value = ''
        updateDate.value = ''
        updateTime.value = ''
        updateLocation.value = ''
        updateDescription.value = ''
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