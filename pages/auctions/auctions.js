import { API_URL } from "../../settings.js";
import { sanitizeStringWithTableRows } from "../../utils.js";
const URL = API_URL + "/auctions";

export async function initAuctions() {
    const auctions = await fetch(URL).then(res => res.json())

    const tableRows = auctions.map(auction => `
    <tr>
    <td>${auction.auctionId}</td>
    <td>${auction.artworkId}</td>    
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