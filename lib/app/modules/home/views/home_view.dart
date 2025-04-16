import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:webapplittlehugsmvp/app/constants/app_colors.dart';
import 'package:webapplittlehugsmvp/app/constants/app_images.dart';
import 'package:webapplittlehugsmvp/app/constants/app_strings.dart';
import 'package:webapplittlehugsmvp/app/utils/responsive_utils.dart';
import 'package:webapplittlehugsmvp/app/widgets/app_text.dart';
import 'package:webapplittlehugsmvp/app/widgets/appbar_widget.dart';
import '../controllers/home_controller.dart';

class HomeView extends GetView<HomeController> {
  const HomeView({super.key});
  @override
  Widget build(BuildContext context) {
    final TabBarThemeData tabBarTheme = TabBarTheme.of(context);
    final ResponsiveSize responsive = ResponsiveSize(context);
    final bool isMobile = responsive.screenWidth < 768;
    final bool isTablet = responsive.screenWidth >= 768 && responsive.screenWidth < 1200;
    return Scaffold(
      backgroundColor: AppColors.white,
      appBar: buildAppBar(isMobile, context, screen: 'home'),
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
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              height: responsive.height(640),
              padding: EdgeInsets.symmetric(horizontal: responsive.width(80)),
              width: responsive.screenWidth,
              color: AppColors.lightOrangeColor,
              child: Row(
                children: [
                  Expanded(
                    flex: isMobile ? 1 : 1,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        AppText(
                          AppStrings.gentleGuidanceForGrowingMindsAndHealingHearts,
                          color: AppColors.colorHintTextField,
                          fontSize: responsive.fontSize(48),
                          textAlign: TextAlign.start,
                          fontWeight: FontWeight.w500,
                        ),
                        SizedBox(height: responsive.height(24)),
                        AppText(
                          AppStrings.gentleGuidanceForGrowingMindsAndHealingHeartsDesc,
                          color: AppColors.colorHintTextField,
                          fontSize: responsive.fontSize(20),
                          textAlign: TextAlign.start,
                          fontWeight: FontWeight.w400,
                        ),
                        SizedBox(height: responsive.height(24)),
                        SizedBox(
                          height: responsive.height(52),
                          width: responsive.width(157),
                          child: Card(
                            elevation: 0.0,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(responsive.radius(30))),
                            color: AppColors.takeQuickAssessmentColor,
                            margin: EdgeInsets.zero,
                            child: InkWell(
                              borderRadius: BorderRadius.circular(responsive.radius(30)),
                              overlayColor: tabBarTheme.overlayColor,
                              splashFactory: tabBarTheme.splashFactory,
                              onTap: () {},
                              child: Center(
                                child: AppText(
                                  AppStrings.tryForFree,
                                  color: AppColors.white,
                                  fontSize: responsive.fontSize(20),
                                  textAlign: TextAlign.center,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  if (!isMobile) ...[
                    SizedBox(width: responsive.width(32)),
                    Expanded(flex: 1, child: SvgPicture.asset(AppImages.homeLifeImage, height: responsive.height(634), width: responsive.height(670))),
                  ],
                ],
              ),
            ),
            Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: responsive.height(120)),
                  Center(
                    child: AppText(
                      AppStrings.whatIsLittleHugs,
                      color: AppColors.colorHintTextField,
                      fontSize: responsive.fontSize(32),
                      textAlign: TextAlign.center,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  SizedBox(height: responsive.height(64)),
                  Padding(
                    padding:  EdgeInsets.symmetric(horizontal: responsive.width(81)),
                    child: Row(
                      children: [
                        SizedBox(width: responsive.width(548),height: responsive.height(366),child: Image.asset('assets/images/image.png',fit: BoxFit.cover,)),
                        SizedBox(width: responsive.width(100)),
                        Expanded(
                          child: Column(
                            children: [
                              AppText(
                               '“We’re not a clinic. We’re your care companion.”',
                                color: AppColors.colorHintTextField,
                                fontSize: responsive.fontSize(48),
                                textAlign: TextAlign.start,
                                fontWeight: FontWeight.w500,
                              ),
                              SizedBox(height: responsive.height(24)),
                              AppText(
                               "LittleHugs is a self-guided emotional and developmental wellness platform that offers AI-powered insights, micro-care routines, and early signals—without medical labels",
                                color: AppColors.colorHintTextField,
                                fontSize: responsive.fontSize(20),
                                textAlign: TextAlign.start,
                                fontWeight: FontWeight.w400,
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: responsive.height(64)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
