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

        localStorage.setItem("shopping_list", JSON.stringify(_shopping_list))
        set_shopping_list(_shopping_list)
    }

    const remove_from_cart = (item_id) => {
        const _shopping_list = shopping_list.filter(item => item.id !== item_id)
        localStorage.setItem("shopping_list", JSON.stringify(_shopping_list))
        set_shopping_list(_shopping_list)
    }

    const calc_count = () => {
        let _count = 0
        for(let i=0; i< shopping_list.length; i++){
            let item = shopping_list[i]
            _count += item.quantity
        }
        set_count(_count)
    }

    const calc_total = () => {
        let _total = 0

        for(let i=0; i < shopping_list.length; i++){
            const current_item = shopping_list[i]
            const _price = Number(current_item.price.replace(/[^0-9.-]+/g,""));
            _total += _price * current_item.quantity
        }

        set_total(_total)
    }

    useEffect(()=> {
        calc_count()
        calc_total()
    }, [shopping_list])

    useEffect(() => {
        const old_cart_list = localStorage.getItem("shopping_list")
        if(old_cart_list){
            set_shopping_list(JSON.parse(old_cart_list))
        }
    }, [])

    return(
        <ShoppingCartContext.Provider value={{
            visible: visible,
            set_visible: set_visible,
            shopping_list: shopping_list,
            set_shopping_list: set_shopping_list,
            count: count,
            total: total,
            add_to_cart: add_to_cart,
            remove_from_cart: remove_from_cart
        }}>
            {props.children}
        </ShoppingCartContext.Provider>
    )
}