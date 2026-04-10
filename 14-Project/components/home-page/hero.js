import Image from 'next/image'

import classes from './hero.module.css'
import image from '../../public/images/site/om.jpg';


export default function Hero(){
    return(
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image 
                    src={image} 
                    alt="image" 
                    width={300}
                    height={300}
                 />
            </div>
            <h1>Hi , i'm Om </h1>
            <p>I blog about web development</p>
        </section>
    )
}