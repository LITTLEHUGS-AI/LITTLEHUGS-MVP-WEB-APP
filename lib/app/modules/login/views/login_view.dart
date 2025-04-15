import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:get/get.dart';
import 'package:webapplittlehugsmvp/app/constants/app_images.dart';
import 'package:webapplittlehugsmvp/app/constants/app_strings.dart';
import 'package:webapplittlehugsmvp/app/constants/constant.dart';
import 'package:webapplittlehugsmvp/app/modules/login/controllers/login_controller.dart';
import 'package:webapplittlehugsmvp/app/widgets/app_text.dart';
import '../../../constants/app_colors.dart';

class LoginView extends GetView<LoginController> {
  const LoginView({super.key});

  @override
  Widget build(BuildContext context) {
    final TabBarThemeData tabBarTheme = TabBarTheme.of(context);
    return Scaffold(
      backgroundColor: AppColors.lightOrangeColor,
      appBar: AppBar(
        backgroundColor: AppColors.lightOrangeColor,
        elevation: 0,
        automaticallyImplyLeading: false,
        title: Row(children: [appLogoWidget()]),
      ),
      body: GetBuilder(
        assignId: true,
        init: LoginController(),
        builder: (LoginController controller) {
          return Center(
            child: _buildLoginContainer(controller, tabBarTheme),
          );
        },
      ),
    );
  }

