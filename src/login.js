import React from 'react'

const Login = (props) => {

    const {email, setEmail, password, setpassword, handlelogin, handleSignup, hassAccont, setHasAccont, emailError, passwordError}= props;

    return(

        <section className='login'>
            
        <div className='loginContainer'>

            <label>Usuario</label>
            <input
                type='text'
                autoFocus
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />

            <p className='errorMsg'>{emailError}</p>
            <label>Contrasena</label>
            <input
                type='password'
                required
                value={password}
                onChange={(e)=>setpassword(e.target.value)}
            />
            <p className='ErrorMsg'>{passwordError}</p>
            <div className='btnContainer'>
                { hassAccont ? (
                    <>
                        <button onClick={handlelogin}>Iniciar Cuenta</button>
                        <p> 
                            ¿No tienes una cuenta?
                            <span onClick={()=> setHasAccont(!hassAccont)}>Registrarse</span>
                        </p>
                    </>
                    ) : (
                        <>
                        <button onClick={handleSignup}>Registrase</button>
                        <p>¿Tienes una cuenta? <span onClick={()=>setHasAccont(!hassAccont)}>Iniciar Seccion</span></p>
                        </>
                    )}
            </div>

        </div>


        </section>

    )
}

export default Login