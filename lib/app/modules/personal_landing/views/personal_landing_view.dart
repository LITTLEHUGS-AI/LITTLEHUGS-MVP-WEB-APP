
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:webapplittlehugsmvp/app/constants/app_colors.dart';
import 'package:webapplittlehugsmvp/app/constants/app_images.dart';
import 'package:webapplittlehugsmvp/app/constants/app_strings.dart';
import 'package:webapplittlehugsmvp/app/modules/personal_landing/controllers/personal_landing_controller.dart';
import 'package:webapplittlehugsmvp/app/widgets/app_text.dart';
import 'package:webapplittlehugsmvp/app/widgets/appbar_widget.dart';

class PersonalLandingView extends GetView<PersonalLandingController> {
  const PersonalLandingView({super.key});
  @override
  Widget build(BuildContext context) {
    PersonalLandingController controller = Get.put(PersonalLandingController());
    final bool isMobile = controller.isMobile(context);
    final bool isTablet = controller.isTablet(context);
    final TabBarThemeData tabBarTheme = TabBarTheme.of(context);
    return Scaffold(
      backgroundColor: AppColors.white,
      appBar: buildAppBar(isMobile, context,screen: 'personal'),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: EdgeInsets.symmetric(
                horizontal:
                isMobile
                    ? 16
                    : isTablet
                    ? 32
                    : 64,
                vertical: 32,
              ),
              width: Get.width,
              color: AppColors.lightOrangeColor,
              child: Row(
                children: [
                  Expanded(
                    flex: isMobile ? 1 : 1,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        AppText(AppStrings.aHugForEveryStageOfLife, color: AppColors.colorHintTextField, fontSize: 48, textAlign: TextAlign.start, fontWeight: FontWeight.w500),
                        SizedBox(height: 20),
                        AppText(AppStrings.aHugForEveryStageOfLifeDesc, color: AppColors.colorHintTextField, fontSize: 14, textAlign: TextAlign.start, fontWeight: FontWeight.w400),
                        SizedBox(height: 20),
                        SizedBox(
                          height: 52,
                          width: 150,
                          child: Card(
                            elevation: 0.0,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
                            color: AppColors.takeQuickAssessmentColor,
                            margin: EdgeInsets.zero,
                            child: InkWell(
                              borderRadius: BorderRadius.circular(30),
                              overlayColor: tabBarTheme.overlayColor,
                              splashFactory: tabBarTheme.splashFactory,
                              onTap: () {},
                              child: Center(child: AppText(AppStrings.tryForFree, color: AppColors.white, fontSize: 20, textAlign: TextAlign.center, fontWeight: FontWeight.w500)),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  if (!isMobile) ...[SizedBox(width: 32), Expanded(flex: 1, child: SvgPicture.asset(AppImages.homeLifeImage, height: 300))],
                ],
              ),
            ),
            // Category Selection
            Center(
              child: Padding(
                padding: EdgeInsets.all(isMobile ? 16 : 32),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    SizedBox(height: 30),
                    AppText(AppStrings.whatHugDoYouNeedToday, color: AppColors.colorHintTextField, fontSize: 32, textAlign: TextAlign.center, fontWeight: FontWeight.w600),
                    SizedBox(height: 24),
                    Wrap(
                      spacing: 16,
                      runSpacing: 16,
                      alignment: WrapAlignment.center,
                      children: [
                        CategoryDropdown(title: AppStrings.womenHealthWellness, isSelected: true, onTap: () => controller.updateCategory("Women's Health & Wellness")),
                        CategoryDropdown(title: AppStrings.childDevelopmentGrowth, isSelected: false, onTap: () => controller.updateCategory("Child's Development & Growth")),
                      ],
                    ),
                    SizedBox(height: 20),
                    // Illustration Section
                    Wrap(
                      spacing: 32,
                      runSpacing: 32,
                      alignment: WrapAlignment.center,
                      children: [Image.asset(AppImages.womenImage, height: 480), Image.asset(AppImages.childImage, height: 480)],
                    ),
                  ],
                ),
              ),
            ),

            // Features Section
            Center(
              child: Padding(
                padding: EdgeInsets.all(isMobile ? 16 : 32),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    AppText(AppStrings.howOurWarmHugWillHelpYou, color: AppColors.colorHintTextField, fontSize: 30, textAlign: TextAlign.center, fontWeight: FontWeight.w700),
                    SizedBox(height: 30),
                    Wrap(
                      spacing: 16,
                      runSpacing: 16,
                      alignment: WrapAlignment.center,
                      children: [
                        FeatureCard(title: AppStrings.personalizedProfile, onTap: () {}),
                        FeatureCard(title: AppStrings.smartPreScreening, onTap: () {}),
                        FeatureCard(title: AppStrings.instantInsights, onTap: () {}),
                        FeatureCard(title: AppStrings.dailySupport, onTap: () {}),
                      ],
                    ),
                  ],
                ),
              ),
            ),

            // Assessment Categories
            Container(
              padding: EdgeInsets.all(isMobile ? 16 : 32),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      AppText(
                        'Empowering Every Woman—With or Without a Child',
                        color: AppColors.colorHintTextField,
                        fontSize: 30,
                        textAlign: TextAlign.center,
                        fontWeight: FontWeight.w700,
                      ),
                      SizedBox(width: 20),
                      Switch(value: true, onChanged: (val) {}, activeColor: Theme.of(context).primaryColor),
                    ],
                  ),
                  SizedBox(height: 24),
                  GridView.builder(
                    shrinkWrap: true,
                    physics: NeverScrollableScrollPhysics(),
                    gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount:
                      isMobile
                          ? 2
                          : isTablet
                          ? 3
                          : 5,
                      crossAxisSpacing: 16,
                      mainAxisSpacing: 16,
                      childAspectRatio: 1.5,
                    ),
                    itemCount: 4,
                    itemBuilder: (context, index) {
                      List<Map<String, String>> assessments = [
                        {'title': 'AI 360 Wellness Assessment', 'action': 'Explore more'},
                        {'title': 'Self-care rituals', 'action': 'Explore more'},
                        {'title': 'PPD / PPA / Hormonal Risk Screening', 'action': 'Explore more'},
                        {'title': 'Nutrition, sleep, body sync', 'action': 'Explore more'},
                      ];

                      return AssessmentCard(title: assessments[index]['title'] ?? '', actionText: assessments[index]['action'] ?? '');
                    },
                  ),
                ],
              ),
            ),

            // Gamification Section
            Image.asset(AppImages.offerImage, width: Get.width, height: 344, fit: BoxFit.fitWidth),

            // Testimonials
            Container(
              padding: EdgeInsets.all(isMobile ? 16 : 32),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  AppText(
                    'Users are enjoying happier and healthier lives',
                    color: AppColors.colorHintTextField,
                    fontSize: 30,
                    textAlign: TextAlign.center,
                    fontWeight: FontWeight.w600,
                  ),
                  SizedBox(height: 32),
                  GridView.builder(
                    shrinkWrap: true,
                    physics: AlwaysScrollableScrollPhysics(),
                    gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount:
                      isMobile
                          ? 1
                          : isTablet
                          ? 2
                          : 3,
                      crossAxisSpacing: 16,
                      mainAxisSpacing: 16,
                      childAspectRatio: 1.0,
                    ),
                    itemCount: 3,
                    itemBuilder: (context, index) {
                      return TestimonialCard(testimonial: 'LittleHugs has transformed my health journey!');
                    },
                  ),
                ],
              ),
            ),

            // Footer
            Container(
              padding: EdgeInsets.all(isMobile ? 16 : 32),
              color: Colors.grey[100],
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Contact Us', style: Theme.of(context).textTheme.headlineMedium),
                  SizedBox(height: 16),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [_buildContactItem('• Account & Setup'), _buildContactItem('• Privacy'), _buildContactItem('• Assessments'), _buildContactItem('• Partner Tools')],
                  ),
                  SizedBox(height: 32),
                  Divider(),
                  SizedBox(height: 16),
                  Text('Footeeer', style: TextStyle(color: Colors.grey)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }


  Widget _buildContactItem(String text) {
    return Padding(padding: const EdgeInsets.symmetric(vertical: 4.0), child: Text(text));
  }
}

