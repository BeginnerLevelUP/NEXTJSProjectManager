import { Alert } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const SucessMessage = ({ message, onClose }) => {
  const [text, setText] = useState('NO MESSAGE');

  useEffect(() => {
    if (message) {
      setText(message);
      const timeout = setTimeout(() => {
        onClose(); // Clear the state after 3 seconds
      }, 3000);

      return () => clearTimeout(timeout); // Cleanup function
    }
  }, [message, onClose]); // Only update the text when the message or onClose changes

  return <Alert>{text}</Alert>;
};

export default SucessMessage;
