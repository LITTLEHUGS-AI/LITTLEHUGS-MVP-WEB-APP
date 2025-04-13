import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:get/get.dart';
import 'package:webapplittlehugsmvp/app/constants/app_images.dart';
import 'package:webapplittlehugsmvp/app/constants/app_strings.dart';
import 'package:webapplittlehugsmvp/app/widgets/app_text.dart';
import '../../../constants/app_colors.dart';
import '../controllers/auth_controller.dart';

class SignUpView extends GetView<AuthController> {
  const SignUpView({super.key});

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
        init: AuthController(),
        builder: (controller) {
          return Stack(
            children: [
              Positioned(left: -150, top: -150, child: Container(width: 350, height: 350, decoration: BoxDecoration(color: AppColors.secondaryOrange, shape: BoxShape.circle))),
              Row(
                children: [
                  // Left side with image and text (hidden on small screens)
                  if (Get.width > 800)
                    Expanded(
                      child: Padding(
                        padding: const EdgeInsets.all(48.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            const Spacer(),
                            AppText(AppStrings.aHugAheadOfTime, fontSize: 48, fontWeight: FontWeight.w500, color: AppColors.colorHintTextField),
                            const Spacer(),
                          ],
                        ),
                      ),
                    ),
                  // Right side with sign up form
                  Expanded(
                    child: Padding(
                      padding: EdgeInsets.only(right: Get.width > 800 ? 50.0 : 0.0, bottom: 20),
                      child: Container(
                        constraints: const BoxConstraints(maxWidth: 600),
                        decoration: BoxDecoration(
                          color: AppColors.white,
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25), width: 1),
                        ),
                        padding: EdgeInsets.symmetric(horizontal: Get.width > 800 ? 40.0 : 24.0, vertical: 20.0),
                        child: SingleChildScrollView(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.stretch,
                            children: [
                              AppText(AppStrings.signUP, fontSize: 48, fontWeight: FontWeight.w500, color: AppColors.colorHintTextField, textAlign: TextAlign.center),
                              const SizedBox(height: 8),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  AppText(AppStrings.alreadyHaveAnAccount, fontSize: 20, fontWeight: FontWeight.w500, color: AppColors.black, textAlign: TextAlign.center),
                                  TextButton(
                                    onPressed: () => controller.goToSignIn(),
                                    child: AppText(
                                      AppStrings.signIn,
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

                              // Form fields
                              TextField(
                                controller: controller.nameController,
                                cursorColor: AppColors.black,
                                style: TextStyle(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25), fontSize: 16, fontWeight: FontWeight.w500),
                                onChanged: (value) {
                                  // Validate name on every change
                                  controller.validateName(value);
                                },
                                decoration: InputDecoration(
                                  hintText: '* Name',
                                  hintStyle: TextStyle(
                                      color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25),
                                      fontSize: 16,
                                      fontWeight: FontWeight.w500
                                  ),
                                  // Error text that appears below the text field
                                  errorText: controller.nameError.value.isEmpty ? null : controller.nameError.value,
                                  errorStyle: TextStyle(
                                    color: Colors.red,
                                    fontSize: 12,
                                  ),
                                  // Border styling
                                  disabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(10),
                                    borderSide: BorderSide(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25)),
                                  ),
                                  focusedBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(10),
                                    borderSide: BorderSide(
                                      color: controller.nameError.value.isEmpty
                                          ? AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25)
                                          : Colors.red,
                                    ),
                                  ),
                                  enabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(10),
                                    borderSide: BorderSide(
                                      color: controller.nameError.value.isEmpty
                                          ? AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25)
                                          : Colors.red,
                                    ),
                                  ),
                                  errorBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(10),
                                    borderSide: BorderSide(color: Colors.red),
                                  ),
                                  focusedErrorBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(10),
                                    borderSide: BorderSide(color: Colors.red, width: 1),
                                  ),
                                ),
                              ),
                              const SizedBox(height: 16),
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
                                      borderSide: BorderSide(
                                        color: controller.passwordError.value.isEmpty ? AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25) : Colors.red,
                                      ),
                                    ),
                                    enabledBorder: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(10),
                                      borderSide: BorderSide(
                                        color: controller.passwordError.value.isEmpty ? AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25) : Colors.red,
                                      ),
                                    ),
                                    errorBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide(color: Colors.red)),
                                    focusedErrorBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide(color: Colors.red, width: 1)),
                                  ),
                                ),
                              ),
                              const SizedBox(height: 16),

                              // Dropdown fields in row
                              Row(
                                children: [
                                  Expanded(
                                    child: DropdownButtonFormField<String>(
                                      decoration: InputDecoration(
                                        hintStyle: TextStyle(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25), fontSize: 16, fontWeight: FontWeight.w500),
                                        hintText: '* Country',
                                        disabledBorder: OutlineInputBorder(
                                          borderRadius: BorderRadius.circular(10),
                                          borderSide: BorderSide(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25)),
                                        ),
                                        focusedBorder: OutlineInputBorder(
                                          borderRadius: BorderRadius.circular(10),
                                          borderSide: BorderSide(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25)),
                                        ),
                                        enabledBorder: OutlineInputBorder(
                                          borderRadius: BorderRadius.circular(10),
                                          borderSide: BorderSide(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25)),
                                        ),

                                        border: OutlineInputBorder(
                                          borderRadius: BorderRadius.circular(10),
                                          borderSide: BorderSide(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25)),
                                        ),
                                      ),
                                      items:
                                          controller.countries.map((country) {
                                            return DropdownMenuItem(value: country, child: Text(country));
                                          }).toList(),
                                      onChanged: (value) => controller.selectedCountry.value = value!,
                                    ),
                                  ),
                                  const SizedBox(width: 16),
                                  Expanded(
                                    child: DropdownButtonFormField<String>(
                                      decoration: InputDecoration(
                                        hintStyle: TextStyle(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25), fontSize: 16, fontWeight: FontWeight.w500),
                                        hintText: '* I am here for',
                                        disabledBorder: OutlineInputBorder(
                                          borderRadius: BorderRadius.circular(10),
                                          borderSide: BorderSide(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25)),
                                        ),
                                        focusedBorder: OutlineInputBorder(
                                          borderRadius: BorderRadius.circular(10),
                                          borderSide: BorderSide(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25)),
                                        ),
                                        enabledBorder: OutlineInputBorder(
                                          borderRadius: BorderRadius.circular(10),
                                          borderSide: BorderSide(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25)),
                                        ),

                                        border: OutlineInputBorder(
                                          borderRadius: BorderRadius.circular(10),
                                          borderSide: BorderSide(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25)),
                                        ),
                                      ),
                                      items:
                                          controller.purposes.map((purpose) {
                                            return DropdownMenuItem(value: purpose, child: Text(purpose));
                                          }).toList(),
                                      onChanged: (value) => controller.selectedPurpose.value = value!,
                                    ),
                                  ),
                                ],
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
                                            style: TextStyle(
                                              color: AppColors.takeQuickAssessmentColor,
                                              fontWeight: FontWeight.w500,
                                              fontSize: 16,
                                              decoration: TextDecoration.underline,
                                            ),
                                            recognizer: controller.termsGestureRecognizer,
                                          ),
                                          TextSpan(
                                            text: ' and acknowledge \nthe ',
                                            style: TextStyle(color: AppColors.takeQuickAssessmentColor, fontWeight: FontWeight.w500, fontSize: 16),
                                          ),
                                          TextSpan(
                                            text: 'Privacy Policy',
                                            style: TextStyle(
                                              color: AppColors.takeQuickAssessmentColor,
                                              fontWeight: FontWeight.w500,
                                              fontSize: 16,
                                              decoration: TextDecoration.underline,
                                            ),
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
                                child: AppText('Create Account', fontSize: 20, color: AppColors.white, fontWeight: FontWeight.w500),
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
                    ),
                  ),
                ],
              ),
            ],
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
