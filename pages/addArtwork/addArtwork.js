import { API_URL } from "../../settings.js";
import { sanitizeStringWithTableRows } from "../../utils.js";
const URL = API_URL + "/artwork";

export async function initaddArtwork() {
  document.querySelector("#add-art-btn").addEventListener("click", addArtwork);
}

async function convertBase64(file) {

  return new Promise((resolve, reject) => {

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
          resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
          reject(error);
      };
  });
};


async function base64(file) {
  let data = await convertBase64(file)
  return data

}

async function addArtwork() {
  const form = document.querySelector("#art-form");
  const imageFile = document.querySelector("#image").files[0];
  const image = await base64(imageFile)
        const newArt = {
          title: form.title.value,
          category: form.category.value,
          description: form.description.value,
          forSale: form.forSale.checked,
          image: image,
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
          
        } catch (e) {
          document.getElementById("error").innerText = e.message;
        }
      };
