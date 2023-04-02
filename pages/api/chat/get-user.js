import API from "../../../lib/axios/axios";
import Users from "../../../Models/UserSchema";

export default async (req, res) => {
  try {
    if (req.method === "GET") {
      console.log(req);
      let { _id } = req.query;
      const result = await Users.findOne({ _id });
      res.send({ result });
    }
  } catch (error) {
    console.log(error.message);
    res.send({ text: "something went wrong", msg: error.message });
  }
};
