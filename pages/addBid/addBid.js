import { API_URL } from "../../settings.js";
const URL = API_URL + "/bid"
const AUCTION_URL = API_URL + "/auctions"

export async function initAddBid(match) {


    
    
    const form = document.querySelector("#add-bid-form")
    
    

    if (match?.params?.id) {
        const id = match.params.id
        document.querySelector("#add-bid-btn").addEventListener("click", ()=>{addBid(id)})
        const auction = await fetch(AUCTION_URL+"/"+id).then(res=>res.json())
        form.currentBid.value = auction.currentBid
        form.minimumIncrement.value = auction.minimumIncrement 
        form.auctionId.value = auction.auctionId 
    }

}

async function addBid(id) {

    const form = document.querySelector("#add-bid-form")

    const newBid = {
        amount: form.newBid.value,
        username: form.username.value
    }
    
    const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newBid),
      };

      try {
        const bid = await fetch(URL + "/"+id, options).then((res) => {
          if (!res.ok) {
            throw new Error("Auction not added");
          }
          return res.json();
        });
    } catch (e) {
        console.log("Could not add bid: " + e)
    }
}