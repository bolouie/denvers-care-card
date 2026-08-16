import { useState } from "react";
import CareForm from "./components/CareForm";

function App() {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState(null);

  function handleGenerate() {
    console.log("generate clicked - fetch coming next");
  }

  return (
    <CareForm
      notes={notes}
      setNotes={setNotes}
      loading={loading}
      onGenerate={handleGenerate}
    />
  );
}

export default App;