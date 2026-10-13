import { Controller, Post, Body } from '@nestjs/common';


// Controller untuk menangani fitur authentication
// Semua endpoint di dalam controller ini diawali dengan /auth
@Controller('auth')
export class AuthController {

  // =========================
  // LOGIN
  // =========================

  // Endpoint: POST /auth/login
  @Post('login')
  login(
    // Mengambil email dari request body
    @Body('email') email: string,

    // Mengambil password dari request body
    @Body('password') password: string,
  ) {
    return {
      message: 'Login berhasil',
      email,
      password,
    };
  }


  // =========================
  // REGISTER
  // =========================

  // Endpoint: POST /auth/register
  @Post('register')
  register(
    // Nama user
    @Body('name') name: string,

    // Email user
    @Body('email') email: string,

    // Password user
    @Body('password') password: string,

    // Konfirmasi password
    @Body('passwordConfirmation') passwordConfirmation: string,
  ) {
    return {
      message: 'Register berhasil',
      name,
      email,
      password,
      passwordConfirmation,
    };
  }


  // =========================
  // FORGOT PASSWORD
  // =========================

  // Endpoint: POST /auth/forgot-password
  @Post('forgot-password')
  forgotPassword(
    // Mengambil email user
    @Body('email') email: string,
  ) {
    return {
      message: 'Permintaan reset password berhasil',
      email,
    };
  }


  // =========================
  // RESET PASSWORD
  // =========================

  // Endpoint: POST /auth/reset-password
  @Post('reset-password')
  resetPassword(
    // Token untuk reset password
    @Body('token') token: string,

    // Password baru
    @Body('password') password: string,

    // Konfirmasi password baru
    @Body('passwordConfirmation') passwordConfirmation: string,
  ) {
    return {
      message: 'Reset password berhasil',
      token,
      password,
      passwordConfirmation,
    };
  }

}