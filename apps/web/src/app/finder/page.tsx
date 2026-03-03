"use client";
import { useState } from "react";

export default function FinderPage() {
  const [crop, setCrop] = useState("");
  const [pest, setPest] = useState("");
  const [results, setResults] = useState<any[]>([]);

  async function run() {
    const res = await fetch(`/api/finder?crop=${crop}&pest=${pest}`);
    setResults(await res.json());
  }

  return <main><h1>Crop/Pest Finder</h1><div className="card"><input placeholder="Crop" value={crop} onChange={e=>setCrop(e.target.value)}/> <input placeholder="Pest/Disease" value={pest} onChange={e=>setPest(e.target.value)}/> <button onClick={run}>Search</button></div><div className="grid">{results.map((r)=> <div className="card" key={r.id}>{r.name.en}</div>)}</div></main>;
}
