import "../styles/components.css";

function MainButton({ text, onClick, disabled }) {
	return (
		<button className="btn" onClick={onClick} disabled={disabled}>
			{text}
		</button>
	);
}

export default MainButton;
