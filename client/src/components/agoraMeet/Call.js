import React, { useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from './useAgora';
import MediaPlayer from './MediaPlayer';
import './Call.css';

const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });

function Call() {
    const [appid, setAppid] = useState('a5a7260bd13a44acb97779dc6992debf');
    const [token, setToken] = useState('006a5a7260bd13a44acb97779dc6992debfIAA8MWi7ugDGVPP0RgF2+6F/JSTQsEkYC0mbhnPI8XyFHjLRTXgAAAAAEAAY899JU3TZYAEAAQBSdNlg');
    const [channel, setChannel] = useState('Test');
    const {
        localAudioTrack, localVideoTrack, leave, join, joinState, remoteUsers
    } = useAgora(client);

    return (
        <div className='call'>
            <form className='call-form'>
                <div className='button-group'>
                    <button id='join' type='button' className='btn btn-primary btn-sm' disabled={joinState} onClick={() => { join(appid, channel, token) }}>Join</button>
                    <button id='leave' type='button' className='btn btn-primary btn-sm' disabled={!joinState} onClick={() => { leave() }}>Leave</button>
                </div>
            </form>
            <div className='player-container'>
                <div className='local-player-wrapper'>
                    <p className='local-player-text'>{localVideoTrack && `localTrack`}{joinState && localVideoTrack ? `(${client.uid})` : ''}</p>
                    <MediaPlayer videoTrack={localVideoTrack} audioTrack={localAudioTrack}></MediaPlayer>
                </div>
                {remoteUsers.map(user => (<div className='remote-player-wrapper' key={user.uid}>
                    <p className='remote-player-text'>{`remoteVideo(${user.uid})`}</p>
                    <MediaPlayer videoTrack={user.videoTrack} audioTrack={user.audioTrack}></MediaPlayer>
                </div>))}
            </div>
        </div>
    );
}

export default Call;
