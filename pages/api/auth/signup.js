import connectDB from "../../../db/connect";
import { hash } from "bcryptjs";

import Users from "../../../Models/UserSchema";

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }
  return true;
}

export default async function handler(req, res) {
  try {
    //  connect to the database
    let connected = await connectDB().catch((error) => {
      console.log(error);

      res.json({ error: "Connection Failed...!" });
    });
    if (req.method === "POST") {
      if (isEmpty(req.body)) {
        return res.status(404).json({ error: "Don't have form data...!" });
      }
      const { name, email, password, img } = req.body;

      // check duplicate users
      const checkexisting = await Users.findOne({ email });
      if (checkexisting)
        return res.status(422).json({ message: "User Already Exists...!" });

      // hash password
      Users.create(
        {
          name: name,
          email,
          image: img,
          password: await hash(password, 12),
        },
        function (err, data) {
          if (err) return res.status(404).json({ err });
          res.status(201).json({ status: true, user: data });
        }
      );

      res.status(200).json({ msg: "user creation success" });
    } else {
      res.status(200).json({ nnn: "not conncted" });
    }
  } catch (error) {
    console.log(error);
  }
}
