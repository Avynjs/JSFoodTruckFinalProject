(async () => {
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