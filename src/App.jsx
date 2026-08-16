import { useState } from "react";
import CareForm from "./components/CareForm";
import CareCard from "./components/CareCard";

function App() {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState(null);
  const [error, setError] = useState(null);

  async function handleGenerate() {
    // guard: empty input, bail before fetching backend
    if (!notes.trim()) {
      setError("Please tell me a little about your dog first.");
      return;
    }

    setLoading(true); // step 1: turn loading on
    setError(null); // clear any previous error when a new request is made
    setCard(null); // clear any previous card

    try {
      // step 2: send notes to the function, bridged into "description" in the backend
      const response = await fetch("/.netlify/functions/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: notes }),
      });

      if (!response.ok) {
        throw new Error("The care card could not be generated. Please try again.");
      }

      // step 3: open the envelope coming back
      const data = await response.json();

      // step 4: put the care card into state so it can be displayed
      setCard(data);
    } catch (error) {
      setError(error.message); // now the user can see the error message in the UI, not the console
    } finally {
      setLoading(false); // step 5: loading off, success or fail
    }
  }

  return (
    <>
      <CareForm
        notes={notes}
        setNotes={setNotes}
        loading={loading}
        onGenerate={handleGenerate}
        error={error}
      />
      <CareCard
        card={card}
      />
    </>
  );
}

export default App;