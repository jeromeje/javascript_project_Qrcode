//rafce
import React from 'react'
import { useState } from 'react';

const App = () => {
 const [img, setImg] = useState("");
 const [loading, setLoading] = useState(false);
const [qrData, setQrData] = useState("jerome");
const [qrSize, setQrSize] = useState("150");

 async function generate(){
  setLoading(true)
  try{
    const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
    setImg(url);
  }
  // encode state that any website may load without the error message
  catch(error){
      console.error("erroe message in genrating",error)
  }finally{
      setLoading(false);
  }
 }

 function download(){
  fetch(img)
  .then((Response)=>Response.blob())
  .then((blob)=>{
  const link =document.createElement("a");
    link.href=URL.createObjectURL(blob);
    link.download="qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
})
.catch((error)=>{
  console.error("Error downloading QR code ", error);
})
 }

  return (
    <>
      <div className='app-container'>
      <h1>QR CODE GENERATOR</h1>
          {loading && <p>Please wait...</p>}
          { img && <img src={img} className='img'/>}
        <div>    
          <label htmlFor='dataInput' className='input-label' >
            Data for QR code:
          </label>
          <input type='text' id='dataInput' placeholder='Enter Data for QR-code'  value={qrData}  onChange={(e)=>setQrData(e.target.value)}/>

          <label htmlFor='sizeInput' className='input-label'>
            Image size
          </label>
          <input type='text' id='sizeInput' placeholder='Enter image size' value={qrSize} onChange={(e)=>setQrSize(e.target.value)}/>

          <button className='generate' onClick={generate} disabled={loading}> Generate QR Code</button>
          <button className='download' onClick={download}> Download QR Code</button>

        </div>
        <p className='footer'> Designed by<a href=''>Jero</a> </p>
      </div>
    </>
  )
}

export default App