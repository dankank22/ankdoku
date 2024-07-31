"use client";
import { useState, useEffect } from 'react';
import Link from "next/link";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Function to calculate next midnight
    const getNextMidnight = () => {
      let now = new Date();
      let tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0); // Set to midnight
      return tomorrow.getTime();
    };

    // Set the date we're counting down to (next midnight)
    let countDownDate = getNextMidnight();

    // Update the count down every 1 second
    let x = setInterval(function () {
      // Get today's date and time
      let now = new Date().getTime();

      // Find the distance between now and the count down date
      let distance = countDownDate - now;

      // Time calculations for hours, minutes, and seconds
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="countdown"
      document.getElementById("countdown").innerHTML = hours + "h "
        + minutes + "m " + seconds + "s ";

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "EXPIRED";
        // Reset for the next day
        countDownDate = getNextMidnight();
        // Restart the countdown
        x = setInterval(updateCountdown, 1000);
      }
    }, 1000);

    // Cleanup function to clear interval
    return () => clearInterval(x);
  }, []);

  return (
    <div
      className="flex min-h-screen items-center justify-center text-white"
      style={{
        backgroundImage: "url('/pics/puzzles-sudoku-number-puzzle-write-company-paper.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        filter: "grayscale(100%)"
      }}
    >
      <main className="flex flex-col items-center justify-center p-8 bg-black bg-opacity-70 rounded-lg relative">
        <h1 className="text-4xl mb-8" style={{ marginTop: "50px" }}>Welcome to your daily Sudoku!</h1>
        <div className="flex flex-col items-center justify-center mb-8">
          <input
            type="text"
            placeholder="Username"
            className="p-2 mb-4 border border-gray-300 rounded"
            style={{ color: 'black', marginTop: "10px" }}
          />
          <div className="flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="p-2 mb-4 border border-gray-300 rounded"
              style={{ color: 'black', marginLeft: "128px", marginTop: "10px" }}
            />
            <input
              type="checkbox"
              className="ml-2"
              style={{ marginBottom: "5px" }}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            <label className="ml-2 text-xs" style={{ marginBottom: "5px" }}>(Show Password)</label>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/mainPage">
              <button
                type="button"
                className="p-2 bg-blue-500 text-white rounded"
                style={{ marginTop: "15px" }}
              >
                Sign In
              </button>
            </Link>
            <Link href="/mainPage">
              <button
                type="button"
                className="p-2 bg-blue-500 text-white rounded"
                style={{ marginTop: "15px" }}
              >
                Sign Up
              </button>
            </Link>
          </div>
          <div className='myLogo'>
            <img src="/pics/download (1).png" alt="Logo" className="mt-4" style={{ marginTop: "70px", height: "30px" }} />
          </div>
        </div>

        {/* Countdown timer in a black box at the top right corner */}
      </main>
      <div className="bg-black bg-opacity-70 absolute top-5 right-5 p-2 rounded" style={{ alignItems: "center" }}>
        <h1>Time till next sudoku:</h1>
        <div
          id="countdown"
          className=" text-white text-lg"
          style={{ fontWeight:"bold", fontSize:"24px"}}
        >
        </div>
      </div>
    </div>
  );
}
