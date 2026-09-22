import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [companyProject, setCompanyProject] = useState("");
  const [projectMessage, setProjectMessage] = useState("");

  // Email status
  const [isSending, setIsSending] = useState(false);
  const [sendingDone, setSendingDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Karachi clock
  const [karachiTime, setKarachiTime] = useState("");

  /*
  ============================================================
  KARACHI CLOCK
  ============================================================
  */

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };

      setKarachiTime(
        now.toLocaleTimeString("en-US", options)
      );
    };

    updateTime();

    const interval = setInterval(
      updateTime,
      1000
    );

    return () => clearInterval(interval);
  }, []);

  /*
  ============================================================
  EMAILJS SUBMIT
  ============================================================
  */

  const handleFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    /*
     * Prevent duplicate submissions
     */
    if (isSending) return;

    /*
     * Basic validation
     */
    if (
      !userName.trim() ||
      !userEmail.trim() ||
      !projectMessage.trim()
    ) {
      setErrorMessage(
        "Please completely fill out name, email, and message fields."
      );

      setSendingDone(false);
      return;
    }

    /*
     * Check EmailJS configuration
     */
    const env = (import.meta as ImportMeta & {
      env: Record<string, string | undefined>;
    }).env;

    const serviceId =
      env.VITE_EMAILJS_SERVICE_ID;

    const templateId =
      env.VITE_EMAILJS_TEMPLATE_ID;

    const publicKey =
      env.VITE_EMAILJS_PUBLIC_KEY;

    if (
      !serviceId ||
      !templateId ||
      !publicKey
    ) {
      console.error(
        "EmailJS environment variables are missing."
      );

      setErrorMessage(
        "Email service is not configured correctly. Please try again later."
      );

      return;
    }

    if (!formRef.current) {
      setErrorMessage(
        "Unable to process the contact form."
      );

      return;
    }

    /*
     * Reset status
     */
    setErrorMessage("");
    setSendingDone(false);
    setIsSending(true);

    try {
      /*
       * Send form through EmailJS
       *
       * The input `name` attributes below must match
       * the variables configured in your EmailJS template.
       */

      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        {
          publicKey,
        }
      );

      /*
       * SUCCESS
       */

      setIsSending(false);
      setSendingDone(true);

      /*
       * Clear form
       */

      setUserName("");
      setUserEmail("");
      setCompanyProject("");
      setProjectMessage("");
    } catch (error) {
      /*
       * FAILURE
       */

      console.error(
        "EmailJS send failed:",
        error
      );

      setIsSending(false);

      setSendingDone(false);

      setErrorMessage(
        "Message could not be sent. Please try again or contact me directly by email or WhatsApp."
      );
    }
  };

  /*
  ============================================================
  RESET SUCCESS MESSAGE
  ============================================================
  */

  const resetSuccess = () => {
    setSendingDone(false);
    setErrorMessage("");
  };

  /*
  ============================================================
  RENDER
  ============================================================
  */

  return (
    <section
      id="contact"
      className="
        contact
        py-24
        relative
        overflow-hidden
      "
    >
      {/* ====================================================
          BACKGROUND EFFECTS
      ==================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            -top-40
            -left-40
            w-[420px]
            h-[420px]
            rounded-full
            bg-cyan-500/5
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            -bottom-40
            -right-40
            w-[450px]
            h-[450px]
            rounded-full
            bg-indigo-500/5
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
            bg-[linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)]
            bg-[size:60px_60px]
          "
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* ====================================================
            SECTION HEADING
        ==================================================== */}

        <div className="text-center max-w-3xl mx-auto mb-16">

          <h2
            className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-black
              text-white
              font-sans
              tracking-tight
            "
          >
            Secure{" "}
            <span
              className="
                bg-gradient-to-r
                from-cyan-400
                via-emerald-400
                to-indigo-500
                bg-clip-text
                text-transparent
                font-extrabold
              "
            >
              Connection
            </span>
          </h2>

          <div
            className="
              w-12
              h-1
              bg-gradient-to-r
              from-cyan-400
              to-indigo-500
              mx-auto
              mt-4
              rounded-full
            "
          />

          <p className="text-slate-400 mt-4 text-sm sm:text-md">
            Transmit custom specs, contract briefs,
            project requirements, or general enquiries
            directly to my inbox.
          </p>
        </div>

        {/* ====================================================
            MAIN GRID
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-12
            gap-12
            max-w-6xl
            mx-auto
            items-start
          "
        >

          {/* ==================================================
              LEFT INFORMATION PANEL
          ================================================== */}

          <div
            className="
              col-span-1
              lg:col-span-5
              space-y-6
              text-left
            "
          >

            <div
              className="
                p-6
                sm:p-8
                bg-slate-900/40
                border
                border-slate-900
                rounded-2xl
                space-y-6
                relative
                overflow-hidden
                backdrop-blur-xl
              "
            >

              <div
                className="
                  absolute
                  top-0
                  right-0
                  w-24
                  h-24
                  bg-cyan-500/5
                  rounded-full
                  blur-[30px]
                "
              />

              <div>
                <span
                  className="
                    text-xs
                    font-mono
                    font-bold
                    text-cyan-400
                    uppercase
                    tracking-widest
                    block
                    mb-1
                  "
                >
                  HQ Core Coordinates
                </span>

                <h3
                  className="
                    text-xl
                    font-bold
                    text-white
                    tracking-tight
                  "
                >
                  Let's build something exceptional
                  together
                </h3>
              </div>

              {/* STATUS */}

              <div
                className="
                  p-4
                  bg-slate-950
                  rounded-xl
                  border
                  border-slate-900
                  space-y-2
                "
              >

                <div
                  className="
                    flex
                    justify-between
                    items-center
                    text-xs
                    font-mono
                  "
                >
                  <span className="text-slate-500">
                    Local Karachi Time:
                  </span>

                  <span className="text-cyan-400 font-bold">
                    {karachiTime || "Loading..."} PKT
                  </span>
                </div>

                <div
                  className="
                    flex
                    justify-between
                    items-center
                    text-xs
                    font-mono
                  "
                >
                  <span className="text-slate-500">
                    Weekly Availability:
                  </span>

                  <span className="text-emerald-400 font-bold">
                    Open for Assignments
                  </span>
                </div>

              </div>

              {/* CONTACT DETAILS */}

              <div className="space-y-4">

                {/* Email */}

                <div className="flex items-center gap-4">

                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-slate-950
                      border
                      border-slate-800
                      text-cyan-400
                      flex
                      items-center
                      justify-center
                      text-sm
                      flex-shrink-0
                    "
                  >
                    <i className="fas fa-envelope" />
                  </div>

                  <div>
                    <span
                      className="
                        text-[10px]
                        font-mono
                        text-slate-500
                        block
                        uppercase
                        font-bold
                      "
                    >
                      Transmit Enquiries
                    </span>

                    <a
                      href="mailto:RazaAsif7997@gmail.com"
                      className="
                        text-sm
                        font-semibold
                        text-slate-300
                        hover:text-cyan-400
                        transition-colors
                      "
                    >
                      RazaAsif7997@gmail.com
                    </a>
                  </div>

                </div>

                {/* Phone */}

                <div className="flex items-center gap-4">

                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-slate-950
                      border
                      border-slate-800
                      text-cyan-400
                      flex
                      items-center
                      justify-center
                      text-sm
                      flex-shrink-0
                    "
                  >
                    <i className="fas fa-phone-alt" />
                  </div>

                  <div>
                    <span
                      className="
                        text-[10px]
                        font-mono
                        text-slate-500
                        block
                        uppercase
                        font-bold
                      "
                    >
                      Direct Hotline
                    </span>

                    <a
                      href="tel:+923102388463"
                      className="
                        text-sm
                        font-semibold
                        text-slate-300
                        hover:text-cyan-400
                        transition-colors
                      "
                    >
                      +92 310 2388463
                    </a>
                  </div>

                </div>

                {/* Location */}

                <div className="flex items-center gap-4">

                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-slate-950
                      border
                      border-slate-800
                      text-cyan-400
                      flex
                      items-center
                      justify-center
                      text-sm
                      flex-shrink-0
                    "
                  >
                    <i className="fas fa-map-marker-alt" />
                  </div>

                  <div>
                    <span
                      className="
                        text-[10px]
                        font-mono
                        text-slate-500
                        block
                        uppercase
                        font-bold
                      "
                    >
                      Geographic Center
                    </span>

                    <span
                      className="
                        text-sm
                        font-semibold
                        text-slate-300
                        block
                      "
                    >
                      Karachi, Pakistan
                    </span>
                  </div>

                </div>

              </div>

              {/* SOCIALS */}

              <div
                className="
                  pt-6
                  border-t
                  border-slate-900/60
                  flex
                  gap-2
                "
              >

                <a
                  href="https://github.com/officework9089-cpu"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-slate-950
                    border
                    border-slate-800
                    hover:border-cyan-500/35
                    text-slate-400
                    hover:text-white
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-300
                  "
                >
                  <i className="fab fa-github" />
                </a>

                <a
                  href="https://www.linkedin.com/in/razaasif/"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-slate-950
                    border
                    border-slate-800
                    hover:border-cyan-500/35
                    text-slate-400
                    hover:text-white
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-300
                  "
                >
                  <i className="fab fa-linkedin-in" />
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-slate-950
                    border
                    border-slate-800
                    hover:border-cyan-500/35
                    text-slate-400
                    hover:text-white
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-300
                  "
                >
                  <i className="fab fa-twitter" />
                </a>

              </div>

            </div>
          </div>

          {/* ==================================================
              CONTACT FORM
          ================================================== */}

          <div
            className="
              col-span-1
              lg:col-span-7
            "
          >

            <div
              className="
                p-6
                sm:p-8
                bg-slate-900/40
                border
                border-slate-900
                rounded-2xl
                relative
                text-left
                backdrop-blur-xl
                shadow-2xl
              "
            >

              <form
                ref={formRef}
                onSubmit={handleFormSubmit}
                className="space-y-4"
              >

                {/* ==================================================
                    SUCCESS
                ================================================== */}

                {sendingDone && (
                  <div
                    className="
                      p-5
                      bg-emerald-500/10
                      border
                      border-emerald-500/20
                      text-emerald-400
                      rounded-xl
                      text-xs
                      space-y-2
                    "
                  >

                    <p
                      className="
                        font-bold
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <i className="fas fa-check-circle" />

                      Message delivered successfully!
                    </p>

                    <p className="text-emerald-400/70">
                      Thank you. Your message has been
                      sent to Asif Raza. I'll review your
                      enquiry and get back to you shortly.
                    </p>

                    <button
                      type="button"
                      onClick={resetSuccess}
                      className="
                        text-[10px]
                        font-mono
                        text-slate-400
                        hover:text-white
                        block
                        mt-2
                        underline
                      "
                    >
                      Send another message
                    </button>

                  </div>
                )}

                {/* ==================================================
                    ERROR
                ================================================== */}

                {errorMessage && (
                  <div
                    className="
                      p-4
                      bg-red-500/10
                      border
                      border-red-500/20
                      text-red-400
                      text-xs
                      rounded-xl
                      font-semibold
                    "
                  >
                    <i className="fas fa-triangle-exclamation mr-1.5" />

                    {errorMessage}
                  </div>
                )}

                {/* ==================================================
                    NAME + EMAIL
                ================================================== */}

                <div
                  className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    gap-4
                  "
                >

                  {/* NAME */}

                  <div className="space-y-1">

                    <label
                      htmlFor="name"
                      className="
                        text-[10px]
                        font-mono
                        font-bold
                        text-slate-500
                        uppercase
                      "
                    >
                      Your Name *
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="e.g. Jenkins Alvi"
                      className="
                        w-full
                        px-4
                        py-3
                        bg-slate-950
                        border
                        border-slate-800
                        rounded-xl
                        text-xs
                        sm:text-sm
                        text-slate-100
                        placeholder-slate-600
                        outline-none
                        focus:border-cyan-500
                        focus:ring-1
                        focus:ring-cyan-500/20
                        transition-all
                      "
                      value={userName}
                      onChange={(e) =>
                        setUserName(
                          e.target.value
                        )
                      }
                      disabled={
                        isSending ||
                        sendingDone
                      }
                    />

                  </div>

                  {/* EMAIL */}

                  <div className="space-y-1">

                    <label
                      htmlFor="email"
                      className="
                        text-[10px]
                        font-mono
                        font-bold
                        text-slate-500
                        uppercase
                      "
                    >
                      Your Email Address *
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="e.g. client@brand.com"
                      className="
                        w-full
                        px-4
                        py-3
                        bg-slate-950
                        border
                        border-slate-800
                        rounded-xl
                        text-xs
                        sm:text-sm
                        text-slate-100
                        placeholder-slate-600
                        outline-none
                        focus:border-cyan-500
                        focus:ring-1
                        focus:ring-cyan-500/20
                        transition-all
                      "
                      value={userEmail}
                      onChange={(e) =>
                        setUserEmail(
                          e.target.value
                        )
                      }
                      disabled={
                        isSending ||
                        sendingDone
                      }
                    />

                  </div>

                </div>

                {/* ==================================================
                    SUBJECT
                ================================================== */}

                <div className="space-y-1">

                  <label
                    htmlFor="title"
                    className="
                      text-[10px]
                      font-mono
                      font-bold
                      text-slate-500
                      uppercase
                    "
                  >
                    Subject / Product Intent
                    (Optional)
                  </label>

                  <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="e.g. Autoboli Upgrade / General Inquiry"
                    className="
                      w-full
                      px-4
                      py-3
                      bg-slate-950
                      border
                      border-slate-800
                      rounded-xl
                      text-xs
                      sm:text-sm
                      text-slate-100
                      placeholder-slate-600
                      outline-none
                      focus:border-cyan-500
                      focus:ring-1
                      focus:ring-cyan-500/20
                      transition-all
                    "
                    value={companyProject}
                    onChange={(e) =>
                      setCompanyProject(
                        e.target.value
                      )
                    }
                    disabled={
                      isSending ||
                      sendingDone
                    }
                  />

                </div>

                {/* ==================================================
                    MESSAGE
                ================================================== */}

                <div className="space-y-1">

                  <label
                    htmlFor="message"
                    className="
                      text-[10px]
                      font-mono
                      font-bold
                      text-slate-500
                      uppercase
                    "
                  >
                    Specification Description /
                    Message *
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="What digital solution, enterprise flow or custom system are we collaborating on today?"
                    className="
                      w-full
                      px-4
                      py-3
                      bg-slate-950
                      border
                      border-slate-800
                      rounded-xl
                      text-xs
                      sm:text-sm
                      text-slate-100
                      placeholder-slate-600
                      outline-none
                      focus:border-cyan-500
                      focus:ring-1
                      focus:ring-cyan-500/20
                      transition-all
                      resize-none
                    "
                    value={projectMessage}
                    onChange={(e) =>
                      setProjectMessage(
                        e.target.value
                      )
                    }
                    disabled={
                      isSending ||
                      sendingDone
                    }
                  />

                </div>

                {/* ==================================================
                    HIDDEN SUBMISSION TIME
                ================================================== */}

                <input
                  type="hidden"
                  name="time"
                  value={
                    new Date().toLocaleString(
                      "en-US",
                      {
                        timeZone:
                          "Asia/Karachi",
                      }
                    )
                  }
                />

                {/* ==================================================
                    SUBMIT
                ================================================== */}

                <button
                  type="submit"
                  disabled={
                    isSending ||
                    sendingDone
                  }
                  className="
                    group
                    relative
                    overflow-hidden
                    w-full
                    py-3.5
                    bg-gradient-to-r
                    from-cyan-500
                    via-blue-500
                    to-indigo-500
                    hover:from-cyan-400
                    hover:via-blue-400
                    hover:to-indigo-400
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    text-white
                    text-xs
                    font-bold
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    gap-2
                    shadow-lg
                    shadow-cyan-500/10
                    transition-all
                    active:scale-[0.98]
                  "
                >

                  {/* Shine animation */}

                  {!isSending &&
                    !sendingDone && (
                      <span
                        className="
                          absolute
                          inset-0
                          -translate-x-full
                          group-hover:translate-x-full
                          transition-transform
                          duration-700
                          bg-gradient-to-r
                          from-transparent
                          via-white/20
                          to-transparent
                        "
                      />
                    )}

                  <span className="relative z-10 flex items-center gap-2">

                    {isSending ? (
                      <>
                        <i className="fas fa-circle-notch animate-spin" />

                        Sending Message...
                      </>
                    ) : sendingDone ? (
                      <>
                        <i className="fas fa-check-circle" />

                        Message Sent
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane" />

                        Send Message
                      </>
                    )}

                  </span>

                </button>

                {/* ==================================================
                    WHATSAPP
                ================================================== */}

                <div
                  className="
                    pt-5
                    flex
                    flex-col
                    sm:flex-row
                    items-center
                    justify-between
                    gap-3
                    border-t
                    border-slate-900/60
                    mt-4
                    text-xs
                  "
                >

                  <span
                    className="
                      text-slate-400
                      font-mono
                      text-[11px]
                      text-center
                      sm:text-left
                    "
                  >
                    Need an immediate quote or call?
                  </span>

                  <a
                    href="https://wa.me/923102388463?text=Hi%20Asif,%20I%20just%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project!"
                    target="_blank"
                    rel="noreferrer"
                    className="
                      w-full
                      sm:w-auto
                      px-4
                      py-2.5
                      bg-[#25D366]
                      hover:bg-[#20ba5a]
                      text-white
                      font-bold
                      rounded-xl
                      inline-flex
                      items-center
                      justify-center
                      gap-1.5
                      shadow-lg
                      shadow-[#25D366]/10
                      transition-transform
                      active:scale-[0.97]
                    "
                  >
                    <i className="fab fa-whatsapp text-sm" />

                    Connect on WhatsApp
                  </a>

                </div>

              </form>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
