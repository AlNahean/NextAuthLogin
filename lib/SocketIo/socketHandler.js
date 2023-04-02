import io from "socket.io-client";
let socket;

const getSocket = async () => {
  if (socket) {
  } else {
    let soc = await io.connect("http://192.168.31.67:5000/", {
      "force new connection": true,
    });
    socket = soc;
  }
  return socket;
};
export default getSocket;
