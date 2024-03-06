import React, { useEffect, useState } from "react";
import "./App.css";

const MAX_WORD_LENGTH = 5;

function Line({ guess }: { guess: string }) {
	const tiles = [];

	for (let i = 0; i < MAX_WORD_LENGTH; i++) {
		const char = guess[i];
		tiles.push(
			<div className="tile" key={i}>
				{char}
			</div>
		);
	}

	return <div className="tiles">{tiles}</div>;
}

export default Line;
