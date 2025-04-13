import 'package:flutter/material.dart';
import 'package:webapplittlehugsmvp/app/constants/app_colors.dart';
import 'package:webapplittlehugsmvp/app/widgets/app_text.dart';

class TextFieldCustom extends StatelessWidget {
  final double borderRadius;
  final TextInputType keyboardType;
  final TextEditingController controller;
  final String hintText;
  final String displayText;
  const TextFieldCustom({super.key, required this.borderRadius, required this.keyboardType, required this.hintText, required this.controller, required this.displayText});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Visibility(
          visible: displayText != '',
          child: Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: AppText(displayText, color: AppColors.colorBlack, fontSize: 14, textAlign: TextAlign.start, fontWeight: FontWeight.w500),
          ),
        ),
        ClipRRect(
          borderRadius: BorderRadius.circular(borderRadius),
          child: SizedBox(
            // height: 48.h,
            child: TextField(
              controller: controller,
              keyboardType: TextInputType.number,
              style: TextStyle(color: AppColors.colorHintTextField.withValues(alpha: 0.75), fontWeight: FontWeight.w500, fontSize: 14),
              decoration: InputDecoration(
                border: InputBorder.none,
                fillColor: AppColors.fieldBgColor,
                filled: true,
                hintText: hintText,
                hintStyle: TextStyle(color: AppColors.colorHintTextField.withValues(alpha: 0.75), fontWeight: FontWeight.w500, fontSize: 14),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
