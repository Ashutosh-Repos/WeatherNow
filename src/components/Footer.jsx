import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

import mail from "../assets/icons/mail.png";
import phone from "../assets/icons/viber.png";
import lkdin from "../assets/icons/linkdin.png";
import whatapp from "../assets/icons/whatsapp.png";
function Footer() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_w11v9a3", "template_j8hv24r", form.current, {
        publicKey: "yj5LmGePE38qEaIKu",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          document.getElementById("mesgArea").value = "";
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  const contact = [
    { src: mail, head: "mailto", val: "clashutosh04@gmail.com" },
    { src: phone, head: "tel:", val: "+918449227868" },
    {
      src: lkdin,
      head: "https://",
      val: "www.linkedin.com/in/ashutosh-kumar-2867182a2/",
    },
  ];
  return (
    <div className="w-full relative h-80  px-1 text-white flex items-center justify-center flex-col gap-2 mt-12">
      <div className="w-full flex flex items-center justify-center gap-4 max-sm:gap-1">
        <span className="w-2/6 h-[2px] bg-white"></span>
        <h1 className="text-xl max-sm:text-base text-center">Contact me</h1>
        <span className="w-2/6 h-[2px] bg-white"></span>
      </div>
      <div className="h-16 flex items-center justify-center gap-4 flex-wrap max-sm:gap-2 rounded-xl">
        {contact.map((e, index) => (
          <span className="h-8 relative" key={index}>
            <a
              href={e.head + e.val}
              className="no-underline cursor-pointer group"
              target="_blank"
            >
              <img
                src={e.src}
                alt={e.val}
                className="h-full grayscale invert cursor-pointer"
              />
              <span className="flex h-4 bg-white absolute top-[-20px] bg-transparent text-[0.4rem] text-center opacity-0 group-hover:opacity-100 duration-500">
                {e.val}
              </span>
            </a>
          </span>
        ))}
      </div>
      <div className="w-full flex flex items-center justify-center gap-4 max-sm:gap-1">
        <span className="w-2/6 h-[2px] bg-white"></span>
        <h1 className="text-xl max-sm:text-base text-center">
          Give me Suggestion
        </h1>
        <span className="w-2/6 h-[2px] bg-white"></span>
      </div>
      <form
        ref={form}
        onSubmit={sendEmail}
        className="w-full h-16 max-sm:h-52 max-md:h-48 flex items-center justify-center gap-8 flex-wrap max-sm:gap-1 rounded-xl"
      >
        <div className="flex  items-center justify-center gap-4 max-sm:flex-col max-sm:gap-1">
          <label> Name:</label>
          <input
            type="text"
            name="user_name"
            className="glass h-8 rounded border-[0px] outline-0 px-1 text-sm"
          />
          <label> Email:</label>
          <input
            type="email"
            name="user_email"
            className="glass h-8 rounded border-[0px] outline-0 px-1 text-sm"
          />
        </div>
        <div className="flex  items-center justify-center gap-4 max-sm:flex-col max-sm:gap-4">
          <label>Message:</label>
          <textarea
            name="message"
            id="mesgArea"
            className="glass h-16 rounded border-[0px] outline-0 px-1 text-sm px-1 py-1"
          />
          <input
            type="submit"
            value="Send"
            className="glass w-20 h-8 rounded cursor-pointer"
            placeholder="Submit"
          />
        </div>
      </form>
    </div>
  );
}
export default Footer;
