'use client';

import { useState } from 'react';
import jsonp from 'jsonp';

export default function ComingSoonPage() {
  // 1. Add state for the first name
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    // 3. Add validation for the required First Name field
    if (!firstName || !email || email.indexOf('@') === -1) {
      setStatus('error');
      setMessage('Please fill out all required fields.');
      return;
    }

    // 4. Add the FNAME parameter to the Mailchimp URL
    const mailchimpUrl = `https://outlook.us7.list-manage.com/subscribe/post-json?u=50326e63a83633d2dd9cc9ff3&id=3e53e613d1&FNAME=${encodeURIComponent(firstName)}&EMAIL=${encodeURIComponent(email)}&PHONE=${encodeURIComponent(phone)}&c=?`;
    
    jsonp(mailchimpUrl, { param: 'c', timeout: 3500 }, (err, data) => {
      if (err && err.message === 'Timeout') {
        setStatus('success');
        setMessage("Thank you! You're on the list.");
        // 5. Clear the first name input on success
        setFirstName('');
        setEmail('');
        setPhone('');
      } 
      else if (data && data.result === 'success') {
        setStatus('success');
        setMessage("Thank you! You're on the list.");
        setFirstName('');
        setEmail('');
        setPhone('');
      } 
      else if (data && data.result === 'error') {
        setStatus('error');
        let errorMessage = data.msg || 'An error occurred.';
        if (errorMessage.includes('is already subscribed')) {
          errorMessage = "You're already on the list!";
        } else {
          errorMessage = "An error occurred. Please try again.";
        }
        setMessage(errorMessage);
      } 
      else {
        setStatus('error');
        setMessage('An unexpected error occurred. Please try again later.');
      }
    });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-6 font-sans">
      <div className="text-center max-w-lg w-full">

        <h1
          className="text-5xl md:text-6xl mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          portecoeur
        </h1>

        <h2 className="text-[22px] md:text-[26px] font-light tracking-wider uppercase text-gray-700">
          Coming Soon
        </h2>

        <p className="mt-6 text-base md:text-lg text-gray-600 max-w-md mx-auto">
          Carry what you love. Elegant leather handbags, crafted to be your most cherished companions. Be the first to know when our first collection arrives.
        </p>
        
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-center justify-center gap-4 w-full max-w-sm mx-auto">
          
          {/* 2. Add the new First Name input field (required) */}
          <label htmlFor="firstName" className="sr-only">First Name</label>
          <input
            type="text"
            id="firstName"
            name="FNAME"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            className="bg-transparent border border-gray-400 text-black placeholder-gray-500 text-center text-sm w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300"
            required
            disabled={status === 'loading'}
          />

          <label htmlFor="email" className="sr-only">Email Address</label>
          <input
            type="email"
            id="email"
            name="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="bg-transparent border border-gray-400 text-black placeholder-gray-500 text-center text-sm w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300"
            required
            disabled={status === 'loading'}
          />

          <label htmlFor="phone" className="sr-only">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="PHONE"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number (optional)"
            className="bg-transparent border border-gray-400 text-black placeholder-gray-500 text-center text-sm w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300"
            disabled={status === 'loading'}
          />

          <button
            type="submit"
            className="bg-black text-white font-semibold text-sm w-full px-8 py-3 border border-black hover:bg-transparent hover:text-black transition-all duration-300 uppercase tracking-wider disabled:opacity-50"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Submitting...' : 'Notify Me'}
          </button>
        </form>

        {message && (
          <p className={`mt-4 text-sm ${status === 'error' ? 'text-red-600' : 'text-gray-700'}`}>
            {message}
          </p>
        )}
      </div>

      <footer className="absolute bottom-6 text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Portecoeur. All Rights Reserved.
      </footer>
    </main>
  );
}