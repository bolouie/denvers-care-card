import { useState } from "react";
import CareForm from "./components/CareForm";
import CareCard from "./components/CareCard";

function App() {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState(null);

  async function handleGenerate() {
    setLoading(true); // step 1: turn loading on
    setCard(null); // clear any previous card

    try {
      // step 2: send notes to the function, bridged into "description" in the backend
      const response = await fetch("/.netlify/functions/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: notes }),
      });

      // step 3: open the envelope coming back
      const data = await response.json();

      // step 4: put the care card into state so it can be displayed
      setCard(data);
    } catch (error) {
      console.error("Something went wrong:", error);
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
      />
      <CareCard
        card={card}
      />
    </>
  );
}

export default App;