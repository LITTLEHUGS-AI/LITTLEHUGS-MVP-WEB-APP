import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:webapplittlehugsmvp/app/constants/app_colors.dart';
import 'package:webapplittlehugsmvp/app/modules/home/views/home_view.dart';
import 'package:webapplittlehugsmvp/app/modules/login/views/login_view.dart';
import 'package:webapplittlehugsmvp/app/modules/personal_landing/views/personal_landing_view.dart';
import 'package:webapplittlehugsmvp/app/modules/signUp/views/signup_view.dart';
import 'package:webapplittlehugsmvp/app/modules/welcome/views/welcome_view.dart';
import 'package:webapplittlehugsmvp/app/widgets/appbar_widget.dart';
import '../../../constants/app_strings.dart';
import '../controllers/dash_board_controller.dart';

class DashBoardView extends GetView<DashBoardController> {
  const DashBoardView({super.key});
  @override
  Widget build(BuildContext context) {
    DashBoardController controller = Get.put(DashBoardController());
    final bool isMobile = controller.isMobile(context);
    final bool isTablet = controller.isTablet(context);
    final TabBarThemeData tabBarTheme = TabBarTheme.of(context);
    return GetBuilder(
      assignId: true,
      init: DashBoardController(),
      builder: (controller) {
        return Scaffold(
          backgroundColor: AppColors.white,
          appBar: buildAppBar(isMobile, context,screen: 'dashboard'),
          body: Navigator(
            initialRoute: '/personal-landing',
            onGenerateRoute: (settings) {
              Widget page;
              switch (settings.name) {
                case '/home':
                  page = HomeView();
                  break;
                case '/personal-landing':
                  page = PersonalLandingView();
                  break;
                case '/welcome':
                  page = WelcomeView();
                  break;
                case '/login':
                  page = LoginView();
                  break; case '/sign-up':
                  page = SignUpView();
                  break;
                default:
                  page = PersonalLandingView();
              }
              return MaterialPageRoute(builder: (_) => page);
            },
          ),
        );
      },
    );
  }
}
