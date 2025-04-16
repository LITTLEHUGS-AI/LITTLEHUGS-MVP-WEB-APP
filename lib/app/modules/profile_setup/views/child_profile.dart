import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:percent_indicator/flutter_percent_indicator.dart';
import 'package:webapplittlehugsmvp/app/constants/app_colors.dart';
import 'package:webapplittlehugsmvp/app/constants/app_strings.dart';
import 'package:webapplittlehugsmvp/app/constants/constant.dart';
import 'package:webapplittlehugsmvp/app/modules/profile_setup/controllers/profile_setup_controller.dart';
import 'package:webapplittlehugsmvp/app/modules/profile_setup/views/profile_setup_dropdown.dart' show CustomDropdown;
import 'package:webapplittlehugsmvp/app/routes/app_pages.dart';
import 'package:webapplittlehugsmvp/app/widgets/app_text.dart';

childProfileBuilder() {
  return GetBuilder(
    init: ProfileSetupController(),
    assignId: true,
    builder: (controller) {
      return StatefulBuilder(
        builder: (context, setState) {
          // Get device screen dimensions
          final screenHeight = MediaQuery.of(context).size.height;
          final screenWidth = MediaQuery.of(context).size.width;

          // Determine if device is in landscape mode
          final isLandscape = MediaQuery.of(context).orientation == Orientation.landscape;

          // Calculate responsive values
          final double dialogHeight = isLandscape ? screenHeight * 0.9 : screenHeight * 0.8;
          final double dialogWidth =
          isDesktop(context)
              ? screenWidth / 1.8
              : isTablet(context)
              ? screenWidth * 0.8
              : screenWidth * 0.9;

          return Center(
            child: Material(
              color: Colors.transparent,
              child: Container(
                height: dialogHeight,
                width: dialogWidth,
                margin: EdgeInsets.symmetric(vertical: adaptiveSize(context, 20, 30, 40), horizontal: adaptiveSize(context, 10, 20, 30)),
                decoration: BoxDecoration(borderRadius: BorderRadius.circular(adaptiveSize(context, 10, 12, 15)), color: AppColors.white),
                child: Padding(
                  padding: EdgeInsets.all(adaptiveSize(context, 16, 24, 32)),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Spacer(flex: 1),
                      Expanded(
                        flex: 8,
                        child: SingleChildScrollView(
                          child: Column(
                            children: [
                              CircularPercentIndicator(
                                radius: adaptiveSize(context, 40, 50, 60),
                                lineWidth: adaptiveSize(context, 6, 8, 10),
                                percent: 0.2,
                                center: Icon(Icons.person, size: adaptiveSize(context, 30, 40, 50)),
                                progressColor: Colors.green,
                              ),
                              SizedBox(height: adaptiveSize(context, 50, 75, 100)),
                              buildResponsiveFields(context, controller),
                              SizedBox(height: adaptiveSize(context, 15, 20, 30)),
                            ],
                          ),
                        ),
                      ),
                      Spacer(flex: 1),
                      Center(
                        child: SizedBox(
                          width:
                          isDesktop(context)
                              ? 400
                              : isTablet(context)
                              ? 300
                              : 250,
                          child: ElevatedButton(
                            onPressed: () {
                              Get.offAllNamed(Routes.HOME);
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: AppColors.colorCheckBox,
                              padding: EdgeInsets.symmetric(vertical: adaptiveSize(context, 12, 14, 16), horizontal: adaptiveSize(context, 15, 20, 25)),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(25)),
                            ),
                            child: AppText(AppStrings.goToTheDashboard, fontSize: adaptiveFontSize(context, 16, 18, 20), color: AppColors.white, fontWeight: FontWeight.w500),
                          ),
                        ),
                      ),
                      Spacer(flex: 1),
                    ],
                  ),
                ),
              ),
            ),
          );
        },
      );
    }
  );
}

Widget buildResponsiveFields(BuildContext context, ProfileSetupController controller) {
  if (isDesktop(context)) {
    return buildDesktopFields(context, controller);
  } else {
    return buildMobileFields(context, controller);
  }
}

// Helper method to build mobile layout (Column)
Widget buildMobileFields(BuildContext context, ProfileSetupController controller) {
  return Column(
    children: [
      // Date of Birth field
      buildTextFieldObx(),

      SizedBox(height: 16),

      buildDOBObx(),

      SizedBox(height: 16),

      // Second dropdown

      // First dropdown
      Obx(
        () => CustomDropdown(
          options: controller.optionsForAge,
          selectedOption: controller.selectedOptionForAge.value,
          isDropdownOpen: controller.isDropdownOpenForAge.value,
          toggleDropdown: controller.toggleDropdownForAge,
          onOptionSelected: controller.selectOptionForAge,
          hintText: '* Age Group',
        ),
      ),

      SizedBox(height: 16),

      // Third dropdown

      // First dropdown
      Obx(
        () => CustomDropdown(
          options: controller.optionsForGoal,
          selectedOption: controller.selectedOptionForGoal.value,
          isDropdownOpen: controller.isDropdownOpenForGoal.value,
          toggleDropdown: controller.toggleDropdownForGoal,
          onOptionSelected: controller.selectOptionForGoal,
          hintText: '* Goal',
        ),
      ),
    ],
  );
}