class CategoryDropdown extends StatelessWidget {
  final String title;
  final bool isSelected;
  final VoidCallback onTap;
  const CategoryDropdown({Key? key, required this.title, required this.isSelected, required this.onTap}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Container(
        width: 480,
        padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        decoration: BoxDecoration(border: Border.all(color: AppColors.colorHintTextField, width: 1.5), borderRadius: BorderRadius.circular(10)),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            AppText(title, fontWeight: FontWeight.w500, fontSize: 20, color: AppColors.colorHintTextField),
            SizedBox(width: 8),
            Icon(Icons.keyboard_arrow_down_rounded, color: AppColors.colorHintTextField),
          ],
        ),
      ),
    );
  }
}

class FeatureCard extends StatelessWidget {
  final String title;
  final Function onTap;
  const FeatureCard({super.key, required this.title, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 56,
      decoration: BoxDecoration(border: Border.all(color: AppColors.colorHintTextField, width: 1.5), borderRadius: BorderRadius.circular(30)),
      child: InkWell(
        onTap: () => onTap,
        borderRadius: BorderRadius.circular(30),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 17),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(decoration: BoxDecoration(shape: BoxShape.circle, color: AppColors.takeQuickAssessmentColor), height: 10, width: 10),
              SizedBox(width: 8),
              AppText(title, color: AppColors.takeQuickAssessmentColor, fontSize: 20, textAlign: TextAlign.center, fontWeight: FontWeight.w500),
            ],
          ),
        ),
      ),
    );
  }
}

class AssessmentCard extends StatelessWidget {
  final String title;
  final String actionText;

  const AssessmentCard({Key? key, required this.title, required this.actionText}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(color: Colors.grey[200], borderRadius: BorderRadius.circular(12)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(title, style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
          SizedBox(height: 12),
          ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(backgroundColor: Colors.black87, padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8), minimumSize: Size(10, 36)),
            child: Text(actionText),
          ),
        ],
      ),
    );
  }
}

class TestimonialCard extends StatelessWidget {
  final String testimonial;

  const TestimonialCard({Key? key, required this.testimonial}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(color: Colors.grey[200], borderRadius: BorderRadius.circular(12)),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text('Testimonial', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
          SizedBox(height: 16),
          Text(testimonial, textAlign: TextAlign.center, style: TextStyle(fontStyle: FontStyle.italic)),
        ],
      ),
    );
  }
}