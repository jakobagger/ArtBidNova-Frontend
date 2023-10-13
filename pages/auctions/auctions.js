import { API_URL } from "../../settings.js";
import { sanitizeStringWithTableRows } from "../../utils.js";
const URL = API_URL + "/auctions";

export async function initAuctions() {
    document.querySelector("#tablerows").innerHTML = ""

    document.querySelector("#tablerows").onclick = showArtworkDetails


    const auctions = await fetch(URL).then(res => res.json())

    const tableRows = auctions.map(auction => `
    <tr>
    <td>${auction.auctionId}</td>
    <td>${auction.artworkId}       <button id="get-art-btn_${auction.artworkId}">See artwork</button></td>    
    <td>${auction.startDate}</td>
    <td>${auction.endDate}</td>
    <td>${auction.startBid}</td>
    <td>${auction.currentBid}</td>
    <td>${auction.minimumIncrement}</td>
    </tr>
    `)

    const tableRowsAsString = tableRows.join("")

    document.querySelector("#tablerows").innerHTML = sanitizeStringWithTableRows(tableRowsAsString)
}

async function showArtworkDetails(event) {
    const target = event.target
    if (!target.id.startsWith("get-art-btn_")) {
        return
      }
      const id = target.id.replace("get-art-btn_", "")
      // @ts-ignore
      window.router.navigate("find-artwork?id=" + id)
}