import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import Modal from 'react-bootstrap/Modal';
import { CameraFill } from 'react-bootstrap-icons';

const WebcamCapture = ({ onDataFromChild,mat }) => {
  // const sendDataToParent = () => {
  //   onDataFromChild('jospin');
  // };

    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const webcamRef = useRef(null);

  // const capture = useCallback(() => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   const byteString = atob(imageSrc.split(',')[1]);
  //   const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
  //   const ab = new ArrayBuffer(byteString.length);
  //   const ia = new Uint8Array(ab);
  //   for (let i = 0; i < byteString.length; i++) {
  //     ia[i] = byteString.charCodeAt(i);
  //   }
  //   const blob = new Blob([ab], { type: mimeString });
  //   const file = new File([blob], 'photo.jpg', { type: mimeString });
  //   // Now you can upload the file or save it locally
  //   onDataFromChild(file);
  //   handleClose()
  // }, [webcamRef]);

  const [imageSrc, setImageSrc] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  };
  
  return (
    <>
      
      <div className='btn btn-secondary m-2'  onClick={handleShow}>
        <CameraFill/>
      </div>
      

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
        />
          {imageSrc && (
        <div className='m-3'>
          <img src={imageSrc} alt="Captured"  width={200}/>
        </div>
      )}
        <Modal.Footer>
        {imageSrc && (
          <a href={imageSrc} className='btn btn-success' download={'photo'+mat+'.jpg'}>Sauvegarder</a>
      )}
          <button onClick={handleClose} className="btn btn-secondary">
            Fermer
          </button>
          <button onClick={capture}className="btn btn-primary">
            Capture
          </button>

        </Modal.Footer>
      </Modal>
    </>
  );
};

export default WebcamCapture;
