import React from 'react'
import cardPic from '../assets/cardPic.png'

function Card() {
    return (
        <div className='flex w-[80%] ml-10'>
            <img src={cardPic} alt="module pic" className='w-[50%]' />

            <div className=' w-full p-2'>
                <div className='flex justify-between'>
                    <div className='font-bold hover:border-b '>Les cours de soutien shez Aziz</div>
                    <div className='text-gray-500'>12-12-2023</div>
                </div>
                <div className='font-thin'>
                    description descriptiondes criptiondes crip tiondescri ptiondesc ription descr iptionde
                    ript ion dedescription descriptiondes criptiondes crip tiondescri ptiondesc ription des
                    iptiondescdescription descriptiondes criptiondes crip tiondescri ptiondesc ription des
                    iptiondescript ion dedescription descriptiondes criptiondes crip tiondescri
                </div>
                <hr className='my-2'/>
                <div className='font-bold'>Information sur l’annonce</div>
                <div className='flex'>
                    <div className='mr-4'>
                        <div>categorie</div>
                        <div>prix</div>
                        <div>module</div>
                        <div>lieu</div>
                    </div>
                    <div className='text-blue-500'>
                        <div>lycee</div>
                        <div>1500dz/mois</div>
                        <div>math</div>
                        <div>lieu</div>
                    </div>
                </div>
                <button  className='border p-1 border-blue-500 rounded-lg text-blue-500'>voir sur map</button>
                <hr className='my-2'/>
                <div  className='font-bold'>Information sur l’annonceur</div>
                <div className='flex'>
                    <div className='mr-4'>
                        <div>nom</div>
                        <div>prenom</div>
                        <div>tel</div>
                        <div>gmail</div>
                        <div>adresse</div>
                    </div>
                    <div className='text-blue-500'>
                        <div>aawkell</div>
                        <div>brahim</div>
                        <div>05888888</div>
                        <div>eleulma/setif/algeria</div>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <button className='border p-1 border-blue-500 text-blue-500 rounded-lg w-[50%] mr-1' >sauvegarder</button>
                    <button className=' p-1 border-blue-500 text-white bg-blue-500 rounded-lg w-[50%]'>sauvegarder</button>
                </div>



            </div>
        </div>
    )
}

export default Card