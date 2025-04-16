import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:get/get.dart';
import 'package:webapplittlehugsmvp/app/constants/app_images.dart';
import 'package:webapplittlehugsmvp/app/constants/app_strings.dart';
import 'package:webapplittlehugsmvp/app/constants/constant.dart';
import 'package:webapplittlehugsmvp/app/modules/login/controllers/login_controller.dart';
import 'package:webapplittlehugsmvp/app/utils/responsive_utils.dart';
import 'package:webapplittlehugsmvp/app/widgets/app_text.dart';
import '../../../constants/app_colors.dart';

class LoginView extends GetView<LoginController> {
  const LoginView({super.key});

  @override
  Widget build(BuildContext context) {
    final TabBarThemeData tabBarTheme = TabBarTheme.of(context);
    final ResponsiveSize responsive = ResponsiveSize(context);

    return Scaffold(
      backgroundColor: AppColors.lightOrangeColor,
      appBar: AppBar(backgroundColor: AppColors.lightOrangeColor, elevation: 0, automaticallyImplyLeading: false, title: Row(children: [appLogoWidget()])),
      body: GetBuilder(
        assignId: true,
        init: LoginController(),
        builder: (LoginController controller) {
          return Center(child: _buildLoginContainer(controller, tabBarTheme, responsive));
        },
      ),
    );
  }

  Widget _buildLoginContainer(LoginController controller, TabBarThemeData tabBarTheme, ResponsiveSize responsive) {
    final bool isMobile = responsive.screenWidth < 600;
    final bool isTablet = responsive.screenWidth >= 600 && responsive.screenWidth < 1200;

    // Adjust form width based on screen size
    double formMaxWidth =
        isMobile
            ? responsive.screenWidth * 0.9
            : isTablet
            ? responsive.width(750)
            : responsive.width(920);
    return Container(
      constraints: BoxConstraints(maxWidth: formMaxWidth,minHeight:  responsive.height(715)),
      decoration: BoxDecoration(
        color: AppColors.white,
        borderRadius: BorderRadius.circular(responsive.radius(10)),
        border: Border.all(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25), width: 1),
      ),
      child: Stack(
        children: [
          // Background decorations
          Positioned(
            left: responsive.width(-120),
            top: responsive.height(-120),
            child: Container(width: responsive.width(250), height: responsive.height(250), decoration: BoxDecoration(color: AppColors.secondaryOrange, shape: BoxShape.circle)),
          ),
          Positioned(right: responsive.width(10), bottom: 0, child: SvgPicture.asset(AppImages.flawor)),
          // Main content
          SingleChildScrollView(
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: !isMobile ? responsive.width(175.0) : responsive.width(24.0)),
              child: _buildLoginForm(controller, tabBarTheme, responsive),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLoginForm(LoginController controller, TabBarThemeData tabBarTheme, ResponsiveSize responsive) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        SizedBox(height: responsive.height(60)),
        _buildHeader(controller, responsive),
        SizedBox(height: responsive.height(32)),
        _buildEmailField(controller,responsive),
        SizedBox(height: responsive.height(20)),
        _buildPasswordField(controller,responsive),
        SizedBox(height: responsive.height(20)),
        _buildForgotPassword(tabBarTheme,responsive),
        SizedBox(height: responsive.height(40)),
        _buildTermsCheckbox(controller,responsive),
        SizedBox(height: responsive.height(30)),
        _buildSignInButton(controller,responsive),
        SizedBox(height: responsive.height(40)),
        _buildSocialLoginButtons(controller,responsive),
      ],
    );
  }

