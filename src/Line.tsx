import React from "react";
import "./App.css";

const MAX_WORD_LENGTH = 5;

function Line({
	guess,
	solution,
	isFinal,
}: {
	guess: string;
	solution: string;
	isFinal: boolean;
}) {
	const tiles = [];

	for (let i = 0; i < MAX_WORD_LENGTH; i++) {
		const char = guess[i];
		let className = "tile";

		if (isFinal) {
			if (char === solution[i]) {
				className += " correct";
			} else if (solution.includes(char)) {
				className += " wrongPlace";
			} else {
				className += " incorrect";
			}
		}

		tiles.push(
			<div className={className} key={i}>
				{char}
			</div>
		);
	}

	return <div className="tiles">{tiles}</div>;
}

export default Line;
