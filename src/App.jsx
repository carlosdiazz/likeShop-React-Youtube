import {commerce} from './lib/commerce';
import { useState, useEffect } from 'react';

import fire from './fire';
import Login from './login';
import Hero from './Hero';
import App2 from './todo';


const App = ()=> {

  const [user, setUser]=useState('');
  const [email,setEmail]=useState('');
  const [password, setpassword]=useState('');
  const [emailError, setEmailError]=useState('');
  const [passwordError, setPasswordError]=useState('');
  const [hassAccont, setHasAccont]=useState(false);


  const [products, setProducts] = useState([]);
  const [basketData, setBasketData] = useState({});
  const [orderInfo, setOrderInfo] = useState({});
  const [orderError, setOrderError] = useState("");

  const clearInputs = () => {
    setEmail('');
    setpassword('');
  }

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }


  const handlelogin = () => {
    clearErrors()
    fire
      .auth()
      .signInWithEmailAndPassword(email,password)
      .catch((err)=>{
        // eslint-disable-next-line default-case
        switch(err.code){
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setEmailError(err.message);
            break;
          case 'auth/wrong-password':
            setPasswordError(err.message);
            break;

        }
      });
    }; 

    const handleSignup=()=>{
      clearErrors();
      fire
      .auth()
      .createUserWithEmailAndPassword(email,password)
      .catch((err)=>{
        // eslint-disable-next-line default-case
        switch(err.code){
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            setEmailError(err.message);
            break;
          case 'auth/weak-password':
            setPasswordError(err.message);
            break;

        }
      });
    };

  const handleLogout=()=>{
    fire.auth().signOut();
  };

  const authListener = () =>{
    fire.auth().onAuthStateChanged((user)=>{
      if(user){
        clearInputs();
        setUser(user);
      } else {
        setUser('');
      }
    });
  };







  const fetchProducts = async () => {
    const response = await commerce.products.list();
    setProducts((response && response.data) || []);
  };

  const fetchBasketData = async () => {
    const response = await commerce.cart.retrieve();
    setBasketData(response);
  };

  const addProduct = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity);
    setBasketData(response.cart);
  };

  const handleEmptyBasket = async () => {
    const response = await commerce.cart.empty();
    setBasketData(response.cart);
  };

  const RemoveItemFromBasket = async (itemId) => {
    const response = await commerce.cart.remove(itemId);
    setBasketData(response.cart);
  };

  const updateProduct = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });
    setBasketData(response.cart);
  };

  const refreshBasket = async () => {
    const newBasketData = await commerce.cart.refresh();
    setBasketData(newBasketData);
  };

  const handleCheckout = async (checkoutId, orderData) => {
    try {
      // const incomingOrder = await commerce.checkout.capture(
      //   checkoutId,
      //   orderData
      // );

      setOrderInfo(orderData);

      refreshBasket();
    } catch (error) {
      setOrderError(
        (error.data && error.data.error && error.data.error.message) ||
          "There is an error occurred"
      );
    }
  };


  useEffect(()=>{

    authListener();

    fetchProducts();
    fetchBasketData();
  }, []);
  console.log({products});

console.log('okkkkkkkk',basketData);

  return (

    <div className='App'>

    {user ? (
      <App2 handleLogout={handleLogout}/>
      //<Hero handleLogout={handleLogout} />
    ):(
      <Login 
      email={email} 
      setEmail={setEmail}  
      password={password} 
      setpassword={setpassword}
      handlelogin={handlelogin}
      handleSignup={handleSignup}
      hassAccont={hassAccont}
      setHasAccont={setHasAccont}
      emailError={emailError}
      passwordError={passwordError}
      />
    )}


    </div>

    /*
    <Router>
      
      <div className='App'>

      {user ? (
        //aqui

      <Banner />
      //<Hero handleLogout={handleLogout} />
    ):(
      <Login 
      email={email} 
      setEmail={setEmail}  
      password={password} 
      setpassword={setpassword}
      handlelogin={handlelogin}
      handleSignup={handleSignup}
      hassAccont={hassAccont}
      setHasAccont={setHasAccont}
      emailError={emailError}
      passwordError={passwordError}
      />
    )}

      
        <Banner />
      <NavBar basketItems={basketData.total_items}
      totalCost={
            (basketData.subtotal &&
              basketData.subtotal.formatted_with_symbol) ||
            "00.00"
          }>

      </NavBar>
        <Switch>
          <Route exact path="/">
            <Products products={products} addProduct={addProduct}></Products>
          </Route>
          
          <Route exact path="/basket">
            <Basket
              basketData={basketData}
              updateProduct={updateProduct}
              handleEmptyBasket={handleEmptyBasket}
              RemoveItemFromBasket={RemoveItemFromBasket}
            />
          </Route  >

          <Route exact path="/checkout">
            <Checkout
              orderInfo={orderInfo}
              orderError={orderError}
              basketData={basketData}
              handleCheckout={handleCheckout}
            />
          </Route>

        </Switch>
        <Footer />
      </div>
    </Router>
    */
  );
};

export default App;
