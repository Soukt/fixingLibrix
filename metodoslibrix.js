const server = "http://localhost:8888/getbooks";

const fetch = require("node-fetch");
const options = {
  method: "GET",

  headers: { "Content-Type": "application/json" },
  body: JSON.stringify()
};
fetch(server)
  .then(res => res.json())
  .then(data => console.log(data));
// fetch(server, options).then(data);
// function getAllBooks() {
//   fetch("http://localhost:8888/getbooks", { method: "GET" }).then(res =>
//     console.log(res.body)
//   );
//   // .then(res => res.text())
//   // .then(res => );
// }
// getAllBooks();
// searchBooks(searchquery) {
//     fetch("http://localhost:8888/findbooks").then(res => res.text).then(res => res.text())
//         .then(res => this.setState({
//             apiResponse: res
//         }));
// }
// addBooks(newbook) {
//     fetch("http://localhost:8888/addbooks").then(res => res.text).then(res => res.text())
//         .then(res => this.setState({
//             apiResponse: res
//         }));
// }
