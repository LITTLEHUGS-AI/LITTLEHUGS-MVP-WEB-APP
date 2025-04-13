import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:webapplittlehugsmvp/app/constants/app_colors.dart';
import 'package:webapplittlehugsmvp/app/constants/app_images.dart';
import 'package:webapplittlehugsmvp/app/constants/app_strings.dart';
import 'package:webapplittlehugsmvp/app/modules/welcome/views/welcome_view.dart';
import 'package:webapplittlehugsmvp/app/routes/app_pages.dart';
import 'package:webapplittlehugsmvp/app/widgets/app_text.dart';
import '../controllers/dash_board_controller.dart';

class DashBoardView extends GetView<DashBoardController> {
  const DashBoardView({super.key});
  @override
  Widget build(BuildContext context) {
    final TabBarThemeData tabBarTheme = TabBarTheme.of(context);
    return Scaffold(
      backgroundColor: AppColors.white,
      body: GetBuilder(
        init: DashBoardController(),
        assignId: true,
        builder: (controller) {
          return Column(
            children: [
              // Header with Logo and Navigation
              Container(
                height: 80,
                decoration: BoxDecoration(color: AppColors.white),
                child: Row(
                  children: [
                    Padding(
                      padding: EdgeInsets.only(left: 40.59),
                      child: InkWell(
                        overlayColor: tabBarTheme.overlayColor,
                        splashFactory: tabBarTheme.splashFactory,
                        onTap: () {
                          controller.selectScreen.value = 0;
                          controller.update();
                        },
                        child: SvgPicture.asset(AppImages.logo, height: 42.04, width: 180),
                      ),
                    ),
                    Spacer(),
                    // Navigation Menu
                    if (Get.width > 600) ...[
                      Spacer(),
                      InkWell(
                        overlayColor: tabBarTheme.overlayColor,
                        splashFactory: tabBarTheme.splashFactory,
                        onTap: () {
                          controller.selectScreen.value = 1;
                          controller.update();
                        },
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            AppText(
                              AppStrings.assessments,
                              color: controller.selectScreen.value == 1 ? AppColors.black : AppColors.colorHintTextField,
                              fontSize: 20,
                              textAlign: TextAlign.center,
                              fontWeight: controller.selectScreen.value == 1 ? FontWeight.w600 : FontWeight.w500,
                            ),
                            SvgPicture.asset(AppImages.downArrow, height: 24, width: 24),
                          ],
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.symmetric(horizontal: 20),
                        child: InkWell(
                          overlayColor: tabBarTheme.overlayColor,
                          splashFactory: tabBarTheme.splashFactory,
                          onTap: () {
                            controller.selectScreen.value = 2;
                            controller.update();
                          },
                          child: AppText(
                            AppStrings.pricing,
                            color: controller.selectScreen.value == 2 ? AppColors.black : AppColors.colorHintTextField,
                            fontSize: 20,
                            textAlign: TextAlign.center,
                            fontWeight: controller.selectScreen.value == 2 ? FontWeight.w600 : FontWeight.w500,
                          ),
                        ),
                      ),
                      InkWell(
                        overlayColor: tabBarTheme.overlayColor,
                        splashFactory: tabBarTheme.splashFactory,
                        onTap: () {
                          controller.selectScreen.value = 3;
                          controller.update();
                        },
                        child: AppText(
                          AppStrings.aboutUs,
                          color: controller.selectScreen.value == 3 ? AppColors.black : AppColors.colorHintTextField,
                          fontSize: 20,
                          textAlign: TextAlign.center,
                          fontWeight: controller.selectScreen.value == 3 ? FontWeight.w600 : FontWeight.w500,
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.symmetric(horizontal: 20),
                        child: InkWell(
                          overlayColor: tabBarTheme.overlayColor,
                          splashFactory: tabBarTheme.splashFactory,
                          onTap: () {
                            controller.selectScreen.value = 4;
                            controller.update();
                          },
                          child: AppText(
                            AppStrings.contactUs,
                            color: controller.selectScreen.value == 4 ? AppColors.black : AppColors.colorHintTextField,
                            fontSize: 20,
                            textAlign: TextAlign.center,
                            fontWeight: controller.selectScreen.value == 4 ? FontWeight.w600 : FontWeight.w500,
                          ),
                        ),
                      ),
                      Spacer(),
                      Spacer(),
                      SizedBox(
                        height: 42,
                        width: 173,
                        child: Card(
                          elevation: 0.0,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
                          color: AppColors.colorCheckBox,
                          margin: EdgeInsets.zero,
                          child: InkWell(
                            borderRadius: BorderRadius.circular(30),
                            overlayColor: tabBarTheme.overlayColor,
                            splashFactory: tabBarTheme.splashFactory,
                            onTap: () {
                              Get.toNamed(Routes.AUTH);
                            },
                            child: Center(child: AppText(AppStrings.signUpSignIn, color: AppColors.white, fontSize: 16, textAlign: TextAlign.center, fontWeight: FontWeight.w400)),
                          ),
                        ),
                      ),
                      SizedBox(width: 40),
                    ] else
                      IconButton(
                        icon: const Icon(Icons.menu),
                        onPressed: () {
                          // Handle mobile menu
                        },
                      ),
                  ],
                ),
              ),
              Expanded(child: controller.selectScreen.value == 0 ? WelcomeView() : Center(child: Text('Asss is working', style: TextStyle(fontSize: 20)))),
            ],
          );
        },
      ),
    );
  }
}