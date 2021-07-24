import { useState, useEffect } from 'react';
import fire from './fire';
import Login from './login';
import App2 from './todo';

const App = ()=> {

  const [user, setUser]=useState('');
  const [email,setEmail]=useState('');
  const [password, setpassword]=useState('');
  const [emailError, setEmailError]=useState('');
  const [passwordError, setPasswordError]=useState('');
  const [hassAccont, setHasAccont]=useState(false);

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

  useEffect(()=>{
    authListener();
  }, []);

  return (
    <div className='App'>
    {user ? (
      <App2 handleLogout={handleLogout}/>
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
  );
};
export default App;