// Helper method to build desktop/tablet layout (Rows)
Widget buildDesktopFields(BuildContext context, ProfileSetupController controller) {
  return Column(
    children: [
      // First row
      Row(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(child: buildTextFieldObx()),
          SizedBox(width: 16),
          Expanded(child: buildDOBObx()),
        ],
      ),

      SizedBox(height: 22),

      // Second row
      Row(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child:
            // First dropdown
            Obx(
              () => CustomDropdown(
                options: controller.optionsForAge,
                selectedOption: controller.selectedOptionForAge.value,
                isDropdownOpen: controller.isDropdownOpenForAge.value,
                toggleDropdown: controller.toggleDropdownForAge,
                onOptionSelected: controller.selectOptionForAge,
                hintText: '* Age Group',
              ),
            ),
          ),
          SizedBox(width: 16),
          Expanded(
            child:
            // First dropdown
            Obx(
              () => CustomDropdown(
                options: controller.optionsForGoal,
                selectedOption: controller.selectedOptionForGoal.value,
                isDropdownOpen: controller.isDropdownOpenForGoal.value,
                toggleDropdown: controller.toggleDropdownForGoal,
                onOptionSelected: controller.selectOptionForGoal,
                hintText: '* Goal',
              ),
            ),
          ),
        ],
      ),
    ],
  );
}

 buildTextFieldObx() {
  return TextField(
    cursorColor: AppColors.black,
    keyboardType: TextInputType.text,
    style: TextStyle(color: AppColors.takeQuickAssessmentColor.withOpacity(0.40), fontSize: 14, fontWeight: FontWeight.w500),
    decoration: InputDecoration(
      contentPadding: EdgeInsets.symmetric(horizontal: 20, vertical: 24),
      hintText: '* Child’s Name',
      hintStyle: TextStyle(color: AppColors.takeQuickAssessmentColor.withOpacity(0.40), fontSize: 14, fontWeight: FontWeight.w500),
      errorStyle: const TextStyle(color: Colors.red, fontSize: 12),
      disabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide(color: AppColors.takeQuickAssessmentColor.withOpacity(0.40))),
      focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide(color: AppColors.takeQuickAssessmentColor.withOpacity(0.40))),
      enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide(color: AppColors.takeQuickAssessmentColor.withOpacity(0.40))),
      errorBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: const BorderSide(color: Colors.red)),
      focusedErrorBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: const BorderSide(color: Colors.red, width: 1)),
    ),
  );
}
Obx buildDOBObx() {
  return Obx(
        () => TextField(
      cursorColor: AppColors.black,
      readOnly: true,
      keyboardType: TextInputType.visiblePassword,
      style: TextStyle(color: AppColors.takeQuickAssessmentColor.withOpacity(0.40), fontSize: 14, fontWeight: FontWeight.w500),
      decoration: InputDecoration(
        contentPadding: EdgeInsets.symmetric(horizontal: 20, vertical: 24),
        suffixIcon: IconButton(
          onPressed: () {
            chooseDate();
          },
          icon: Icon(Icons.date_range),
        ),
        hintText: selectedDate.value == null ? '* Date Of Birth' : formattedDate,
        hintStyle: TextStyle(color: AppColors.takeQuickAssessmentColor.withOpacity(0.40), fontSize: 14, fontWeight: FontWeight.w500),
        errorStyle: const TextStyle(color: Colors.red, fontSize: 12),
        disabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide(color: AppColors.takeQuickAssessmentColor.withOpacity(0.40))),
        focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide(color: AppColors.takeQuickAssessmentColor.withOpacity(0.40))),
        enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide(color: AppColors.takeQuickAssessmentColor.withOpacity(0.40))),
        errorBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: const BorderSide(color: Colors.red)),
        focusedErrorBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: const BorderSide(color: Colors.red, width: 1)),
      ),
    ),
  );
}

Rx<DateTime?> selectedDate = Rx<DateTime?>(null);
final dateFormat = DateFormat('yyyy-MM-dd');

String get formattedDate {
  return selectedDate.value != null ? dateFormat.format(selectedDate.value!) : 'Select Birthdate';
}

void chooseDate() async {
  DateTime? pickedDate = await showDatePicker(
    context: Get.context!,
    initialDate: selectedDate.value ?? DateTime.now(),
    firstDate: DateTime(1900),
    lastDate: DateTime.now(),
    helpText: 'SELECT BIRTHDATE',
    cancelText: 'CANCEL',
    confirmText: 'SELECT',
    builder: (context, child) {
      return Theme(
        data: ThemeData.light().copyWith(
          colorScheme: const ColorScheme.light(primary: Colors.blue, onPrimary: Colors.white, surface: Colors.white, onSurface: Colors.black),
          dialogBackgroundColor: Colors.white,
        ),
        child: child!,
      );
    },
  );

  if (pickedDate != null && pickedDate != selectedDate.value) {
    selectedDate.value = pickedDate;
  }
}
