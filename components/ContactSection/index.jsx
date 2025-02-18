import React from "react";
import ContactForm from "../ContactForm";
import Image from "next/image";

function ContactSection() {
  return (
    <div className="bg-gray py-60 lg:pl-120 flex flex-row justify-between  rounded-3xl w-[90%] m-auto">
      <div className="w-full lg:w-[50%]">
        <ContactForm />
      </div>

      <div className="hidden  lg:block lg:w-[30%]">
        <Image
          width={120}
          height={500}
          alt="illustration"
          src="/images/contact/frame.png"
          className="w-full object-right "
        />
      </div>
    </div>
  );
}

export default ContactSection;
