import 'package:flutter/material.dart';
import 'package:get/get.dart';

class PartnerLandingController extends GetxController {
  //TODO: Implement PartnerLandingController

  final count = 0.obs;
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

  // Method to check if device is mobile
  bool isMobile(BuildContext context) => MediaQuery.of(context).size.width < 768;

  // Method to check if device is tablet
  bool isTablet(BuildContext context) => MediaQuery.of(context).size.width >= 768 && MediaQuery.of(context).size.width < 1200;

  // Method to check if device is desktop
  bool isDesktop(BuildContext context) => MediaQuery.of(context).size.width >= 1200;
  void increment() => count.value++;
}
