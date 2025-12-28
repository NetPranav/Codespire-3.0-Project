import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/DataBase/mongo.config";
import { registerSchema } from "@/validator/authSchema";
import vine, { errors } from "@vinejs/vine";
import ErrorReporter from "@/validator/ErrorReporter";
import bcrypt from "bcryptjs";
import { User } from "@/model/user";
// for db connection
// connect();
export async function POST(req: NextRequest) {
  try {
    await connect();

    const body = await req.json();
    const validator = vine.compile(registerSchema);
    validator.errorReporter = () => new ErrorReporter();
    const output = await validator.validate(body);

    const existing = await User.findOne({ email: output.email });
    if (existing) {
      return NextResponse.json(
        { errors: { email: "User already exists" } },
        { status: 409 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    output.password = await bcrypt.hash(output.password, salt);

    await User.create(output);

    return NextResponse.json(
      { message: "Account created successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { errors: error.messages },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
