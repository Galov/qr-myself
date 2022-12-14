let btn = document.querySelector(".button");
// btn.addEventListener("click", () => {
//   let user_input = document.querySelector("#input_text");
//   if (user_input.value != "") {
//     if (document.querySelector(".qr-code").childElementCount == 0) {
//       generate(user_input);
//     } else {
//       document.querySelector(".qr-code").innerHTML = "";
//       generate(user_input);
//     }
//   } else {
//     document.querySelector(".qr-code").style = "display: none";
//     console.log("not valid input");
//   }
// });

const getData = async () => {
  const response = await fetch("./output.json");
  const data = await response.json();
  document.querySelector(".qr-code").innerHTML = "";
  data.forEach((i) => {
    generate(i.Име);
  });
};
btn.addEventListener("click", () => getData());

function generate(user_input) {
  document.querySelector(".qr-code").style = "";

  var qrcode = new QRCode(document.querySelector(".qr-code"), {
    text: `${user_input}`,
    width: 180, //128
    height: 180,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  console.log(qrcode._htOption.text);

  let download = document.createElement("button");
  document.querySelector(".qr-code").appendChild(download);

  let download_link = document.createElement("a");
  download_link.setAttribute("download", `${qrcode._htOption.text}` + ".png");
  download_link.innerText = "Изтегли";

  download.appendChild(download_link);

  if (document.querySelector(".qr-code img").getAttribute("src") == null) {
    setTimeout(() => {
      download_link.setAttribute(
        "href",
        `${document.querySelector("canvas").toDataURL()}`
      );
    }, 300);
  } else {
    setTimeout(() => {
      download_link.setAttribute(
        "href",
        `${document.querySelector(".qr-code img").getAttribute("src")}`
      );
    }, 300);
  }
}
