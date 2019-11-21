const express = require("express");
const router = express.Router();

const database = require("../config/database");

/* GET closet page */
router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const query = `
            SELECT 
                type, attire_name, brand, color, size
            FROM
                user
                    JOIN
                owns USING (username)
		            JOIN
	            closet_contains_attire USING (closet_id)
		            JOIN
	            attire USING (attire_id)
            WHERE
            username = '${req.user.username}';`;

      database.query(query, (err, results) => {
        if (err) throw err;
        res.render("closet", { user: req.user, results: results });
      });
    } catch (err) {
      console.error(err.stack);
      res.redirect("/index");
    }
  } else {
    res.redirect("/");
  }
});

module.exports = router;
