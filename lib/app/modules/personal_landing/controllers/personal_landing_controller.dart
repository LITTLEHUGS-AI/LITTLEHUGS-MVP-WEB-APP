
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class PersonalLandingController extends GetxController {
  //TODO: Implement HomeController

  final count = 0.obs;
  @override
  void onInit() {
    print('alkdsdalskdjjdklasjdklasdjklasdklkl');
    super.onInit();
  }
  var selectedCategory = "Women's Health & Wellness".obs;
  var isLoggedIn = false.obs;

  // Method to check if device is mobile
  bool isMobile(BuildContext context) => MediaQuery.of(context).size.width < 768;

  // Method to check if device is tablet
  bool isTablet(BuildContext context) => MediaQuery.of(context).size.width >= 768 && MediaQuery.of(context).size.width < 1200;

  // Method to check if device is desktop
  bool isDesktop(BuildContext context) => MediaQuery.of(context).size.width >= 1200;

  // Method to update selected category
  void updateCategory(String category) {
    selectedCategory.value = category;
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
