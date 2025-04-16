import 'package:flutter/material.dart';
import 'package:get/get.dart';

class HomeController extends GetxController {
  //TODO: Implement HomeController

  final count = 0.obs;
  @override
  void onInit() {
    print('alkdsdalskdjjdklasjdklasdjklasdklkl');
    super.onInit();
  }
  var selectedCategory = "Women's Health & Wellness".obs;
  var isLoggedIn = false.obs;
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
