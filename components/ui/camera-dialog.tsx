import React, { useEffect, useRef, useState } from 'react';
import Spinner from '@/components/ui/spinner';

interface propsType {
    run: boolean;
    getIdData: (data: any) => void;
}

function CameraAndGemini({run, getIdData}: propsType) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (run) {
            startCamera();
        }
    }, [run]);

    async function startCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
            tracks.forEach((track) => track.stop());
        }
    };

const handleProcessImage = async (imageBlob: Blob) => {
    try {
        const response = await fetch('/api/process_images', {
            method: 'POST',
            headers: { 'Content-Type': 'application/octet-stream' },
            body: imageBlob,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        getIdData(data.data);
    } catch (err: any) {
        console.error(err);
        setError(err);
    }
};

    const takePhoto = async () => {
        if (videoRef.current && canvasRef.current) {
            setIsLoading(true);
            const context = canvasRef.current.getContext('2d');
            if (context) {
                const { videoWidth, videoHeight } = videoRef.current;
                canvasRef.current.width = videoWidth;
                canvasRef.current.height = videoHeight;
                context.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);

                const dataUrl = canvasRef.current.toDataURL('image/jpeg');
                const response = await fetch(dataUrl);
                const blob = await response.blob();

                await handleProcessImage(blob);
                setIsLoading(false);
            }
        }
    };


    if (!run) {
        stopCamera();
        return null;
    }

    return (
        <div className="relative my-2 flex flex-col justify-center gap-2">
            <div className={`absolute w-full min-h-full bg-white opacity-45 z-20 flex justify-center items-center ${isLoading ? "" : "hidden"}`}>
                <Spinner />
            </div>
            <video ref={videoRef} autoPlay playsInline />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={takePhoto}>Scanner</button>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            {error && <span className='text-red-500'>Erreur</span>}
        </div>
    );
};

export default CameraAndGemini;