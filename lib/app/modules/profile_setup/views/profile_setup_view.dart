import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

import 'package:get/get.dart';
import 'package:webapplittlehugsmvp/app/constants/app_colors.dart';
import 'package:webapplittlehugsmvp/app/constants/app_images.dart';
import 'package:webapplittlehugsmvp/app/constants/constant.dart';

import '../controllers/profile_setup_controller.dart';

class ProfileSetupView extends GetView<ProfileSetupController> {
  const ProfileSetupView({super.key});
  @override
  Widget build(BuildContext context) {
    ProfileSetupController controller = Get.put(ProfileSetupController());
    final bool isMobile = controller.isMobile(context);
    final bool isTablet = controller.isTablet(context);
    final TabBarThemeData tabBarTheme = TabBarTheme.of(context);
    return Scaffold(
      backgroundColor: AppColors.lightOrangeColor,
      appBar: _buildAppBar(),
      body: GetBuilder(assignId: true, init: ProfileSetupController(), builder: (controller) => _buildBody(controller)),
    );
  }

  AppBar _buildAppBar() {
    return AppBar(backgroundColor: AppColors.lightOrangeColor, elevation: 0, automaticallyImplyLeading: false, title: Row(children: [appLogoWidget()]));
  }

  Widget _buildBody(ProfileSetupController controller) {
    return Stack(
      children: [
        // SVG Background
        if (!controller.isMobile(Get.context!)) Positioned.fill(child: SvgPicture.asset(AppImages.signUpBGImage, width: Get.width, height: Get.height, fit: BoxFit.fill)),
        _buildBackgroundCircle(),
      ],
    );
  }

  Widget _buildBackgroundCircle() {
    return Positioned(left: -170, top: -170, child: Container(width: 350, height: 350, decoration: BoxDecoration(color: AppColors.secondaryOrange, shape: BoxShape.circle)));
  }
}
