"use client";
import { useState } from 'react';
import { message } from 'antd';
const CopyButton = ({ text, warn, color, hovercolor }: any) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyToClipboard = (text:any) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };
  const handleCopy = () => {
    // navigator.clipboard.writeText(text);
    copyToClipboard(text)
    setIsCopied(true);
    message.success(`${warn} copied to clipboard!`);
  };

  return (
    <div>
      <button
        onClick={handleCopy}
        className={`bg-${color} hover:bg-${hovercolor} text-${hovercolor} hover:text-${color} active:bg-green-400 font-normal py-1 px-1 md:py-2 md:px-4 rounded fa fa-copy`}
      >
        {isCopied}
      </button>
      {/* {isCopied && <p className="text-green-500">Copied to clipboard!</p>} */}
    </div>
  );
};

export default CopyButton;
