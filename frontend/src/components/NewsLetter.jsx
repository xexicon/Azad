import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Newsletter from "../assets/NewsLetter.svg";
import FooterLine from '../assets/FooterLine.svg';

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (val) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const url = `${import.meta.env.VITE_SERVER_URL}/subscribe`;

    try {
      setLoading(true);

      await toast.promise(
        (async () => {
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });

          const text = await res.text();
          const data = (() => {
            try { return JSON.parse(text); } catch { return { message: text }; }
          })();

          if (!res.ok) {
            throw new Error(data?.message || "Subscription failed.");
          }
          return data?.message || "Subscribed";
        })(),
        {
          loading: "Subscribing…",
          success: (msg) => msg || "Subscribed! Check your inbox.",
          error: (err) => err.message || "Something went wrong.",
        }
      );

      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div
        className="
          relative
          w-full
          h-[520px] sm:h-[674px]
          flex
          px-6 sm:pl-25
          justify-center sm:justify-start
          items-center
        "
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0)), url(${Newsletter})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Toaster */}
        <Toaster position="top-center" />

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 sm:gap-11 w-full max-w-xl"
        >
          <div className="text-white sm:text-7xl text-3xl font-extralight font-aspekta tracking-wider text-center sm:text-left">
            Newsletter
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              placeholder="Enter your email id"
              className="
                w-full sm:w-[515px]
                h-12
                rounded-[44px]
                bg-zinc-300/5
                border border-white
                text-white
                font-sans text-base sm:text-lg font-light
                indent-6 sm:indent-8
                focus:outline-none focus:ring-0 focus:border-white
                disabled:opacity-50
              "
            />

            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="
                w-full sm:w-auto
                bg-red-600
                font-sans
                rounded-[44px]
                text-white
                px-7 py-3
                inline-flex justify-center items-center gap-2
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {loading && (
                <span
                  className="inline-block w-4 h-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin"
                  aria-hidden
                />
              )}
              {loading ? "Submitting…" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
