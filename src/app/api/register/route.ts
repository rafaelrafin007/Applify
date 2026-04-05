import { NextResponse } from "next/server";

function notImplemented() {
  return NextResponse.json({ error: "Not implemented yet" }, { status: 501 });
}

export async function GET() {
  return notImplemented();
}

export async function POST() {
  return notImplemented();
}

export async function PUT() {
  return notImplemented();
}

export async function PATCH() {
  return notImplemented();
}

export async function DELETE() {
  return notImplemented();
}