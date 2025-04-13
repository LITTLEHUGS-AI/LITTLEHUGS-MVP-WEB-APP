import 'package:get/get.dart';

class DashBoardController extends GetxController {
  //TODO: Implement DashBoardController

  final count = 0.obs;
  RxInt selectScreen = 0.obs;
  @override
  void onInit() {
    super.onInit();
  }

  @override
  void onReady() {
    super.onReady();
  }

  @override
  void onClose() {
    super.onClose();
  }

  void increment() => count.value++;
}
