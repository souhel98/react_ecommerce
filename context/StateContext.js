
import { createContext , useContext , useState , useEffect } from "react"; 
import { toast, Toaster } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const  onAdd = (product, quantity) => {
        const checkProductInCard = cartItems.find((item) => item._id === product._id);  // loop over all the cart item

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotoalQuantities) => prevTotoalQuantities + quantity);

        if(checkProductInCard){
           
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })
            setCartItems(updatedCartItems);
        }
        else{
            product.quantity = quantity;
            setCartItems([...cartItems, {...product}]);
        }
        toast.success(`${qty} ${product.name} hello , added to the cart.`);
        // alert(`${qty} ${product.name} added to the cart.`)
        console.log({cartItems});
        setQty(1)

    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id)
        const newCartItems = cartItems.filter((item) => item._id !== product._id);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity)
        setTotalQuantities((prevTotoalQuantities) => prevTotoalQuantities - foundProduct.quantity)
        setCartItems(newCartItems)
    }

    const toggleCartItemQuanitity = (id , value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        //const newCartItems = cartItems.filter((item) => item._id !== id);
        index = cartItems.findIndex((item) => item._id === id);
        const newCartItems = cartItems;
        

        if (value === 'inc') {
            newCartItems[index] = {...foundProduct, quantity: foundProduct.quantity + 1};
            setCartItems(newCartItems);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities((prevTotoalQuantities) => prevTotoalQuantities + 1)
            console.log(index);
        } else if (value === 'dec'){

            if ( foundProduct.quantity > 1) {

            newCartItems[index] = {...foundProduct, quantity: foundProduct.quantity - 1};
            setCartItems(newCartItems);    
            //setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity - 1}]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
            setTotalQuantities((prevTotoalQuantities) => prevTotoalQuantities - 1)
            }    
        }
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }
    const decQty = () => {
        setQty((prevQty) => {
           if (prevQty - 1 < 1) return 1;

           return prevQty - 1;
        });
    }

    return(
        <Context.Provider
        value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            setShowCart,
            toggleCartItemQuanitity,
            onRemove
        }}
        >
            {children}
        </Context.Provider>
       
    )
}

export const useStateContext = () => useContext(Context)