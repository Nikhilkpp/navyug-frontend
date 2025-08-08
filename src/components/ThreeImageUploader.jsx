import React, { useState } from 'react';

const ThreeImageUploader = ({handleGetImages,handleGetCaptions}) => {
  const [images, setImages] = useState([
    { file: null, preview: null, name: '' },
    { file: null, preview: null, name: '' },
    { file: null, preview: null, name: '' }
  ]);
  const [captions,setCaptions]=useState([
    [],[],[]
  ])
  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedImages = [...images];
    updatedImages[index] = {
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    };
    console.log(updatedImages)
    setImages(updatedImages);
    handleGetImages(updatedImages)
  };
  const handleCaptionChange=(index,e)=>{
    const updatedCaptions=[...captions];
    updatedCaptions[index]=e.target.value;
    setCaptions(updatedCaptions);
    handleGetCaptions(updatedCaptions)
    
  }

  return (
    <div className="form-group ">
      {images.map((img, index) => (
        <div key={index} className="space-y-2">
          {/* Hidden input */}
          <input
            id={`image-input-${index}`}
            
            type="file"
            accept="image/*"
            className=" opacity-0 w-0 h-1"
            onChange={(e) => handleImageChange(index, e)}
            required={index === 0}
            />


          {/* Custom Label */}
          <label
            htmlFor={`image-input-${index}`}
            className="inline-block cursor-pointer rounded bg-gray-200 px-4 py-2 text-sm font-medium text-white hover:bg-red-300"
          >
            {img.name || `चित्र ${index + 1} चुनें`}
          </label>

          {/* Image preview */}
          {img.preview && (
            <img
              src={img.preview}
              alt={`Preview ${index + 1}`}
              className="w-48 h-auto rounded border border-gray-300"
            />
          )}
          <input 
          type='text' 
          onChange={(e)=>handleCaptionChange(index,e)}
          placeholder={`caption ${index+1} लिखें जो फोटो के नीचे दिखेगा `} 
          required={index ===0}
          />
        </div>
      ))}
    </div>
  );
};

export default ThreeImageUploader;
