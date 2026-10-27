// Creates (or resets) an admin account that can log in at /login.
//
// Usage (in the custom-server folder):
//   npm run create-admin -- <username> <password> [email] [full name]
// Example:
//   npm run create-admin -- admin MyStrongPass123 admin@cst.edu.bt "DakzinAI Admin"
//
// It uses MONGODB_URI from your .env file. If the username already exists, its password is reset
// and it is made an admin.

const fs = require("fs");
const path = require("path");

// Load .env without extra packages (Next.js does this for the website; a plain node script must do it itself).
const envPath = path.join(__dirname, "..", ".env");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const mongoose = require("mongoose");
const User = require("../models/user");

async function main() {
  const [username, password, email, fullName] = process.argv.slice(2);
  if (!username || !password) {
    console.log('Usage: npm run create-admin -- <username> <password> [email] ["full name"]');
    process.exit(1);
  }
  if (password.length < 8) {
    console.log("Please use a password of at least 8 characters.");
    process.exit(1);
  }
  if (!process.env.MONGODB_URI) {
    console.log("MONGODB_URI is missing from .env");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);

  const existing = await User.findOne({ username });
  if (existing) {
    existing.password = password; // hashed automatically by the model
    existing.role = "admin";
    await existing.save();
    console.log(`Updated "${username}": password reset and role set to admin.`);
  } else {
    // The user model requires these fields and some must be unique, so placeholders are generated.
    const tag = Date.now().toString();
    await User.create({
      username,
      password, // hashed automatically by the model
      email: email || `${username}@dakzin.local`,
      full_name: fullName || "DakzinAI Admin",
      cid: `ADMIN-${tag}`,
      phone: `ADMIN-${tag}`,
      dzongkhag: "-",
      gewog: "-",
      village: "-",
      role: "admin",
    });
    console.log(`Created admin "${username}". You can now log in at /login.`);
  }
  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error("Could not create the admin:", err.message);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
