import 'package:flutter/material.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter_svg/svg.dart';
import 'package:get/get.dart';
import 'package:webapplittlehugsmvp/app/constants/app_images.dart';
import 'package:webapplittlehugsmvp/app/constants/app_strings.dart';
import 'package:webapplittlehugsmvp/app/modules/login/controllers/login_controller.dart';
import 'package:webapplittlehugsmvp/app/widgets/app_text.dart';
import '../../../constants/app_colors.dart';

class LoginView extends GetView<LoginController> {
  const LoginView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.lightOrangeColor,
      appBar: _buildAppBar(),
      body: GetBuilder(
        assignId: true,
        init: LoginController(),
        builder: (LoginController controller) => _buildBody(controller, context),
      ),
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar(
      backgroundColor: AppColors.lightOrangeColor,
      elevation: 0,
      automaticallyImplyLeading: false,
      title: Row(
          children: [
            SvgPicture.asset(AppImages.logo, height: 40)
          ]
      ),
    );
  }

  Widget _buildBody(LoginController controller, BuildContext context) {
    return Center(
      child: Container(
        margin: const EdgeInsets.only(top: 20, bottom: 50),
        constraints: const BoxConstraints(maxWidth: 920),
        decoration: BoxDecoration(
          color: AppColors.white,
          borderRadius: BorderRadius.circular(10),
          border: Border.all(
            color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25),
            width: 1,
          ),
        ),
        child: Stack(
          children: [
            _buildBackgroundElements(),
            _buildLoginForm(controller, context),
          ],
        ),
      ),
    );
  }

  Widget _buildBackgroundElements() {
    return Stack(
      children: [
        Positioned(
          left: -120,
          top: -120,
          child: Container(
            width: 250,
            height: 250,
            decoration: BoxDecoration(
                color: AppColors.secondaryOrange,
                shape: BoxShape.circle
            ),
          ),
        ),
        Positioned(
          right: 10,
          bottom: 0,
          child: SvgPicture.asset(AppImages.flawor),
        ),
      ],
    );
  }

  Widget _buildLoginForm(LoginController controller, BuildContext context) {
    final horizontalPadding = Get.width > 800 ? 200.0 : 24.0;

    return SingleChildScrollView(
      child: Padding(
        padding: EdgeInsets.symmetric(
            horizontal: horizontalPadding,
            vertical: 30.0
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _buildHeader(controller),
            const SizedBox(height: 32),
            _buildEmailField(controller),
            const SizedBox(height: 16),
            _buildPasswordField(controller),
            const SizedBox(height: 15),
            _buildForgotPasswordLink(context),
            const SizedBox(height: 30),
            _buildTermsCheckbox(controller),
            const SizedBox(height: 30),
            _buildSignInButton(controller),
            const SizedBox(height: 20),
            _buildSocialLoginButtons(controller),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(LoginController controller) {
    return Column(
      children: [
        AppText(
            AppStrings.signIn,
            fontSize: 45,
            fontWeight: FontWeight.w500,
            color: AppColors.colorHintTextField,
            textAlign: TextAlign.center
        ),
        const SizedBox(height: 5),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            AppText(
                AppStrings.youDoNotHaveAnAccount,
                fontSize: 18,
                fontWeight: FontWeight.w500,
                color: AppColors.black,
                textAlign: TextAlign.center
            ),
            TextButton(
              onPressed: controller.goToSignUp,
              child: AppText(
                AppStrings.signUP,
                fontSize: 18,
                fontWeight: FontWeight.w500,
                color: AppColors.colorCheckBox,
                textAlign: TextAlign.center,
                textDecoration: TextDecoration.underline,
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildEmailField(LoginController controller) {
    return Obx(() => TextField(
      controller: controller.emailController,
      cursorColor: AppColors.black,
      keyboardType: TextInputType.emailAddress,
      style: TextStyle(
          color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25),
          fontSize: 16,
          fontWeight: FontWeight.w500
      ),
      onChanged: controller.validateEmail,
      decoration: _buildInputDecoration(
        hintText: AppStrings.email,
        errorText: controller.emailError.value,
        hasError: controller.emailError.value.isNotEmpty,
      ),
    ));
  }

  Widget _buildPasswordField(LoginController controller) {
    return Obx(() => TextField(
      controller: controller.passwordController,
      cursorColor: AppColors.black,
      keyboardType: TextInputType.visiblePassword,
      obscureText: !controller.isPasswordVisible.value,
      style: TextStyle(
          color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25),
          fontSize: 16,
          fontWeight: FontWeight.w500
      ),
      onChanged: controller.validatePassword,
      decoration: _buildInputDecoration(
        hintText: AppStrings.password,
        errorText: controller.passwordError.value,
        hasError: controller.passwordError.value.isNotEmpty,
        suffixIcon: IconButton(
          icon: SvgPicture.asset(AppImages.solarEye, height: 24, width: 24),
          onPressed: controller.togglePasswordVisibility,
        ),
      ),
    ));
  }

  InputDecoration _buildInputDecoration({
    required String hintText,
    required String errorText,
    required bool hasError,
    Widget? suffixIcon,
  }) {
    return InputDecoration(
      hintText: hintText,
      suffixIcon: suffixIcon,
      hintStyle: TextStyle(
          color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25),
          fontSize: 16,
          fontWeight: FontWeight.w500
      ),
      errorText: errorText.isEmpty ? null : errorText,
      errorStyle: const TextStyle(color: Colors.red, fontSize: 12),
      disabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: BorderSide(
            color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25)
        ),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: BorderSide(
            color: hasError
                ? Colors.red
                : AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25)
        ),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: BorderSide(
            color: hasError
                ? Colors.red
                : AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25)
        ),
      ),
      errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: const BorderSide(color: Colors.red)
      ),
      focusedErrorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: const BorderSide(color: Colors.red, width: 1)
      ),
    );
  }

  Widget _buildForgotPasswordLink(BuildContext context) {
    return GestureDetector(
      onTap: () {},
      child: AppText(
          AppStrings.forgotPassword,
          fontSize: 16,
          color: AppColors.darkOrangeColor,
          fontWeight: FontWeight.w600,
          textDecoration: TextDecoration.underline
      ),
    );
  }

  Widget _buildTermsCheckbox(LoginController controller) {
    final textStyle = TextStyle(
        color: AppColors.takeQuickAssessmentColor,
        fontWeight: FontWeight.w500,
        fontSize: 16
    );

    final linkStyle = TextStyle(
        color: AppColors.takeQuickAssessmentColor,
        fontWeight: FontWeight.w500,
        fontSize: 16,
        decoration: TextDecoration.underline
    );

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Obx(() => Checkbox(
          value: controller.agreedToTerms.value,
          onChanged: (value) => controller.agreedToTerms.value = value ?? false,
        )),
        Expanded(
          child: RichText(
            text: TextSpan(
              style: const TextStyle(color: Colors.grey),
              children: [
                TextSpan(text: AppStrings.termsAgreement, style: textStyle),
                TextSpan(
                  text: AppStrings.termsAndConditions,
                  style: linkStyle,
                  recognizer: controller.termsGestureRecognizer,
                ),
                TextSpan(text: AppStrings.andAcknowledge, style: textStyle),
                TextSpan(
                  text: AppStrings.privacyPolicy,
                  style: linkStyle,
                  recognizer: controller.privacyGestureRecognizer,
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildSignInButton(LoginController controller) {
    return ElevatedButton(
      onPressed: controller.createAccount,
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.colorCheckBox,
        padding: const EdgeInsets.symmetric(vertical: 16),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(25)),
      ),
      child: AppText(
          AppStrings.signIn,
          fontSize: 20,
          color: AppColors.white,
          fontWeight: FontWeight.w500
      ),
    );
  }

  Widget _buildSocialLoginButtons(LoginController controller) {
    return Row(
      children: [
        Expanded(
          child: _buildSocialButton(
            onPressed: controller.signInWithGoogle,
            backgroundColor: AppColors.lightOrangeColor,
            icon: AppImages.googleIc,
          ),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: _buildSocialButton(
            onPressed: controller.signInWithApple,
            backgroundColor: AppColors.black,
            icon: AppImages.appleIc,
          ),
        ),
      ],
    );
  }

  Widget _buildSocialButton({
    required VoidCallback onPressed,
    required Color backgroundColor,
    required String icon,
  }) {
    return OutlinedButton(
      onPressed: onPressed,
      style: OutlinedButton.styleFrom(
        side: BorderSide.none,
        backgroundColor: backgroundColor,
        padding: const EdgeInsets.symmetric(vertical: 16),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
      ),
      child: SvgPicture.asset(icon, height: 32, width: 32),
    );
  }
}