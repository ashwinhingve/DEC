import React, { useCallback, useRef, useState, useEffect } from 'react';
import { User, Camera, X, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const PhotoUploader = () => {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [formData, setFormData] = useState({
    personal: { photo: null }
  });
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Handle file upload
  const handlePhotoUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormData(prev => ({
          ...prev,
          personal: { ...prev.personal, photo: reader.result }
        }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Start camera stream
  const startCamera = useCallback(async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Your browser doesn't support camera access or you're not using HTTPS");
        return;
      }
      
      const constraints = { 
        video: { 
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      };
      
      console.log("Attempting to access camera...");
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log("Camera access granted, stream:", stream);
      
      // First set the state to ensure component updates
      setIsCameraActive(true);
      
      // Use setTimeout to ensure the video element exists in the DOM
      setTimeout(() => {
        if (videoRef.current) {
          console.log("Setting video source...");
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
        } else {
          console.error("Video ref is not available");
        }
      }, 100);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access your camera. Please check permissions.");
    }
  }, []);

  // Effect to handle video playing when stream is set
  useEffect(() => {
    if (isCameraActive && videoRef.current && videoRef.current.srcObject) {
      console.log("Attempting to play video...");
      videoRef.current.play()
        .then(() => console.log("Video playing successfully"))
        .catch(e => console.error("Error playing video:", e));
    }
  }, [isCameraActive]);

  // Stop camera stream
  const stopCamera = useCallback(() => {
    console.log("Stopping camera...");
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => {
        console.log("Stopping track:", track);
        track.stop();
      });
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsCameraActive(false);
  }, []);

  // Take photo from camera
  const capturePhoto = useCallback(() => {
    if (videoRef.current) {
      console.log("Capturing photo...");
      console.log("Video dimensions:", videoRef.current.videoWidth, videoRef.current.videoHeight);
      
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      
      try {
        const dataUrl = canvas.toDataURL('image/jpeg');
        console.log("Photo captured successfully");
        
        setPhotoPreview(dataUrl);
        setFormData(prev => ({
          ...prev,
          personal: { ...prev.personal, photo: dataUrl }
        }));
      } catch (e) {
        console.error("Error creating image:", e);
        alert("Error capturing image. Please try again.");
      }
      
      // Stop the camera after taking photo
      stopCamera();
    } else {
      console.error("No video element available for capture");
    }
  }, [stopCamera]);

  console.log("Camera active state:", isCameraActive);

  return (
    <div className="mb-4">
    <label className="block text-gray-700 mb-2 font-medium">Profile Photo</label>
    {isCameraActive ? (
      <div className="relative mb-4">
        <video
          ref={videoRef}
          autoPlay
          className="w-full max-w-full h-auto md:h-64 bg-gray-800 rounded-lg object-cover"
        />
  
        <div className="flex flex-col sm:flex-row mt-2 space-y-2 sm:space-y-0 sm:space-x-2">
          <motion.button
            type="button"
            className="bg-blue-600 w-full sm:w-auto text-white py-2 px-4 rounded-lg flex items-center justify-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={capturePhoto}
          >
            <Camera size={16} className="mr-2" />
            Take Photo
          </motion.button>
  
          <motion.button
            type="button"
            className="bg-gray-600 w-full sm:w-auto text-white py-2 px-4 rounded-lg flex items-center justify-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={stopCamera}
          >
            <X size={16} className="mr-2" />
            Cancel
          </motion.button>
        </div>
      </div>
    ) : (
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <motion.div
          className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center border-2 border-gray-300 shadow-md"
          whileHover={{ scale: 1.05, borderColor: '#3b82f6' }}
          transition={{ duration: 0.2 }}
        >
          {photoPreview ? (
            <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User size={40} className="text-gray-400" />
          )}
        </motion.div>
  
        <div className="flex flex-col w-full sm:w-auto sm:flex-row gap-2">
          <motion.label
            className="cursor-pointer w-full sm:w-auto bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 py-2 px-4 rounded-lg flex items-center justify-center border border-gray-300 shadow-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <ImageIcon size={16} className="mr-2 text-blue-600" />
            Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </motion.label>
  
          <motion.button
            type="button"
            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center shadow-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={startCamera}
          >
            <Camera size={16} className="mr-2" />
            Use Camera
          </motion.button>
        </div>
      </div>
    )}
  </div>
  );
};

export default PhotoUploader;