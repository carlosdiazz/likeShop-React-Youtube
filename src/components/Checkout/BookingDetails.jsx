import React from "react";
import {
  List,
  ListItem,
  Button,
  Typography,
  ListItemText,
} from "@material-ui/core";

const BookingDetails = ({ user, setTotalPrice, checkoutData, handleBackStep, handleNextStep, setTotalPriceWithCurrency, }) => {
  console.log({checkoutData});
  console.log({user});
  
  const shippingCost = user.shippingOptions[0].price.raw;
  const shippingCurrency = checkoutData.live.currency.code;
  
  const totalShippingCost =
    checkoutData.live.line_items.reduce((acc, product) => {
      return acc + product.quantity;
    } , 0) * shippingCost;

    const totalPrice = checkoutData.live.subtotal.raw + totalShippingCost;
    const totalPriceWithCurrency = `${totalPrice} ${shippingCurrency}`;

    setTotalPrice(totalPrice);
    setTotalPriceWithCurrency(totalPriceWithCurrency);

  return ( 
  <>
    <List>
      {checkoutData.live.line_items.map((item) => (
        <ListItem key={item.id}>
          <ListItemText
            primary={item.name}
            secondary={`Quantity: ${item.quantity}`}
          />
          <Typography variant="body2">
            {item.line_total.formatted_with_symbol}
          </Typography>
        </ListItem>
      ))}
      <ListItem>
        <ListItemText primary="Precio del Shiping" />
        <Typography variant="body2">
          {`${totalShippingCost} ${shippingCurrency}`}
        </Typography>
      </ListItem>
      <ListItem>
        <ListItemText primary="Precio Total" />
        <Typography variant="body2">
          {totalPriceWithCurrency}
        </Typography>
      </ListItem>
    </List>

    <div className="actions">
      <Button
        size="medium"
        onClick={(e) => handleBackStep(e, "order-address")}
        variant="contained"
      >
        Volver
      </Button>
      <Button
        onClick={(e) => handleNextStep(e, "order-payment")}
        size="medium"
        color="secondary"
        variant="contained"
      >
        Siguiente
      </Button>
    </div>
  </>
);
};
 
export default BookingDetails;
