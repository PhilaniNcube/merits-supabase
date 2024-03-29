import { useRef } from "react";
import Script from "next/script";

const UploadWidget = ({ children, onUpload }) => {
  const cloudinary = useRef();
  const widget = useRef();

  /**
   * generateSignature
   * @description Makes a request to an endpoint to sign Cloudinary parameters as part of widget creation
   */

  function generateSignature(callback, paramsToSign) {
    fetch(`/api/sign-cloudinary-params`, {
      method: "POST",
      body: JSON.stringify({
        paramsToSign,
      }),
    })
      .then((r) => r.json())
      .then(({ signature }) => {
        callback(signature);
      });
  }

  /**
   * createWidget
   * @description Creates a new instance of the Cloudinary widget and stores in a ref
   */

  function createWidget() {
    // When creating a signed upload, you need to provide both your Cloudinary API Key
    // as well as a signature generator function that will sign any paramters
    // either on page load or during the upload process. Read more about signed uploads at:
    // https://cloudinary.com/documentation/upload_widget#signed_uploads

    const options = {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, // Ex: mycloudname
      apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, // Ex: 1234567890
      uploadSignature: generateSignature,
    };

    return cloudinary.current?.createUploadWidget(
      options,
      function (error, result) {
        // The callback is a bit more chatty than failed or success so
        // only trigger when one of those are the case. You can additionally
        // create a separate handler such as onEvent and trigger it on
        // ever occurance
        if (error || result.event === "success") {
          onUpload(error, result, widget?.current);
        }
      }
    );
  }

  /**
   * open
   * @description When triggered, uses the current widget instance to open the upload modal
   */

  function open() {
    if (!widget?.current) {
      widget.current = createWidget();
    }

    widget?.current && widget.current.open();
  }

  /**
   * handleOnLoad
   * @description Stores the Cloudinary window instance to a ref when the widget script loads
   */

  function handleOnLoad() {
    cloudinary.current = window.cloudinary;
  }

  return (
    <>
      {children({
        cloudinary: cloudinary.current,
        widget: widget.current,
        open,
      })}
      <Script
        id="cloudinary"
        src="https://widget.cloudinary.com/v2.0/global/all.js"
        onLoad={handleOnLoad}
      />
    </>
  );
};

export default UploadWidget;
