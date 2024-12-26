useEffect(() => {
  fetch('/cards.json')
    .then((res) => {
      if (!res.ok) {
        throw new Error("Cards file not found");
      }
      return res.json();
    })
    .then((data) => {
      setCards(data);
      // Add other logic here
    })
    .catch((err) => {
      console.error(err.message);
      setCards([]); // Use an empty array or fallback data
    });
}, []);
