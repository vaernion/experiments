let electionCampaign = new Promise((win, lose) => {
  setInterval(() => {
    const electionOutcome = Math.random() < 0.5;
    if (electionOutcome) {
      win("fuck yeah");
    } else {
      lose(new Error("rigged"));
    }
  }, 500);
});

electionCampaign
  .finally(() => console.log("election done"))
  .then(
    (result) => console.log(result),
    (error) => console.log(error)
  )
  .finally(() => console.log("final finally", electionCampaign));
