import React from 'react'
import { useSpring, animated } from 'react-spring';

const About = () => {
    
    const springProps = useSpring({
        to: { opacity: 1, translateY: '0' }, from: { opacity: 0, translateY: '30rem' }, delay: 200,
    });
    return (

        <animated.div style={springProps}>
               <div className="about-container">
        <h1 className="about-heading">About us</h1>
        <p>In the site you can save your contacts data fully secured and you can easily managed your contact list with specific user.</p>
        </div>
        </animated.div>

     
    )
}

export default About
