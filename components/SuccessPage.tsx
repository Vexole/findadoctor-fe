import React from 'react';

export const SuccessPage = ({
  successTitle,
  successMessage,
  button1Text,
  button2Text,
  handleButton1Click,
  handleButton2Click
}: {
  successTitle: string;
  successMessage: string;
  button1Text?: any;
  button2Text?: any;
  handleButton1Click?: any,
  handleButton2Click?: any
}) => {
  return (
    <div>
      <h2>{successTitle}</h2>
      <p>{successMessage}</p>
      <div>
        {handleButton1Click != null &&
          <button onClick={handleButton1Click}>{button1Text}</button>}
        {handleButton2Click != null &&
          <button onClick={handleButton2Click}>{button2Text}</button>}
      </div>
    </div>
  );
};
