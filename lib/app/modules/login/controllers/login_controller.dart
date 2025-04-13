import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:webapplittlehugsmvp/app/routes/app_pages.dart';

class LoginController extends GetxController {
  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  final isPasswordVisible = false.obs;
  final agreedToTerms = false.obs;

  late final TapGestureRecognizer termsGestureRecognizer;
  late final TapGestureRecognizer privacyGestureRecognizer;

  @override
  void onInit() {
    super.onInit();
    termsGestureRecognizer = TapGestureRecognizer()..onTap = openTerms;
    privacyGestureRecognizer = TapGestureRecognizer()..onTap = openPrivacyPolicy;
  }

  @override
  void onClose() {
    emailController.dispose();
    passwordController.dispose();
    termsGestureRecognizer.dispose();
    privacyGestureRecognizer.dispose();
    super.onClose();
  }

  void togglePasswordVisibility() {
    isPasswordVisible.value = !isPasswordVisible.value;
  }

  void goToSignUp() {
    Get.toNamed(Routes.AUTH);
    // Implement navigation to sign in page
  }

  void createAccount() {
    // Implement account creation logic
  }

  void signInWithGoogle() {
    // Implement Google sign in
  }

  void signInWithApple() {
    // Implement Apple sign in
  }

  void openTerms() {
    // Open terms and conditions
  }

  void openPrivacyPolicy() {
    // Open privacy policy
  }

  // Add these to your controller class
  final RxString passwordError = ''.obs;

  void validatePassword(String password) {
    if (password.isEmpty) {
      passwordError.value = "Password cannot be empty";
    } else if (password.length < 8) {
      passwordError.value = "Password must be at least 8 characters long";
    } else if (!password.contains(RegExp(r'[A-Z]'))) {
      passwordError.value = "Password must contain at least one uppercase letter";
    } else if (!password.contains(RegExp(r'[a-z]'))) {
      passwordError.value = "Password must contain at least one lowercase letter";
    } else if (!password.contains(RegExp(r'[0-9]'))) {
      passwordError.value = "Password must contain at least one number";
    } else if (!password.contains(RegExp(r'[!@#$%^&*(),.?":{}|<>]'))) {
      passwordError.value = "Password must contain at least one special character";
    } else {
      passwordError.value = "";
    }
  }

// You can also check on form submission
  bool isPasswordValid() {
    validatePassword(passwordController.text);
    return passwordError.value.isEmpty;
  }


  // Add these to your controller class
  final RxString emailError = ''.obs;

  void validateEmail(String email) {
    // Regular expression for email validation
    final emailRegex = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');

    if (email.isEmpty) {
      emailError.value = "Email cannot be empty";
    } else if (!emailRegex.hasMatch(email)) {
      emailError.value = "Please enter a valid email address";
    } else {
      emailError.value = "";
    }
  }

// You can also check on form submission
  bool isEmailValid() {
    validateEmail(emailController.text);
    return emailError.value.isEmpty;
  }
}
