import React, { useEffect, useState } from "react";
import Line from "./Line";
import "./App.css";

const WORDL_URL = "https://random-word-api.vercel.app/api?words=10&length=5";
const MAX_ATTEMPTS = 6;

function App() {
	const [randomWord, setRandomWord] = useState("");
	const [guesses, setGuesses] = useState(Array(MAX_ATTEMPTS).fill(null));

	useEffect(() => {
		const getWords = async () => {
			const response = await fetch(WORDL_URL);
			const words = await response.json();
			const randomWord = words[Math.floor(Math.random() * words.length)];
			console.log(randomWord);
			setRandomWord(randomWord);
		};

		getWords();
	}, []);

	return (
		<div className="App">
			<h1>Wordl</h1>
			<div className="board">
				{guesses.map((guess: string) => {
					return <Line guess={guess || ""} />;
				})}
			</div>
		</div>
	);
}

export default App;
