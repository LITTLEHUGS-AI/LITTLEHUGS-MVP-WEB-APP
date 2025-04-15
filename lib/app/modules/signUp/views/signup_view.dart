import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:get/get.dart';
import 'package:webapplittlehugsmvp/app/constants/app_images.dart';
import 'package:webapplittlehugsmvp/app/constants/app_strings.dart';
import 'package:webapplittlehugsmvp/app/constants/constant.dart';
import 'package:webapplittlehugsmvp/app/widgets/app_text.dart';
import 'package:webapplittlehugsmvp/app/widgets/custom_dropdown.dart';
import '../../../constants/app_colors.dart';
import '../controllers/auth_controller.dart';

class SignUpView extends GetView<AuthController> {
  const SignUpView({super.key});

  @override
  Widget build(BuildContext context) {
    AuthController controller = Get.put(AuthController());
    final bool isMobile = controller.isMobile(context);
    final bool isTablet = controller.isTablet(context);
    final TabBarThemeData tabBarTheme = TabBarTheme.of(context);
    return Scaffold(
      backgroundColor: AppColors.lightOrangeColor,
      appBar: _buildAppBar(),
      body: GetBuilder(assignId: true, init: AuthController(), builder: (controller) => _buildBody(controller)),
    );
  }

  AppBar _buildAppBar() {
    return AppBar(backgroundColor: AppColors.lightOrangeColor, elevation: 0, automaticallyImplyLeading: false, title: Row(children: [appLogoWidget()]));
  }

  Widget _buildBody(AuthController controller) {
    return Stack(
      children: [

        // SVG Background
        if (!controller.isMobile(Get.context!)) Positioned.fill(
          child: SvgPicture.asset(
            AppImages.signUpBGImage,
            width: Get.width,
            height: Get.height,
            fit: BoxFit.fill,
          ),
        ),
        _buildBackgroundCircle(),
        Row(
          children: [
            // Left side with image and text (hidden on small screens)
            if (!controller.isMobile(Get.context!)) _buildLeftPanel(),
            // Right side with sign up form
            _buildSignUpForm(controller),
          ],
        ),
      ],
    );
  }

  Widget _buildBackgroundCircle() {
    return Positioned(left: -170, top: -170, child: Container(width: 350, height: 350, decoration: BoxDecoration(color: AppColors.secondaryOrange, shape: BoxShape.circle)));
  }