  Widget _buildHeader(LoginController controller, ResponsiveSize responsive) {
    return Column(
      children: [
        AppText(AppStrings.signIn, fontSize: responsive.fontSize(48), fontWeight: FontWeight.w500, color: AppColors.colorHintTextField, textAlign: TextAlign.center),
        SizedBox(height: responsive.height(12)),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            AppText(AppStrings.youDoNotHaveAnAccount, fontSize: responsive.fontSize(20), fontWeight: FontWeight.w500, color: AppColors.black, textAlign: TextAlign.center),
            TextButton(
              onPressed: () => controller.goToSignUp(),
              child: AppText(
                AppStrings.signUp,
                fontSize: responsive.fontSize(20),
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

  Widget _buildEmailField(LoginController controller, ResponsiveSize responsive) {
    return Obx(
      () => TextField(
        controller: controller.emailController,
        cursorColor: AppColors.black,
        keyboardType: TextInputType.emailAddress,
        style: _getInputTextStyle(),
        onChanged: controller.validateEmail,
        decoration: _getInputDecoration(hintText: AppStrings.emailHint, errorText: controller.emailError.value, isError: controller.emailError.value.isNotEmpty,responsive: responsive),
      ),
    );
  }

  Widget _buildPasswordField(LoginController controller, ResponsiveSize responsive) {
    return Obx(
      () => TextField(
        controller: controller.passwordController,
        cursorColor: AppColors.black,
        keyboardType: TextInputType.visiblePassword,
        obscureText: !controller.isPasswordVisible.value,
        style: _getInputTextStyle(),
        onChanged: controller.validatePassword,
        decoration: _getInputDecoration(
          responsive: responsive,
          hintText: AppStrings.passwordHint,
          errorText: controller.passwordError.value,
          isError: controller.passwordError.value.isNotEmpty,
          suffixIcon: IconButton(icon: SvgPicture.asset(AppImages.solarEye, height: 24, width: 24), onPressed: controller.togglePasswordVisibility),
        ),
      ),
    );
  }

  TextStyle _getInputTextStyle() {
    return TextStyle(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25), fontSize: 16, fontWeight: FontWeight.w500);
  }

  InputDecoration _getInputDecoration({required String hintText, String? errorText, bool isError = false, Widget? suffixIcon, required ResponsiveSize responsive}) {
    final borderColor = isError ? Colors.red : AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25);

    return InputDecoration(
      hintText: hintText,
      contentPadding: EdgeInsets.symmetric(horizontal: responsive.width(16), vertical: responsive.height(12)),
      hintStyle: _getInputTextStyle(),
      errorText: errorText?.isEmpty ?? true ? null : errorText,
      errorStyle:  TextStyle(color: Colors.red, fontSize: responsive.fontSize(12)),
      suffixIcon: suffixIcon,
      disabledBorder: _getBorder(borderColor,responsive),
      focusedBorder: _getBorder(borderColor,responsive),
      enabledBorder: _getBorder(borderColor,responsive),
      errorBorder: _getBorder(Colors.red,responsive),
      focusedErrorBorder: _getBorder(Colors.red,responsive, width: 1),
    );
  }

  OutlineInputBorder _getBorder(Color color,  ResponsiveSize responsive,{double width = 1.0}) {
    return OutlineInputBorder(borderRadius: BorderRadius.circular(responsive.radius(10)), borderSide: BorderSide(color: color, width: width));
  }

  Widget _buildForgotPassword(TabBarThemeData tabBarTheme, ResponsiveSize responsive) {
    return InkWell(
      onTap: () {},
      overlayColor: tabBarTheme.overlayColor,
      splashFactory: tabBarTheme.splashFactory,
      child: AppText(AppStrings.forgotPassword, fontSize: responsive.fontSize(16), color: AppColors.darkOrangeColor, fontWeight: FontWeight.w600, textDecoration: TextDecoration.underline),
    );
  }

  Widget _buildTermsCheckbox(LoginController controller, ResponsiveSize responsive) {
    return Row(
      children: [
        Obx(() => Checkbox(value: controller.agreedToTerms.value, onChanged: (value) => controller.agreedToTerms.value = value!)),
        Expanded(
          child: RichText(
            text: TextSpan(
              style: const TextStyle(color: Colors.grey),
              children: [
                TextSpan(text: AppStrings.iAgreeTo, style: _getTermsTextStyle(responsive: responsive)),
                TextSpan(text: AppStrings.termsAndConditions, style: _getTermsTextStyle(underline: true,responsive: responsive), recognizer: controller.termsGestureRecognizer),
                TextSpan(text: AppStrings.andAcknowledge, style: _getTermsTextStyle(responsive: responsive)),
                TextSpan(text: AppStrings.privacyPolicy, style: _getTermsTextStyle(underline: true,responsive: responsive), recognizer: controller.privacyGestureRecognizer),
              ],
            ),
          ),
        ),
      ],
    );
  }

  TextStyle _getTermsTextStyle({bool underline = false, required ResponsiveSize responsive}) {
    return TextStyle(color: AppColors.takeQuickAssessmentColor, fontWeight: FontWeight.w500, fontSize: responsive.fontSize(16), decoration: underline ? TextDecoration.underline : TextDecoration.none);
  }
  Widget _buildSignInButton(LoginController controller, ResponsiveSize responsive) {
    final bool isMobile = responsive.screenWidth < 600;

    return ElevatedButton(
      onPressed: controller.createAccount,
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.colorCheckBox,
        padding: EdgeInsets.symmetric(vertical: responsive.height(16)),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(responsive.radius(25))),
      ),
      child: AppText(AppStrings.createAccount, fontSize: responsive.fontSize(isMobile ? 16 : 20), color: AppColors.white, fontWeight: FontWeight.w500),
    );
  }

  Widget _buildSocialLoginButtons(LoginController controller, ResponsiveSize responsive) {
    final bool isMobile = responsive.screenWidth < 600;
    final double iconSize = responsive.width(isMobile ? 24 : 32);

    return Row(
      children: [
        Expanded(
          child: OutlinedButton(
            onPressed: controller.signInWithGoogle,
            style: OutlinedButton.styleFrom(
              side: BorderSide.none,
              backgroundColor: AppColors.lightOrangeColor,
              padding: EdgeInsets.symmetric(vertical: responsive.height(16)),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(responsive.radius(30))),
            ),
            child: SvgPicture.asset(AppImages.googleIc, height: iconSize, width: iconSize),
          ),
        ),
        SizedBox(width: responsive.width(16)),
        Expanded(
          child: OutlinedButton(
            onPressed: controller.signInWithApple,
            style: OutlinedButton.styleFrom(
              backgroundColor: AppColors.black,
              side: BorderSide.none,
              padding: EdgeInsets.symmetric(vertical: responsive.height(16)),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(responsive.radius(30))),
            ),
            child: SvgPicture.asset(AppImages.appleIc, height: iconSize, width: iconSize),
          ),
        ),
      ],
    );
  }

}
