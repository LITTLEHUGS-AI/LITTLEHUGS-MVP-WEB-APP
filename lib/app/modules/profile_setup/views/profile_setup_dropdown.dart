import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:webapplittlehugsmvp/app/constants/app_colors.dart';
import 'package:webapplittlehugsmvp/app/modules/profile_setup/controllers/profile_setup_controller.dart';
import 'package:webapplittlehugsmvp/app/widgets/app_text.dart';

class CustomDropdown extends StatelessWidget {
  const CustomDropdown({super.key});

  @override
  Widget build(BuildContext context) {
    // Move controller initialization outside of build method or use Get.find()
    // if the controller is already initialized elsewhere
    final ProfileSetupController controller = Get.find<ProfileSetupController>();

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        // First Obx wrapper
        Obx(
          () => Container(
            height: 65,
            decoration: BoxDecoration(
              border: Border.all(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.40)),
              borderRadius: BorderRadius.vertical(top: const Radius.circular(10), bottom: Radius.circular(controller.isDropdownOpenForRole.value ? 0 : 10)),
            ),
            child: InkWell(
              onTap: controller.toggleDropdown,
              borderRadius: BorderRadius.vertical(top: const Radius.circular(10), bottom: Radius.circular(controller.isDropdownOpenForRole.value ? 0 : 10)),
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    AppText(controller.selectedOptionForRole.value, color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.40), fontSize: 16, fontWeight: FontWeight.w500),
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
                    left: BorderSide(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.40)),
                    right: BorderSide(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.40)),
                    bottom: BorderSide(color: AppColors.takeQuickAssessmentColor.withValues(alpha: 0.40)),
                  ),
                  borderRadius: const BorderRadius.vertical(bottom: Radius.circular(10)),
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
                            height: 44.0, // Fixed height for consistent animation
                            padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
                            decoration: BoxDecoration(border: Border(top: BorderSide(color: Colors.grey.shade300))),
                            child: AppText(controller.optionsForRole[i], color: AppColors.colorHintTextField, fontSize: 15, fontWeight: FontWeight.w500),
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
