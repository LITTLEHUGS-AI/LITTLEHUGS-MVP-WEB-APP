import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:webapplittlehugsmvp/app/constants/app_strings.dart';
import 'package:webapplittlehugsmvp/app/routes/app_pages.dart';

class LoginController extends GetxController {

  // Method to check if device is mobile
  bool isMobile(BuildContext context) => MediaQuery.of(context).size.width < 768;

  // Method to check if device is tablet
  bool isTablet(BuildContext context) => MediaQuery.of(context).size.width >= 768 && MediaQuery.of(context).size.width < 1200;

  // Method to check if device is desktop
  bool isDesktop(BuildContext context) => MediaQuery.of(context).size.width >= 1200;

  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  final RxString emailError = ''.obs;
  final RxString passwordError = ''.obs;
  final RxBool isPasswordVisible = false.obs;
  final RxBool agreedToTerms = false.obs;

  late final TapGestureRecognizer termsGestureRecognizer;
  late final TapGestureRecognizer privacyGestureRecognizer;

  @override
  void onInit() {
    super.onInit();
    _initializeGestureRecognizers();
  }

  @override
  void onClose() {
    emailController.dispose();
    passwordController.dispose();
    termsGestureRecognizer.dispose();
    privacyGestureRecognizer.dispose();
    super.onClose();
  }

  void _initializeGestureRecognizers() {
    termsGestureRecognizer = TapGestureRecognizer()..onTap = _openTermsAndConditions;
    privacyGestureRecognizer = TapGestureRecognizer()..onTap = _openPrivacyPolicy;
  }

  void validateEmail(String value) {
    if (value.isEmpty) {
      emailError.value = AppStrings.emailRequired;
    } else if (!_isValidEmail(value)) {
      emailError.value = AppStrings.invalidEmailFormat;
    } else {
      emailError.value = '';
    }
  }

  void validatePassword(String value) {
    if (value.isEmpty) {
      passwordError.value = AppStrings.passwordRequired;
    } else if (value.length < 8) {
      passwordError.value = AppStrings.passwordMinLength;
    } else {
      passwordError.value = '';
    }
  }

  bool _isValidEmail(String email) {
    final emailRegExp = RegExp(r'^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+');
    return emailRegExp.hasMatch(email);
  }

  void togglePasswordVisibility() {
    isPasswordVisible.value = !isPasswordVisible.value;
  }

  void createAccount() {
    // Validate inputs first
    validateEmail(emailController.text);
    validatePassword(passwordController.text);

    if (!agreedToTerms.value) {
      Get.snackbar('Error', AppStrings.termsRequired);
      return;
    }

    if (emailError.value.isEmpty && passwordError.value.isEmpty) {
      // Implement sign-in logic
      print('Attempting sign in with: ${emailController.text}');
    }
  }

  void goToSignUp() {
    Get.toNamed(Routes.AUTH);
  }

  void _openTermsAndConditions() {
    // Implement navigation to terms and conditions
    print('Opening Terms & Conditions');
  }

  void _openPrivacyPolicy() {
    // Implement navigation to privacy policy
    print('Opening Privacy Policy');
  }

  void signInWithGoogle() {
    // Implement Google sign-in
    print('Google sign-in initiated');
  }

  void signInWithApple() {
    // Implement Apple sign-in
    print('Apple sign-in initiated');
  }
}
