// import 'package:flutter/material.dart';
// import 'package:flutter/services.dart';
// import 'package:flutter_screenutil/flutter_screenutil.dart';
// import 'package:get/get.dart';
// import 'package:responsive_builder/responsive_builder.dart';
// import 'app/routes/app_pages.dart';
//
// void main() {
//   WidgetsFlutterBinding.ensureInitialized();
//   SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(statusBarColor: Colors.transparent));
//   runApp(
//     ResponsiveBuilder(
//       builder: (context, sizingInformation) {
//         if (sizingInformation.deviceScreenType == DeviceScreenType.desktop) {
//           return screenUtilInit(sizingInformation.screenSize.height, sizingInformation.screenSize.width);
//         }
//
//         if (sizingInformation.deviceScreenType == DeviceScreenType.tablet) {
//           return screenUtilInit(sizingInformation.screenSize.height, sizingInformation.screenSize.width);
//         }
//         return ScreenUtilInit(
//           designSize: const Size(360, 800),
//           minTextAdapt: true,
//           splitScreenMode: true,
//           builder: (_, child) {
//             return getMaterialApp(child);
//           },
//         );
//       },
//     ),
//   );
// }
//
// ScreenUtilInit screenUtilInit(h, w) {
//   return ScreenUtilInit(
//     designSize: Size(w, h),
//     minTextAdapt: true,
//     splitScreenMode: true,
//     enableScaleWH: (){
//       return false;
//     },
//     // ensureScreenSize: true,
//     enableScaleText: (){
//       return false;
//     },
//     builder: (_, child) {
//       return getMaterialApp(child);
//     },
//   );
// }
//
// GetMaterialApp getMaterialApp(Widget? child) => GetMaterialApp(
//   title: "LittleHugs WebApp",
//   initialRoute: AppPages.INITIAL,
//   getPages: AppPages.routes,
//   home: child,
//   debugShowCheckedModeBanner: false,
//   // theme: ThemeData(useMaterial3: false),
// );

// lib/main.dart





import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:webapplittlehugsmvp/app/modules/home/views/home_view.dart';
import 'package:webapplittlehugsmvp/app/routes/app_pages.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(statusBarColor: Colors.transparent));
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(title: 'LittleHugs WebApp', initialRoute: AppPages.INITIAL, getPages: AppPages.routes, home: HomeView(), debugShowCheckedModeBanner: false);
  }
}
