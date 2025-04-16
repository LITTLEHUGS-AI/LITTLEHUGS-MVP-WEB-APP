// import 'package:flutter/material.dart';
// import 'package:flutter_svg/svg.dart';
// import 'package:get/get.dart';
// import 'package:webapplittlehugsmvp/app/constants/app_images.dart';
// import 'package:webapplittlehugsmvp/app/constants/app_strings.dart';
// import 'package:webapplittlehugsmvp/app/constants/constant.dart';
// import 'package:webapplittlehugsmvp/app/widgets/app_text.dart';
// import 'package:webapplittlehugsmvp/app/widgets/custom_dropdown.dart';
// import '../../../constants/app_colors.dart';
// import '../controllers/auth_controller.dart';
//
// class SignUpView extends GetView<AuthController> {
//   const SignUpView({super.key});
//
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       backgroundColor: AppColors.lightOrangeColor,
//       appBar: _buildAppBar(),
//       body: GetBuilder(assignId: true, init: AuthController(), builder: (controller) => _buildBody(controller)),
//     );
//   }
//
//   AppBar _buildAppBar() {
//     return AppBar(backgroundColor: AppColors.lightOrangeColor, elevation: 0, automaticallyImplyLeading: false, title: Row(children: [appLogoWidget()]));
//   }
//
//   Widget _buildBody(AuthController controller) {
//     return Stack(
//       children: [
//
//         // SVG Background
//         if (!controller.isMobile(Get.context!)) Positioned.fill(
//           child: SvgPicture.asset(
//             AppImages.signUpBGImage,
//             width: Get.width,
//             height: Get.height,
//             fit: BoxFit.fill,
//           ),
//         ),
//         _buildBackgroundCircle(),
//         Row(
//           children: [
//             // Left side with image and text (hidden on small screens)
//             if (!controller.isMobile(Get.context!)) _buildLeftPanel(),
//             // Right side with sign up form
//             _buildSignUpForm(controller),
//           ],
//         ),
//       ],
//     );
//   }
//
//   Widget _buildBackgroundCircle() {
//     return Positioned(left: -170, top: -170, child: Container(width: 350, height: 350, decoration: BoxDecoration(color: AppColors.secondaryOrange, shape: BoxShape.circle)));
//   }
//
//   Widget _buildLeftPanel() {
//     return Expanded(
//       child: Padding(
//         padding: const EdgeInsets.only(bottom: 50),
//         child: Column(
//           crossAxisAlignment: CrossAxisAlignment.center,
//           children: [const Spacer(), AppText(AppStrings.aHugAheadOfTime, fontSize: 48, fontWeight: FontWeight.w500, color: AppColors.colorHintTextField), const Spacer()],
//         ),
//       ),
//     );
//   }
//
//   Widget _buildSignUpForm(AuthController controller) {
//     return Expanded(
//       child: Padding(
//         padding: EdgeInsets.only(right: !controller.isMobile(Get.context!) ? 50.0 : 0.0, bottom: 20),
//         child: Center(
//           child: Container(
//             constraints: const BoxConstraints(maxWidth: 600),
//             decoration: BoxDecoration(
//               color: AppColors.white,
//               borderRadius: BorderRadius.circular(10),
//               border: Border.all(color: AppColors.takeQuickAssessmentColor.withOpacity(0.25), width: 1),
//             ),
//             padding: EdgeInsets.symmetric(horizontal: !controller.isMobile(Get.context!) ? 40.0 : 24.0, vertical: 20.0),
//             child: SingleChildScrollView(
//               child: Column(
//                 crossAxisAlignment: CrossAxisAlignment.stretch,
//                 children: [
//                   _buildFormHeader(controller),
//                   const SizedBox(height: 32),
//                   _buildNameField(controller),
//                   const SizedBox(height: 16),
//                   _buildEmailField(controller),
//                   const SizedBox(height: 16),
//                   _buildPasswordField(controller),
//                   const SizedBox(height: 16),
//                   _buildDropdownSelections(),
//                   const SizedBox(height: 30),
//                   _buildTermsCheckbox(controller),
//                   const SizedBox(height: 30),
//                   _buildCreateAccountButton(controller),
//                   const SizedBox(height: 20),
//                   _buildSocialLoginButtons(controller),
//                 ],
//               ),
//             ),
//           ),
//         ),
//       ),
//     );
//   }
//
//   Widget _buildFormHeader(AuthController controller) {
//     return Column(
//       children: [
//         AppText(AppStrings.signUp, fontSize: 45, fontWeight: FontWeight.w500, color: AppColors.colorHintTextField, textAlign: TextAlign.center),
//         const SizedBox(height: 5),
//         Row(
//           mainAxisAlignment: MainAxisAlignment.center,
//           children: [
//             AppText(AppStrings.alreadyHaveAnAccount, fontSize: 18, fontWeight: FontWeight.w500, color: AppColors.black, textAlign: TextAlign.center),
//             TextButton(
//               onPressed: () => controller.goToSignIn(),
//               child: AppText(
//                 AppStrings.signIn,
//                 fontSize: 18,
//                 fontWeight: FontWeight.w500,
//                 color: AppColors.colorCheckBox,
//                 textAlign: TextAlign.center,
//                 textDecoration: TextDecoration.underline,
//               ),
//             ),
//           ],
//         ),
//       ],
//     );
//   }
//
//   Widget _buildNameField(AuthController controller) {
//     return TextField(
//       controller: controller.nameController,
//       cursorColor: AppColors.black,
//       style: TextStyle(color: AppColors.takeQuickAssessmentColor.withOpacity(0.25), fontSize: 16, fontWeight: FontWeight.w500),
//       onChanged: controller.validateName,
//       decoration: _buildInputDecoration(hintText: AppStrings.nameHint, errorText: controller.nameError.value, hasError: controller.nameError.value.isNotEmpty),
//     );
//   }
//
//   Widget _buildEmailField(AuthController controller) {
//     return Obx(
//       () => TextField(
//         controller: controller.emailController,
//         cursorColor: AppColors.black,
//         keyboardType: TextInputType.emailAddress,
//         style: TextStyle(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25), fontSize: 16, fontWeight: FontWeight.w500),
//         onChanged: controller.validateEmail,
//         decoration: _buildInputDecoration(hintText: AppStrings.email, errorText: controller.emailError.value, hasError: controller.emailError.value.isNotEmpty),
//       ),
//     );
//   }
//
//   Widget _buildPasswordField(AuthController controller) {
//     return Obx(
//       () => TextField(
//         controller: controller.passwordController,
//         cursorColor: AppColors.black,
//         keyboardType: TextInputType.visiblePassword,
//         obscureText: !controller.isPasswordVisible.value,
//         style: TextStyle(color: AppColors.takeQuickAssessmentColor.withOpacity(0.25), fontSize: 16, fontWeight: FontWeight.w500),
//         onChanged: controller.validatePassword,
//         decoration: _buildInputDecoration(
//           hintText: AppStrings.passwordHint,
//           errorText: controller.passwordError.value,
//           hasError: controller.passwordError.value.isNotEmpty,
//           suffixIcon: IconButton(icon: SvgPicture.asset(AppImages.solarEye, height: 24, width: 24), onPressed: controller.togglePasswordVisibility),
//         ),
//       ),
//     );
//   }
//
//   InputDecoration _buildInputDecoration({required String hintText, String? errorText, bool hasError = false, Widget? suffixIcon}) {
//     return InputDecoration(
//       suffixIcon: suffixIcon,
//       hintText: hintText,
//       hintStyle: TextStyle(color: AppColors.takeQuickAssessmentColor.withOpacity(0.25), fontSize: 16, fontWeight: FontWeight.w500),
//       errorText: errorText?.isEmpty ?? true ? null : errorText,
//       errorStyle: const TextStyle(color: Colors.red, fontSize: 12),
//       disabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide(color: AppColors.takeQuickAssessmentColor.withOpacity(0.25))),
//       focusedBorder: OutlineInputBorder(
//         borderRadius: BorderRadius.circular(10),
//         borderSide: BorderSide(color: hasError ? Colors.red : AppColors.takeQuickAssessmentColor.withOpacity(0.25)),
//       ),
//       enabledBorder: OutlineInputBorder(
//         borderRadius: BorderRadius.circular(10),
//         borderSide: BorderSide(color: hasError ? Colors.red : AppColors.takeQuickAssessmentColor.withOpacity(0.25)),
//       ),
//       errorBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: const BorderSide(color: Colors.red)),
//       focusedErrorBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: const BorderSide(color: Colors.red, width: 1)),
//     );
//   }
//
//   Widget _buildDropdownSelections() {
//     return Row(
//       mainAxisAlignment: MainAxisAlignment.start,
//       crossAxisAlignment: CrossAxisAlignment.start,
//       children: [Expanded(child: CountrySelectionDropdown()), const SizedBox(width: 16), Expanded(child: CustomRoleSelectionDropdown())],
//     );
//   }
//
//   Widget _buildTermsCheckbox(AuthController controller) {
//     return Row(
//       children: [
//         Obx(() => Checkbox(value: controller.agreedToTerms.value, onChanged: (value) => controller.agreedToTerms.value = value!)),
//         Expanded(
//           child: RichText(
//             text: TextSpan(
//               style: const TextStyle(color: Colors.grey),
//               children: [
//                 TextSpan(text: AppStrings.iAgreeTo, style: TextStyle(color: AppColors.takeQuickAssessmentColor, fontWeight: FontWeight.w500, fontSize: 16)),
//                 TextSpan(
//                   text: AppStrings.termsAndConditions,
//                   style: TextStyle(color: AppColors.takeQuickAssessmentColor, fontWeight: FontWeight.w500, fontSize: 16, decoration: TextDecoration.underline),
//                   recognizer: controller.termsGestureRecognizer,
//                 ),
//                 TextSpan(text: AppStrings.andAcknowledge, style: TextStyle(color: AppColors.takeQuickAssessmentColor, fontWeight: FontWeight.w500, fontSize: 16)),
//                 TextSpan(
//                   text: AppStrings.privacyPolicy,
//                   style: TextStyle(color: AppColors.takeQuickAssessmentColor, fontWeight: FontWeight.w500, fontSize: 16, decoration: TextDecoration.underline),
//                   recognizer: controller.privacyGestureRecognizer,
//                 ),
//               ],
//             ),
//           ),
//         ),
//       ],
//     );
//   }
//
//   Widget _buildCreateAccountButton(AuthController controller) {
//     return ElevatedButton(
//       onPressed: controller.createAccount,
//       style: ElevatedButton.styleFrom(
//         backgroundColor: AppColors.colorCheckBox,
//         padding: const EdgeInsets.symmetric(vertical: 16),
//         shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(25)),
//       ),
//       child: AppText(AppStrings.createAccount, fontSize: 20, color: AppColors.white, fontWeight: FontWeight.w500),
//     );
//   }
//
//   Widget _buildSocialLoginButtons(AuthController controller) {
//     return Row(
//       children: [
//         Expanded(
//           child: OutlinedButton(
//             onPressed: controller.signInWithGoogle,
//             style: OutlinedButton.styleFrom(
//               side: BorderSide.none,
//               backgroundColor: AppColors.lightOrangeColor,
//               padding: const EdgeInsets.symmetric(vertical: 16),
//               shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
//             ),
//             child: SvgPicture.asset(AppImages.googleIc, height: 32, width: 32),
//           ),
//         ),
//         const SizedBox(width: 16),
//         Expanded(
//           child: OutlinedButton(
//             onPressed: controller.signInWithApple,
//             style: OutlinedButton.styleFrom(
//               backgroundColor: AppColors.black,
//               side: BorderSide.none,
//               padding: const EdgeInsets.symmetric(vertical: 16),
//               shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
//             ),
//             child: SvgPicture.asset(AppImages.appleIc, height: 32, width: 32),
//           ),
//         ),
//       ],
//     );
//   }
// }
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:get/get.dart';
import 'package:webapplittlehugsmvp/app/constants/app_images.dart';
import 'package:webapplittlehugsmvp/app/constants/app_strings.dart';
import 'package:webapplittlehugsmvp/app/constants/constant.dart';
import 'package:webapplittlehugsmvp/app/utils/responsive_utils.dart';
import 'package:webapplittlehugsmvp/app/widgets/app_text.dart';
import 'package:webapplittlehugsmvp/app/widgets/custom_dropdown.dart';
import '../../../constants/app_colors.dart';
import '../controllers/auth_controller.dart';

