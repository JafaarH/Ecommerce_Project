import Button from '@material-ui/core/Button'
import { CartItemType } from '../page'
import { Wrapper } from "./Item.styles"


type props = {
item: CartItemType,
handleAddCart: (clickedItem: CartItemType) => void,
}

const Item: React.FC<props> = ({item, handleAddCart}: props) => {
    return (
        <Wrapper>
            <img src={item.image} alt={item.title}/>
            <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <h3>${item.price}</h3>
            </div>
            <Button onClick={() => handleAddCart(item)}>Add to cart</Button>
        </Wrapper>
    )
}
export default Item