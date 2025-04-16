import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:webapplittlehugsmvp/app/modules/profile_setup/views/child_profile.dart';
import 'package:webapplittlehugsmvp/app/modules/profile_setup/views/women_profile.dart';
import 'dart:html' as html;

class ProfileSetupController extends GetxController {
  // for women
  final RxString selectedOptionForRole = ''.obs;
  final RxBool isDropdownOpenForRole = false.obs;
  final List<String> optionsForRole = ["I am Trying to Conceive", "I am Pregnant", "I have Post Partum Health Issues", "I hit menopause", "Prefer not to say"];

  // For second dropdown (Subject)
  final RxString selectedOptionForSubject = ''.obs;
  final RxBool isDropdownOpenForSubject = false.obs;
  final List<String> optionsForSubject = ['Sleep', 'Hormones', 'Fatigue', 'Self Care', 'Anxiety'];

  // For third dropdown (Grade)
  final RxString selectedOptionForGrade = ''.obs;
  final RxBool isDropdownOpenForGrade = false.obs;
  final List<String> optionsForGrade = ['Reassuring', 'Motivational', 'Calming', 'Neutral'];

  // Toggle functions for each dropdown
  void toggleDropdownForRole() {
    isDropdownOpenForRole.value = !isDropdownOpenForRole.value;
    // Close other dropdowns
    isDropdownOpenForSubject.value = false;
    isDropdownOpenForGrade.value = false;
  }

  void toggleDropdownForSubject() {
    isDropdownOpenForSubject.value = !isDropdownOpenForSubject.value;
    // Close other dropdowns
    isDropdownOpenForRole.value = false;
    isDropdownOpenForGrade.value = false;
  }

  void toggleDropdownForGrade() {
    isDropdownOpenForGrade.value = !isDropdownOpenForGrade.value;
    // Close other dropdowns
    isDropdownOpenForRole.value = false;
    isDropdownOpenForSubject.value = false;
  }

  // Selection functions for each dropdown
  void selectOptionForRole(String option) {
    selectedOptionForRole.value = option;
    isDropdownOpenForRole.value = false;
  }

  void selectOptionForSubject(String option) {
    selectedOptionForSubject.value = option;
    isDropdownOpenForSubject.value = false;
  }

  void selectOptionForGrade(String option) {
    selectedOptionForGrade.value = option;
    isDropdownOpenForGrade.value = false;
  }

  // for child
  final RxString selectedOptionForAge = ''.obs;
  final RxBool isDropdownOpenForAge = false.obs;
  final List<String> optionsForAge = ["0 - 12 months", "1 - 3 years", "3 - 6 years", "6 - 12 years", "13 - 16 years"];

  // For second dropdown (Subject)
  final RxString selectedOptionForGoal = ''.obs;
  final RxBool isDropdownOpenForGoal = false.obs;
  final List<String> optionsForGoal = [
    'Developmental Milestones',
    'Attention, social, or learning differences',
    'Emotional Wellbeing & Mental Health',
    'Growth, Nutrition & Physical Health',
  ];
  // Toggle functions for each dropdown
  void toggleDropdownForAge() {
    isDropdownOpenForAge.value = !isDropdownOpenForAge.value;
    // Close other dropdowns
    isDropdownOpenForGoal.value = false;
  }

  void toggleDropdownForGoal() {
    isDropdownOpenForGoal.value = !isDropdownOpenForGoal.value;
    // Close other dropdowns
    isDropdownOpenForAge.value = false;
  }

  // Selection functions for each dropdown
  void selectOptionForAge(String option) {
    selectedOptionForAge.value = option;
    isDropdownOpenForAge.value = false;
  }

  void selectOptionForGoal(String option) {
    selectedOptionForGoal.value = option;
    isDropdownOpenForGoal.value = false;
  }

  @override
  void onInit() {
    if (Get.arguments != null) {
      if (Get.arguments['page'] == 'Women') {
        Future.delayed(Duration(seconds: 0)).then((_) {
          showDialog(
            context: Get.context!,
            barrierDismissible: false,
            builder: (BuildContext context) {
              return womenProfileBuilder();
            },
          ).then((value) {});
        });
      } else if (Get.arguments['page'] == 'Child') {
        Future.delayed(Duration(seconds: 0)).then((_) {
          showDialog(
            context: Get.context!,
            barrierDismissible: false,
            builder: (BuildContext context) {
              return childProfileBuilder();
            },
          ).then((value) {});
        });
      }
    } else {
      Future.delayed(Duration(seconds: 0)).then((_) {
        showDialog(
          context: Get.context!,
          barrierDismissible: false,
          builder: (BuildContext context) {
            return womenProfileBuilder();
          },
        ).then((value) {});
      });
    }
    // TODO: implement onInit
    super.onInit();
  }

  // Store the selected image
  XFile? selectedImage;
  final ImagePicker _picker = ImagePicker();
  String? webImageUrl;

  // Method to pick image from gallery
  Future<void> pickImageFromGallery() async {
    try {
      final XFile? pickedFile = await _picker.pickImage(source: ImageSource.gallery);

      if (pickedFile != null) {
        selectedImage = pickedFile;
        _createWebImageUrl(pickedFile);
        update();
      }
    } catch (e) {
      debugPrint('Error picking image: $e');
    }
  }
// Create a proper URL for web images
  Future<void> _createWebImageUrl(XFile pickedFile) async {
      // Read the file as bytes
      final bytes = await pickedFile.readAsBytes();

      // Create a blob URL for the image data
      final blob = html.Blob([bytes]);
      webImageUrl = html.Url.createObjectUrlFromBlob(blob);
      update();
    }
}
