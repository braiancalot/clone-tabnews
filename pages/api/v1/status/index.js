function status(req, res) {
  res.status(200).json({ key: "Está funcionando show!!" });
}

export default status;
