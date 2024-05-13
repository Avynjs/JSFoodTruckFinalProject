(async () => {
    // Dynamic Menu
    const entrees = document.getElementById('entrees')
    const sidesnsweets = document.getElementById('sidesnsweets')
    const drinks = document.getElementById('drinks')

    const getMenu = async () => {
        const response = await fetch(`api/menu`)
        const menu = await response.json();
        return menu;
    }

    const displayMenu = menu => {
        menu.forEach(({ _id, item, description, price, category }) => {
        
        const h4 = document.createElement('h4');
        h4.textContent = item;
        h4.className = menu;

        const descp = document.createElement('p');
        descp.textContent = description;
        descp.className = menu;

        const pricep = document.createElement('p');
        pricep.textContent = price;
        pricep.className = menu;
        
        // Filter by category
        if (category === "Entree")
            {
                // if the category is Entrees
                entrees.appendChild(h4);
                entrees.appendChild(descp);
                entrees.appendChild(pricep);
            }
        else if (category === "SidesnSweets")
            {
                // if the category is Sides/Sweets
                sidesnsweets.appendChild(h4);
                sidesnsweets.appendChild(descp);
                sidesnsweets.appendChild(pricep);
            }
        else
        {
            // if the category is Drinks
            drinks.appendChild(h4);
            drinks.appendChild(descp);
            drinks.appendChild(pricep);
        }

        });
    }

    // Fetch and display
    const menu = await getMenu();
    displayMenu(menu);
})()