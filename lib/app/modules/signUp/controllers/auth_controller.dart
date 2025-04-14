import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:webapplittlehugsmvp/app/routes/app_pages.dart';

class AuthController extends GetxController {
  final nameController = TextEditingController();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  final isPasswordVisible = false.obs;
  final selectedPurpose = ''.obs;
  final agreedToTerms = false.obs;

  final purposes = ['Personal Use', 'Professional Use'];

  late final TapGestureRecognizer termsGestureRecognizer;
  late final TapGestureRecognizer privacyGestureRecognizer;

  @override
  void onInit() {
    super.onInit();
    filteredCountries.assignAll(countries);

    // Add this to dispose the text controller when the controller is disposed
    ever(isDropdownOpenForCountry, (isOpen) {
      if (!isOpen) {
        countrySearchController.clear();
        filteredCountries.assignAll(countries);
      }
    });
    termsGestureRecognizer = TapGestureRecognizer()..onTap = openTerms;
    privacyGestureRecognizer = TapGestureRecognizer()..onTap = openPrivacyPolicy;
  }

  @override
  void onClose() {
    countrySearchController.dispose();
    nameController.dispose();
    emailController.dispose();
    passwordController.dispose();
    termsGestureRecognizer.dispose();
    privacyGestureRecognizer.dispose();
    super.onClose();
  }

  void togglePasswordVisibility() {
    isPasswordVisible.value = !isPasswordVisible.value;
  }

  void goToSignIn() {
    Get.toNamed(Routes.LOGIN);
    // Implement navigation to sign in page
  }

  void createAccount() {
    // Implement account creation logic
  }

  void signInWithGoogle() {
    // Implement Google sign in
  }

  void signInWithApple() {
    // Implement Apple sign in
  }

  void openTerms() {
    // Open terms and conditions
  }

  void openPrivacyPolicy() {
    // Open privacy policy
  }
  // Add these to your controller class
  final RxString nameError = ''.obs;

  void validateName(String name) {
    if (name.isEmpty) {
      nameError.value = "Name cannot be empty";
    } else if (name.length < 2) {
      nameError.value = "Name must be at least 2 characters long";
    } else if (name.length > 50) {
      nameError.value = "Name cannot exceed 50 characters";
    } else if (!RegExp(r'^[a-zA-Z\s]+$').hasMatch(name)) {
      nameError.value = "Name should only contain letters and spaces";
    } else {
      nameError.value = "";
    }
  }

  // You can also check on form submission
  bool isNameValid() {
    validateName(nameController.text);
    return nameError.value.isEmpty;
  }

  // Add these to your controller class
  final RxString passwordError = ''.obs;

  void validatePassword(String password) {
    if (password.isEmpty) {
      passwordError.value = "Password cannot be empty";
    } else if (password.length < 8) {
      passwordError.value = "Password must be at least 8 characters long";
    } else if (!password.contains(RegExp(r'[A-Z]'))) {
      passwordError.value = "Password must contain at least one uppercase letter";
    } else if (!password.contains(RegExp(r'[a-z]'))) {
      passwordError.value = "Password must contain at least one lowercase letter";
    } else if (!password.contains(RegExp(r'[0-9]'))) {
      passwordError.value = "Password must contain at least one number";
    } else if (!password.contains(RegExp(r'[!@#$%^&*(),.?":{}|<>]'))) {
      passwordError.value = "Password must contain at least one special character";
    } else {
      passwordError.value = "";
    }
  }

  // You can also check on form submission
  bool isPasswordValid() {
    validatePassword(passwordController.text);
    return passwordError.value.isEmpty;
  }

  // Add these to your controller class
  final RxString emailError = ''.obs;

  void validateEmail(String email) {
    // Regular expression for email validation
    final emailRegex = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');

    if (email.isEmpty) {
      emailError.value = "Email cannot be empty";
    } else if (!emailRegex.hasMatch(email)) {
      emailError.value = "Please enter a valid email address";
    } else {
      emailError.value = "";
    }
  }

  // You can also check on form submission
  bool isEmailValid() {
    validateEmail(emailController.text);
    return emailError.value.isEmpty;
  }

  final selectedOptionForRole = "I am here for".obs;
  final isDropdownOpenForRole = false.obs;

  final optionsForRole = ["I am here for", "Personal Plan", "Professional Plan"];

  void toggleDropdown() {
    isDropdownOpenForRole.value = !isDropdownOpenForRole.value;
  }

  void selectOption(String option) {
    selectedOptionForRole.value = option;
    isDropdownOpenForRole.value = false;
  }

  final selectedOptionForCountry = "Country".obs;
  final isDropdownOpenForCountry = false.obs;


  void toggleDropdownForCountry() {
    isDropdownOpenForCountry.value = !isDropdownOpenForCountry.value;
  }

  void selectOptionForCountry(String option) {
    selectedOptionForCountry.value = option;
    isDropdownOpenForCountry.value = false;
  }

  final TextEditingController countrySearchController = TextEditingController();
  final RxString selectedCountry = ''.obs;

  // List of countries - you can replace this with your complete list
  final List<String> countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
    'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain',
    'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
    'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria',
    'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada',
    'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros',
    'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark',
    'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador',
    'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji',
    'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece',
    'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras',
    'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel',
    'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati',
    'Korea, North', 'Korea, South', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos',
    'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania',
    'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta',
    'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova',
    'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia',
    'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria',
    'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama',
    'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
    'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia',
    'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe',
    'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore',
    'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan',
    'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
    'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga',
    'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda',
    'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay',
    'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen',
    'Zambia', 'Zimbabwe'
  ];

  // Filtered countries based on search
  RxList<String> filteredCountries = <String>[].obs;


  // Toggle the country dropdown
  void toggleCountryDropdown() {
    isDropdownOpenForCountry.value = !isDropdownOpenForCountry.value;
  }

  // Filter countries based on search text
  void filterCountries(String query) {
    if (query.isEmpty) {
      filteredCountries.assignAll(countries);
    } else {
      filteredCountries.assignAll(
          countries.where((country) =>
              country.toLowerCase().contains(query.toLowerCase())
          ).toList()
      );
    }
  }

  // Select a country
  void selectCountry(String country) {
    selectedCountry.value = country;
    isDropdownOpenForCountry.value = false;
  }




}
