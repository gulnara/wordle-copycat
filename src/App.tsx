import React, { useEffect, useState } from "react";
import Line from "./Line";
import "./App.css";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const WORDL_URL = "https://random-word-api.vercel.app/api?words=10&length=5";
const MAX_ATTEMPTS = 6;

function App() {
	const [randomWord, setRandomWord] = useState("");
	const [guesses, setGuesses] = useState(Array(MAX_ATTEMPTS).fill(null));
	const [currentGuess, setCurrentGuess] = useState("");
	const [isGameOver, setIsGameOver] = useState(false);
	const { width, height } = useWindowSize();
	const [isCorrect, setIsCorrect] = useState(false);

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

				const isCorrect = randomWord === currentGuess;
				if (isCorrect) {
					setIsCorrect(true);
					setIsGameOver(true);
				} else if (guesses[4] != null) {
					setIsGameOver(true);
					return;
				}
				setCurrentGuess("");
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
			<h1>Wordle The Copycat</h1>
			{isGameOver && !isCorrect ? (
				<>
					<h3>Whomp, whomp, the correct word was: {randomWord}</h3>
				</>
			) : (
				<></>
			)}
			{isCorrect ? (
				<>
					<Confetti width={width} height={height} />
				</>
			) : (
				<></>
			)}
			<div className="board">
				{guesses.map((guess, i) => {
					const isCurrentGuess = i === guesses.findIndex((val) => val == null);
					return (
						<Line
							key={i}
							guess={isCurrentGuess ? currentGuess : guess ?? ""}
							solution={randomWord}
							isFinal={!isCurrentGuess && guess != null}
						/>
					);
				})}
			</div>

			<div className="disclaimer">
				<i>
					Note: This is a personal project, built for fun by{" "}
					<a
						href="https://www.linkedin.com/in/gulnaram/"
						target="_blank"
						rel="noreferrer"
					>
						@gulnara
					</a>
					. The repo can be found{" "}
					<a
						href="https://github.com/gulnara/wordle-copycat"
						target="_blank"
						rel="noreferrer"
					>
						here
					</a>
					. <br />
					The original Wordle game can be found on{" "}
					<a
						href="https://www.nytimes.com/games/wordle/index.html"
						target="_blank"
						rel="noreferrer"
					>
						nytimes page.{" "}
					</a>
				</i>
			</div>
		</div>
	);
}

export default App;
