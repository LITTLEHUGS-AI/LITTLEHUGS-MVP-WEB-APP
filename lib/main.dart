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
