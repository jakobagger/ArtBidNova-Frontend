import { API_URL } from "../../settings.js";
import { sanitizeStringWithTableRows } from "../../utils.js";
const URL = API_URL + "/artwork";

export async function initaddArtwork() {
  document.querySelector("#add-art-btn").addEventListener("click", addArtwork);

  async function addArtwork() {
    const form = document.querySelector("#art-form");
    const imageFile = document.querySelector("#image").files[0];

    if (imageFile) {
      const reader = new FileReader();

      reader.onload = async function (event) {
        const imageString = event.target.result;
        const newArt = {
          title: form.title.value,
          category: form.category.value,
          description: form.description.value,
          price: parseInt(form.price.value),
          forSale: form.forSale.checked,
          image: imageString,
          username: form.username.value
        };

        const options = {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newArt),
        };

        try {
          const artwork = await fetch(URL, options).then((res) => {
            if (!res.ok) {
              throw new Error("Artwork not added");
            }
            return res.json();
          });

          document.querySelector("#result").innerText = JSON.stringify(
            artwork,
            null,
            3
          );
        } catch (e) {
          document.getElementById("error").innerText = e.message;
        }
      };

      reader.readAsDataURL(imageFile); // Keep this line to read the image file
    }
  }
}
