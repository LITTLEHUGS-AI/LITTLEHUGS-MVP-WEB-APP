import 'package:flutter/material.dart';
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
    final TabBarThemeData tabBarTheme = TabBarTheme.of(context);
    return Scaffold(
      backgroundColor: AppColors.lightOrangeColor,
      appBar: AppBar(
        backgroundColor: AppColors.lightOrangeColor,
        elevation: 0,
        automaticallyImplyLeading: false,
        title: Row(children: [SvgPicture.asset(AppImages.logo, height: 40)]),
      ),
      body: GetBuilder(
        assignId: true,
        init: LoginController(),
        builder: (controller) {
          return Center(
            child: Container(
              constraints: const BoxConstraints(maxWidth: 920),
              decoration: BoxDecoration(
                color: AppColors.white,
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25), width: 1),
              ),
              child: Stack(
                children: [
                  Positioned(left: -120, top: -120, child: Container(width: 250, height: 250, decoration: BoxDecoration(color: AppColors.secondaryOrange, shape: BoxShape.circle))),
                  Positioned(right: 10, bottom: 0, child: SvgPicture.asset(AppImages.flawor)),
                  SingleChildScrollView(
                    child: Padding(
                      padding: EdgeInsets.symmetric(horizontal: Get.width > 800 ? 200.0 : 24.0, vertical: 30.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          AppText(AppStrings.signIn, fontSize: 48, fontWeight: FontWeight.w500, color: AppColors.colorHintTextField, textAlign: TextAlign.center),
                          const SizedBox(height: 8),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              AppText(AppStrings.youDoNotHaveAnAccount, fontSize: 20, fontWeight: FontWeight.w500, color: AppColors.black, textAlign: TextAlign.center),
                              TextButton(
                                onPressed: () => controller.goToSignUp(),
                                child: AppText(
                                  AppStrings.signUP,
                                  fontSize: 20,
                                  fontWeight: FontWeight.w500,
                                  color: AppColors.colorCheckBox,
                                  textAlign: TextAlign.center,
                                  textDecoration: TextDecoration.underline,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 32),

                          TextField(
                            controller: controller.emailController,
                            cursorColor: AppColors.black,
                            keyboardType: TextInputType.emailAddress,
                            style: TextStyle(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25), fontSize: 16, fontWeight: FontWeight.w500),
                            onChanged: (value) {
                              // Validate email on every change
                              controller.validateEmail(value);
                            },
                            decoration: InputDecoration(
                              hintText: '* Email',
                              hintStyle: TextStyle(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25), fontSize: 16, fontWeight: FontWeight.w500),
                              // Error text that appears below the text field
                              errorText: controller.emailError.value.isEmpty ? null : controller.emailError.value,
                              errorStyle: TextStyle(color: Colors.red, fontSize: 12),
                              // Border styling
                              disabledBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(10),
                                borderSide: BorderSide(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25)),
                              ),
                              focusedBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(10),
                                borderSide: BorderSide(color: controller.emailError.value.isEmpty ? AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25) : Colors.red),
                              ),
                              enabledBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(10),
                                borderSide: BorderSide(color: controller.emailError.value.isEmpty ? AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25) : Colors.red),
                              ),
                              errorBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide(color: Colors.red)),
                              focusedErrorBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide(color: Colors.red, width: 1)),
                            ),
                          ),
                          const SizedBox(height: 16),
                          Obx(
                            () => TextField(
                              controller: controller.passwordController,
                              cursorColor: AppColors.black,
                              keyboardType: TextInputType.visiblePassword,
                              obscureText: !controller.isPasswordVisible.value,
                              style: TextStyle(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25), fontSize: 16, fontWeight: FontWeight.w500),
                              onChanged: (value) {
                                // Validate password on every change
                                controller.validatePassword(value);
                              },
                              decoration: InputDecoration(
                                suffixIcon: IconButton(icon: SvgPicture.asset(AppImages.solarEye, height: 24, width: 24), onPressed: controller.togglePasswordVisibility),
                                hintText: '* Password',
                                hintStyle: TextStyle(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25), fontSize: 16, fontWeight: FontWeight.w500),
                                // Error text that appears below the text field
                                errorText: controller.passwordError.value.isEmpty ? null : controller.passwordError.value,
                                errorStyle: TextStyle(color: Colors.red, fontSize: 12),
                                // Border styling
                                disabledBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(10),
                                  borderSide: BorderSide(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25)),
                                ),
                                focusedBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(10),
                                  borderSide: BorderSide(color: controller.passwordError.value.isEmpty ? AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25) : Colors.red),
                                ),
                                enabledBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(10),
                                  borderSide: BorderSide(color: controller.passwordError.value.isEmpty ? AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25) : Colors.red),
                                ),
                                errorBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide(color: Colors.red)),
                                focusedErrorBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide(color: Colors.red, width: 1)),
                              ),
                            ),
                          ),
                          const SizedBox(height: 15),
                          InkWell(
                            onTap: () {},
                            overlayColor: tabBarTheme.overlayColor,
                            splashFactory: tabBarTheme.splashFactory,
                            child: AppText('Forgot Password', fontSize: 16, color: AppColors.darkOrangeColor, fontWeight: FontWeight.w600, textDecoration: TextDecoration.underline),
                          ),
                          const SizedBox(height: 30),

                          // Terms checkbox
                          Row(
                            children: [
                              Obx(() => Checkbox(value: controller.agreedToTerms.value, onChanged: (value) => controller.agreedToTerms.value = value!)),
                              Expanded(
                                child: RichText(
                                  text: TextSpan(
                                    style: const TextStyle(color: Colors.grey),
                                    children: [
                                      TextSpan(
                                        text: "I agree to LittleHugs's ",
                                        style: TextStyle(color: AppColors.takeQuickAssessmentColor, fontWeight: FontWeight.w500, fontSize: 16),
                                      ),
                                      TextSpan(
                                        text: 'Terms & Conditions',
                                        style: TextStyle(color: AppColors.takeQuickAssessmentColor, fontWeight: FontWeight.w500, fontSize: 16, decoration: TextDecoration.underline),
                                        recognizer: controller.termsGestureRecognizer,
                                      ),
                                      TextSpan(text: ' and acknowledge \nthe ', style: TextStyle(color: AppColors.takeQuickAssessmentColor, fontWeight: FontWeight.w500, fontSize: 16)),
                                      TextSpan(
                                        text: 'Privacy Policy',
                                        style: TextStyle(color: AppColors.takeQuickAssessmentColor, fontWeight: FontWeight.w500, fontSize: 16, decoration: TextDecoration.underline),
                                        recognizer: controller.privacyGestureRecognizer,
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 30),
                          // Create Account button
                          ElevatedButton(
                            onPressed: controller.createAccount,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: AppColors.colorCheckBox,
                              padding: const EdgeInsets.symmetric(vertical: 16),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(25)),
                            ),
                            child: AppText('Sign In', fontSize: 20, color: AppColors.white, fontWeight: FontWeight.w500),
                          ),
                          const SizedBox(height: 20),
                          // Social login buttons
                          Row(
                            children: [
                              Expanded(
                                child: OutlinedButton(
                                  onPressed: controller.signInWithGoogle,
                                  style: OutlinedButton.styleFrom(
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
                                    padding: const EdgeInsets.symmetric(vertical: 16),
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
                                  ),
                                  child: SvgPicture.asset(AppImages.appleIc, height: 32, width: 32),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}

// Add this custom painter class at the top of the file
class BackgroundPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    // Sun/Circle in top left
    final Paint circlePaint =
        Paint()
          ..color = const Color(0xFFFFB74D)
          ..style = PaintingStyle.fill;
    canvas.drawCircle(Offset(size.width * 0.2, size.height * 0.2), size.width * 0.15, circlePaint);

    // Wavy bottom decoration
    final Paint wavePaint =
        Paint()
          ..color = const Color(0xFF80CBC4)
          ..style = PaintingStyle.fill;

    final path = Path();
    path.moveTo(0, size.height);
    path.lineTo(0, size.height * 0.7);

    // Create wave effect
    path.quadraticBezierTo(size.width * 0.25, size.height * 0.75, size.width * 0.5, size.height * 0.7);
    path.quadraticBezierTo(size.width * 0.75, size.height * 0.65, size.width, size.height * 0.7);
    path.lineTo(size.width, size.height);
    path.close();

    canvas.drawPath(path, wavePaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
