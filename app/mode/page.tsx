"use client"
import Link from "next/link";
import { useState } from "react";

const difficultyInfo = {
  easy: {
   
    descriptions: [
      
      "◇ For beginners",
      "◇ Score multiplies by 1",
      "◇ No timer",
      "◇ Errors are highlighted in red",
      "◇ Unlimited checks",
      "◇ No hints"
    ],
  },
  medium: {
    
    descriptions: [
      
      "◇ For daily-users",
      "◇ Score multiplies by 2",
      "◇ 15-minute timer",
      "◇ Errors are NOT highlighted in red",
      "◇ 10 checks",
      "◇ 5 hints"
    ],
  },
  difficult: {
   
    descriptions: [
       
      "◇ For experts",
      "◇ Score multiplies by 3",
      "◇ 10-minute timer",
      "◇ Errors are NOT highlighted in red",
      "◇ 5 checks",
      "◇ 7 hints"
    ],
  },
};

export default function Home() {
  const [hoveredMode, setHoveredMode] = useState(null);

  const handleMouseEnter = (mode) => {
    setHoveredMode(mode);
  };

  const handleMouseLeave = () => {
    setHoveredMode(null);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="welcomeUserName" style={{ position: "absolute", top: "10px", left: "20px", display: "flex", alignItems: "center" }}>
        <Link href="/">
        <div style={{ fontSize: "15px", color: "white", fontWeight: "bold", textDecoration: "underline", marginLeft: "5px" }}>← Back</div>
        </Link>
      </div>
      <main className="flex flex-col items-center justify-center">
        <h1 className="text-4xl mb-8">Choose your difficulty!</h1>

        {/* Difficulty buttons */}
        <div className="flex justify-center">
          <Link href="/game_easy">
            <button
              type="button"
              className="p-4 bg-blue-500 rounded mr-4"
              style={{ minWidth: "300px", minHeight: "300px", maxWidth: "300px", maxHeight: "300px" }}
              onMouseEnter={() => handleMouseEnter("easy")}
              onMouseLeave={handleMouseLeave}
            >
              {hoveredMode === "easy" ? (
                <>
                  <h1 style={{ color: "white", fontSize: "32px", }}>{difficultyInfo.easy.title}</h1>
                  <ul style={{ color: "white", fontSize: "18px", textAlign: "left", paddingLeft: "20px" }}>
                    {difficultyInfo.easy.descriptions.map((desc, index) => (
                      <li key={index}>{desc}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <h1 style={{ color: "white", fontSize: "32px", fontWeight: "bold" }}>EASY</h1>
              )}
            </button>
          </Link>
          <Link href="/game_medium">
            <button
              type="button"
              className="p-4 bg-yellow-500 rounded mx-4"
              style={{ minWidth: "300px", minHeight: "300px", maxWidth: "300px", maxHeight: "300px" }}
              onMouseEnter={() => handleMouseEnter("medium")}
              onMouseLeave={handleMouseLeave}
            >
              {hoveredMode === "medium" ? (
                <>
                  <h1 style={{ color: "white", fontSize: "32px",}}>{difficultyInfo.medium.title}</h1>
                  <ul style={{ color: "white", fontSize: "18px", textAlign: "left", paddingLeft: "20px" }}>
                    {difficultyInfo.medium.descriptions.map((desc, index) => (
                      <li key={index}>
                        {desc.includes("NOT") ? (
                          <>
                            {desc.substring(0, desc.indexOf("NOT"))}
                            <strong>NOT</strong>
                            {desc.substring(desc.indexOf("NOT") + 3)}
                          </>
                        ) : (
                          desc
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <h1 style={{ color: "white", fontSize: "32px" , fontWeight: "bold"}}>MEDIUM</h1>
              )}
            </button>
          </Link>
          <Link href="/game_difficult">
            <button
              type="button"
              className="p-4 bg-red-500 text-white rounded ml-4"
              style={{ minWidth: "300px", minHeight: "300px", maxWidth: "300px", maxHeight: "300px" }}
              onMouseEnter={() => handleMouseEnter("difficult")}
              onMouseLeave={handleMouseLeave}
            >
              {hoveredMode === "difficult" ? (
                <>
                  <h1 style={{ color: "white", fontSize: "32px",}}>{difficultyInfo.difficult.title}</h1>
                  <ul style={{ color: "white", fontSize: "18px" , textAlign: "left", paddingLeft: "20px" }}>
                    {difficultyInfo.difficult.descriptions.map((desc, index) => (
                      <li key={index}>
                        {desc.includes("NOT") ? (
                          <>
                            {desc.substring(0, desc.indexOf("NOT"))}
                            <strong>NOT</strong>
                            {desc.substring(desc.indexOf("NOT") + 3)}
                          </>
                        ) : (
                          desc
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <h1 style={{ color: "white", fontSize: "32px" , fontWeight: "bold"}}>DIFFICULT</h1>
              )}
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
