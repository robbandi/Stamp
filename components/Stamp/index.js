import React from 'react';
import qrcode from 'qrcode';
import { useState, useEffect } from 'react';
import styles from '../Stamp/styles.module.css';
import useKey from '../useKey';

const Stamp = () => {
  const [barcodeUrl, setBarcodeUrl] = useState(null);
  const [showError, setShowError] = useState(false);
  const [buttonShake, setButtonShake] = useState(false);

  const handleToggle = (e) => {
    location.href = 'emoticons'
    e.preventDefault();
    }   

    useKey("Escape", handleToggle)

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

    const options = { 
      type: 'datamatrix',
      background: 'transparent'
    };
    const barcode = await qrcode.toDataURL(data, options);
    setBarcodeUrl(barcode);
  }

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = barcodeUrl;
    link.download = 'stamp.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      {showError && (
        <div className={styles.error}>
          <b>Error - </b>Not URL 
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label className={styles.link}>
          <input className={styles.input} type="text" placeholder='Enter URL...' name="data" />
        </label>
        <button
        onKeyDown={(e)=> handleToggle(e)}
          className={`${styles.gen} ${buttonShake ? styles.shake : ''}`}
          type="submit"
          onAnimationEnd={() => setButtonShake(false)}
        >
          Generate
        </button>
        <img className={styles.code} src={barcodeUrl} onClick={handleDownload} />
      </form>
    </>
  );
}
export default Stamp;