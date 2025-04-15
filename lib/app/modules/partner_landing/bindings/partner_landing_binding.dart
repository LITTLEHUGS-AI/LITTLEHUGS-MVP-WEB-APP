import 'package:get/get.dart';

import '../controllers/partner_landing_controller.dart';

class PartnerLandingBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<PartnerLandingController>(
      () => PartnerLandingController(),
    );
  }
}
