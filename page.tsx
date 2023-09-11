"use client"
import {useQuery} from "react-query"
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import  AddShoppingCartIcon  from "@material-ui/icons/AddShoppingCart";
import Badge from '@material-ui/core/Badge'
import {StyledButton, Wrapper} from "./App.styles"
import { DateRangeRounded } from "@material-ui/icons";
import Item from "./Item/Item";
import { useState } from "react";
import Cart from "./Cart/Cart";

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}


const getProducts = async(): Promise<CartItemType[]> => 
await (await fetch('https://fakestoreapi.com/products')).json()

export default function Home() {

const [cartOpen, setCartOpen] = useState<boolean>(false);
const [cartItems, setCartItems] = useState([] as CartItemType[])

const {data, isLoading, error} = useQuery<CartItemType[]>(
  "products",
  getProducts
)

const getTotalItems = (cartItems: CartItemType[]) => {
   
    const totalA = cartItems.reduce((acu, cartItem) => acu + cartItem.amount , 0);
   
      if(totalA > 9){
        return "+9"
      }else{
        return totalA;
      }
}

const handleAddCart = (clickedItem: CartItemType) =>{
  return(
  setCartItems(prev  => {
    const isItemInCart = prev.find(item => item.id === clickedItem.id)
    if(isItemInCart){
      return( prev.map(item => (
        item.id === clickedItem.id
        ? {...item, amount: item.amount +1}
        : item
      )))
    }
    return [...prev, {...clickedItem , amount: 1}]
  })
)} ;

const handleRemoveCart = (id: number) => {
  setCartItems(prev => {
    return prev.reduce((ack, item) => {
      if (item.id === id) {
        if (item.amount === 1) return ack;
        return [...ack, { ...item, amount: item.amount - 1 }];
      } else {
        return [...ack, item];
      }
    }, [] as CartItemType[]);
})
};



if(isLoading) return <LinearProgress />
if(error) return <div>Something Went Wrong... </div>

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart 
        cartItems={cartItems}
        handleAddCart={handleAddCart}
        handleRemoveCart={handleRemoveCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4} >
            <Item item={item} handleAddCart={handleAddCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  )
}

