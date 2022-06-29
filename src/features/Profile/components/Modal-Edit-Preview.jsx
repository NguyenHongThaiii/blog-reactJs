import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import Cropper from "react-easy-crop";
import "./style.scss";
import getCroppedImg from "../../../utils/cropImage";
import { useDispatch, useSelector } from "react-redux";
import usersApi from "../../../../api/usersApi";
import { handleCheckIsLocalImage } from "../../../utils";
import { updateUser } from "../../Auth/authSlice";
ModalEditPreview.propTypes = {
  url: PropTypes.string,
  file: PropTypes.object,
  hideModalPreview: PropTypes.func,
  hideModal: PropTypes.func,
};

function ModalEditPreview({ url = "", hideModalPreview = null, hideModal }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const user = useSelector((state) => state.auth.current);
  const dispatch = useDispatch();
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const showCroppedImage = useCallback(async () => {
    try {
      const { path, buffer } = await getCroppedImg(url, croppedAreaPixels);
      const res = await usersApi.update({ file: buffer.split(";base64,")[1] });
      setCroppedImage(path);
      dispatch(updateUser({ avatar: res.data.user.photo }));
      hideModal();
    } catch (e) {
      console.error("Error", error);
    }
  }, [croppedAreaPixels]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
    hideModalPreview();
  }, []);
  return (
    <div className="text-sm relative ">
      <div className="h-[60vh] ">
        <div className="crop-container">
          <Cropper
            image={
              url ||
              "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
            }
            crop={crop}
            zoom={zoom}
            maxZoom={2}
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className="controls">
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => {
              setZoom(e.target.value);
            }}
            className="zoom-range"
          />
        </div>
      </div>
      <div className=" py-[10px] px-4 border-t-[1px] border-t-[#f0f0f0] text-right">
        <button
          onClick={onClose}
          className=" hover:border-primary hover:text-primary transition-all duration-700 border border-[#d9d9d9] bg-white shadow-[0_2px_0_rgb(0,0,0,0.02)] font-normal rounded-[2px] h-[32px] text-sm py-1 px-[15px]"
        >
          Hủy
        </button>
        <button
          onClick={showCroppedImage}
          className=" hover:opacity-90 ml-2 bg-primary  text-white  transition-all duration-700 border border-[#d9d9d9] shadow-[0_2px_0_rgb(0,0,0,0.02)] font-medium rounded-[2px] h-[32px] text-sm py-1 px-[15px]"
        >
          Cập nhật
        </button>
      </div>
    </div>
  );
}

export default ModalEditPreview;
