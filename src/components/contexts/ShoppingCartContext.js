import React, {useState, createContext, useEffect} from "react"

export const ShoppingCartContext = createContext(true)

export const ShoppingCartProvider = (props) => {
    const [visible, set_visible] = useState(false)

    return(
        <ShoppingCartContext.Provider value={{
            visible: visible,
            set_visible: set_visible
        }}>
            {props.children}
        </ShoppingCartContext.Provider>
    )
}