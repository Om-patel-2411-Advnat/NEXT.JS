'use client';

import { useRef, useState } from 'react';
import classes from './image-picker.module.css'
import Image from 'next/image';

export default function ImagePicker({label , name}){

    const [pickedImage , setPickedImage] = useState(null);
    const imageRef = useRef();

    function HandlePickClick(){
        imageRef.current.click();
    }
    function HandleImageChange(event){
        const file = event.target.files[0];

        if(!file){
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = ()=> {
            setPickedImage(fileReader.result);
        }

        fileReader.readAsDataURL(file);

    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage &&  <p>No image Picked yet..</p>}
                    {pickedImage &&  <Image src={pickedImage} alt='the image is selected by user' fill />}
                </div>
                <input 
                    className={classes.input}
                    type='file' 
                    id={name} 
                    accept='image/png , image/jpeg , image/jpg' 
                    name={name}
                    ref={imageRef}
                    onChange={HandleImageChange}
                    required
                />
                <button className={classes.button} type='button' onClick={HandlePickClick}>Pick Image</button>
            </div>
        </div>
    )
}