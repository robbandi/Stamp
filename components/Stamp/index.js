import React from 'react';
import qrcode from 'qrcode';
import BWIPJS from 'bwip-js';
import { useState, useEffect } from 'react';
import styles from '../Stamp/styles.module.css';
// import useKey from '../useKey';

const Stamp = () => {
  const [barcodeUrl, setBarcodeUrl] = useState(null);
  const [showError, setShowError] = useState(false);
  const [buttonShake, setButtonShake] = useState(false);
  const [errorCount, setErrorCount] = useState(0)

  // useKey("Escape")

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = event.target.elements.data.value;

    try {
      new URL(data);
    } catch (error) {
      setShowError(true);
      setButtonShake(true);
      return;
    }

    // const options = {
    //   bcid: 'datamatrix',
    //   text: data,
    //   scale: 8,
    //   width: 2,
    //   height: 10,
    //   addong: {
    //     color: '#fff',
    //     spiral: {
    //       x: 100, // set the x position of the spiral
    //       y: 100, // set the y position of the spiral
    //       inner: 35, // set the inner radius of the spiral
    //       outer: 70, // set the outer radius of the spiral
    //       turns: 12, // set the number of turns of the spiral
    //       c: '#FF0000' // set the color of the spiral to red
    //     }
    //   }
    // };
    

    // BWIPJS.toCanvas('barcode', options, (err, canvas) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   } else {
    //     // set the barcodeUrl to the data URL of the canvas element
    //     setBarcodeUrl(canvas.toDataURL());
    //   }
    // });
  // }


    const options = { 
      type: 'datamatrix', // change the type to qrcode
      background: 'transparent',
      // margin: 4,
      scale: 4
    };
    const barcode = await qrcode.toDataURL(data, options);
    setBarcodeUrl(barcode);
  }

  useEffect(() => {
    if (showError) {
      setErrorCount((errorCount) => errorCount + 1);
  
      if (errorCount >= 3) {
        
      }
  
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setErrorCount(0)
    }
  }, [showError]);

  // const handleDownload = () => {
  //   // Render the barcode image to a canvas element using BWIPJS.toCanvas()
  //   BWIPJS.toCanvas({
  //     bcid: 'datamatrix',
  //     text: barcodeUrl,
  //     scale: 8,
  //     textcolor: '#fff',
  //     width: 2,
  //     height: 10,
  //     addong: {
  //       color: '#fff'
  //     }
  //   }, (err, canvas) => {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  
  //     const base64 = canvas.toDataURL('image/png');
  
  //     const link = document.createElement('a');
  //     link.href = base64;
  //     link.download = 'stamp.png';
  
  //     document.body.appendChild(link);
  //     link.click();
  
  //     document.body.removeChild(link);
  //   });
  // };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = barcodeUrl;
    link.download = 'stamp.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleInputFocus = () => {
    setBarcodeUrl(null);
  };

  return (
    <>
    <div className={styles.wrapper}>
{showError && (
  <div className={styles.error}>
    <b>Error - </b>
    {errorCount >= 3 ? (
      <span>Missing http(s)://</span>
    ) : (
      <span>Not URL</span>
    )}
  </div>
)}
      <form onSubmit={handleSubmit}>
        <label className={styles.link}>
          <input 
          className={styles.input} 
          type="text" 
          placeholder='Enter URL...' 
          name="data" 
          onFocus={handleInputFocus}/>
        </label>
        <button
          className={`${styles.gen} ${buttonShake ? styles.shake : ''}`}
          type="submit"
          onAnimationEnd={() => setButtonShake(false)}
        >
          Generate
        </button>
        <span className={styles.img_placement}>
        {/* <canvas className={styles.code} src={barcodeUrl} onClick={handleDownload} id="barcode" /> */}
        <img className={styles.code} src={barcodeUrl} onClick={handleDownload} />
        </span>
      </form>
      </div>
    </>
  );
}
export default Stamp;