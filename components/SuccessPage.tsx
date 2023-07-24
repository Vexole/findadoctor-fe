import React from 'react';

export const SuccessPage = ({
  successTitle,
  successMessage,
  button1,
  button2,
}: {
  successTitle?: string;
  successMessage?: string;
  button1?: any;
  button2?: any;
}) => {
  return (
    <div>
      <h2>{successTitle}</h2>
      <p>{successMessage}</p>
      <div>
        <button onClick={button1.onClick}>{button1.label}</button>
        <button onClick={button2.onClick}>{button2.label}</button>
      </div>
    </div>
  );
};
