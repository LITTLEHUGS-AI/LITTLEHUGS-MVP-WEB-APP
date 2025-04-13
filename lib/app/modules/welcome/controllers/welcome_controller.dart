import 'package:flutter/material.dart';
import 'package:get/get.dart';

class WelcomeController extends GetxController {
  void navigateToSignUp() {
    // Implement navigation
  }

  void navigateToAssessment() {
    // Implement navigation
  }
  RxBool isHoveredPersonal = false.obs;
  RxBool isHoveredProfessional = false.obs;  // Method to check if device is mobile
  bool isMobile(BuildContext context) => MediaQuery.of(context).size.width < 768;

  // Method to check if device is tablet
  bool isTablet(BuildContext context) => MediaQuery.of(context).size.width >= 768 && MediaQuery.of(context).size.width < 1200;

  // Method to check if device is desktop
  bool isDesktop(BuildContext context) => MediaQuery.of(context).size.width >= 1200;
  // Add other navigation methods as needed
}
