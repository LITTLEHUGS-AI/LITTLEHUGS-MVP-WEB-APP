import 'dart:math';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:webapplittlehugsmvp/app/constants/app_colors.dart';
import 'package:webapplittlehugsmvp/app/modules/signUp/controllers/auth_controller.dart';
import 'package:webapplittlehugsmvp/app/utils/responsive_utils.dart';
import 'package:webapplittlehugsmvp/app/widgets/app_text.dart';

class CountrySelectionDropdown extends StatelessWidget {
  final ResponsiveSize responsive;
  const CountrySelectionDropdown({super.key, required this.responsive});

  @override
  Widget build(BuildContext context) {
    // Use Get.find() to find the controller that's already initialized elsewhere
    final AuthController controller = Get.find<AuthController>();

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        // Selected country display with search box
        Obx(
          () => Container(
            decoration: BoxDecoration(
              border: Border.all(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25)),
              borderRadius: BorderRadius.vertical(top:  Radius.circular(responsive.radius(10)), bottom: Radius.circular(responsive.radius(controller.isDropdownOpenForCountry.value ? 0 : 10))),
            ),
            child: Material(
              color: Colors.transparent,
              child: InkWell(
                onTap: controller.toggleCountryDropdown,
                borderRadius: BorderRadius.vertical(top:  Radius.circular(responsive.radius(10)), bottom: Radius.circular(responsive.radius(controller.isDropdownOpenForCountry.value ? 0 : 10))),
                child: Padding(
                  padding:  EdgeInsets.symmetric(horizontal: responsive.width(16.0), vertical: responsive.height(12.0)),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        child:
                            controller.isDropdownOpenForCountry.value
                                ? TextField(
                                  controller: controller.countrySearchController,
                                  onChanged: controller.filterCountries,
                                  decoration: InputDecoration(
                                    hintText: '* country',
                                    hintStyle: TextStyle(
                                      color: AppColors.takeQuickAssessmentColor.withOpacity(0.25),
                                      fontSize: responsive.fontSize(16),
                                      fontWeight: FontWeight.w500,
                                    ),
                                    border: InputBorder.none,
                                    isDense: true,
                                    contentPadding: EdgeInsets.zero,
                                  ),
                                  style: TextStyle(color: AppColors.takeQuickAssessmentColor.withOpacity(0.25), fontSize: responsive.fontSize(16), fontWeight: FontWeight.w500),
                                )
                                : AppText(
                                  controller.selectedCountry.value.isEmpty ? '* country' : controller.selectedCountry.value,
                                  color: AppColors.takeQuickAssessmentColor.withOpacity(0.25),
                                  fontSize: responsive.fontSize(16),
                                  fontWeight: FontWeight.w500,
                                ),
                      ),
                      AnimatedRotation(
                        turns: controller.isDropdownOpenForCountry.value ? 0.5 : 0.0,
                        duration: const Duration(milliseconds: 200),
                        child: Icon(Icons.keyboard_arrow_down, color: Colors.grey.shade700),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),

        // Dropdown list of countries
        Obx(
          () => AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            curve: Curves.easeInOut,
            height:
                controller.isDropdownOpenForCountry.value
                    ? min(44.0 * 5, controller.filteredCountries.length * 44.0) // Show max 5 items at once
                    : 0,
            child: Container(
              decoration: BoxDecoration(
                border: Border(
                  left: BorderSide(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25)),
                  right: BorderSide(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25)),
                  bottom: BorderSide(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25)),
                ),
                borderRadius:  BorderRadius.vertical(bottom: Radius.circular(responsive.radius(10))),
              ),
              child: ListView.builder(
                padding: EdgeInsets.zero,
                shrinkWrap: true,
                itemCount: controller.filteredCountries.length,
                itemBuilder: (context, index) {
                  final country = controller.filteredCountries[index];
                  return Material(
                    color: Colors.transparent,
                    child: InkWell(
                      onTap: () => controller.selectCountry(country),
                      child: Container(
                        width: double.infinity,
                        height: responsive.height(40.0), // Fixed height for consistent animation
                        padding:  EdgeInsets.symmetric(horizontal: responsive.width(16.0), vertical: responsive.height(5.0)),
                        decoration: BoxDecoration(border: Border(top: index == 0 ? BorderSide.none : BorderSide(color: Colors.grey.shade300))),
                        child: AppText(country, color: AppColors.colorHintTextField, fontSize: responsive.fontSize(15), fontWeight: FontWeight.w500),
                      ),
                    ),
                  );
                },
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class CustomRoleSelectionDropdown extends StatelessWidget {
  final ResponsiveSize responsive;
  const CustomRoleSelectionDropdown({super.key, required this.responsive});

  @override
  Widget build(BuildContext context) {
    // Move controller initialization outside of build method or use Get.find()
    // if the controller is already initialized elsewhere
    final AuthController controller = Get.find<AuthController>();

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        // First Obx wrapper
        Obx(
          () => Container(
            decoration: BoxDecoration(
              border: Border.all(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25)),
              borderRadius: BorderRadius.vertical(top:  Radius.circular(responsive.radius(10)), bottom: Radius.circular(responsive.radius(controller.isDropdownOpenForRole.value ? 0 : 10))),
            ),
            child: Material(
              color: Colors.transparent,
              child: InkWell(
                onTap: controller.toggleDropdown,
                borderRadius: BorderRadius.vertical(top:  Radius.circular(responsive.radius(10)), bottom: Radius.circular(responsive.radius(controller.isDropdownOpenForRole.value ? 0 : 10))),
                child: Padding(
                  padding:  EdgeInsets.symmetric(horizontal: responsive.width(16.0), vertical: responsive.height(12.0)),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      AppText(controller.selectedOptionForRole.value, color: AppColors.takeQuickAssessmentColor.withOpacity(0.25), fontSize: responsive.fontSize(16), fontWeight: FontWeight.w500),
                      AnimatedRotation(
                        turns: controller.isDropdownOpenForRole.value ? 0.5 : 0.0,
                        duration: const Duration(milliseconds: 200),
                        child: Icon(Icons.keyboard_arrow_down, color: Colors.grey.shade700),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),

        // Second Obx wrapper - separate from animation container
        Obx(
          () => AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            curve: Curves.easeInOut,
            height:
                controller.isDropdownOpenForRole.value
                    ? (controller.optionsForRole.length - 1) *
                        44.0 // Height per option
                    : 0,
            child: SingleChildScrollView(
              physics: const NeverScrollableScrollPhysics(),
              child: Container(
                decoration: BoxDecoration(
                  border: Border(
                    left: BorderSide(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25)),
                    right: BorderSide(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25)),
                    bottom: BorderSide(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.25)),
                  ),
                  borderRadius:  BorderRadius.vertical(bottom: Radius.circular(responsive.radius(10))),
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    for (int i = 1; i < controller.optionsForRole.length; i++)
                      Material(
                        color: Colors.transparent,
                        child: InkWell(
                          onTap: () => controller.selectOption(controller.optionsForRole[i]),
                          child: Container(
                            width: double.infinity,
                            height: responsive.height(40.0), // Fixed height for consistent animation
                            padding:  EdgeInsets.symmetric(horizontal: responsive.width(16.0), vertical: responsive.height(5.0)),
                            decoration: BoxDecoration(border: Border(top: BorderSide(color: Colors.grey.shade300))),
                            child: AppText(controller.optionsForRole[i], color:AppColors.colorHintTextField, fontSize: responsive.fontSize(15), fontWeight: FontWeight.w500),
                          ),
                        ),
                      ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
