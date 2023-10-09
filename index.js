//import "https://unpkg.com/navigo"  //Will create the global Navigo object used below
import "./navigo_EditedByLars.js"  //Will create the global Navigo, with a few changes, object used below
//import "./navigo.min.js"  //Will create the global Navigo object used below

import {
  setActiveLink, loadHtml, renderHtml} from "./utils.js"

import { initArtworks } from "./pages/artworks/artworks.js"
import { initArtists } from "./pages/artists/artists.js"
import { initAuctions } from "./pages/auctions/auctions.js"
import { initLogin } from "./pages/login/login.js"
import { initaddAuction } from "./pages/addAuction/addAuction.js"
import { initSignup } from "./pages/signup/signup.js"
import { initaddArtwork } from "./pages/addArtwork/addArtwork.js"
window.addEventListener("load", async () => {

  const templateArtworks = await loadHtml("./pages/artworks/artworks.html")
  const templateAuctions = await loadHtml("./pages/auctions/auctions.html")
  const templateArtists = await loadHtml("./pages/artists/artists.html")
  const templateLogin = await loadHtml("./pages/login/login.html")
  const templateAddAuction = await loadHtml("./pages/addAuction/addAuction.html")
  const templateNotFound = await loadHtml("./pages/notFound/notFound.html")
  const templateSignup = await loadHtml("./pages/signup/signup.html")
  const templateAddArtwork = await loadHtml("./pages/addArtwork/addArtwork.html")
 
 

 const router = new Navigo("/", { hash: true });
  //Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files
  window.router = router

  router
    .hooks({
      before(done, match) {
        setActiveLink("menu", match.url)
        done()
      }
    })
    .on({
      //For very simple "templates", you can just insert your HTML directly like below
      "/": () => document.getElementById("content").innerHTML = `
        <h2>Home</h2>
        <img style="width:50%;max-width:150px;margin-top:1em;" src="./images/profile-image/MaoZedong.jpg">
        <p style='margin-top:1em;font-size: 1.5em;color:darkgray;'>
          ARTBID<span style='font-size:2em;'>&#128516;</span>
        </p>
     `,
      "/artists": () => {
        renderHtml(templateArtists, "content")
        initArtists()
      },
      "/auctions": () => {
        renderHtml(templateAuctions, "content")
        initAuctions()
      },
      "/addArtwork": (match) => {
        renderHtml(templateAddArtwork, "content")
        initaddArtwork()
      },
      // "/members": () => {
      //   renderHtml(templateMembers, "content")
      //   initMembers()
      // },
      "/artworks": () => {
        renderHtml(templateArtworks, "content")
        initArtworks()
      },
      "/addAuction": (match) => {
        renderHtml(templateAddAuction, "content")
        initaddAuction(match)
      },
      "/signup": () => {
        renderHtml(templateSignup, "content")
        initSignup()
      },
      "/login": (match) => {
        renderHtml(templateLogin, "content")
        initLogin()
      }
    })
    .notFound(() => {
      renderHtml(templateNotFound, "content")
    })
    .resolve()
});

window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
    + ' Column: ' + column + ' StackTrace: ' + errorObj);
}