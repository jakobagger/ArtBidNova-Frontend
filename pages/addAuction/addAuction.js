import { API_URL } from "../../settings.js";
import { sanitizeStringWithTableRows } from "../../utils.js";

export async function initaddAuction() {
    document.querySelector("#add-auction-btn").addEventListener("click", addAuction);
}

async function addAuction() {
    const form = document.querySelector("#auction-form");
          const newAuction = {
            artworkId: form.artwork-id.value,
            startDate: form.start-date.value,
            endDate: form.end-date.value,
            startBid: form.start-bid.value,
            minimumIncrement: form.minimum-increment.value
          };
  
          const options = {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(newAuction),
          };
  
          try {
            const auction = await fetch(URL, options).then((res) => {
              if (!res.ok) {
                throw new Error("Auction not added");
              }
              return res.json();
            });
  
            document.querySelector("#result").innerText = JSON.stringify(
              auction,
              null,
              3
            );
          } catch (e) {
            document.getElementById("error").innerText = e.message;
          }
        };