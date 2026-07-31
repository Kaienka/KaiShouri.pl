import React from 'react';
import PlaySvg from '../svg/PlaySvg';
import PauseSvg from '../svg/PauseSvg';
import StopSvg from '../svg/StopSvg';

type VoiceControlProps = {
    speechStatus: string;
    start: () => void;
    pause: () => void;
    stop: () => void;
};

const VoiceControl: React.FC<VoiceControlProps> = ({ speechStatus, start, pause, stop }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }} className=" p-2 w-full items-center justify-center">
            <div style={{ display: "flex", columnGap: "0.5rem" }} >
                {speechStatus !== "started" ? (
                    <button onClick={start} className="text-xs flex flex-col items-center align-center"><PlaySvg /><p>czytaj na głos</p></button>
                ) : (
                    <>
                        <button onClick={pause} className="text-xs flex flex-col items-center align-center"><PauseSvg /><p>pauza</p></button>
                        <button onClick={stop} className="text-xs flex flex-col items-center align-center"><StopSvg /><p>stop</p></button>
                    </>
                )}
            </div>
        </div>
    );
};

export default VoiceControl;
