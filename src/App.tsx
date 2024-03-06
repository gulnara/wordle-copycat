import React, { useEffect, useState } from "react";
import Line from "./Line";
import "./App.css";

const WORDL_URL = "https://random-word-api.vercel.app/api?words=10&length=5";
const MAX_ATTEMPTS = 6;

function App() {
	const [randomWord, setRandomWord] = useState("");
	const [guesses, setGuesses] = useState(Array(MAX_ATTEMPTS).fill(null));
	const [currentGuess, setCurrentGuess] = useState("");
	const [isGameOver, setIsGameOver] = useState(false);

	useEffect(() => {
		const handleKeyDown = (event: any) => {
			if (isGameOver) {
				return;
			}

			if (event.key === "Backspace") {
				setCurrentGuess(currentGuess.slice(0, -1));
				return;
			}

			if (event.key === "Enter") {
				if (currentGuess.length !== 5) {
					return;
				}

				const newGuesses = [...guesses];
				newGuesses[guesses.findIndex((val) => val == null)] = currentGuess;
				setGuesses(newGuesses);
				setCurrentGuess("");

				const isCorrect = randomWord === currentGuess;
				if (isCorrect) {
					setIsGameOver(true);
				}
			}

			if (currentGuess.length >= 5) {
				return;
			}

			setCurrentGuess((oldGuess) => oldGuess + event.key);
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [currentGuess, guesses, randomWord, isGameOver]);

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
				{guesses.map((guess, i) => {
					const isCurrentGuess = i === guesses.findIndex((val) => val == null);
					return (
						<Line
							guess={isCurrentGuess ? currentGuess : guess ?? ""}
							solution={randomWord}
							isFinal={!isCurrentGuess && guess != null}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default App;
