(async () => {
    // Dynamic Menu
    const entrees = document.getElementById('entrees')
    const sidesnsweets = document.getElementById('sidesnsweets')
    const drinks = document.getElementById('drinks')

    const getMenu = async () => {
        const response = await fetch(`api/menu`)
        const menu = await response.json();
        console.log(menu);
        return menu;
    }

    const displayMenu = menu => {
        menu.foreach(({ item, description, price, category }))
        if (category = "Entree")
            {
                // if the category is Entrees
                const h4 = document.createElement('h4');
                h4.textContent = item;
                entrees.appendChild(h4);
            }
        else if (category = "SidesnSweets")
            {
                // if the category is Sides/Sweets
            }
        else
        {
            // if the category is Drinks
        }
    }
})