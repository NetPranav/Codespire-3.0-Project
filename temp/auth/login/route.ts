import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/DataBase/mongo.config";
import vine, { errors } from "@vinejs/vine";
import ErrorReporter from "@/validator/ErrorReporter";
import { LoginSchema } from "@/validator/authSchema";
import bcrypt from "bcryptjs";
import { User } from "@/model/user";

export async function POST(req: NextRequest) {
  try {
    await connect();

    const body = await req.json();
    const validator = vine.compile(LoginSchema);
    validator.errorReporter = () => new ErrorReporter();
    const output = await validator.validate(body);

    const user = await User.findOne({ email: output.email });
    if (!user) {
      return NextResponse.json(
        { errors: { email: "User does not exist" } },
        { status: 404 }
      );
    }

    const isValid = await bcrypt.compare(output.password!, user.password);
    if (!isValid) {
      return NextResponse.json(
        { errors: { password: "Incorrect password" } },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Login validated" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { errors: error.messages },
        { status: 400 }
      );
    }

    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
