// import { postContactForm } from "@/services/postContactForm";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { spaceGrotesk } from "@/lib/fonts";

function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // State to store form errors
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation
    const newErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }
    if (!subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    if (!message.trim()) {
      newErrors.message = "Message is required";
    }

    // If there are errors, set them and don't submit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Otherwise, clear any existing errors
    setErrors({});

    try {
      // Call your service
      await postContactForm({
        firstName,
        lastName,
        subject,
        message,
      });

      // Show success toast
      toast.success("Form successfully submitted!");

      // Reset form
      setFirstName("");
      setLastName("");
      setSubject("");
      setMessage("");
    } catch (error) {
      toast.error("Error submitting form, please try again.");
    }
  };

  return (
    <div className=" dark:bg-bgHoverCategory  p-12 rounded-2xl w-full ">
      <ToastContainer />

      {/* <h3 className="text-black dark:text-white font-bold text-2xl leading-8 pb-4">
        Title
      </h3>
      <p className="text-darkGray dark:text-white text-base font-normal leading-6 pb-6">
        Description
      </p> */}

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
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Your Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full p-3 border rounded-xl shadow-sm transition duration-300
                ${
                  errors.firstName
                    ? "border-red-500"
                    : "border-gray-200 dark:bg-bgHoverCategory"
                }
                focus:ring-gray-500 focus:border-gray-500
                hover:bg-zinc-50 hover:border-zinc-700
              `}
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
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Your Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`w-full p-3 border rounded-xl shadow-sm transition duration-300
                ${
                  errors.lastName
                    ? "border-red-500"
                    : "border-gray-200 dark:bg-bgHoverCategory"
                }
                focus:ring-gray-500 focus:border-gray-500
                hover:bg-zinc-50 hover:border-gray-300
              `}
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
            Subject
          </label>
          <input
            type="text"
            id="subject"
            placeholder="Enter Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={`w-full p-3 border rounded-xl shadow-sm transition duration-300
              ${
                errors.subject
                  ? "border-red-500"
                  : "border-gray-200 dark:bg-bgHoverCategory"
              }
              focus:ring-gray-500 focus:border-gray-500
              hover:bg-zinc-50 hover:border-gray-300
            `}
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
            Message
          </label>
          <textarea
            id="message"
            rows="8" // Increased number of rows for a taller textarea
            placeholder="Tell us about your project"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`w-full p-3 border rounded-xl shadow-sm transition duration-300
    ${
      errors.message
        ? "border-red-500"
        : "border-gray-200 dark:bg-bgHoverCategory"
    }
    focus:ring-gray-500 focus:border-gray-500
    hover:bg-zinc-50
  `}
          />

          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="  w-full text-center bg-black dark:bg-white text-white dark:text-black px-4 py-3 
                       hover:bg-blackButtonHover transition duration-300 
                       rounded-xl flex items-center justify-center gap-2 text-xl leading-6 font-medium group"
          >
            Send
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              className="transform transition-transform duration-300 
                         group-hover:rotate-45 group-hover:translate-x-1 
                         group-hover:translate-y-[-2px]"
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
