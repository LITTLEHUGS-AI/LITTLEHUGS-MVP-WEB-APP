import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:webapplittlehugsmvp/app/constants/app_colors.dart';
import 'package:webapplittlehugsmvp/app/widgets/appbar_widget.dart';

import '../controllers/partner_landing_controller.dart';

class PartnerLandingView extends GetView<PartnerLandingController> {
  const PartnerLandingView({super.key});
  @override
  Widget build(BuildContext context) {
    PartnerLandingController controller = Get.put(PartnerLandingController());
    final bool isMobile = controller.isMobile(context);
    final bool isTablet = controller.isTablet(context);
    final TabBarThemeData tabBarTheme = TabBarTheme.of(context);
    return Scaffold(
      backgroundColor: AppColors.white,
      appBar: buildAppBar(isMobile, context,screen: 'partner'),
      body: const Center(
        child: Text(
          'PartnerLandingView is working',
          style: TextStyle(fontSize: 20),
        ),
      ),
    );
  }
}
