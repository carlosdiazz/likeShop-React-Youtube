import React from 'react'

const Hero = ({handleLogout}) => {

   
    return(

        <section className='hdero'>
            <nav>
                <button onClick={handleLogout}>Salir</button>
            </nav>
        </section>

    );
};

export default Hero;