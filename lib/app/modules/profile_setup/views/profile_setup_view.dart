import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

import 'package:get/get.dart';
import 'package:webapplittlehugsmvp/app/constants/app_colors.dart';
import 'package:webapplittlehugsmvp/app/constants/app_images.dart';
import 'package:webapplittlehugsmvp/app/constants/constant.dart';
import 'package:webapplittlehugsmvp/app/utils/responsive_utils.dart';

import '../controllers/profile_setup_controller.dart';

class ProfileSetupView extends GetView<ProfileSetupController> {
  const ProfileSetupView({super.key});
  @override
  Widget build(BuildContext context) {
    final ResponsiveSize responsive = ResponsiveSize(context);
    return Scaffold(
      backgroundColor: AppColors.lightOrangeColor,
      appBar: _buildAppBar(),
      body: GetBuilder(assignId: true, init: ProfileSetupController(), builder: (controller) => _buildBody(controller,responsive)),
    );
  }

  AppBar _buildAppBar() {
    return AppBar(backgroundColor: AppColors.lightOrangeColor, elevation: 0, automaticallyImplyLeading: false, title: Row(children: [appLogoWidget()]));
  }

  Widget _buildBody(ProfileSetupController controller,ResponsiveSize responsive) {
    final bool isMobile = responsive.screenWidth < 600;
    final bool isTablet = responsive.screenWidth >= 600 && responsive.screenWidth < 1200;
    return Stack(
      children: [
        // SVG Background
        if (!isMobile) Positioned.fill(child: SvgPicture.asset(AppImages.signUpBGImage, width: responsive.screenWidth, height: responsive.screenHeight, fit: BoxFit.fill)),
        _buildBackgroundCircle(responsive),
        // controller.womenAndChildProfileBuilder(),
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

}
