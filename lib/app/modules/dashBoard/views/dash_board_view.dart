import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:webapplittlehugsmvp/app/constants/app_colors.dart';
import '../../../constants/app_strings.dart';
import '../controllers/dash_board_controller.dart';

class DashBoardView extends GetView<DashBoardController> {
  const DashBoardView({super.key});
  @override
  Widget build(BuildContext context) {
    return GetBuilder(
        assignId: true,
        init: DashBoardController(),
        builder: (controller) {
          return Scaffold(
            backgroundColor: AppColors.white,
            appBar: AppBar(
              toolbarHeight: 5.0,
              backgroundColor: AppColors.white, // Or any color you prefer for the AppBar
              automaticallyImplyLeading: false, // To remove the back button if any
              bottom: PreferredSize(
                preferredSize: const Size.fromHeight(kToolbarHeight), // Match the height of BottomNavigationBar
                child: BottomNavigationBar(
                  currentIndex: controller.selectedIndex,
                  onTap: controller.onItemTapped,
                  elevation: 0.0,
                  backgroundColor: AppColors.white,
                  selectedItemColor: AppColors.colorCheckBox,
                  unselectedItemColor: AppColors.colorHintTextField,
                  type: BottomNavigationBarType.fixed,
                  items: const [
                    BottomNavigationBarItem(icon: Icon(Icons.home), label: AppStrings.forYou),
                    BottomNavigationBarItem(icon: Icon(Icons.group), label: AppStrings.forPartners),
                    BottomNavigationBarItem(icon: Icon(Icons.assignment), label: AppStrings.assessments),
                    BottomNavigationBarItem(icon: Icon(Icons.price_change), label: AppStrings.pricing),
                    BottomNavigationBarItem(icon: Icon(Icons.info), label: AppStrings.aboutUs),
                    BottomNavigationBarItem(icon: Icon(Icons.contact_page), label: AppStrings.contactUs),
                  ],
                ),
              ),
            ),
            body: IndexedStack(
              index: controller.selectedIndex,
              children: controller.pages,
            ),
          );
        }
    );
  }
}