require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());

// Get all amenitys
app.get("/api/v1/amenitys", async (req, res) => {
  try {
    //const results = await db.query("select * from amenitys");
    const amenityRatingsData = await db.query(
      "select * from amenitys left join (select amenity_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by amenity_id) reviews on amenitys.id = reviews.amenity_id;"
    );

    res.status(200).json({
      status: "success",
      results: amenityRatingsData.rows.length,
      data: {
        amenitys: amenityRatingsData.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a amenity
app.get("/api/v1/amenitys/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const amenity = await db.query(
      "select * from amenitys left join (select amenity_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by amenity_id) reviews on amenitys.id = reviews.amenity_id where id = $1",
      [req.params.id]
    );
    // select * from amenitys wehre id = req.params.id

    const reviews = await db.query(
      "select * from reviews where amenity_id = $1",
      [req.params.id]
    );
    console.log(reviews);

    res.status(200).json({
      status: "succes",
      data: {
        amenity: amenity.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Create a amenity

app.post("/api/v1/amenitys", async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      "INSERT INTO amenitys (name, location, price_range) values ($1, $2, $3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    console.log(results);
    res.status(201).json({
      status: "succes",
      data: {
        amenity: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Update amenitys

app.put("/api/v1/amenitys/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE amenitys SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );

    res.status(200).json({
      status: "succes",
      data: {
        retaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
  console.log(req.params.id);
  console.log(req.body);
});

// Delete amenity

app.delete("/api/v1/amenitys/:id", async (req, res) => {
  try {
    const results = db.query("DELETE FROM amenitys where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "sucess",
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v1/amenitys/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (amenity_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    console.log(newReview);
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
