import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:webapplittlehugsmvp/app/constants/app_images.dart';

appLogoWidget() => SvgPicture.asset(AppImages.logo, height: 40);
//TODO: Implement ProfileSetupController
// Method to check if device is mobile
bool isMobile(BuildContext context) => MediaQuery.of(context).size.width < 768;

// Method to check if device is tablet
bool isTablet(BuildContext context) => MediaQuery.of(context).size.width >= 768 && MediaQuery.of(context).size.width < 1200;

// Method to check if device is desktop
bool isDesktop(BuildContext context) => MediaQuery.of(context).size.width >= 1200;

// Adaptive sizing based on device type
double adaptiveSize(BuildContext context, double mobileSize, double tabletSize, double desktopSize) {
 if (isDesktop(context)) return desktopSize;
 if (isTablet(context)) return tabletSize;
 return mobileSize;
}

// Adaptive font sizing
double adaptiveFontSize(BuildContext context, double mobileSize, double tabletSize, double desktopSize) {
 if (isDesktop(context)) return desktopSize;
 if (isTablet(context)) return tabletSize;
 return mobileSize;
}