class SignUpView extends GetView<AuthController> {
  const SignUpView({super.key});

  @override
  Widget build(BuildContext context) {
    // Responsive size calculation
    final ResponsiveSize responsive = ResponsiveSize(context);
    return Scaffold(
      backgroundColor: AppColors.lightOrangeColor,
      appBar: _buildAppBar(responsive),
      body: GetBuilder(assignId: true, init: AuthController(), builder: (controller) => _buildBody(controller, responsive)),
    );
  }

  AppBar _buildAppBar(ResponsiveSize responsive) {
    return AppBar(
      backgroundColor: AppColors.lightOrangeColor,
      elevation: 0,
      automaticallyImplyLeading: false,
      toolbarHeight: responsive.height(56),
      title: Row(children: [appLogoWidget()]),
    );
  }

  Widget _buildBody(AuthController controller, ResponsiveSize responsive) {
    final bool isMobile = responsive.screenWidth < 600;
    final bool isTablet = responsive.screenWidth >= 600 && responsive.screenWidth < 1200;
    return Stack(
      children: [
        // SVG Background for tablet and desktop
        if (!isMobile) Positioned.fill(child: SvgPicture.asset(AppImages.signUpBGImage, width: responsive.screenWidth, height: responsive.screenHeight, fit: BoxFit.fill)),

        _buildBackgroundCircle(responsive),

        Row(
          children: [
            // Left side with image and text (hidden on mobile)
            if (!isMobile) _buildLeftPanel(responsive),

            // Right side with sign up form
            _buildSignUpForm(controller, responsive),
          ],
        ),
      ],
    );
  }

