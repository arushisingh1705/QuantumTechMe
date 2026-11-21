<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;

class PasswordController extends Controller
{
    public function edit()
    {
        return view("admin.password.edit");
    }

    public function update(Request $request)
    {
        $request->validate(
            [
                "current_password" => ["required", "current_password"],
                "password" => [
                    "required",
                    "confirmed",
                    "different:current_password",
                    Password::min(10)->letters()->mixedCase()->numbers(),
                ],
            ],
            [
                "current_password.current_password" => "Your current password is incorrect.",
                "password.different" => "The new password must be different from your current password.",
            ],
        );

        // The User model's "hashed" cast stores this as a proper bcrypt hash.
        $user = $request->user();
        $user->password = $request->input("password");
        $user->setRememberToken(null);
        $user->save();

        $request->session()->regenerate();

        return redirect()->route("admin.password.edit")->with("success", "Password changed.");
    }
}
