import styles from "./CareCard.module.css";

function CareCard({ card }) {
    if (!card) {
        return null;
    }

    return (
        <div className={styles.card}>
            <h2 className={styles.dogName}>{card.dogName}</h2>
            <p className={styles.feeding}><strong>Feeding:</strong> {card.feeding}</p>
            <p className={styles.meds}><strong>Meds:</strong> {card.meds}</p>
            <p className={styles.walkRoutine}><strong>Walk routine:</strong> {card.walkRoutine}</p>
            <p className={styles.quirks}><strong>Quirks:</strong> {card.quirks}</p>
            <p className={styles.emergencyContact}><strong>Emergency contact:</strong> {card.emergencyContact}</p>
            <p className={styles.happyNote}><strong>What makes them happy:</strong> {card.happyNote}</p>
        </div>
    );
}

export default CareCard;