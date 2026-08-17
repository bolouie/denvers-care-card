import { useState } from "react";
import styles from "./CareCard.module.css";

function CareCard({ card }) {
    const [copied, setCopied] = useState(false);

    if (!card) {
        return null;
    }

    async function handleCopy() {
        const text = `Care Card for ${card.dogName}

Feeding: ${card.feeding}
Meds: ${card.meds}
Walk routine: ${card.walkRoutine}
Quirks: ${card.quirks}
Emergency contact: ${card.emergencyContact}
What makes them happy: ${card.happyNote}`;

        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Copy failed:", err);
        }
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
            <button className={styles.copyButton} onClick={handleCopy}>
                {copied ? "Copied!" : "Copy care card"}
            </button>
        </div>
    );
}

export default CareCard;