"use client";
import { useEffect, useState } from "react";

const locales = ["en", "zh", "ar", "fr"];

export function LanguageSwitcher() {
  const [locale, setLocale] = useState("en");
  useEffect(() => {
    const saved = localStorage.getItem("kriya-locale") || "en";
    setLocale(saved);
    document.documentElement.lang = saved;
    document.body.classList.toggle("rtl", saved === "ar");
  }, []);
  return (
    <select
      value={locale}
      onChange={(e) => {
        const v = e.target.value;
        setLocale(v);
        localStorage.setItem("kriya-locale", v);
        document.documentElement.lang = v;
        document.body.classList.toggle("rtl", v === "ar");
      }}
    >
      {locales.map((l) => <option key={l} value={l}>{l.toUpperCase()}</option>)}
    </select>
  );
}
