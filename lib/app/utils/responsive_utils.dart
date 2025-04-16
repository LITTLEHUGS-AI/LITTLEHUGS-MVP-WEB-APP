// Create a new class to handle responsive sizing
import 'package:flutter/material.dart';

class ResponsiveSize {
  final BuildContext context;
  final Size _screenSize;
  final double _screenWidth;
  final double _screenHeight;

  // Base design size (you can adjust these values based on your design)
  final double _baseWidth = 1440.0;  // Design width for desktop
  final double _baseHeight = 900.0;  // Design height for desktop

  // Calculated multipliers
  late final double _widthMultiplier;
  late final double _heightMultiplier;

  ResponsiveSize(this.context) :
        _screenSize = MediaQuery.of(context).size,
        _screenWidth = MediaQuery.of(context).size.width,
        _screenHeight = MediaQuery.of(context).size.height {
    // Calculate scaling factors
    _widthMultiplier = _screenWidth / _baseWidth;
    _heightMultiplier = _screenHeight / _baseHeight;
  }

  // Getters for screen dimensions
  double get screenWidth => _screenWidth;
  double get screenHeight => _screenHeight;

  // Methods to get responsive dimensions
  double width(double value) {
    // For very small screens, use a minimum scale factor
    if (_screenWidth < 360) {
      return value * 0.7;
    }

    // Return responsive width
    if (_screenWidth < 600) {
      // Mobile
      return value * 0.85;
    } else if (_screenWidth < 1200) {
      // Tablet
      return value * 0.9;
    } else {
      // Desktop
      return value * _widthMultiplier;
    }
  }

  double height(double value) {
    // For very small screens, use a minimum scale factor
    if (_screenHeight < 640) {
      return value * 0.7;
    }

    // Return responsive height
    if (_screenWidth < 600) {
      // Mobile
      return value * 0.85;
    } else if (_screenWidth < 1200) {
      // Tablet
      return value * 0.9;
    } else {
      // Desktop
      return value * _heightMultiplier;
    }
  }

  // Method for responsive font sizes with min/max constraints
  double fontSize(double value) {
    // Calculate font size based on screen width
    double size;

    if (_screenWidth < 600) {
      // Mobile
      size = value * 0.85;
    } else if (_screenWidth < 1200) {
      // Tablet
      size = value * 0.9;
    } else {
      // Desktop
      size = value * _widthMultiplier;
    }

    // Apply min/max constraints
    return size.clamp(value * 0.7, value * 1.2);
  }

  // Method for responsive border radius
  double radius(double value) {
    // Using width multiplier for radius
    return width(value);
  }
}