  Widget _buildLoginContainer(LoginController controller, TabBarThemeData tabBarTheme) {
    return Container(
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
          // Background decorations
          Positioned(
            left: -120,
            top: -120,
            child: Container(
              width: 250,
              height: 250,
              decoration: BoxDecoration(
                color: AppColors.secondaryOrange,
                shape: BoxShape.circle,
              ),
            ),
          ),
          Positioned(
            right: 10,
            bottom: 0,
            child: SvgPicture.asset(AppImages.flawor),
          ),
          // Main content
          SingleChildScrollView(
            child: Padding(
              padding: EdgeInsets.symmetric(
                horizontal: !controller.isMobile(Get.context!) ? 200.0 : 24.0,
                vertical: 30.0,
              ),
              child: _buildLoginForm(controller, tabBarTheme),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLoginForm(LoginController controller, TabBarThemeData tabBarTheme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        _buildHeader(controller),
        const SizedBox(height: 32),
        _buildEmailField(controller),
        const SizedBox(height: 16),
        _buildPasswordField(controller),
        const SizedBox(height: 15),
        _buildForgotPassword(tabBarTheme),
        const SizedBox(height: 30),
        _buildTermsCheckbox(controller),
        const SizedBox(height: 30),
        _buildSignInButton(controller),
        const SizedBox(height: 20),
        _buildSocialLoginButtons(controller),
      ],
    );
  }

  Widget _buildHeader(LoginController controller) {
    return Column(
      children: [
        AppText(
          AppStrings.signIn,
          fontSize: 48,
          fontWeight: FontWeight.w500,
          color: AppColors.colorHintTextField,
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 12),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            AppText(
              AppStrings.youDoNotHaveAnAccount,
              fontSize: 20,
              fontWeight: FontWeight.w500,
              color: AppColors.black,
              textAlign: TextAlign.center,
            ),
            TextButton(
              onPressed: () => controller.goToSignUp(),
              child: AppText(
                AppStrings.signUp,
                fontSize: 20,
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
      style: _getInputTextStyle(),
      onChanged: controller.validateEmail,
      decoration: _getInputDecoration(
        hintText: AppStrings.emailHint,
        errorText: controller.emailError.value,
        isError: controller.emailError.value.isNotEmpty,
      ),
    ));
  }

  Widget _buildPasswordField(LoginController controller) {
    return Obx(() => TextField(
      controller: controller.passwordController,
      cursorColor: AppColors.black,
      keyboardType: TextInputType.visiblePassword,
      obscureText: !controller.isPasswordVisible.value,
      style: _getInputTextStyle(),
      onChanged: controller.validatePassword,
      decoration: _getInputDecoration(
        hintText: AppStrings.passwordHint,
        errorText: controller.passwordError.value,
        isError: controller.passwordError.value.isNotEmpty,
        suffixIcon: IconButton(
          icon: SvgPicture.asset(AppImages.solarEye, height: 24, width: 24),
          onPressed: controller.togglePasswordVisibility,
        ),
      ),
    ));
  }

  TextStyle _getInputTextStyle() {
    return TextStyle(
      color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25),
      fontSize: 16,
      fontWeight: FontWeight.w500,
    );
  }

  InputDecoration _getInputDecoration({
    required String hintText,
    String? errorText,
    bool isError = false,
    Widget? suffixIcon,
  }) {
    final borderColor = isError
        ? Colors.red
        : AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25);

    return InputDecoration(
      hintText: hintText,
      contentPadding: EdgeInsets.symmetric(horizontal: 20,vertical: 24),
      hintStyle: _getInputTextStyle(),
      errorText: errorText?.isEmpty ?? true ? null : errorText,
      errorStyle: const TextStyle(color: Colors.red, fontSize: 12),
      suffixIcon: suffixIcon,
      disabledBorder: _getBorder(borderColor),
      focusedBorder: _getBorder(borderColor),
      enabledBorder: _getBorder(borderColor),
      errorBorder: _getBorder(Colors.red),
      focusedErrorBorder: _getBorder(Colors.red, width: 1),
    );
  }

  OutlineInputBorder _getBorder(Color color, {double width = 1.0}) {
    return OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
      borderSide: BorderSide(color: color, width: width),
    );
  }

  Widget _buildForgotPassword(TabBarThemeData tabBarTheme) {
    return InkWell(
      onTap: () {},
      overlayColor: tabBarTheme.overlayColor,
      splashFactory: tabBarTheme.splashFactory,
      child: AppText(
        AppStrings.forgotPassword,
        fontSize: 16,
        color: AppColors.darkOrangeColor,
        fontWeight: FontWeight.w600,
        textDecoration: TextDecoration.underline,
      ),
    );
  }

  Widget _buildTermsCheckbox(LoginController controller) {
    return Row(
      children: [
        Obx(() => Checkbox(
          value: controller.agreedToTerms.value,
          onChanged: (value) => controller.agreedToTerms.value = value!,
        )),
        Expanded(
          child: RichText(
            text: TextSpan(
              style: const TextStyle(color: Colors.grey),
              children: [
                TextSpan(
                  text: AppStrings.iAgreeTo,
                  style: _getTermsTextStyle(),
                ),
                TextSpan(
                  text: AppStrings.termsAndConditions,
                  style: _getTermsTextStyle(underline: true),
                  recognizer: controller.termsGestureRecognizer,
                ),
                TextSpan(
                  text: AppStrings.andAcknowledge,
                  style: _getTermsTextStyle(),
                ),
                TextSpan(
                  text: AppStrings.privacyPolicy,
                  style: _getTermsTextStyle(underline: true),
                  recognizer: controller.privacyGestureRecognizer,
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  TextStyle _getTermsTextStyle({bool underline = false}) {
    return TextStyle(
      color: AppColors.takeQuickAssessmentColor,
      fontWeight: FontWeight.w500,
      fontSize: 16,
      decoration: underline ? TextDecoration.underline : TextDecoration.none,
    );
  }

  Widget _buildSignInButton(LoginController controller) {
    return ElevatedButton(
      onPressed: controller.createAccount,
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.colorCheckBox,
        padding: const EdgeInsets.symmetric(vertical: 16),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(25),
        ),
      ),
      child: AppText(
        AppStrings.signIn,
        fontSize: 20,
        color: AppColors.white,
        fontWeight: FontWeight.w500,
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
        backgroundColor: backgroundColor,
        padding: const EdgeInsets.symmetric(vertical: 16),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(30),
          side: const BorderSide(color: Colors.transparent),
        ),
      ),
      child: SvgPicture.asset(icon, height: 32, width: 32),
    );
  }
}