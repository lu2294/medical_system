import React from 'react';
import ReactPlayer from 'react-player/lazy';

function Player(props) {
    const { url } = props;
    return <ReactPlayer 
    className='react-player'
    url={url} 
    width='100%'
    height='100%'
    playing={true}
    controls
    />
}

export default Player;