// HINTS:
// 1. Import express and axios
import express from "express";
import axios from "axios";

// 2. Create an express app and set the port number.
const app = express();
const port = 3002;

app.set("view engine", "ejs");
app.set("views", "./views");
// 3. Use the public folder for static files.
app.use(express.static("public"));

// 4. When the user goes to the home page it should render the index.ejs file.
// app.get("/", (req, res) => {
//     res.render("index.ejs", {
//         secret: "",
//         user: "",
//     });
// });
// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.
app.get("/", async (req, res) => {
    try {
        const result = await axios.get("https://secrets-api.appbrewery.com/random");
        res.render("index.ejs", {
            secret: result.data.secret,
            user:   result.data.username,
        });
    }  catch(error) {
        console.log(error.response.data);
        res.status(500);
    }
});

// Route to get a new random secret
// app.get("/random-secret", async (req, res) => {
//     try {
//         const result = await axios("https://secrets-api.appbrewery.com/random");
//         res.json({
//             secret: result.data.secret,
//             user: result.data.username,
//         });
//     } catch (error) {
//         console.log("Error fetching secret", error);
//         res.render("index", {
//             secret: "Failed to fetch secret.",
//             user: "Unknown",
//         });
//     }
// });

// 6. Listen on your predefined port and start the server.
app.listen(port, () => {
    console.log(`Listening on port number ${port}!`);
});