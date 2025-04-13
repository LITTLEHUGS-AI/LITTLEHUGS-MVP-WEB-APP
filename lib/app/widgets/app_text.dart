import 'package:flutter/material.dart';

class AppText extends StatelessWidget {
  final String text, fontFamily;
  final double fontSize;
  final Color color;
  final FontWeight fontWeight;
  final double? letterSpacing;
  final double? height;
  final TextDecoration textDecoration;
  final TextAlign textAlign;
  final int maxLines;
  final FontStyle fontStyle;
  final double textScaler;

  const AppText(
    this.text, {
    super.key,
    this.fontFamily = "Quicksand",
    this.fontSize = 10,
    this.color = Colors.black,
    this.fontWeight = FontWeight.w500,
    this.letterSpacing,
    this.height = 0.0,
    this.textScaler = 1.0,
    this.textDecoration = TextDecoration.none,
    this.textAlign = TextAlign.start,
    this.maxLines = 100,
    this.fontStyle = FontStyle.normal,
  });

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      textAlign: textAlign,
      maxLines: maxLines,
      textScaler: TextScaler.noScaling,
      overflow: TextOverflow.ellipsis,
      style: TextStyle(
        color: color,
        fontFamily: fontFamily,
        fontSize: fontSize,
        fontWeight: fontWeight,
        fontStyle: fontStyle,
        letterSpacing: letterSpacing,
        decoration: textDecoration,
        decorationColor: color,
      ),
    );
  }
}
