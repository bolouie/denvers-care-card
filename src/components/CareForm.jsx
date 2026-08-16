import styles from "./CareForm.module.css";

function CareForm({ notes, setNotes, onGenerate, loading, error }) {
    return (
        <div>
            <p className={styles.helper}>The more details you give, the better the care card.</p>
            <textarea
                className={styles.textarea}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tell me about your dog... feeding, meds, walks, quirks, vet."
                rows={8}
            />
            <button
                className={styles.button}
                onClick={onGenerate}
                disabled={loading}
            >
                {loading ? "Generating..." : "Generate care card"}
            </button>
            {error && <p className={styles.error} role="alert">{error}</p>}
        </div>
    );
}

export default CareForm;