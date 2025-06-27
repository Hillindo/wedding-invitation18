"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from "axios";
import { getCookie } from "cookies-next";
import Observer from "next@js/app/component/observer/observer-up";

// --- TypeScript Interfaces ---
interface GreetingMessage {
  id: number | string; // Use a unique ID from the data, or a temporary one for optimistic updates
  name_guest: string;
  greeting_word: string;
  presence: string;
  created_at: string;
  // Optimistic update flag
  isOptimistic?: boolean;
}

// --- Custom Hook for Greetings Logic ---
const useGreetings = (subDomain: string | undefined) => {
  const [greetings, setGreetings] = useState<GreetingMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ref to track if a fetch request is in progress to prevent duplicates
  const isFetching = useRef(false);

  // Fetch greetings, with support for incremental updates
  const fetchGreetings = useCallback(async (since: string | null = null) => {
    if (isFetching.current) return; // Deduplicate requests
    isFetching.current = true;
    setError(null);

    try {
      const response = await axios.get(`/api/getmessages/${subDomain}`, {
        params: { since },
        // Add cache-busting headers if backend supports E-tags or Last-Modified
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
      });

      if (response.status === 200 && response.data.greetings.length > 0) {
        setGreetings(prevGreetings => {
          const existingIds = new Set(prevGreetings.map(g => g.id));
          const newGreetings = response.data.greetings.filter((g: GreetingMessage) => !existingIds.has(g.id));
          return [...prevGreetings, ...newGreetings];
        });
      }
    } catch (err) {
      setError("Failed to fetch messages. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, [subDomain]);

  // Poll for new messages
  useEffect(() => {
    if (!subDomain) return;

    // Initial fetch
    fetchGreetings();

    const interval = setInterval(() => {
      // Smart polling: only poll if the page is visible
      if (document.visibilityState === 'visible') {
        const lastGreeting = greetings.length > 0 ? greetings[greetings.length - 1] : null;
        const lastTimestamp = lastGreeting ? lastGreeting.created_at : null;
        fetchGreetings(lastTimestamp);
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [fetchGreetings, subDomain, greetings]);

  // Function to send a new greeting with optimistic update
  const sendGreeting = useCallback(async (newGreeting: Omit<GreetingMessage, 'id' | 'created_at'>) => {
    if (!subDomain) return;

    const optimisticGreeting: GreetingMessage = {
      ...newGreeting,
      id: `optimistic-${Date.now()}`,
      created_at: new Date().toISOString(),
      isOptimistic: true,
    };

    // Optimistically add the new greeting to the state
    setGreetings(prev => [...prev, optimisticGreeting]);

    try {
      await axios.post(`/api/sendgreeting/${subDomain}`, newGreeting);
      // On success, we can wait for the poller to fetch the real data,
      // or replace the optimistic one with the real one from the response if the API returns it.
      // For simplicity, the poller will handle updating the list.
    } catch (err) {
      setError("Failed to send message. It will be removed.");
      console.error(err);
      // On failure, remove the optimistic greeting
      setTimeout(() => {
        setGreetings(prev => prev.filter(g => g.id !== optimisticGreeting.id));
        setError(null);
      }, 3000);
    }
  }, [subDomain]);

  return { greetings, loading, error, sendGreeting };
};


export default function Greeting({ data }: any) {
  const subDomain = getCookie("subDomain")?.toString();
  const { greetings, loading, error, sendGreeting: sendGreetingApi } = useGreetings(subDomain);

  const [nameGuest, setNameGuest] = useState("");
  const [greetingWord, setGreetingWord] = useState("");
  const [presence, setPresence] = useState("1");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSendGreeting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameGuest || !greetingWord) {
      setFormError("Please fill in your name and greeting.");
      setTimeout(() => setFormError(""), 3000);
      return;
    }

    setSubmitLoading(true);
    setFormError("");

    await sendGreetingApi({
      name_guest: nameGuest,
      greeting_word: greetingWord,
      presence: presence,
    });

    // Clear form and reset state
    setNameGuest("");
    setGreetingWord("");
    setSubmitLoading(false);
  };
  return (
    <section className='px-5 sm:mx-12 lg:px-5 lg:max-w-md mx-auto' id='greeting'>
      <Observer>
        <section
          className="bg-[#051E31] z-50 w-full rounded-3xl shadow-slate-200 shadow-md relative mt-12 text-white"
          style={{
            backgroundImage: "url('/img/bg-2.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}>
          <div className="w-full flex flex-wrap mx-auto py-12">
            <div className="text-center text-[#D4AF37] mb-5 w-full font-roxborough-cf text-4xl">RSVP</div>
            <div className="text-center font-quicksand text-md mb-5 mx-6">
              Please kindly help us prepare everything better by confirming your attendance to our wedding event with the following RSVP form:
            </div>
            <div className="mb-5 w-full">
              <form onSubmit={handleSendGreeting} className="p-5">
                <div className="pb-3">
                  <label htmlFor="nameGuest" className="font-quicksand text-sm mb-2 block">Name*</label>
                  <textarea
                    id="nameGuest"
                    className="w-full rounded-xl border border-white py-1 px-4 text-xs font-quicksand text-black"
                    value={nameGuest}
                    onChange={(e) => setNameGuest(e.target.value)}
                    required
                  />
                </div>
                <div className="pb-3">
                  <label htmlFor="greetingWord" className="font-quicksand text-sm mb-2 block">
                    Give prayers and greetings to the bride and groom
                  </label>
                  <textarea
                    id="greetingWord"
                    className="w-full rounded-xl border border-white p-5 text-xs font-quicksand text-black"
                    value={greetingWord}
                    onChange={(e) => setGreetingWord(e.target.value)}
                    required
                  />
                </div>
                {formError && <div className="text-red-400 text-center mb-2">{formError}</div>}
                <button
                  type="submit"
                  className="MobileButton self-stretch h-12 bg-[#183A51] rounded-lg justify-center items-center gap-4 inline-flex w-full"
                  disabled={submitLoading}
                >
                  <div className={`Text text-white text-sm font-quicksand leading-normal ${submitLoading && "cursor-not-allowed"}`}>
                    {submitLoading ? 'Submitting...' : 'Submit'}
                  </div>
                </button>
              </form>
            </div>
          </div>
          <div id="kolom-2" className="w-full overflow-y-auto h-52 p-5 mb-7">
            {loading && greetings.length === 0 && <div className="text-center">Loading messages...</div>}
            {error && <div className="text-red-400 text-center">{error}</div>}
            {greetings?.length > 0 ? (
              greetings.map((res) => (
                <div
                  key={res.id}
                  className={`gap-2 w-full h-fit px-3 p-5 shadow-slate-200 shadow-md mb-5 rounded-xl ${res.isOptimistic ? 'opacity-50' : ''}`}
                >
                  <div className="text-white font-romantic text-base">{res.greeting_word}</div>
                  <div className="text-white font-romantic text-base font-semibold">{res.name_guest}</div>
                  <div className="Line2 w-full border-t border-white mt-2"></div>
                </div>
              ))
            ) : (
              !loading && (
                <div className="text-center">
                  Be the first to send a greeting!
                </div>
              )
            )}
          </div>
        </section>
      </Observer>
    </section>
  );
}