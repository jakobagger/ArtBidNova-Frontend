import { API_URL } from "../../settings.js";
import { sanitizeStringWithTableRows } from "../../utils.js";
const URL = API_URL+"/auctions"

export async function initaddAuction() {
    document.querySelector("#add-auction-btn").addEventListener("click", addAuction);
}

async function addAuction() {
    event.preventDefault()
    const form = document.querySelector("#auction-form");
          const newAuction = {
            artworkId: form.artworkId.value,
            startDate: form.startDate.value,
            endDate: form.endDate.value,
            startBid: form.startBid.value,
            minimumIncrement: form.minimumIncrement.value
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