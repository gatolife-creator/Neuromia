"use client";

import { useEffect, useState } from "react";

export default function TestPage() {
  const [, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/materials", {
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json();
      console.log("Parsed JSON:", result);
      setData(result);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Test Page</h1>
      <p>This is a test page.</p>
    </div>
  );
}
