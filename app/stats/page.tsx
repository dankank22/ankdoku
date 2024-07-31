"use client"
import { useState } from 'react';
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div style={{ 
        backgroundColor: "white", 
        width: "300px", 
        height: "150px",  
        justifyContent: "center", 
        alignItems: "center",
        borderRadius: "10px" 
      }}>
        <h1 style={{ color: "black", fontSize: "20px",}}>PLAYER STATS</h1>
        <h1 style={{ color: "black", fontSize: "10px", }}>Username: </h1>
        <h1 style={{ color: "black", fontSize: "10px", }}>Current rank: </h1>
        <h1 style={{ color: "black", fontSize: "10px", }}>Number of games solved: </h1>
        <h1 style={{ color: "black", fontSize: "10px", }}>Number of games attempted: </h1>
        <h1 style={{ color: "black", fontSize: "10px", }}>Current Streak: </h1>
        <h1 style={{ color: "black", fontSize: "10px", }}>Best Streak: </h1>
      </div>
    </div>
  );
}
