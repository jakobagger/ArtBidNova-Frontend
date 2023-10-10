import { API_URL } from "../../settings.js";
const URL = API_URL + "/artwork";

import { sanitizeStringWithTableRows } from "../../utils.js";

export async function initArtworks() {

    const artworks = await fetch(URL).then(res => res.json())

    const tableRows = artworks.map(artwork => `
    <tr>
    <td>${artwork.image}</td>
    <td>${artwork.title}</td>
    <td>${artwork.description}</td>
    <td>${artwork.category}</td>
    <td>${artwork.forSale}</td>
    </tr>
    `)

    const tableRowsAsString = tableRows.join("")

    document.querySelector("#tablerows").innerHTML = sanitizeStringWithTableRows(tableRowsAsString)
}