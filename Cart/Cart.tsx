import {Wrapper} from "./Cart.styles"
import {CartItemType} from "../page"
import CartItem from "../CartItem/CartItem"

type props = {
    cartItems: CartItemType[],
    handleAddCart: (clickedItem: CartItemType) => void,
    handleRemoveCart: (id: number) => void
}

const Cart:React.FC<props> = ({cartItems, handleAddCart, handleRemoveCart}: props) => {
    return (
        <Wrapper>
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? <p>Your Cart Is Empty</p> : null}
            {cartItems.map((item) => (
                <CartItem 
                key={item.id}
                item={item}
                handleAddCart={handleAddCart}
                handleRemoveCart={handleRemoveCart}
                />
            ))}
        </Wrapper>
    )
}
export default Cart;