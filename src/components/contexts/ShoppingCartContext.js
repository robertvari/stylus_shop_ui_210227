import React, {useState, createContext, useEffect} from "react"

export const ShoppingCartContext = createContext(true)

export const ShoppingCartProvider = (props) => {
    const [visible, set_visible] = useState(false)
    const [shopping_list, set_shopping_list] = useState([])
    const [count, set_count] = useState(0)
    const [total, set_total] = useState(0)

    const is_in_cart = (item_id) => {
        const result = shopping_list.filter(item_data => item_data.id ===item_id)
        if(result.length > 0) return true
        return false
    }

    const add_to_cart = (item_data) => {
        const _item_data = item_data
        const _shopping_list = [...shopping_list]

        if(is_in_cart(item_data.id)){
            for(let i=0; i<_shopping_list.length;i++){
                let _item = _shopping_list[i]
                if(_item.id === item_data.id){
                    _item.quantity +=1
                    break
                }
            }
        }else{
            _item_data.quantity = 1
            _shopping_list.push(_item_data)
        }

        set_shopping_list(_shopping_list)
    }

    return(
        <ShoppingCartContext.Provider value={{
            visible: visible,
            set_visible: set_visible,
            shopping_list: shopping_list,
            set_shopping_list: set_shopping_list,
            count: count,
            total: total,
            add_to_cart: add_to_cart
        }}>
            {props.children}
        </ShoppingCartContext.Provider>
    )
}