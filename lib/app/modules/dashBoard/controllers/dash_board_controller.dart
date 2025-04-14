import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:webapplittlehugsmvp/app/modules/home/views/home_view.dart';
import 'package:webapplittlehugsmvp/app/modules/personal_landing/views/personal_landing_view.dart';

class DashBoardController extends GetxController {
  //TODO: Implement DashBoardController

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

  void increment() => count.value++;


  int selectedIndex = 0;

  void onItemTapped(int index) {
      selectedIndex = index;
      update();
  }

  final List<Widget> pages = [
    Container(),
    HomeView(),
    PersonalLandingView(),
    Container(),
    Container(),
    Container(),
    Container(),
  ];
}
