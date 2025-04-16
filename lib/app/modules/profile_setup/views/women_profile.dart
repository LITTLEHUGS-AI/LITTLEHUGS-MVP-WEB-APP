import 'dart:io';

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

womenProfileBuilder() {
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
                              InkWell(
                                onTap: () {
                                  controller.pickImageFromGallery();
                                },
                                child: CircularPercentIndicator(
                                  radius: adaptiveSize(context, 40, 50, 60),
                                  lineWidth: adaptiveSize(context, 6, 8, 10),
                                  percent: 23 / 100,
                                  progressBorderColor: AppColors.borderColor,
                                  center: CircleAvatar(
                                    radius: adaptiveSize(context, 30, 40, 50),
                                    backgroundColor: AppColors.colorHintTextField,
                                    child:
                                        controller.webImageUrl != null
                                            ? ClipRRect(
                                              borderRadius: BorderRadius.circular(100),
                                              child: CircleAvatar(
                                                radius: adaptiveSize(context, 20, 30, 40),
                                                backgroundColor: AppColors.colorHintTextField,
                                                child: Image.network(controller.webImageUrl!, fit: BoxFit.cover),
                                              ),
                                            )
                                            : CircleAvatar(
                                              radius: adaptiveSize(context, 20, 30, 40),
                                              backgroundColor: AppColors.colorHintTextField,
                                              child: Icon(Icons.person, size: adaptiveSize(context, 20, 30, 40), color: AppColors.white),
                                            ),
                                  ),

                                  progressColor: AppColors.secondaryOrange,
                                ),
                              ),
                              SizedBox(height: 4),
                              AppText('23% Completed', fontSize: 14, color: AppColors.colorHintTextField, fontWeight: FontWeight.w600),
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
    },
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

      // First dropdown
      Obx(
        () => CustomDropdown(
          options: controller.optionsForRole,
          selectedOption: controller.selectedOptionForRole.value,
          isDropdownOpen: controller.isDropdownOpenForRole.value,
          toggleDropdown: controller.toggleDropdownForRole,
          onOptionSelected: controller.selectOptionForRole,
          hintText: '* I would describe my current life stage as',
        ),
      ),

      SizedBox(height: 16),

      // Second dropdown

      // First dropdown
      Obx(
        () => CustomDropdown(
          options: controller.optionsForSubject,
          selectedOption: controller.selectedOptionForSubject.value,
          isDropdownOpen: controller.isDropdownOpenForSubject.value,
          toggleDropdown: controller.toggleDropdownForSubject,
          onOptionSelected: controller.selectOptionForSubject,
          hintText: '* My intent is to work on my',
        ),
      ),

      SizedBox(height: 16),

      // Third dropdown

      // First dropdown
      Obx(
        () => CustomDropdown(
          options: controller.optionsForGrade,
          selectedOption: controller.selectedOptionForGrade.value,
          isDropdownOpen: controller.isDropdownOpenForGrade.value,
          toggleDropdown: controller.toggleDropdownForGrade,
          onOptionSelected: controller.selectOptionForGrade,
          hintText: '* Tone Preference',
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
          Expanded(
            child:
            // First dropdown
            Obx(
              () => CustomDropdown(
                options: controller.optionsForRole,
                selectedOption: controller.selectedOptionForRole.value,
                isDropdownOpen: controller.isDropdownOpenForRole.value,
                toggleDropdown: controller.toggleDropdownForRole,
                onOptionSelected: controller.selectOptionForRole,
                hintText: '* I would describe my current life stage as',
              ),
            ),
          ),
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
                options: controller.optionsForSubject,
                selectedOption: controller.selectedOptionForSubject.value,
                isDropdownOpen: controller.isDropdownOpenForSubject.value,
                toggleDropdown: controller.toggleDropdownForSubject,
                onOptionSelected: controller.selectOptionForSubject,
                hintText: '* My intent is to work on my',
              ),
            ),
          ),
          SizedBox(width: 16),
          Expanded(
            child:
            // First dropdown
            Obx(
              () => CustomDropdown(
                options: controller.optionsForGrade,
                selectedOption: controller.selectedOptionForGrade.value,
                isDropdownOpen: controller.isDropdownOpenForGrade.value,
                toggleDropdown: controller.toggleDropdownForGrade,
                onOptionSelected: controller.selectOptionForGrade,
                hintText: '* Tone Preference',
              ),
            ),
          ),
        ],
      ),
    ],
  );
}

Obx buildTextFieldObx() {
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
