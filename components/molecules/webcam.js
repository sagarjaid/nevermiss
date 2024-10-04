import { useEffect, useRef } from "react";

const Webcam = ({ stream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    } else if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [stream]);

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        className="h-full w-full scale-x-[-1] transform rounded-md"
      />
    </div>
  );
};

export default Webcam;