  Widget _buildBackgroundCircle(ResponsiveSize responsive) {
    final double circleSize = responsive.width(350);
    return Positioned(
      left: responsive.width(-170),
      top: responsive.height(-170),
      child: Container(width: circleSize, height: circleSize, decoration: BoxDecoration(color: AppColors.secondaryOrange, shape: BoxShape.circle)),
    );
  }

  Widget _buildLeftPanel(ResponsiveSize responsive) {
    return Expanded(
      child: Padding(
        padding: EdgeInsets.only(bottom: responsive.height(70)),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            const Spacer(),
            Padding(
              padding:  EdgeInsets.only(right: responsive.width(95)),
              child: AppText(AppStrings.aHugAheadOfTime, fontSize: responsive.fontSize(48), fontWeight: FontWeight.w500, color: AppColors.colorHintTextField,textAlign: TextAlign.center,),
            ),
            const Spacer(),
          ],
        ),
      ),
    );
  }

  Widget _buildSignUpForm(AuthController controller, ResponsiveSize responsive) {
    final bool isMobile = responsive.screenWidth < 600;
    final bool isTablet = responsive.screenWidth >= 600 && responsive.screenWidth < 1200;

    // Adjust form width based on screen size
    double formMaxWidth =
        isMobile
            ? responsive.screenWidth * 0.9
            : isTablet
            ? responsive.width(500)
            : responsive.width(600);

    return Expanded(
      child: Padding(
        padding: EdgeInsets.only(
          right: isMobile ? responsive.width(0) : responsive.width(40),
          bottom: responsive.height(20),
        ),
        child: Center(
          child: Container(
            constraints: BoxConstraints(maxWidth: formMaxWidth),
            decoration: BoxDecoration(
              color: AppColors.white,
              borderRadius: BorderRadius.circular(responsive.radius(10)),
              border: Border.all(color: AppColors.takeQuickAssessmentColor.withOpacity(0.25), width: 1),
            ),
            padding: EdgeInsets.symmetric(horizontal: isMobile ? responsive.width(24) : responsive.width(40)),
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  SizedBox(height: responsive.height(40)),
                  _buildFormHeader(controller, responsive),
                  SizedBox(height: responsive.height(32)),
                  _buildNameField(controller, responsive),
                  SizedBox(height: responsive.height(16)),
                  _buildEmailField(controller, responsive),
                  SizedBox(height: responsive.height(16)),
                  _buildPasswordField(controller, responsive),
                  SizedBox(height: responsive.height(16)),
                  _buildDropdownSelections(controller, responsive),
                  SizedBox(height: responsive.height(44)),
                  _buildTermsCheckbox(controller, responsive),
                  SizedBox(height: responsive.height(44)),
                  _buildCreateAccountButton(controller, responsive),
                  SizedBox(height: responsive.height(24)),
                  _buildSocialLoginButtons(controller, responsive),
                  SizedBox(height: responsive.height(22)),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildDropdownSelections(AuthController controller, ResponsiveSize responsive) {
    return responsive.screenWidth < 600
        ? Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [CountrySelectionDropdown(responsive: responsive), SizedBox(height: responsive.height(20)), CustomRoleSelectionDropdown(responsive: responsive)],
        )
        : Row(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(child: CountrySelectionDropdown(responsive: responsive)),
            const SizedBox(width: 16),
            Expanded(child: CustomRoleSelectionDropdown(responsive: responsive)),
          ],
        );
  }

  Widget _buildFormHeader(AuthController controller, ResponsiveSize responsive) {
    final bool isMobile = responsive.screenWidth < 600;

    return Column(
      children: [
        AppText(
          AppStrings.signUp,
          fontSize: responsive.fontSize(isMobile ? 32 : 45),
          fontWeight: FontWeight.w500,
          color: AppColors.colorHintTextField,
          textAlign: TextAlign.center,
        ),
        SizedBox(height: responsive.height(5)),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            AppText(
              AppStrings.alreadyHaveAnAccount,
              fontSize: responsive.fontSize(isMobile ? 14 : 18),
              fontWeight: FontWeight.w500,
              color: AppColors.black,
              textAlign: TextAlign.center,
            ),
            TextButton(
              onPressed: () => controller.goToSignIn(),
              child: AppText(
                AppStrings.signIn,
                fontSize: responsive.fontSize(isMobile ? 14 : 18),
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

  Widget _buildNameField(AuthController controller, ResponsiveSize responsive) {
    return TextField(
      controller: controller.nameController,
      cursorColor: AppColors.black,
      style: TextStyle(color: AppColors.takeQuickAssessmentColor.withOpacity(0.25), fontSize: responsive.fontSize(16), fontWeight: FontWeight.w500),
      onChanged: controller.validateName,
      decoration: _buildInputDecoration(
        hintText: AppStrings.nameHint,
        errorText: controller.nameError.value,
        hasError: controller.nameError.value.isNotEmpty,
        responsive: responsive,
      ),
    );
  }

  Widget _buildEmailField(AuthController controller, ResponsiveSize responsive) {
    return Obx(
      () => TextField(
        controller: controller.emailController,
        cursorColor: AppColors.black,
        keyboardType: TextInputType.emailAddress,
        style: TextStyle(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25), fontSize: responsive.fontSize(16), fontWeight: FontWeight.w500),
        onChanged: controller.validateEmail,
        decoration: _buildInputDecoration(
          hintText: AppStrings.email,
          errorText: controller.emailError.value,
          hasError: controller.emailError.value.isNotEmpty,
          responsive: responsive,
        ),
      ),
    );
  }

  Widget _buildPasswordField(AuthController controller, ResponsiveSize responsive) {
    return Obx(
      () => TextField(
        controller: controller.passwordController,
        cursorColor: AppColors.black,
        keyboardType: TextInputType.visiblePassword,
        obscureText: !controller.isPasswordVisible.value,
        style: TextStyle(color: AppColors.takeQuickAssessmentColor.withOpacity(0.25), fontSize: responsive.fontSize(16), fontWeight: FontWeight.w500),
        onChanged: controller.validatePassword,
        decoration: _buildInputDecoration(
          hintText: AppStrings.passwordHint,
          errorText: controller.passwordError.value,
          hasError: controller.passwordError.value.isNotEmpty,
          responsive: responsive,
          suffixIcon: IconButton(
            icon: SvgPicture.asset(AppImages.solarEye, height: responsive.height(24), width: responsive.width(24)),
            onPressed: controller.togglePasswordVisibility,
          ),
        ),
      ),
    );
  }

  InputDecoration _buildInputDecoration({required String hintText, String? errorText, bool hasError = false, Widget? suffixIcon, required ResponsiveSize responsive}) {
    return InputDecoration(
      suffixIcon: suffixIcon,
      hintText: hintText,
      contentPadding: EdgeInsets.symmetric(horizontal: responsive.width(16), vertical: responsive.height(12)),
      hintStyle: TextStyle(color: AppColors.takeQuickAssessmentColor.withOpacity(0.25), fontSize: responsive.fontSize(16), fontWeight: FontWeight.w500),
      errorText: errorText?.isEmpty ?? true ? null : errorText,
      errorStyle: TextStyle(color: Colors.red, fontSize: responsive.fontSize(12)),
      disabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(responsive.radius(10)),
        borderSide: BorderSide(color: AppColors.takeQuickAssessmentColor.withOpacity(0.25)),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(responsive.radius(10)),
        borderSide: BorderSide(color: hasError ? Colors.red : AppColors.takeQuickAssessmentColor.withOpacity(0.25)),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(responsive.radius(10)),
        borderSide: BorderSide(color: hasError ? Colors.red : AppColors.takeQuickAssessmentColor.withOpacity(0.25)),
      ),
      errorBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(responsive.radius(10)), borderSide: BorderSide(color: Colors.red)),
      focusedErrorBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(responsive.radius(10)), borderSide: BorderSide(color: Colors.red, width: 1)),
    );
  }

  Widget _buildTermsCheckbox(AuthController controller, ResponsiveSize responsive) {
    final bool isMobile = responsive.screenWidth < 600;

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Transform.scale(
          scale: isMobile ? 0.9 : 1.0,
          child: Obx(() => Checkbox(value: controller.agreedToTerms.value, onChanged: (value) => controller.agreedToTerms.value = value!)),
        ),
        Expanded(
          child: RichText(
            text: TextSpan(
              style: TextStyle(color: Colors.grey),
              children: [
                TextSpan(
                  text: AppStrings.iAgreeTo,
                  style: TextStyle(color: AppColors.takeQuickAssessmentColor, fontWeight: FontWeight.w500, fontSize: responsive.fontSize(isMobile ? 14 : 16)),
                ),
                TextSpan(
                  text: AppStrings.termsAndConditions,
                  style: TextStyle(
                    color: AppColors.takeQuickAssessmentColor,
                    fontWeight: FontWeight.w500,
                    fontSize: responsive.fontSize(isMobile ? 14 : 16),
                    decoration: TextDecoration.underline,
                  ),
                  recognizer: controller.termsGestureRecognizer,
                ),
                TextSpan(
                  text: AppStrings.andAcknowledge,
                  style: TextStyle(color: AppColors.takeQuickAssessmentColor, fontWeight: FontWeight.w500, fontSize: responsive.fontSize(isMobile ? 14 : 16)),
                ),
                TextSpan(
                  text: AppStrings.privacyPolicy,
                  style: TextStyle(
                    color: AppColors.takeQuickAssessmentColor,
                    fontWeight: FontWeight.w500,
                    fontSize: responsive.fontSize(isMobile ? 14 : 16),
                    decoration: TextDecoration.underline,
                  ),
                  recognizer: controller.privacyGestureRecognizer,
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildCreateAccountButton(AuthController controller, ResponsiveSize responsive) {
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

  Widget _buildSocialLoginButtons(AuthController controller, ResponsiveSize responsive) {
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
