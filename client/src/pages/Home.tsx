//import * as React from 'react';
import svg2 from '../assets/svg2.webp'
import { useNavigate } from 'react-router-dom'


export default function Home() {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/signUp')
    }
    return (
        <main id='home'
            className='min-h-screen'>
            <article 
            className="
            flex flex-col justify-center align-middle w-screen h-full
            sm:flex-row sm:justify-between sm:min-h-screen
            ">
                <section
                 className='order-2 text-center sm:order-1 sm:w-2/4 sm:bg-blue-800  sm:text-white sm:relative sm:text-left
                   md:w-2/5'>
                    <div className='sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2'>
                        <h3 className='text-lg mb-8 font-extrabold sm:text-2xl'>
                            Getting things done with TODO
                        </h3>
                        <p className='p-3 sm:p-1'>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus unde soluta veniam amet eveniet doloremque
                            aliquidvoluptatem quaerat rem saepe. Perferendis culpa officia nesciunt ratione temporibus,
                            voluptatum aperiam at quis.
                        </p>
                        <button className="bg-blue-800 hover:bg-blue-700 text-white rounded-xl w-80 mt-8 p-4 sm:border-2 sm:border-white sm:w-64 " 
                        onClick={handleClick}>
                            Get Started
                        </button>
                    </div>
                </section>
                <section className='sm:mb-4 order-1 flex justify-center align-middle sm:order-2 sm:w-2/4 md:w-3/5'>
                    <img src={svg2} alt="" className=' object-contain' />
                </section>

            </article>
            <section>

            </section>
        </main>
    );
}
