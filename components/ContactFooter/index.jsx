"use client";
import { postContactForm } from "@/services/postContactForm";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { spaceGrotesk } from "@/lib/fonts";

function ContactFooter() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "Ad tələb olunur";
    if (!lastName.trim()) newErrors.lastName = "Soyad tələb olunur";
    if (!subject.trim()) newErrors.subject = "Mövzu tələb olunur";
    if (!message.trim()) newErrors.message = "Mesaj tələb olunur";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    try {
      await postContactForm({
        firstName,
        lastName,
        subject,
        message,
      });
      // Using unique toast IDs prevents duplicate toasts
      toast.success("Form uğurla göndərildi!", {
        toastId: "contact-footer-success",
      });
      // Reset form
      setFirstName("");
      setLastName("");
      setSubject("");
      setMessage("");
    } catch (error) {
      toast.error(
        "Form göndərilərkən xəta baş verdi, zəhmət olmasa yenidən cəhd edin.",
        {
          toastId: "contact-footer-error",
        }
      );
    }
  };

  return (
    <div className="dark:bg-bgHoverCategory bg-borderColor rounded-2xl w-full">
      {/* ToastContainer can be rendered here or once globally (e.g. in _app.js) */}
      <ToastContainer />
      <form
        className={`${spaceGrotesk.className} space-y-6 bg-darkForm p-10 rounded-2xl dark:bg-bgHoverCategory`}
        onSubmit={handleSubmit}
      >
        {/* Name Fields */}
        <div
          className={`${spaceGrotesk.className} grid grid-cols-1 md:grid-cols-2 gap-6`}
        >
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-normal text-white mb-2"
            >
              Adınız
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Adınızı daxil edin"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full p-3 border rounded-xl shadow-sm bg-darkForm text-white transition duration-300 
                ${
                  errors.firstName
                    ? "border-red-500"
                    : "border-gray-200 dark:bg-bgHoverCategory"
                } 
                focus:ring-gray-500 focus:border-gray-500 hover:bg-darkFormHover hover:border-zinc-700`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-normal text-white mb-2"
            >
              Soyadınız
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Soyadınızı daxil edin"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`w-full p-3 border rounded-xl shadow-sm bg-darkForm text-white transition duration-300 
                ${
                  errors.lastName
                    ? "border-red-500"
                    : "border-gray-200 dark:bg-bgHoverCategory"
                } 
                focus:ring-gray-500 focus:border-gray-500 hover:bg-darkFormHover hover:border-gray-300`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Subject Field */}
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-normal text-white mb-2"
          >
            Layihəniz haqqında məlumat
          </label>
          <input
            type="text"
            id="subject"
            placeholder="Layihə mövzusu"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={`w-full p-3 border rounded-xl shadow-sm bg-darkForm text-white transition duration-300 
              ${
                errors.subject
                  ? "border-red-500"
                  : "border-gray-200 dark:bg-bgHoverCategory"
              } 
              focus:ring-gray-500 focus:border-gray-500 hover:bg-darkFormHover hover:border-gray-300`}
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-normal text-white mb-2"
          >
            Mesaj
          </label>
          <textarea
            id="message"
            rows="8"
            placeholder="Mesajınızı daxil edin"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`w-full p-3 border bg-darkForm text-white rounded-xl shadow-sm transition duration-300 
              ${
                errors.message
                  ? "border-red-500"
                  : "border-gray-200 dark:bg-bgHoverCategory"
              } 
              focus:ring-gray-500 focus:border-gray-500 hover:bg-darkFormHover`}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className={`${spaceGrotesk.className} flex justify-end`}>
          <button
            type="submit"
            className="w-full text-center bg-black dark:bg-white text-white dark:text-black px-4 py-3 
                       hover:bg-blackButtonHover transition duration-300 rounded-xl flex items-center justify-center gap-2 text-xl leading-6 font-medium group"
          >
            Göndər
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              className="transform transition-transform duration-300 group-hover:rotate-45 group-hover:translate-x-1 group-hover:translate-y-[-2px]"
            >
              <path
                d="M16.0037 10.3842L7.39712 18.9908L5.98291 17.5766L14.5895 8.96997H7.00373V6.96997H18.0037V17.97H16.0037V10.3842Z"
                className="fill-white dark:fill-black"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactFooter;
