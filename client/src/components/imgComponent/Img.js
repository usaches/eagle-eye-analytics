import React from 'react'

//image rendering componnet

function Img(props){
    return(
        <div>
            <h1>Cam {props.num}</h1>
            <video controls>
                <source src={props.src} type="video/mp4" />
            </video>
        </div>
    )
}

export default Img