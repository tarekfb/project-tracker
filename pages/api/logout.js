import { unsetAuthCookies } from "next-firebase-auth";
import { initAuth } from "@/firebase/FirebaseAuth";

initAuth();

const handler = async (req, res) => {
  try {
    await unsetAuthCookies(req, res);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.toString() });
  }
  return res.status(200).json({ success: true });
};

export default handler;
