import { serialize } from "cookie";

export default function logoutHandler(req: { cookies: { myTokenName: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; message?: string; }): any; new(): any; }; }; setHeader: (arg0: string, arg1: any) => void; }) {
  const { myTokenName } = req.cookies;
  if (!myTokenName) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const serialized = serialize("myTokenName", null, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });

  res.setHeader("Set-Cookie", serialized);
  return res.status(200).json({
    message: "Logout successful",
  });
}