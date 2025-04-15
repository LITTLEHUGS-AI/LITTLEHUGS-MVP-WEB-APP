import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:webapplittlehugsmvp/app/constants/app_colors.dart';
import 'package:webapplittlehugsmvp/app/constants/app_images.dart';
import 'package:webapplittlehugsmvp/app/constants/app_strings.dart';
import 'package:webapplittlehugsmvp/app/widgets/app_text.dart';
import 'package:webapplittlehugsmvp/app/widgets/appbar_widget.dart';
import '../controllers/welcome_controller.dart';

class WelcomeView extends GetView<WelcomeController> {
  const WelcomeView({super.key});

  @override
  Widget build(BuildContext context) {
    WelcomeController controller = Get.put(WelcomeController());
    final bool isMobile = controller.isMobile(context);
    final bool isTablet = controller.isTablet(context);
    final TabBarThemeData tabBarTheme = TabBarTheme.of(context);
    return Scaffold(
      backgroundColor: AppColors.white,
      appBar: buildAppBar(isMobile, context,screen: 'welcome'),
      endDrawer:
      isMobile
          ? Drawer(
        child: ListView(
          children: [
            DrawerHeader(decoration: BoxDecoration(color: Theme.of(context).primaryColor), child: Text('LittleHugs Menu')),
            ListTile(
              title: AppText(AppStrings.assessments, color: AppColors.colorHintTextField, fontSize: 20, textAlign: TextAlign.center, fontWeight: FontWeight.w500),
              onTap: () {},
            ),
            ListTile(
              title: AppText(AppStrings.pricing, color: AppColors.colorHintTextField, fontSize: 20, textAlign: TextAlign.center, fontWeight: FontWeight.w500),
              onTap: () {},
            ),
            ListTile(
              title: AppText(AppStrings.aboutUs, color: AppColors.colorHintTextField, fontSize: 20, textAlign: TextAlign.center, fontWeight: FontWeight.w500),
              onTap: () {},
            ),
            ListTile(
              title: AppText(AppStrings.contactUs, color: AppColors.colorHintTextField, fontSize: 20, textAlign: TextAlign.center, fontWeight: FontWeight.w500),
              onTap: () {},
            ),
            ListTile(
              title: AppText(AppStrings.signUpSignIn, color: AppColors.colorHintTextField, fontSize: 20, textAlign: TextAlign.center, fontWeight: FontWeight.w500),
              onTap: () {},
            ),
          ],
        ),
      )
          : null,
      body: GetBuilder(
        init: WelcomeController(),
        assignId: true,
        builder: (controller) {
          return SafeArea(
            child: Stack(
              children: [
                SvgPicture.asset(AppImages.bgTopWelcome, height: 250, width: 250),
                SvgPicture.asset(AppImages.bgTopWelcome, height: 200, width: 200, color: AppColors.darkOrangeColor),
                Positioned(bottom: 0, right: 0, child: SvgPicture.asset(AppImages.bgBottomWelcome, height: 233, width: 57)),
                Padding(
                  padding: const EdgeInsets.all(24.0),
                  child: Center(
                    child: Column(
                      children: [
                        Spacer(flex: 1),
                        AppText(AppStrings.iAmHereAtLittleHugs, fontSize: 50, fontWeight: FontWeight.w700, color: AppColors.colorHintTextField, textAlign: TextAlign.center),
                        const SizedBox(height: 48),
                        // Cards Container
                        LayoutBuilder(
                          builder: (context, constraints) {
                            return Wrap(
                              spacing: 24,
                              runSpacing: 24,
                              alignment: WrapAlignment.center,
                              children: [
                                MouseRegion(
                                  child: StatefulBuilder(
                                    builder: (context, setState) {
                                      return _buildOptionCard(
                                        AppStrings.forPersonalUse,
                                        AppStrings.forPersonalUseDesc,
                                        AppImages.personalUse,
                                        constraints,
                                        controller.isHoveredPersonal.value,
                                        () {},
                                      );
                                    },
                                  ),
                                  onEnter: (_) {
                                    controller.isHoveredPersonal.value = true;
                                    controller.update();
                                  },
                                  onExit: (_) {
                                    controller.isHoveredPersonal.value = false;
                                    controller.update();
                                  },
                                ),
                                MouseRegion(
                                  child: StatefulBuilder(
                                    builder: (context, setState) {
                                      return _buildOptionCard(
                                        AppStrings.forProfessionalUse,
                                        AppStrings.forPersonalUseDesc,
                                        AppImages.healthIconsDoctor,
                                        constraints,
                                        controller.isHoveredProfessional.value,
                                        () {},
                                      );
                                    },
                                  ),
                                  onEnter: (_) {
                                    controller.isHoveredProfessional.value = true;
                                    controller.update();
                                  },
                                  onExit: (_) {
                                    controller.isHoveredProfessional.value = false;
                                    controller.update();
                                  },
                                ),
                              ],
                            );
                          },
                        ),
                        Spacer(flex: 2),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }


  Widget _buildOptionCard(String title, String description, icon, BoxConstraints constraints, hover, onTap) {
    final cardWidth =
        Get.width > 1200
            ? 400.0
            : Get.width > 800
            ? 350.0
            : Get.width > 600
            ? 300.0
            : Get.width * 0.8;
    return InkWell(
      onTap: onTap,
      hoverColor: Colors.transparent,
      borderRadius: BorderRadius.circular(25),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300), // Animation duration
        width: cardWidth,
        padding: const EdgeInsets.only(left: 24, right: 24, bottom: 24, top: 12),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(25),
          border: Border.all(
            color: AppColors.takeQuickAssessmentColor,
            width: hover ? 2 : 1, // Border width changes on hover
          ),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            AppText(title, fontSize: 22, fontWeight: FontWeight.w600, color: AppColors.takeQuickAssessmentColor, textAlign: TextAlign.center),
            const SizedBox(height: 26),
            AppText(description, fontSize: 15, fontWeight: FontWeight.w500, color: AppColors.takeQuickAssessmentColor, textAlign: TextAlign.center),
            const SizedBox(height: 20),
            Container(
              height: 100,
              width: Get.width,
              decoration: BoxDecoration(color: AppColors.grayColor, borderRadius: BorderRadius.circular(10), border: Border.all(color: AppColors.black, width: 1)),
              child: Center(child: SvgPicture.asset(icon, height: 50, width: 50)),
            ),
          ],
        ),
      ),
    );
  }
}
