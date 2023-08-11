//import * as React from 'react';
import svg2 from '../assets/svg2.webp'
import Button from '../component/Button';
import {useNavigate} from 'react-router-dom'


export default function Home() {
    const navigate=useNavigate()
    const handleClick=()=>{
        navigate('/signUp')
    }
    return (
        <main id='home'>
            <section>
                <img src={svg2} alt="" />
            </section>
            <section>
                <h3>
                    Getting things done with TODO
                </h3>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus unde soluta veniam amet eveniet doloremque
                    aliquidvoluptatem quaerat rem saepe. Perferendis culpa officia nesciunt ratione temporibus,
                     voluptatum aperiam at quis.
                </p>
            </section>
            <section>
                <Button click={handleClick} type='submit'>
                    Get Started
                </Button>
            </section>
        </main>
    );
}
