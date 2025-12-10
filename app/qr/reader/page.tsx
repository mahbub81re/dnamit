"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

export default function Home() {
  const [text, setText] = useState("");
  const [list, setList] = useState<any>({ qrs: [], scans: [] });
  const [decoded, setDecoded] = useState("");

const Scanner = dynamic(() => import("@/app/components/scanner"), { ssr: false });

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    const res = await fetch("/api/list");
    const data = await res.json();
    setList(data);
  };

  const createQr = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/qrcode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    await res.json();
    setText("");
    fetchList();
  };

  const handleScan = async (t: string) => {
    setDecoded(t);
    await fetch("/api/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ decodedText: t })
    });
    fetchList();
  };

  return (
    <div style={{ maxWidth: 900, margin: "24px auto", padding: 12 }}>
      <h1>QR Generator + Scanner (Next.js + TypeScript + MongoDB)</h1>

      <h2>Create QR</h2>
      <form onSubmit={createQr} style={{ display: "flex", gap: 8 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text"
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit">Create</button>
      </form>

      <h2 style={{ marginTop: 24 }}>Scan QR</h2>
      <Scanner onDecoded={handleScan} />
      {decoded && <p>Last decoded: {decoded}</p>}

      <h2 style={{ marginTop: 24 }}>Saved QR Codes</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        {list.qrs.map((q: any) => (
          <div key={q._id} style={{ width: 150 }}>
            <img src={q.dataUrl} style={{ width: "100%" }} />
            <p>{q.text}</p>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: 24 }}>Scan History</h2>
      <ul>
        {list.scans.map((s: any) => (
          <li key={s._id}>{s.decodedText}</li>
        ))}
      </ul>
    </div>
  );
}
