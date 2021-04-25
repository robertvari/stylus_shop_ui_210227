import React, {useState, createContext, useEffect} from "react"

export const ShoppingCartContext = createContext(true)

export const ShoppingCartProvider = (props) => {
    const [visible, set_visible] = useState(false)
    const [shopping_list, set_shopping_list] = useState([])
    const [count, set_count] = useState(0)
    const [total, set_total] = useState(0)

    return(
        <ShoppingCartContext.Provider value={{
            visible: visible,
            set_visible: set_visible,
            shopping_list: shopping_list,
            set_shopping_list: set_shopping_list,
            count: count,
            total: total
        }}>
            {props.children}
        </ShoppingCartContext.Provider>
    )
}