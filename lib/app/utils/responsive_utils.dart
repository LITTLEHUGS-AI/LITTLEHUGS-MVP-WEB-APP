import 'package:get/get.dart';

class ResponsiveUtils {
  static double screenWidth = Get.width;
  static double screenHeight = Get.height;

  // Width multipliers for different screen sizes
  static double get width {
    if (screenWidth > 1200) return 1.2;
    if (screenWidth > 800) return 1.0;
    if (screenWidth > 600) return 0.8;
    return 0.6;
  }

  // Height multipliers for different screen sizes
  static double get height {
    if (screenHeight > 800) return 1.2;
    if (screenHeight > 600) return 1.0;
    return 0.8;
  }

  // Font size multipliers
  static double get fontSize {
    if (screenWidth > 1200) return 1.2;
    if (screenWidth > 800) return 1.0;
    if (screenWidth > 600) return 0.9;
    return 0.8;
  }

  // Padding multipliers
  static double get padding {
    if (screenWidth > 1200) return 1.2;
    if (screenWidth > 800) return 1.0;
    return 0.8;
  }
}