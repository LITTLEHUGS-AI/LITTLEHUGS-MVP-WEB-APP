import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:webapplittlehugsmvp/app/constants/app_colors.dart';
import 'package:webapplittlehugsmvp/app/constants/app_images.dart';
import 'package:webapplittlehugsmvp/app/constants/app_strings.dart';
import 'package:webapplittlehugsmvp/app/routes/app_pages.dart';
import 'package:webapplittlehugsmvp/app/widgets/app_text.dart';

AppBar buildAppBar(bool isMobile, BuildContext context) {
  return AppBar(
    backgroundColor: AppColors.white,
    elevation: 0,
    automaticallyImplyLeading: false,
    title: Row(children: [SvgPicture.asset(AppImages.logo, height: 40)]),
    flexibleSpace:
        isMobile
            ? null
            : Align(
              alignment: Alignment.center,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  TextButton(
                    onPressed: () {},
                    child: AppText(AppStrings.forYou, color: AppColors.colorHintTextField, fontSize: 18, textAlign: TextAlign.center, fontWeight: FontWeight.w500),
                  ),
                  TextButton(
                    onPressed: () {},
                    child: AppText(AppStrings.forPartners, color: AppColors.colorHintTextField, fontSize: 18, textAlign: TextAlign.center, fontWeight: FontWeight.w500),
                  ),
                  TextButton(
                    onPressed: () {},
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        AppText(AppStrings.assessments, color: AppColors.colorHintTextField, fontSize: 18, textAlign: TextAlign.center, fontWeight: FontWeight.w500),
                        SvgPicture.asset(AppImages.downArrow, height: 22, width: 22),
                      ],
                    ),
                  ),
                  TextButton(
                    onPressed: () {},
                    child: AppText(AppStrings.pricing, color: AppColors.colorHintTextField, fontSize: 18, textAlign: TextAlign.center, fontWeight: FontWeight.w500),
                  ),
                  TextButton(
                    onPressed: () {},
                    child: AppText(AppStrings.aboutUs, color: AppColors.colorHintTextField, fontSize: 18, textAlign: TextAlign.center, fontWeight: FontWeight.w500),
                  ),
                  TextButton(
                    onPressed: () {},
                    child: AppText(AppStrings.contactUs, color: AppColors.colorHintTextField, fontSize: 18, textAlign: TextAlign.center, fontWeight: FontWeight.w500),
                  ),
                ],
              ),
            ),
    actions:
        isMobile
            ? [
              IconButton(
                icon: Icon(Icons.menu, color: Colors.black),
                onPressed: () {
                  // Show drawer or menu
                  Scaffold.of(context).openEndDrawer();
                },
              ),
            ]
            : [
              ElevatedButton(
                style: ButtonStyle(
                  backgroundColor: WidgetStateProperty.all(AppColors.colorCheckBox),
                  elevation: WidgetStateProperty.all(0.0),
                  shape: WidgetStateProperty.all<RoundedRectangleBorder>(RoundedRectangleBorder(borderRadius: BorderRadius.circular(10.0))),
                ),
                onPressed: () {
                  Get.toNamed(Routes.AUTH);
                },
                child: AppText(AppStrings.signUpSignIn, color: AppColors.white, fontSize: 16, textAlign: TextAlign.center, fontWeight: FontWeight.w400),
              ),
              SizedBox(width: 16),
            ],
  );
}
