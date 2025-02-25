"use client";
import { postContactForm } from "@/services/postContactForm";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { spaceGrotesk } from "@/lib/fonts";

function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      const responseData = await postContactForm({
        firstName,
        lastName,
        subject,
        message,
      });
      console.log("Response Data:", responseData); // Log the API response

      // Use a unique toastId to prevent duplicate toasts
      toast.success("Form uğurla göndərildi!", {
        toastId: "contact-form-success",
      });
      setFirstName("");
      setLastName("");
      setSubject("");
      setMessage("");
    } catch (error) {
      toast.error("Form göndərilərkən xəta baş verdi, zəhmət olmasa yenidən cəhd edin.", {
        toastId: "contact-form-error",
      });
    }
  };

  return (
    <div className="dark:bg-bgHoverCategory p-12 rounded-2xl w-full">
      <form
        className={`${spaceGrotesk.className} space-y-6 dark:bg-bgHoverCategory`}
        onSubmit={handleSubmit}
      >
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-normal text-black dark:text-white mb-2"
            >
               Adınız
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Adınızı daxil edin"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full p-3 border rounded-xl shadow-sm transition duration-300 ${
                errors.firstName
                  ? "border-red-500"
                  : "border-gray-200 dark:bg-bgHoverCategory"
              } focus:ring-gray-500 focus:border-gray-500 hover:bg-zinc-50 hover:border-zinc-700`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-normal dark:text-white text-black mb-2"
            >
              Soyadınız
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Soyadınızı daxil edin"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`w-full p-3 border rounded-xl shadow-sm transition duration-300 ${
                errors.lastName
                  ? "border-red-500"
                  : "border-gray-200 dark:bg-bgHoverCategory"
              } focus:ring-gray-500 focus:border-gray-500 hover:bg-zinc-50 hover:border-gray-300`}
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
            className="block text-sm font-normal dark:text-white text-black mb-2"
          >
            Mövzu
          </label>
          <input
            type="text"
            id="subject"
            placeholder="Mövzu daxil edin"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={`w-full p-3 border rounded-xl shadow-sm transition duration-300 ${
              errors.subject
                ? "border-red-500"
                : "border-gray-200 dark:bg-bgHoverCategory"
            } focus:ring-gray-500 focus:border-gray-500 hover:bg-zinc-50 hover:border-gray-300`}
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-normal dark:text-white text-black mb-2"
          >
            Mesaj
          </label>
          <textarea
            id="message"
            rows="8"
            placeholder="Mesajınızı daxil edin"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`w-full p-3 border rounded-xl shadow-sm transition duration-300 ${
              errors.message
                ? "border-red-500"
                : "border-gray-200 dark:bg-bgHoverCategory"
            } focus:ring-gray-500 focus:border-gray-500 hover:bg-zinc-50`}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-full text-center bg-black dark:bg-white text-white dark:text-black px-4 py-3 hover:bg-blackButtonHover transition duration-300 rounded-xl flex items-center justify-center gap-2 text-xl leading-6 font-medium group"
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

export default ContactForm;
