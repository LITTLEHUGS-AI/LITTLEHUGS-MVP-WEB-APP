import 'package:flutter/material.dart';
import 'package:get/get.dart';

class LandscapeController extends GetxController {
  // Controller for responsive calculations
  double getSunSize(BuildContext context) {
    return MediaQuery.of(context).size.width * 0.5;
  }

  double getTreeHeight(BuildContext context, bool isTall) {
    final height = MediaQuery.of(context).size.height;
    return isTall ? height * 0.25 : height * 0.18;
  }
}

class LandscapeScreen extends StatelessWidget {
  const LandscapeScreen({super.key});
  @override
  Widget build(BuildContext context) {
    final LandscapeController controller = Get.put(LandscapeController());

    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        color: Color(0xFFF9F2ED), // Light cream background
        child: Stack(
          children: [
            // Sun
            Positioned(
              left: -MediaQuery.of(context).size.width * 0.25,
              top: -MediaQuery.of(context).size.width * 0.25,
              child: Container(
                width: controller.getSunSize(context),
                height: controller.getSunSize(context),
                decoration: BoxDecoration(
                  color: Color(0xFFFFC857), // Yellow sun
                  shape: BoxShape.circle,
                ),
              ),
            ),

            // Ground/horizon
            Positioned(
              bottom: 0,
              left: 0,
              right: 0,
              child: CustomPaint(
                size: Size(MediaQuery.of(context).size.width,
                    MediaQuery.of(context).size.height * 0.3),
                painter: GroundPainter(),
              ),
            ),

            // Trees
            Positioned(
              bottom: MediaQuery.of(context).size.height * 0.02,
              left: MediaQuery.of(context).size.width * 0.1,
              child: CustomPaint(
                size: Size(MediaQuery.of(context).size.width * 0.08,
                    controller.getTreeHeight(context, true)),
                painter: TreePainter(),
              ),
            ),

            Positioned(
              bottom: MediaQuery.of(context).size.height * 0.02,
              left: MediaQuery.of(context).size.width * 0.25,
              child: CustomPaint(
                size: Size(MediaQuery.of(context).size.width * 0.06,
                    controller.getTreeHeight(context, false)),
                painter: TreePainter(),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class GroundPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final Paint paint = Paint()
      ..color = Color(0xFFF5F0EA) // Slightly darker cream for ground
      ..style = PaintingStyle.fill;

    final path = Path();

    // Create a curved horizon line
    path.moveTo(0, size.height);
    path.lineTo(0, size.height * 0.2);

    // Create a gentle wave
    path.quadraticBezierTo(
        size.width * 0.25, size.height * 0.05,
        size.width * 0.5, size.height * 0.2
    );

    path.quadraticBezierTo(
        size.width * 0.75, size.height * 0.35,
        size.width, size.height * 0.15
    );

    path.lineTo(size.width, size.height);
    path.close();

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return false;
  }
}

class TreePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final Paint paint = Paint()
      ..color = Color(0xFF8DCFBD) // Mint green for trees
      ..style = PaintingStyle.fill;

    final path = Path();
    final halfWidth = size.width / 2;

    // Create a stylized cypress-like tree
    path.moveTo(halfWidth, 0);

    // Left side curves
    path.quadraticBezierTo(
        0, size.height * 0.2,
        halfWidth * 0.5, size.height * 0.35
    );

    path.quadraticBezierTo(
        0, size.height * 0.5,
        halfWidth * 0.5, size.height * 0.65
    );

    path.quadraticBezierTo(
        0, size.height * 0.8,
        halfWidth, size.height
    );

    // Right side curves (mirror of left side)
    path.quadraticBezierTo(
        size.width, size.height * 0.8,
        halfWidth * 1.5, size.height * 0.65
    );

    path.quadraticBezierTo(
        size.width, size.height * 0.5,
        halfWidth * 1.5, size.height * 0.35
    );

    path.quadraticBezierTo(
        size.width, size.height * 0.2,
        halfWidth, 0
    );

    // Add shading with a second path
    canvas.drawPath(path, paint);

    // Add a slightly darker section for dimension
    final Paint shadePaint = Paint()
      ..color = Color(0xFF6BBDA8) // Darker mint green for shading
      ..style = PaintingStyle.fill;

    final shadePath = Path();
    shadePath.moveTo(halfWidth, 0);

    // Shade only the right side for a simple 3D effect
    shadePath.quadraticBezierTo(
        size.width, size.height * 0.2,
        halfWidth * 1.5, size.height * 0.35
    );

    shadePath.quadraticBezierTo(
        size.width, size.height * 0.5,
        halfWidth * 1.5, size.height * 0.65
    );

    shadePath.quadraticBezierTo(
        size.width, size.height * 0.8,
        halfWidth, size.height
    );

    shadePath.lineTo(halfWidth, 0);
    shadePath.close();

    canvas.drawPath(shadePath, shadePaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return false;
  }
}