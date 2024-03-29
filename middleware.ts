// middleware.ts
import type { NextRequest } from "next/server";
import { rules } from "./lib/rules";

export function middleware(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const text = searchParams.get("text");

  for (const rule of rules) {
    if (rule.name === "email") continue;
    if (request.nextUrl.pathname.startsWith(`/${rule.name}`)) {
      const redirectUrl = rule.render(url || "", text || "");
      return new Response(null, {
        status: 302,
        headers: {
          "Content-Location": redirectUrl,
          Location: redirectUrl,
        },
      });
    }
  }
}

export const config = {
  matcher: "/:path*",
};
