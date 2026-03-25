// app/api/verify-captcha/route.js

export async function POST(req) {
  try {
    const { token } = await req.json();

    const secret = process.env.RECAPTCHA_SECRET_KEY;

    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secret}&response=${token}`,
    });

    const data = await res.json();

    return Response.json({ success: data.success });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}
