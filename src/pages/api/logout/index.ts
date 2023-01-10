import { serialize } from "cookie";

export default function logoutHandler(req: { cookies: { myTokenName: string; }; }, res: { status: (arg0: number) => { (): string; new(): string; send: { (arg0: { error?: string; message?: string; }): string; new(): string; }; }; setHeader: (arg0: string, arg1: string) => void; }) {
  const { myTokenName } = req.cookies;
  if (!myTokenName) {
    return res.status(401).send({ error: "Not logged in" });
  }

  const serialized = serialize("myTokenName", null, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });

  res.setHeader("Set-Cookie", serialized);
  return res.status(200).send({
    message: "Logout successful",
  });
}