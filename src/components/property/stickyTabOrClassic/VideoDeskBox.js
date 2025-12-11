/**
 * It's a function that returns a div with a button that opens a modal with a video in it
 * @returns A React component that renders a modal with a video.
 */
import React, { useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import Img from "../../../utils/BackgroundImageRatio";

function getYouTubeEmbedUrl(url) {
  const id = url.split("v=")[1]?.split("&")[0];
  return `https://www.youtube.com/embed/${id}`;
}


const VideoDeskBox = ({video}) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <div className='desc-box' id='video'>
      <div className='page-section ratio_40'>
        <h4 className='content-title'>video</h4>
        <div className='play-bg-image'>
          <div style={{width:"100%",height:"500px",overflow:"hidden"}}>
            <Img src='/assets/images/video_image.webp' className='bg-img' />
          </div>
          <div className='icon-video'>
            <a>
              <i className='fas fa-play' onClick={() => setModal(true)}></i>
            </a>
          </div>
        </div>
      </div>
      <Modal className='video-modal' centered size='lg' isOpen={modal} toggle={toggle} modalTransition={{ timeout: 100 }}>
        <ModalBody className='m-0 p-0'>
          <Button onClick={toggle} type='button' className='btn-close' aria-label='Close'>
            <span aria-hidden='true'>×</span>
          </Button>
          {/* <iframe src='https://www.youtube.com/embed/3H6Evu2hPpE?si=KS_WdXxa_vWBn4o1' allowFullScreen></iframe> */}
          <iframe
  src={getYouTubeEmbedUrl(video)}
  allowFullScreen
  width="100%"
  height="450"
></iframe>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default VideoDeskBox;
