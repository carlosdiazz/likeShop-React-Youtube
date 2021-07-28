import CheckoutForm from "./CheckoutForm";
import BookingDetails from "./BookingDetails";
import Confirmation from "./Confirmation";
import Payment from "./Payment";

export const renderRelatedComponent = ({
  user,
  orderInfo,
  orderError,
  totalPrice,
  bookingStep,
  handleChange,
  handleSubmit,
  checkoutData,
  handleBackStep,
  handleNextStep,
  setTotalPrice,
  handleCheckout,
  handleSelectChange,
  totalPriceWithCurrency,
  setTotalPriceWithCurrency,
}) => {
  switch (bookingStep) {
    case "order-address":
      return (
        <CheckoutForm
          user={user}
          orderInfo={orderInfo}
          checkoutData={checkoutData}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
        />
      );
    case "order-details":
      return (
        <BookingDetails
          user={user}
          checkoutData={checkoutData}
          setTotalPrice={setTotalPrice}
          handleBackStep={handleBackStep}
          handleNextStep={handleNextStep}
          handleCheckout={handleCheckout}
          setTotalPriceWithCurrency={setTotalPriceWithCurrency}
        />
      );
    case "order-payment":
      return (
        <Payment
          user={user}
          totalPrice={totalPrice}
          checkoutData={checkoutData}
          handleBackStep={handleBackStep}
          handleNextStep={handleNextStep}
          handleCheckout={handleCheckout}
          totalPriceWithCurrency={totalPriceWithCurrency}
        />
      );
    case "confirmation":
      return <Confirmation orderInfo={orderInfo} orderError={orderError} />;
    default:
      return null;
  }
};
