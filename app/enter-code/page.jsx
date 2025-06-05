'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EnterCodePage() {
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    if (res.ok) {
      router.push('/event-template');
    } else {
      alert('Incorrect code. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter Code:
        <input
          type="password"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
