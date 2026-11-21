@extends('layouts.admin')
@section('title', 'Change Password')
@section('heading', 'Change Password')
@section('content')
<form class="admin-form" method="post" action="{{ route('admin.password.update') }}">
    @csrf
    @method('put')
    <div class="admin-card">
        <h2>Change Password</h2>
        <p>Signed in as <b>{{ auth()->user()->email }}</b></p>

        <label for="current_password">Current password</label>
        <input id="current_password" type="password" name="current_password" autocomplete="current-password" required>

        <label for="password">New password</label>
        <input id="password" type="password" name="password" autocomplete="new-password" minlength="10" required>
        <small>At least 10 characters, with upper and lower case letters and a number.</small>

        <label for="password_confirmation">Confirm new password</label>
        <input id="password_confirmation" type="password" name="password_confirmation" autocomplete="new-password" minlength="10" required>
    </div>
    <button class="btn">Change Password</button>
</form>
@endsection
