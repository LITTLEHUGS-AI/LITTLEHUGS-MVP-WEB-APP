import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:webapplittlehugsmvp/app/constants/app_colors.dart';
import 'package:webapplittlehugsmvp/app/constants/app_strings.dart';
import 'package:webapplittlehugsmvp/app/modules/profile_setup/views/profile_setup_dropdown.dart';
import 'package:webapplittlehugsmvp/app/widgets/app_text.dart';

class ProfileSetupController extends GetxController {
  //TODO: Implement ProfileSetupController
  // Method to check if device is mobile
  bool isMobile(BuildContext context) => MediaQuery.of(context).size.width < 768;

  // Method to check if device is tablet
  bool isTablet(BuildContext context) => MediaQuery.of(context).size.width >= 768 && MediaQuery.of(context).size.width < 1200;

  // Method to check if device is desktop
  bool isDesktop(BuildContext context) => MediaQuery.of(context).size.width >= 1200;

  final selectedOptionForRole = "* I would describe my current life stage as".obs;
  final isDropdownOpenForRole = false.obs;

  final optionsForRole = ["", "I am Trying to Conceive", "I am Pregnant", "I have Post Partum Health Issues", "I hit menopause", "Prefer not to say"];

  void toggleDropdown() {
    isDropdownOpenForRole.value = !isDropdownOpenForRole.value;
  }

  void selectOption(String option) {
    selectedOptionForRole.value = option;
    isDropdownOpenForRole.value = false;
  }

  @override
  void onInit() {
    Future.delayed(Duration(seconds: 0)).then((_) {
      showDialog(
        context: Get.context!,
        useSafeArea: false,
        barrierDismissible: false,
        builder: (BuildContext context) {
          return womenAndChildProfileBuilder();
        },
      ).then((value) {});
    });
    // TODO: implement onInit
    super.onInit();
  }

  StatefulBuilder womenAndChildProfileBuilder() {
    return StatefulBuilder(
      builder: (context, setState) {
        return Material(
          child: Center(
            child: Container(
              height: Get.height,
              width: isDesktop(context) ? Get.width / 1.8 : Get.width - 40,
              margin: EdgeInsets.only(bottom: 50, top: 60),
              decoration: BoxDecoration(borderRadius: BorderRadius.circular(10), color: AppColors.white),
              child: Padding(
                padding: const EdgeInsets.all(32),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SizedBox(height: 100),

                    // First row/column of fields - Date picker and first dropdown
                    !isDesktop(context) ? buildMobileFields(context) : buildDesktopFields(context),

                    SizedBox(height: 30),
                    Spacer(),
                    // Button
                    Center(
                      child: SizedBox(
                        width: isDesktop(context) ? 400 : 250,
                        child: ElevatedButton(
                          onPressed: () {
                            Get.back();
                            Get.back();
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppColors.colorCheckBox,
                            padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 25),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(25)),
                          ),
                          child: AppText(AppStrings.goToTheDashboard, fontSize: 20, color: AppColors.white, fontWeight: FontWeight.w500),
                        ),
                      ),
                    ),
                    SizedBox(height: 100),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  // Helper method to build mobile layout (Column)
  Widget buildMobileFields(BuildContext context) {
    return Column(
      children: [
        // Date of Birth field
        buildTextFieldObx(),

        SizedBox(height: 16),

        // First dropdown
        CustomDropdown(),

        SizedBox(height: 16),

        // Second dropdown
        CustomDropdown(),

        SizedBox(height: 16),

        // Third dropdown
        CustomDropdown(),
      ],
    );
  }

  // Helper method to build desktop/tablet layout (Rows)
  Widget buildDesktopFields(BuildContext context) {
    return Column(
      children: [
        // First row
        Row(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [Expanded(child: buildTextFieldObx()), SizedBox(width: 16), Expanded(child: CustomDropdown())],
        ),

        SizedBox(height: 22),

        // Second row
        Row(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [Expanded(child: CustomDropdown()), SizedBox(width: 16), Expanded(child: CustomDropdown())],
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
        style: TextStyle(color: AppColors.takeQuickAssessmentColor.withOpacity(0.40), fontSize: 16, fontWeight: FontWeight.w500),
        decoration: InputDecoration(
          contentPadding: EdgeInsets.symmetric(horizontal: 20, vertical: 24),
          suffixIcon: IconButton(
            onPressed: () {
              chooseDate();
            },
            icon: Icon(Icons.date_range),
          ),
          hintText: selectedDate.value == null ? '* Date Of Birth' : formattedDate,
          hintStyle: TextStyle(color: AppColors.takeQuickAssessmentColor.withOpacity(0.40), fontSize: 16, fontWeight: FontWeight.w500),
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
}
