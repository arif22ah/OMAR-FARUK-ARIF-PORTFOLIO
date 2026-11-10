import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    candidate: "Omar Faruk Arif",
    role: "Data Scientist",
    education: "B.Sc. in CSE (Major: Data Science), UIU — Graduated",
    status: "ACTIVE_PRODUCTION_SIMULATION",
    timestamp: new Date().toISOString(),
  });
}
