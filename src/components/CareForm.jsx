function CareForm({ notes, setNotes, onGenerate, loading }) {
    return (
        <div>
            <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tell me about your dog... feeding, meds, walks, quirks, vet."
                rows={8}
            />
            <button onClick={onGenerate} disabled={loading}>
                {loading ? "Generating..." : "Generate care card"}
            </button>
        </div>
    )
}

export default CareForm;