import { connectToMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import device_owner from "@/models/device_owner";
import MQTT_cred from "@/models/MQTT_cred";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToMongoDB();
    const body = await req.json();

    // Validate input
    const { username, password } = body;
    if (!username || !password) {
      return NextResponse.json({ message: "Missing username or password" }, { status: 400 });
    }

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    // Check role
    if (user.role !== "admin") {
      return NextResponse.json({ message: "User is not authorized" }, { status: 403 });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ message: "Incorrect Password" }, { status: 400 });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });

    // Fetch associated devices and credentials
    const devices = await device_owner.find({ user_id: user.user_id });
    const deviceIds = devices.map(device => device.d_id);

    const mqttCreds = await MQTT_cred.find();

    // Send response
    return NextResponse.json({
      user: { name: user.full_name, role: user.role, email: user.email },
      token,
      topics: deviceIds,
      mqtt_creds: mqttCreds.map(cred => ({ id: cred._id, username: cred.username })),
    }, { status: 200 });

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
