import React, { useEffect, useRef, useState } from "react";

let QrScanner: any = null;

export default function Scanner({ onDecoded }: { onDecoded: (text: string) => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let scanner: any;

    async function init() {
      if (!QrScanner) {
        const module = await import("qr-scanner");
        QrScanner = module.default;
        QrScanner.WORKER_PATH = "/qr-scanner-worker.min.js";
      }

      scanner = new QrScanner(videoRef.current!, (result: any) => {
        const decoded = result?.data || result?.text || "";
        onDecoded(decoded);
      });

      await scanner.start();
      setReady(true);
    }

    init();

    return () => scanner?.stop();
  }, [onDecoded]);

  return (
    <div>
      <video
        ref={videoRef}
        style={{ width: "100%", borderRadius: 8, background: "#000" }}
        muted
        playsInline
      />
      {!ready && <p>Opening camera...</p>}
    </div>
  );
}