  Widget _buildLeftPanel() {
    return Expanded(
      child: Padding(
        padding: const EdgeInsets.only(bottom: 50),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [const Spacer(), AppText(AppStrings.aHugAheadOfTime, fontSize: 48, fontWeight: FontWeight.w500, color: AppColors.colorHintTextField), const Spacer()],
        ),
      ),
    );
  }

  Widget _buildSignUpForm(AuthController controller) {
    return Expanded(
      child: Padding(
        padding: EdgeInsets.only(right: !controller.isMobile(Get.context!) ? 50.0 : 0.0, bottom: 20),
        child: Center(
          child: Container(
            constraints: const BoxConstraints(maxWidth: 600),
            decoration: BoxDecoration(
              color: AppColors.white,
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: AppColors.takeQuickAssessmentColor.withOpacity(0.25), width: 1),
            ),
            padding: EdgeInsets.symmetric(horizontal: !controller.isMobile(Get.context!) ? 40.0 : 24.0, vertical: 20.0),
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  _buildFormHeader(controller),
                  const SizedBox(height: 32),
                  _buildNameField(controller),
                  const SizedBox(height: 16),
                  _buildEmailField(controller),
                  const SizedBox(height: 16),
                  _buildPasswordField(controller),
                  const SizedBox(height: 16),
                  _buildDropdownSelections(),
                  const SizedBox(height: 30),
                  _buildTermsCheckbox(controller),
                  const SizedBox(height: 30),
                  _buildCreateAccountButton(controller),
                  const SizedBox(height: 20),
                  _buildSocialLoginButtons(controller),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildFormHeader(AuthController controller) {
    return Column(
      children: [
        AppText(AppStrings.signUp, fontSize: 45, fontWeight: FontWeight.w500, color: AppColors.colorHintTextField, textAlign: TextAlign.center),
        const SizedBox(height: 5),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            AppText(AppStrings.alreadyHaveAnAccount, fontSize: 18, fontWeight: FontWeight.w500, color: AppColors.black, textAlign: TextAlign.center),
            TextButton(
              onPressed: () => controller.goToSignIn(),
              child: AppText(
                AppStrings.signIn,
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

  Widget _buildNameField(AuthController controller) {
    return TextField(
      controller: controller.nameController,
      cursorColor: AppColors.black,
      style: TextStyle(color: AppColors.takeQuickAssessmentColor.withOpacity(0.25), fontSize: 16, fontWeight: FontWeight.w500),
      onChanged: controller.validateName,
      decoration: _buildInputDecoration(hintText: AppStrings.nameHint, errorText: controller.nameError.value, hasError: controller.nameError.value.isNotEmpty),
    );
  }

  Widget _buildEmailField(AuthController controller) {
    return Obx(
      () => TextField(
        controller: controller.emailController,
        cursorColor: AppColors.black,
        keyboardType: TextInputType.emailAddress,
        style: TextStyle(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25), fontSize: 16, fontWeight: FontWeight.w500),
        onChanged: controller.validateEmail,
        decoration: _buildInputDecoration(hintText: AppStrings.email, errorText: controller.emailError.value, hasError: controller.emailError.value.isNotEmpty),
      ),
    );
  }

  Widget _buildPasswordField(AuthController controller) {
    return Obx(
      () => TextField(
        controller: controller.passwordController,
        cursorColor: AppColors.black,
        keyboardType: TextInputType.visiblePassword,
        obscureText: !controller.isPasswordVisible.value,
        style: TextStyle(color: AppColors.takeQuickAssessmentColor.withOpacity(0.25), fontSize: 16, fontWeight: FontWeight.w500),
        onChanged: controller.validatePassword,
        decoration: _buildInputDecoration(
          hintText: AppStrings.passwordHint,
          errorText: controller.passwordError.value,
          hasError: controller.passwordError.value.isNotEmpty,
          suffixIcon: IconButton(icon: SvgPicture.asset(AppImages.solarEye, height: 24, width: 24), onPressed: controller.togglePasswordVisibility),
        ),
      ),
    );
  }

  InputDecoration _buildInputDecoration({required String hintText, String? errorText, bool hasError = false, Widget? suffixIcon}) {
    return InputDecoration(
      suffixIcon: suffixIcon,
      hintText: hintText,
      hintStyle: TextStyle(color: AppColors.takeQuickAssessmentColor.withOpacity(0.25), fontSize: 16, fontWeight: FontWeight.w500),
      errorText: errorText?.isEmpty ?? true ? null : errorText,
      errorStyle: const TextStyle(color: Colors.red, fontSize: 12),
      disabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide(color: AppColors.takeQuickAssessmentColor.withOpacity(0.25))),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: BorderSide(color: hasError ? Colors.red : AppColors.takeQuickAssessmentColor.withOpacity(0.25)),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: BorderSide(color: hasError ? Colors.red : AppColors.takeQuickAssessmentColor.withOpacity(0.25)),
      ),
      errorBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: const BorderSide(color: Colors.red)),
      focusedErrorBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: const BorderSide(color: Colors.red, width: 1)),
    );
  }

  Widget _buildDropdownSelections() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [Expanded(child: CountrySelectionDropdown()), const SizedBox(width: 16), Expanded(child: CustomRoleSelectionDropdown())],
    );
  }

  Widget _buildTermsCheckbox(AuthController controller) {
    return Row(
      children: [
        Obx(() => Checkbox(value: controller.agreedToTerms.value, onChanged: (value) => controller.agreedToTerms.value = value!)),
        Expanded(
          child: RichText(
            text: TextSpan(
              style: const TextStyle(color: Colors.grey),
              children: [
                TextSpan(text: AppStrings.iAgreeTo, style: TextStyle(color: AppColors.takeQuickAssessmentColor, fontWeight: FontWeight.w500, fontSize: 16)),
                TextSpan(
                  text: AppStrings.termsAndConditions,
                  style: TextStyle(color: AppColors.takeQuickAssessmentColor, fontWeight: FontWeight.w500, fontSize: 16, decoration: TextDecoration.underline),
                  recognizer: controller.termsGestureRecognizer,
                ),
                TextSpan(text: AppStrings.andAcknowledge, style: TextStyle(color: AppColors.takeQuickAssessmentColor, fontWeight: FontWeight.w500, fontSize: 16)),
                TextSpan(
                  text: AppStrings.privacyPolicy,
                  style: TextStyle(color: AppColors.takeQuickAssessmentColor, fontWeight: FontWeight.w500, fontSize: 16, decoration: TextDecoration.underline),
                  recognizer: controller.privacyGestureRecognizer,
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildCreateAccountButton(AuthController controller) {
    return ElevatedButton(
      onPressed: controller.createAccount,
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.colorCheckBox,
        padding: const EdgeInsets.symmetric(vertical: 16),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(25)),
      ),
      child: AppText(AppStrings.createAccount, fontSize: 20, color: AppColors.white, fontWeight: FontWeight.w500),
    );
  }

  Widget _buildSocialLoginButtons(AuthController controller) {
    return Row(
      children: [
        Expanded(
          child: OutlinedButton(
            onPressed: controller.signInWithGoogle,
            style: OutlinedButton.styleFrom(
              side: BorderSide.none,
              backgroundColor: AppColors.lightOrangeColor,
              padding: const EdgeInsets.symmetric(vertical: 16),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
            ),
            child: SvgPicture.asset(AppImages.googleIc, height: 32, width: 32),
          ),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: OutlinedButton(
            onPressed: controller.signInWithApple,
            style: OutlinedButton.styleFrom(
              backgroundColor: AppColors.black,
              side: BorderSide.none,
              padding: const EdgeInsets.symmetric(vertical: 16),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
            ),
            child: SvgPicture.asset(AppImages.appleIc, height: 32, width: 32),
          ),
        ),
      ],
    );
  }
}
