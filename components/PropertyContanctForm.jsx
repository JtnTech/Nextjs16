"use client";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { User, Mail, Phone, MessageSquare, CheckCircle, LogIn } from "lucide-react";

const inputClass =
  "w-full pl-9 pr-3.5 py-3 text-sm text-slate-800 bg-white border border-slate-200 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-200";

const PropertyContactForm = ({ property }) => {
  const { data: session } = useSession();
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [message, setMessage] = useState("");
  const [phone,   setPhone]   = useState("");
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    const data = {
      name,
      email,
      phone,
      message,
      recipient: property.owner,
      property:  property._id,
    };

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        toast.success("Message sent successfully");
        setWasSubmitted(true);
      } else if (res.status === 400 || res.status === 401) {
        const dataObj = await res.json();
        toast.error(dataObj.message);
      } else {
        toast.error("Error sending form");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error sending form");
    } finally {
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setSending(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4">
        <h3 className="font-heading font-bold text-white text-base flex items-center gap-2">
          <MessageSquare size={17} strokeWidth={2.5} />
          Contact Property Manager
        </h3>
      </div>

      <div className="p-5">
        {!session ? (
          /* ── Not logged in ── */
          <div className="flex flex-col items-center text-center py-6 gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
              <LogIn size={22} className="text-blue-500" />
            </div>
            <div>
              <p className="font-semibold text-slate-700 mb-1">Sign In Required</p>
              <p className="text-slate-400 text-sm">
                You must be logged in to send a message to this property manager.
              </p>
            </div>
          </div>
        ) : wasSubmitted ? (
          /* ── Success State ── */
          <div className="flex flex-col items-center text-center py-6 gap-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center animate-scale-in">
              <CheckCircle size={30} className="text-emerald-500" />
            </div>
            <div>
              <p className="font-heading font-bold text-slate-800 text-base mb-1">
                Message Sent!
              </p>
              <p className="text-slate-400 text-sm">
                The property manager will get back to you soon.
              </p>
            </div>
          </div>
        ) : (
          /* ── Form ── */
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5" htmlFor="name">
                Name
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                  <User size={14} />
                </span>
                <input
                  className={inputClass}
                  id="name"
                  type="text"
                  placeholder="Your name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5" htmlFor="contact-email">
                Email
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                  <Mail size={14} />
                </span>
                <input
                  className={inputClass}
                  id="contact-email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5" htmlFor="contact-phone">
                Phone <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                  <Phone size={14} />
                </span>
                <input
                  className={inputClass}
                  id="contact-phone"
                  type="text"
                  placeholder="Your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5" htmlFor="contact-message">
                Message
              </label>
              <textarea
                className="w-full px-3.5 py-3 text-sm text-slate-800 bg-white border border-slate-200 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-200 h-36 resize-none"
                id="contact-message"
                placeholder="Tell them about your requirements…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            {/* Submit */}
            <button
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm transition-all duration-250 hover:shadow-glow-blue hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
              type="submit"
              disabled={sending}
            >
              <FaPaperPlane className={sending ? "animate-pulse" : ""} />
              {sending ? "Sending…" : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PropertyContactForm;
