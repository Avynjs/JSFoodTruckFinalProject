function displayText(textID) {
    var text = document.getElementById(textID);
    text.style.display = "block";
}

function hideText(textID) {
    var text = document.getElementById(textID);
    text.style.display = "none";
}

(async () => {
    // Dynamic Events
    const h2 = document.getElementById('EventTab');

    const getEvents = async () => {
        const response = await fetch(`/api/events`);
        const events = await response.json();
        return events;
    };

    const getEventsById = async (id, eventDiv) => {
        const response = await fetch(`/api/events/${id}`);
        const { location, description, date, hours } = await response.json();

        // Clear eventDiv content before adding new details
        eventDiv.innerHTML = '';

        // Append p to Event Div
        const p = document.createElement('p');
        p.textContent = description;
        eventDiv.appendChild(p);

        // Append ul to Event Div
        const ul = document.createElement('ul');
        eventDiv.appendChild(ul);

        // Append lis to ul
        const locli = document.createElement('li');
        locli.textContent = "Location: " + location;
        ul.appendChild(locli);
        const dateli = document.createElement('li');
        dateli.textContent = "Date: " + date;
        ul.appendChild(dateli);
        const hourli = document.createElement('li');
        hourli.textContent = "Hours: " + hours;
        ul.appendChild(hourli);

        return { location, description, date, hours };
    };

    const displayEvents = events => {
        events.forEach(({ _id, name }) => {
            // Append div to h2
            const div = document.createElement('div');
            div.className = "event-info";
            h2.appendChild(div);

            // Append h3 to div
            const h3 = document.createElement('h3');
            h3.textContent = name;
            div.appendChild(h3);

            // Append Drop Button to h3
            const dropButton = document.createElement('button');
            dropButton.id = "drop";
            dropButton.className = "menuBtn";
            dropButton.addEventListener('click', async () => {
                const eventDiv = document.getElementById(`event${_id}`);
                // Check if event details are already displayed
                if (eventDiv.style.display !== "block") {
                    const { location, description, date, hours } = await getEventsById(_id, eventDiv);
                    const response = await displayText(`event${_id}`);
                }
            });
            h3.appendChild(dropButton);

            // Append i to Drop Button
            const dropi = document.createElement('i');
            dropi.className = "fa-solid fa-caret-down";
            dropButton.appendChild(dropi);

            // Append Hide Button to h3
            const hideButton = document.createElement('button');
            hideButton.id = "hide";
            hideButton.className = "menuBtn";
            hideButton.addEventListener('click', async () => {
                const response = await hideText(`event${_id}`);
            });
            h3.appendChild(hideButton);

            // Append i to Hide Button
            const hidei = document.createElement('i');
            hidei.className = "fa-solid fa-caret-up";
            hideButton.appendChild(hidei);

            // Append Event Text Div to main Div
            const eventDiv = document.createElement('div');
            eventDiv.className = "event-text";
            eventDiv.id = `event${_id}`;
            div.appendChild(eventDiv);
        });
    };
    displayEvents(await getEvents());
    
    const displayMenu = (menuItems) => {
        const menuContainer = document.getElementById('entrees'); // Assuming this is the container for menu items
    
        menuItems.forEach(async (item) => {
            const menuItemDiv = document.createElement('div');
            menuItemDiv.classList.add('menu-item');
    
            const { item: itemName, description, price } = item;
    
            const h3 = document.createElement('h3');
            h3.textContent = itemName;
    
            const descriptionP = document.createElement('p');
            descriptionP.textContent = description;
    
            const priceP = document.createElement('p');
            priceP.textContent = `Price: $${price}`;
    
            menuItemDiv.appendChild(h3);
            menuItemDiv.appendChild(descriptionP);
            menuItemDiv.appendChild(priceP);
    
            // Append the menu item to the menu container
            menuContainer.appendChild(menuItemDiv);
        });
    };
    
    // Fetch menu items and display them
    const menuItems = await getMenuItems();
    displayMenu(menuItems);
    
      
    




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


    

})()