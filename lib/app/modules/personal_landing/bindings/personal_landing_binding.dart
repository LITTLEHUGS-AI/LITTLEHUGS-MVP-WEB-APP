import 'package:get/get.dart';

import '../controllers/personal_landing_controller.dart';

class PersonalLandingBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<PersonalLandingController>(
      () => PersonalLandingController(),
    );
  }
}
