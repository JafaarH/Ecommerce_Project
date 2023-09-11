import Button from "@material-ui/core/Button"
import {CartItemType} from "../page"
import {Wrapper} from "./CartItem.styles"

type props ={
    item: CartItemType,
    handleAddCart: (clickedItem: CartItemType)=>void,
    handleRemoveCart: (id: number) => void
}

const CartItem: React.FC<props> = ({item, handleAddCart, handleRemoveCart}: props) => {
    return (
        <Wrapper>
            <div>
                <h3>{item.title}</h3>
                <div className="information">
                    <p>Price: ${item.price}</p>
                    <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
                </div>
                <div className="buttons">
                    <Button 
                    onClick={() =>handleRemoveCart(item.id)}
                    size="small"
                    disableElevation
                    variant="contained"
                    >
                        -
                    </Button>
                    <p>{item.amount}</p>
                    <Button 
                    onClick={() =>handleAddCart(item)}
                    size="small"
                    disableElevation
                    variant="contained"
                    >
                        +
                    </Button>
                </div>
            </div>
            <img src={item.image} alt={item.title} />
        </Wrapper>
    )
}
export default CartItem