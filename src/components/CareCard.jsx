function CareCard({ card }) {
    if (!card) {
        return null;
    }

    return (
        <div>
            <h2>{card.dogName}</h2>
            <p><strong>Feeding:</strong> {card.feeding}</p>
            <p><strong>Meds:</strong> {card.meds}</p>
            <p><strong>Walk routine:</strong> {card.walkRoutine}</p>
            <p><strong>Quirks:</strong> {card.quirks}</p>
            <p><strong>Emergency contact:</strong> {card.emergencyContact}</p>
            <p><strong>What makes them happy:</strong> {card.happyNote}</p>
        </div>
    );
}

export default CareCard;