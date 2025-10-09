import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Bg from "../assets/NewsLetter.svg";

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

          // Try to extract a useful message if the server returns JSON/text
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
    } catch (err) {
      // toast.promise already showed the error; nothing else to do here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative w-full h-[674px] flex pl-25 justify-start items-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0)), url(${Bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Toaster can also live once in App.tsx/App.jsx */}
      <Toaster position="top-center" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-11">
        <div className="text-white sm:text-7xl text-3xl font-extralight font-aspekta tracking-wider">
          Newsletter
        </div>

        <div className="flex flex-row gap-4 items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-[515px] h-12 rounded-[44px] bg-zinc-300/5 border border-white text-white
                       font-sans text-lg font-light indent-8
                       focus:outline-none focus:ring-0 focus:border-white disabled:opacity-50"
            placeholder="Enter your email id"
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className="bg-red-600 font-sans rounded-[44px] text-white cursor-pointer px-7 py-3
                       disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
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
  );
};

export default NewsLetter;
